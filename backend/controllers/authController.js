const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { matchedData } = require("express-validator");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");



async function login(req, res, next)
{
	const { email, password } = req.body;

	const user = await prisma.user.findUnique({
		where: {
			email: email,
		},
	});

	if (!user)
	{
		return res.status(401).json({ error: "User not found" });
	}

	const passMatch = await bcrypt.compare(password, user.password);

	if (!passMatch)
	{
		return res.status(401).json({ error: "Wrong password" });
	}

	// generate JWT token
	const token = jwt.sign(user, process.env.JWT_SECRET, {
		expiresIn: "6h",
	});

	delete user.password;

	res.json({
		token,
		user,
	});
}


async function verifyToken(req, res)
{
	const { token } = req.body;

	if (!token)
	{
		return res.status(401).json({ message: "Token non fornito" });
	}

	try
	{
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const user = await prisma.user.findUnique({
			where: { id: decoded.id },
			select: {
				id: true,
				firstName: true,
				lastName: true,
				email: true,
				role: true,
			}
		});

		if (!user)
		{
			return res.status(404).json({ message: "Utente non trovato" });
		}

		res.json({ user });
	} catch (error)
	{
		res.status(401).json({ message: "Token non valido" });
	}
};


module.exports = {
	login,
	verifyToken,
};
