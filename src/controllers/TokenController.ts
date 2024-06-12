import e, { Request, Response } from "express";
import AbstractController from "./AbstractController";
import db from "../models";

class TokenController extends AbstractController {
  //Singleton
  //Atributo de clase
  private static _instance: TokenController;
  //Metodo de clase
  public static get instance(): TokenController {
    if (!this._instance) {
      this._instance = new TokenController("token");
    }
    return this._instance;
  }
  //Declarar todas las rutas del controlador
  protected initializeRoutes(): void {
    this.router.post("/login", this.postLogin.bind(this));
  }

  private async getToken(req: Request, res: Response) {
    try {
      console.log("Consultar token");
      let token = await db["Token"].findAll(); //SELECT * FROM Token;
      res.status(200).json(token);
    } catch (error: any) {
      console.log(error);
      res.status(500).send("Internal server error" + error);
    }
  }

  private async postLogin(req: Request, res: Response) {
    try {
      console.log(req.body);
      await db.Token.create(req.body); //INSERT
      console.log("Token creado");
      res.status(200).send("Token creado");
    } catch (error: any) {
      console.log(error);
      res.status(500).send("Internal server error" + error);
    }
  }
  //Metodos de instancia
}

export default TokenController;
