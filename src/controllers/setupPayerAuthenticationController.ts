import { Request, Response } from "express";
import AbstractController from "./AbstractController";
const cybersourceService = require("../services/setupService");

class SetupPayerAuthenticationController extends AbstractController {
  private static _instance: SetupPayerAuthenticationController;

  public static get instance(): SetupPayerAuthenticationController {
    if (this._instance) {
      return this._instance;
    }
    this._instance = new SetupPayerAuthenticationController(
      "setupPayerAuthentication"
    );
    return this._instance;
  }

  protected initializeRoutes(): void {
    this.router.get("/test", this.getTest.bind(this));
    this.router.post("/setup", this.postCreate.bind(this));
  }

  private async getTest(req: Request, res: Response) {
    try {
      res.status(200).send("SetupPayerAuthentication Works");
    } catch (error) {
      res
        .status(500)
        .send(`Error al conectar con el SetupPayerAuthentication ${error}`);
    }
  }

  private async postCreate(req: Request, res: Response) {
    try {
      const setupPayerAuthenticationData = req.body;
      const setupPayerAuthenticationResponse =
        await cybersourceService.setupPayerAuthentication(
          setupPayerAuthenticationData
        );

      // Convierte la respuesta a un objeto JSON antes de enviarla
      const jsonResponse = JSON.parse(setupPayerAuthenticationResponse.text);

      res.status(200).json(jsonResponse);
    } catch (error) {
      console.error("Error in createSetupPayerAuthentication: ", error);
    }
  }
}

export default SetupPayerAuthenticationController;
