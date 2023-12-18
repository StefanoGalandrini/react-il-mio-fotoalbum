const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


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
	try
	{
		const dbQuery = {
			visible: true
		};

		const title = req.query.title;

		if (title)
		{
			dbQuery.title = { contains: title };
		}

		const photos = await prisma.photo.findMany({
			where: dbQuery,
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



// show a single photo by id
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


module.exports = {
	index,
	create,
	show,
};
