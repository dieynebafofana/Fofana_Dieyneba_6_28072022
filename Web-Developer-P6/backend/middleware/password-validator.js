const passWordValidator = require("password-validator");

const passWordSchema = new passWordValidator();

passWordSchema
  .is()
  .min(4) // Minimum length 4
  .is()
  .max(100) // Maximum length 100
  .has()
  .uppercase() // Must have uppercase letters
  .has()
  .lowercase() // Must have lowercase letters
  .has()
  .digits(2) // Must have at least 2 digits
  .has()
  .not()
  .spaces() // Should not have spaces
  .is()
  .not()
  .oneOf(["Passw0rd", "Password123"]); // Blacklist these values

module.exports = (req, res, next) => {
  if (passWordSchema.validate(req.body.password)) {
    next();
  } else {
    return res
      .status(403)
      .json({
        error:
          "password faible" +
          passWordSchema.validate("req.body.password", { list: true }),
      });
  }
};
