import { Request, Response } from "express";
import AbstractController from "./AbstractController";
const cybersourceService = require("../services/setupService");
const enrollmentService = require("../services/enrollmentService");
const validateService = require("../services/validateService");

class SetupPayerAuthenticationController extends AbstractController {
  private static _instance: SetupPayerAuthenticationController;

  public static get instance(): SetupPayerAuthenticationController {
    if (this._instance) {
      return this._instance;
    }
    this._instance = new SetupPayerAuthenticationController(
      "payerAuthentication"
    );
    return this._instance;
  }

  protected initializeRoutes(): void {
    this.router.get("/test", this.getTest.bind(this));
    this.router.post("/setup", this.postCreate.bind(this));
    this.router.post("/enroll", this.postEnroll.bind(this));
    this.router.post("/challengeResponse", this.postChallenge.bind(this));
    this.router.post("/validate", this.postValidate.bind(this));
  }

  private async getTest(req: Request, res: Response) {
    try {
      res.status(200).send("PayerAuthentication Works");
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
      console.log("setupPayerAuthenticationResponse: ", jsonResponse);
      res.status(200).json(jsonResponse);
    } catch (error) {
      console.error("Error in createSetupPayerAuthentication: ", error);
    }
  }

  private async postEnroll(req: Request, res: Response) {
    try {
      const enrollmentData = req.body;
      const enrollmentResponse = await enrollmentService.enrollmentService(
        enrollmentData
      );

      // Convierte la respuesta a un objeto JSON antes de enviarla
      const jsonResponse = JSON.parse(enrollmentResponse.text);
      console.log("enrollmentResponse: ", jsonResponse);

      res.status(200).json(jsonResponse);
    } catch (error) {
      console.error("Error in enrollPayerAuthentication: ", error);
    }
  }

  private async postChallenge(req: Request, res: Response) {
    try {
      const challengeData = req.body.TransactionId;

      if (!challengeData) {
        throw new Error("TransactionId not found in request body");
      }

      let transactionId;
      if (typeof challengeData === "string") {
        transactionId = challengeData;
      } else if (typeof challengeData === "object") {
        transactionId = challengeData.transactionId; // Asegúrate de que esto coincida con la estructura de tu objeto
      } else {
        transactionId = challengeData; // Maneja otros tipos de datos si es necesario
      }

      console.log("challengeResponse: ", challengeData);

      // Redirige al frontend con los parámetros de la transacción
      const redirectUrl = `http://localhost:5173/authentication-callback?transactionStatus=completed&transactionId=${transactionId}`;
      res.redirect(redirectUrl);
    } catch (error) {
      console.error("Error in challengePayerAuthentication: ", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  private async postValidate(req: Request, res: Response) {
    try {
      const validateData = req.body;
      const validateResponse = await validateService.validateService(
        validateData
      );

      // Convierte la respuesta a un objeto JSON antes de enviarla
      const jsonResponse = JSON.parse(validateResponse.text);
      console.log("validateResponse: ", jsonResponse);

      res.status(200).json(jsonResponse);
    } catch (error) {
      console.error("Error in validatePayerAuthentication: ", error);
    }
  }
}

export default SetupPayerAuthenticationController;
