import passport from "passport";

export const authorizeJWT = passport.authenticate("jwt", {
  session: false,
});

export const authorizeLocal = passport.authenticate(
  "local",
  {
    session: false,
  },
  (error, user, info) => {
    if (error || !user) {
      return res.status(400).json({
        message: "Something is not right",
        user: user,
      });
    }
    req.login(user, { session: false }, (error) => {
      if (error) {
        res.send(error);
      }
      // let token = generateJWTToken(user.toJSON());
      // return res.json({ user, token });
    });
  }
);
