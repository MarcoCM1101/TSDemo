import { Request, Response } from "express";
import AbstractController from "./AbstractController";
import CyberSourceClient from "../services/CybersourceClient";

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
      const paymentDetails = req.body;
      const result = await CyberSourceClient.processPayment(paymentDetails);
      res.status(200).send(result);
    } catch (error: any) {
      res.status(500).send({ error: error.message });
    }
  }
}

export default PaymentController;
