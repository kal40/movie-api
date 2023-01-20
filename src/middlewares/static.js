import express from "express";

export const initStatic = (app) => {
  app.use(express.static("public", { index: ["index.html", "index.htm"] }));
};
