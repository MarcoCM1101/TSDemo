import Server from "./providers/Server";
import { PORT, NODE_ENV } from "./config";
import express from "express";
import cors from "cors";
import PaymentController from "./controllers/PaymentController";
import UsuarioController from "./controllers/UsuarioController";
import TokenController from "./controllers/TokenController";
import InstrumentIdentifierController from "./controllers/InstrumentIdentifierController";
import PayerAuthenticationController from "./controllers/PayerAuthenticationController";
import RetrieveInstrumentIdentifierController from "./controllers/RetrieveInstrumentIdentifier";

const server = new Server({
  port: PORT,
  env: NODE_ENV,
  middlewares: [express.json(), express.urlencoded({ extended: true }), cors()],
  controllers: [
    // PaymentController.instance,
    // UsuarioController.instance,
    // TokenController.instance,
    // InstrumentIdentifierController.instance,
    PayerAuthenticationController.instance,
    // RetrieveInstrumentIdentifierController.instance,
  ],
});

//Extendiendo la interfaz Request de Express para poder acceder a los datos del usuario
declare global {
  namespace Express {
    interface Request {
      user: string;
      token: string;
    }
  }
}

server.init();
