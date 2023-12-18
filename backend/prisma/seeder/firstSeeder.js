const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

const categories = require("../../db/categories.json");
const users = require("../../db/users.json");

async function createCategory()
{
	await prisma.category.createMany({
		data: categories.map((category) => ({
			name: category.name,
		})),
	});
};

async function createUsers()
{
	await prisma.user.createMany({
		data: users.map((user) =>
		({
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			role: user.role,
			password: bcrypt.hashSync(user.password, 10),
		})),
	});
};

async function seedDatabase()
{
	await createCategory();
	await createUsers();
	await prisma.$disconnect();
}

seedDatabase();
