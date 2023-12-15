const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { validationResult, matchedData } = require("express-validator");

// Funzione per inviare un nuovo messaggio
async function sendMessage(req, res, next)
{
	const errors = validationResult(req);
	if (!errors.isEmpty())
	{
		return res.status(422).json({ errors: errors.array() });
	}

	try
	{
		const { email, message } = req.body;

		const newMessage = await prisma.message.create({
			data: {
				email,
				message
			}
		});

		res.status(201).json({ message: "Messaggio inviato con successo", newMessage });
	} catch (error)
	{
		console.error(error);
		res.status(500).send("Errore durante l'invio del messaggio");
	}
}

module.exports = {
	sendMessage
};
