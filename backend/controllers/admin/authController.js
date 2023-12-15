const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();



async function me(req, res, next)
{
	const user = await prisma.user.findUnique({
		where: {
			id: req.user.id,
		},
	});

	if (!user)
	{
		return res.status(401).json({ error: "User not found" });
	}

	delete user.password;

	res.json({ user });
}


module.exports = {
	me,
};
