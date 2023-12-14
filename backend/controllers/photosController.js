const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const fs = require("fs");
const util = require("util");


// errors handler
const NotFound = require("../errors/NotFound");
const validationError = require("../errors/ValidationError");
const { validationResult } = require("express-validator");


// index - read photos from db
/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
async function index(req, res, next)
{
	try
	{
		const isAdmin = req.user && req.user.role === 'admin';
		const { visible, string } = req.query;
		let queryOptions = {};
		if (!isAdmin)
		{
			queryOptions.where = { visible: true };
		}

		if (string)
		{
			queryOptions.where = {
				...queryOptions.where,
				OR: [
					{
						title: {
							contains: string,
						}
					},
					{
						description: {
							contains: string,
						}
					},
				],
			};
		}

		const photos = await prisma.photo.findMany({
			...queryOptions,
			include: {
				User: true,
				categories: true,
			},
		});
		res.json(photos);
	} catch (error)
	{
		console.error("Errore nel metodo index:", error);
		next(error);
	}
}


// create - add a new photo to db
/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
async function create(req, res, next)
{
	const validation = validationResult(req);
	if (!validation.isEmpty())
	{
		return next(new validationError("Verificare i dati inseriti", validation.array()));
	}
	try
	{
		console.log("req.body:", req.body, "req.file:", req.file);

		const { title, description, visible, userId, categories } = req.body;
		const imagePath = req.file ? req.file.path : null;

		const userNumber = parseInt(userId);
		const photo = await prisma.photo.create({
			data: {
				title,
				description,
				visible: visible === 'true',
				image: imagePath,
				userId: userNumber,
				categories: {
					connect: categories.map(catId => ({ id: parseInt(catId) })),
				},
			},
			include: {
				User: true,
				categories: true,
			},
		});

		res.status(201).json({ message: "Foto aggiunta con successo", photo });
	} catch (error)
	{
		console.error(error);
		res.status(500).send("Errore nell'aggiunta della foto");
	}
};



// show - read a single photo by slug
/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
async function show(req, res, next)
{
	const { id } = req.params;
	try
	{
		const photo = await prisma.photo.findUnique({
			where: { id: parseInt(id) },
			include: {
				User: true,
				categories: true,
			},
		});

		if (!photo)
		{
			return next(new NotFound(`Foto con ID ${id} non trovata`));
		}

		res.json(photo);
	} catch (error)
	{
		next(error);
	}
}




// update - update a single photo by slug
/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
async function update(req, res, next)
{
	const validation = validationResult(req);
	if (!validation.isEmpty())
	{
		return next(new ValidationError("Controllare i dati inseriti", validation.array()));
	}

	const { id } = req.params;
	let updateData = {};

	const photo = await prisma.photo.findUnique({
		where: { id: parseInt(id) },
	});

	if (!photo)
	{
		return next(new NotFound(`Foto non trovata con ID: ${id}`));
	}

	// Aggiorna i campi di testo da FormData
	if (req.body.title)
	{
		updateData.title = req.body.title;
	}

	if (req.body.description)
	{
		updateData.description = req.body.description;
	}

	if (req.body.visible)
	{
		updateData.visible = req.body.visible === 'true';
	}

	// Aggiorna l'immagine
	if (req.file)
	{
		// Rimuovi l'immagine esistente se presente
		if (photo.image)
		{
			fs.unlink(photo.image, (error) =>
			{
				if (error)
				{
					console.log("Errore nella rimozione dell'immagine esistente:", error);
				}
			});
		}
		updateData.image = req.file.path;
	}

	// Esegui l'aggiornamento
	try
	{
		const updatedPhoto = await prisma.photo.update({
			where: { id: parseInt(id) },
			data: updateData,
			include: {
				User: true,
				categories: true,
			},
		});

		res.json(updatedPhoto);
	} catch (error)
	{
		console.error(error);
		res.status(500).send("Errore durante l'aggiornamento della foto");
	}
}






// delete - delete a single photo by slug
/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
async function destroy(req, res, next)
{
	const { slug } = req.params;
	const photo = await prisma.photo.findUnique({
		where: { slug },
	});

	if (!photo)
	{
		return next(new NotFound(`photo not found with slug: ${slug}`));
	}

	if (photo.image)
	{
		fs.unlink(photo.image, (error) =>
		{
			if (error)
			{
				console.log("Errore nella rimozione dell'immagine esistente:", error);
			}
		});
	}

	await prisma.photo.delete({
		where: { slug }
	});

	res.json({ message: "photo successfully deleted" });
}



module.exports = {
	index,
	create,
	show,
	update,
	destroy
};