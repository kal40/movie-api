import mongoose from "mongoose";

mongoose.set("strictQuery", true);

mongoose.connect(process.env.CONNECTION_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
