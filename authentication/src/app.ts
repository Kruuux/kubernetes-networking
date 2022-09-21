import { Request, Response } from "express";

const express = require("express");
const app = express();
const port = process.env.AUTHENTICATION_SERVICE_PORT;

app.get("/api/auth", (request: Request, response: Response) => {
  if (request.headers["authorization"] === "Bearer abc")
    return response.status(200).end();

  return response.status(401).end();
});

app.listen(port, () => {
  console.log(`Authentication service listening on port ${port}`);
});
