import dotenv from "dotenv";

// Cargar variables de entorno desde el archivo .env
dotenv.config();

const configObject = {
  authenticationType: "http_signature",
  runEnvironment: process.env.RUN_ENVIRONMENT!,
  merchantID: process.env.MERCHANT_ID!,
  merchantKeyId: process.env.MERCHANT_KEY_ID!,
  merchantsecretKey: process.env.MERCHANT_SECRET_KEY!,
  logConfiguration: {
    enableLog: true,
    logFileName: "cybs",
    logDirectory: "log",
    logFileMaxSize: "5242880", // 5MB
    loggingLevel: "debug",
    enableMasking: true,
  },
};

export default configObject;
