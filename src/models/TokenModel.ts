import { Model, Sequelize } from "sequelize";

interface TokenAttributes {
  idToken: number;
  token: string;
  idUsuario: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Token extends Model<TokenAttributes> implements TokenAttributes {
    public idToken!: number;
    public token!: string;
    public idUsuario!: number;

    static associate(models: any) {
      Token.belongsTo(models.Usuario, {
        foreignKey: "idUsuario",
      });
    }
  }

  Token.init(
    {
      idToken: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      idUsuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Token",
    }
  );

  return Token;
};
