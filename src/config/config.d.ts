declare module "cybersource-rest-client" {
  export class ApiClient {
    setConfiguration(config: Configuration): void;
  }

  export interface Configuration {
    authenticationType: string;
    runEnvironment: string;
    merchantID: string;
    merchantKeyId: string;
    merchantsecretKey: string;
    logConfiguration: {
      enableLog: boolean;
      logFileName: string;
      logDirectory: string;
      logFileMaxSize: string;
      loggingLevel: string;
      enableMasking: boolean;
    };
  }
}
