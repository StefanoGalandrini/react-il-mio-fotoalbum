/**
 * @type {import("express-validator").Schema}
 */
module.exports = {
	title: {
		in: ["body"],
		notEmpty: {
			errorMessage: "Il titolo è obbligatorio",
		},
		isString: {
			errorMessage: "Il titolo deve essere una stringa",
		},
	},
	description: {
		in: ["body"],
		notEmpty: {
			errorMessage: "La descrizione è obbligatoria",
		},
		isString: {
			errorMessage: "La descrizione deve essere una stringa",
		},
	},
	visible: {
		in: ["body"],
		notEmpty: {
			errorMessage: "Visibile è obbligatorio",
		},
		isBoolean: {
			errorMessage: "Visibile deve essere vero o falso",
		},
	},
};
