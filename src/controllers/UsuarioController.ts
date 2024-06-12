import { Request, Response } from "express";
import AbstractController from "./AbstractController";
import db from "../models";

class UsuarioController extends AbstractController {
  //Singleton
  //Atributo de clase
  private static _instance: UsuarioController;
  //Metodo de clase
  public static get instance(): UsuarioController {
    if (!this._instance) {
      this._instance = new UsuarioController("usuario");
    }
    return this._instance;
  }
  //Declarar todas las rutas del controlador
  protected initializeRoutes(): void {
    this.router.post("/crearUsuario", this.postCrearUsuario.bind(this));
    this.router.get("/consultarUsuarios", this.getConsultarUsuarios.bind(this));
  }

  private async postCrearUsuario(req: Request, res: Response) {
    try {
      console.log(req.body);
      await db.Usuario.create(req.body); //INSERT
      console.log("Usuario creado");
      res.status(200).send("<h1>Usuario creado</h1>");
    } catch (error: any) {
      console.log(error);
      res.status(500).send("Internal server error" + error);
    }
  }

  private async getConsultarUsuarios(req: Request, res: Response) {
    try {
      console.log("Consultar usuarios");
      let usuarios = await db["Usuario"].findAll(); //SELECT * FROM Usuario;
      res.status(200).json(usuarios);
    } catch (error: any) {
      console.log(error);
      res.status(500).send("Internal server error" + error);
    }
  }
  //Metodos de instancia
}

export default UsuarioController;
