const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { validationResult, matchedData } = require("express-validator");

// index - read all categories
async function index(req, res)
{
	const categories = await prisma.category.findMany();
	res.json(categories);
}



// store - create a new category
async function store(req, res)
{
	const validation = validationResult(req);

	if (!validation.isEmpty())
	{
		return res.status(422).json(validation.array());
	}

	const inputData = req.body;

	const newCategory = await prisma.category.create({
		data: {
			name: inputData.name,
		},
	});

	return res.json(newCategory);
}


// delete - delete a category
async function destroy(req, res)
{
	const { id } = req.params;
	try
	{
		await prisma.category.delete({
			where: { id: parseInt(id) }
		});

		res.json({ message: "Categoria eliminata con successo" });
	} catch (error)
	{
		console.error("Errore durante l'eliminazione della categoria:", error);
		res.status(500).json({ error: "Errore durante l'eliminazione della categoria" });
	}
}



module.exports = {
	index,
	store,
	destroy,
};
