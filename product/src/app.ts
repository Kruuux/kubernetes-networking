import { Request, Response } from "express";
import fs from "fs";
import axios from "axios";
import * as path from "path";

const express = require("express");
const app = express();
const port = process.env.PRODUCT_SERVICE_PORT;

app.use(express.json());

app.get("/api/products", (request: Request, response: Response) => {
  const url = path.join(__dirname, "products.json");
  const products = JSON.parse(fs.readFileSync(url, "utf8"));
  return response.status(200).json({ status: 200, data: products });
});

app.post("/api/products", (request: Request, response: Response) => {
  axios
    .get(`${process.env.AUTHENTICATION_SERVICE_URL}/api/auth`, {
      headers: {
        authorization: `${request.headers["authorization"]}`,
      },
    })
    .then(() => {
      const url = path.join(__dirname, "products.json");
      const products = JSON.parse(fs.readFileSync(url, "utf8"));

      const product = request.body;
      products.push(product);

      fs.writeFileSync(url, JSON.stringify(products));

      return response
        .status(201)
        .json({ status: 201, message: "Product added successfully" });
    })
    .catch((error) => {
      return response.status(error.response.status).json({
        status: error.response.status,
        message: error.response.statusText,
      });
    });
});

app.listen(port, () => {
  console.log(`Product service listening on port ${port}`);
});