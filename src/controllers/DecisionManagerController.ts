import { Request, Response } from "express";
import AbstractController from "./AbstractController";
const cybersourceService = require("../services/decisionManagerService");

class DecisionManagerController extends AbstractController {
  private static _instance: DecisionManagerController;

  public static get instance(): DecisionManagerController {
    if (this._instance) {
      return this._instance;
    }
    this._instance = new DecisionManagerController("decisionManager");
    return this._instance;
  }

  protected initializeRoutes(): void {
    this.router.get("/test", this.getTest.bind(this));
    this.router.post("/decision", this.postDecision.bind(this));
  }

  private async getTest(req: Request, res: Response) {
    try {
      res.status(200).send("DecisionManager Works");
    } catch (error) {
      res.status(500).send(`Error al conectar con el DecisionManager ${error}`);
    }
  }

  private async postDecision(req: Request, res: Response) {
    try {
      const decisionManagerData = req.body;
      const decisionManagerResponse =
        await cybersourceService.decisionManagerService(decisionManagerData);

      // Convierte la respuesta a un objeto JSON antes de enviarla
      const jsonResponse = JSON.parse(decisionManagerResponse.text);
      console.log("decisionManagerResponse: ", jsonResponse);
      res.status(200).json(jsonResponse);
    } catch (error) {
      console.error("Error in postDecisionManager: ", error);
    }
  }
}

export default DecisionManagerController;
