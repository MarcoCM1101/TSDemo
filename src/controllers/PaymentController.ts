import { Request, Response } from "express";
import AbstractController from "./AbstractController";
const cybersourceService = require("../services/paymentService");

class PaymentController extends AbstractController {
  private static _instance: PaymentController;

  public static get instance(): PaymentController {
    if (this._instance) {
      return this._instance;
    }
    this._instance = new PaymentController("payment");
    return this._instance;
  }

  protected initializeRoutes(): void {
    this.router.get("/test", this.getTest.bind(this));
    this.router.post("/pay", this.postPay.bind(this));
  }

  private async getTest(req: Request, res: Response) {
    try {
      res.status(200).send("Payment Works");
    } catch (error) {
      res.status(500).send(`Error al conectar con el Payment ${error}`);
    }
  }

  private async postPay(req: Request, res: Response) {
    try {
      const paymentData = req.body;
      const paymentResponse = await cybersourceService.processPayment(
        paymentData
      );

      // Convierte la respuesta a un objeto JSON antes de enviarla
      const jsonResponse = JSON.parse(paymentResponse);
      console.log(jsonResponse);

      res.status(200).json(jsonResponse);
    } catch (error) {
      console.error("Error in createPayment: ", error);
    }
  }
}

export default PaymentController;
