const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();



// index - read all messages
async function index(req, res)
{
	const messages = await prisma.message.findMany();
	res.json(messages);
}



// delete - delete a meessage
async function destroy(req, res)
{
	const { id } = req.params;
	try
	{
		await prisma.message.delete({
			where: { id: parseInt(id) }
		});

		res.json({ message: "Messaggio eliminato con successo" });
	} catch (error)
	{
		console.error("Errore durante l'eliminazione del messaggio:", error);
		res.status(500).json({ error: "Errore durante l'eliminazione del messaggio" });
	}
}



module.exports = {
	index,
	destroy,
};
