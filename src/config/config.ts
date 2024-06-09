import { ApiClient, Configuration } from "cybersource-rest-client";
import dotenv from "dotenv";

// Cargar variables de entorno desde el archivo .env
dotenv.config();

const configObject: Configuration = {
  authenticationType: "http_signature",
  runEnvironment: process.env.RUN_ENVIRONMENT || "apitest.cybersource.com",
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

const apiClient = new ApiClient();
apiClient.setConfiguration(configObject);

export default apiClient;
