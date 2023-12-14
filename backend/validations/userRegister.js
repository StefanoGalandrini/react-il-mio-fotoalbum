const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/**
 * @type {import("express-validator").Schema}
 */
module.exports = {
  firstName: {
    in: ["body"],
    notEmpty: {
      options: {
        ignore_whitespace: true,
      },
      errorMessage: "Il nome è obbligatorio",
    },
    isLength: {
      options: {
        min: 2,
      },
      errorMessage: "Il nome deve essere lungo almeno 2 caratteri",
    },
  },
  lastName: {
    in: ["body"],
    notEmpty: {
      options: {
        ignore_whitespace: true,
      },
      errorMessage: "Il cognome è obbligatorio",
    },
    isLength: {
      options: {
        min: 2,
      },
      errorMessage: "Il cognome deve essere lungo almeno 2 caratteri",
    },
  },
  email: {
    in: ["body"],
    isEmail: {
      errorMessage: "L'email inserita non è valida",
    },
    notEmpty: {
      errorMessage: "L'email è obbligatoria",
    },
    custom: {
      options: async (value) =>
      {
        const alreadyExists = await prisma.user.findUnique({
          where: {
            email: value,
          },
        });

        if (alreadyExists)
        {
          return Promise.reject("L'email inserita è già in uso");
        }

        return true;
      },
    },
  },
  password: {
    in: ["body"],
    isStrongPassword: {
      options: {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      },
    },
    errorMessage:
      "La password deve essere lunga almeno 8 caratteri, contenere almeno una lettera maiuscola, una minuscola, un numero e un carattere speciale",
  },
};
