import mongoose from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";

import { passwordReg } from "./user.validation.js";
import config from "../../../config/config.js";

let userSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: {
    type: String,
    required: true,
    minlength: [6, "Password need to be longer!"],
    validate: {
      validator(password) {
        return passwordReg.test(password);
      },
      message: "{VALUE} is not a valid password!",
    },
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator(email) {
        return validator.isEmail(email);
      },
      message: "{VALUE} is not a valid email!",
    },
  },
  birthday: Date,
  favoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: "movie" }],
});

// userSchema.methods = {
//   createToken() {
//     return jwt.sign(
//       {
//         _id: this._id,
//       },
//       config.jwtSecret
//     );
//   },
//   toJSON() {
//     return {
//       _id: this._id,
//       userName: this.userName,
//       token: `${this.createToken()}`,
//     };
//   },
// };

let User = mongoose.model("user", userSchema);

export default User;
