const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const fs = require("fs");
const util = require("util");


// errors handler
const NotFound = require("../../errors/NotFound");
const validationError = require("../../errors/ValidationError");
const { validationResult } = require("express-validator");


// index - read photos from db
/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
async function index(req, res, next)
{
	const title = req.query.title;

	const dbQuery = {};

	if (title)
	{
		dbQuery.title = { contains: title };
	}

	try
	{
		const photos = await prisma.photo.findMany({
			where: dbQuery,
			include: {
				categories: true,
				User: true,
			},
		});
		res.json(photos);
	} catch (error)
	{
		console.error("Errore nel metodo index:", error);
		res.status(500).json({ error: "Errore durante la ricerca delle immagini" });
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
	// const validation = validationResult(req);
	// if (!validation.isEmpty())
	// {
	// 	return next(new validationError("Verificare i dati inseriti", validation.array()));
	// }
	try
	{
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
					connect: categories.map(categoryId => ({ id: parseInt(categoryId) })),
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
	const { id } = req.params;
	try
	{
		const photo = await prisma.photo.findUnique({
			where: { id: parseInt(id) },
		});

		if (!photo)
		{
			return next(new NotFound(`Foto non trovata con ID: ${id}`));
		}

		// Rimuovi l'immagine dal filesystem, se presente
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

		// Elimina la foto dal database
		await prisma.photo.delete({
			where: { id: parseInt(id) }
		});

		res.json({ message: "Foto eliminata con successo" });
	} catch (error)
	{
		console.error(error);
		res.status(500).send("Errore durante l'eliminazione della foto");
	}
}




module.exports = {
	index,
	create,
	show,
	update,
	destroy
};
