import { Request, Response } from "express";
import AbstractController from "./AbstractController";
const cybersourceService = require("../services/instrumentIdentifierService");

class InstrumentIdentifierController extends AbstractController {
  private static _instance: InstrumentIdentifierController;

  public static get instance(): InstrumentIdentifierController {
    if (this._instance) {
      return this._instance;
    }
    this._instance = new InstrumentIdentifierController("instrumentIdentifier");
    return this._instance;
  }

  protected initializeRoutes(): void {
    this.router.get("/test", this.getTest.bind(this));
    this.router.post("/create", this.postCreate.bind(this));
  }

  private async getTest(req: Request, res: Response) {
    try {
      res.status(200).send("InstrumentIdentifier Works");
    } catch (error) {
      res
        .status(500)
        .send(`Error al conectar con el InstrumentIdentifier ${error}`);
    }
  }

  private async postCreate(req: Request, res: Response) {
    try {
      const instrumentIdentifierData = req.body;
      const instrumentIdentifierResponse =
        await cybersourceService.setupInstrumentIdentifier(
          instrumentIdentifierData
        );

      // Convierte la respuesta a un objeto JSON antes de enviarla
      const jsonResponse = JSON.parse(instrumentIdentifierResponse.text);

      res.status(200).json(jsonResponse);
    } catch (error) {
      console.error("Error in createInstrumentIdentifier: ", error);
    }
  }
}

export default InstrumentIdentifierController;
