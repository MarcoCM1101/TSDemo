import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import PaymentController from "./controllers/PaymentController";

// Carga las variables de entorno desde el archivo .env
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const corsOptions = {
  origin: "http://your-allowed-origin.com", // Reemplaza con el dominio permitido
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Configura CORS con opciones
app.use(cors(corsOptions));

app.use(express.json());
app.use("/payment", PaymentController.instance.router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
