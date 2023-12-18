const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");
const photosData = require("../../db/photos.json");

const prisma = new PrismaClient();

// Funzione per simulare il caricamento del file con Multer
function simulateMulterUpload(photo)
{
	const originalPath = path.join(__dirname, '../../prisma/seeder/seedImages', photo.image);
	const newFileName = Date.now() + '_' + photo.image;
	const newPath = path.join(__dirname, '../../uploads', newFileName);

	fs.copyFileSync(originalPath, newPath);

	return {
		path: path.join('uploads', newFileName),
		originalname: photo.image
	};
}

async function createPhoto(photoData)
{
	const file = simulateMulterUpload(photoData);
	const { title, description, visible, userId, categories } = photoData;
	const imagePath = file ? file.path : null;
	const userNumber = parseInt(userId);
	const photo = await prisma.photo.create({
		data: {
			title,
			description,
			visible: visible === "true",
			image: imagePath,
			userId: userNumber ? userNumber : 1,
			categories: {
				connect: photoData.categories.map(categoryObj => ({ id: parseInt(categoryObj.id) })),
			},
		},
	});

	return photo;
}

async function seedDatabase()
{
	console.log("Inizio seeding...");
	for (const photo of photosData)
	{
		await createPhoto(photo);
		console.log("Foto creata: ", photo.title);
	}
	console.log("Seeding completato.");
	await prisma.$disconnect();
}

seedDatabase().catch(e =>
{
	console.error(e);
	process.exit(1);
});
