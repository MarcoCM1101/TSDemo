import { Model, Sequelize } from "sequelize";

interface UsuarioAttributes {
  idUsuario: number;
  nombre: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Usuario extends Model<UsuarioAttributes> implements UsuarioAttributes {
    public idUsuario!: number;
    public nombre!: string;
  }
  Usuario.init(
    {
      idUsuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Usuario",
    }
  );
  return Usuario;
};
