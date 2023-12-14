/**
 * @type {import("express-validator").Schema}
 */
module.exports = {
	email: {
		in: ["body"],
		isEmail: {
			errorMessage: "L'indirizzo email non è valido",
		},
		notEmpty: {
			errorMessage: "L'email è obbligatoria",
			options: { ignore_whitespace: true }
		},
	},
	message: {
		in: ["body"],
		notEmpty: {
			errorMessage: "Il messaggio non può essere vuoto",
			options: { ignore_whitespace: true }
		}
	}
};
