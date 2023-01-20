import { check, validationResult } from "express-validator";

export const passwordReg = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;

export const userValidationSchema = [
  check("username", "Username shall be at least 5 characters long.").isLength({
    min: 5,
  }),
  check(
    "username",
    "Username contains non alphanumeric characters - not allowed."
  ).isAlphanumeric(),
  check("password", "Password is required").not().isEmpty(),
  check("email", "Email does not appear to be valid").isEmail(),
];

export const validateUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
