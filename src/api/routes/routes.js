import { Router } from "express";

import usersRoutes from "../v1/user/user.route.js";
import moviesRoutes from "../v1/movie/movie.route.js";

const apiRouter = Router();

apiRouter.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "myFlix api is live!" });
});

apiRouter.use("/users", usersRoutes);
apiRouter.use("/movies", moviesRoutes);

export default apiRouter;
