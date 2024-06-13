import { Request, Response } from "express";
import AbstractController from "./AbstractController";
const cybersourceService = require("../services/RetrieveInstrumentIdentifierService");

class RetrieveInstrumentIdentifierController extends AbstractController {
  private static _instance: RetrieveInstrumentIdentifierController;

  public static get instance(): RetrieveInstrumentIdentifierController {
    if (this._instance) {
      return this._instance;
    }
    this._instance = new RetrieveInstrumentIdentifierController(
      "retrieveInstrumentIdentifier"
    );
    return this._instance;
  }

  protected initializeRoutes(): void {
    this.router.get("/test", this.getTest.bind(this));
    this.router.post("/retrieve", this.postRetrieve.bind(this));
  }

  private async getTest(req: Request, res: Response) {
    try {
      res.status(200).send("RetrieveInstrumentIdentifier Works");
    } catch (error) {
      res
        .status(500)
        .send(
          `Error al conectar con el RetrieveInstrumentIdentifier: ${error}`
        );
    }
  }

  private async postRetrieve(req: Request, res: Response) {
    try {
      const instrumentIdentifierData = req.body;
      console.log("instrumentIdentifierData: ", instrumentIdentifierData);
      const instrumentIdentifierResponse =
        await cybersourceService.retrieveInstrumentIdentifier(
          instrumentIdentifierData
        );

      const jsonResponse = JSON.parse(instrumentIdentifierResponse.text);

      // Enviar la respuesta como un objeto JSON
      res.status(200).json(jsonResponse);
    } catch (error) {
      console.error("Error in retrieveInstrumentIdentifier: ", error);
      res.status(500).send(`Error in retrieveInstrumentIdentifier: ${error}`);
    }
  }
}

export default RetrieveInstrumentIdentifierController;
