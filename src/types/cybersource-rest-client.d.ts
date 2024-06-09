declare module "cybersource-rest-client" {
  export class ApiClient {
    constructor();
    setConfiguration(config: Configuration): void;
  }

  export class PaymentsApi {
    constructor(apiClient: ApiClient);
    createPayment(
      request: CreatePaymentRequest,
      callback: (error: any, data: any, response: any) => void
    ): void;
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

  export interface CreatePaymentRequest {
    clientReferenceInformation: {
      code: string;
    };
    processingInformation: {
      commerceIndicator: string;
    };
    paymentInformation: {
      card: {
        number: string;
        expirationMonth: string;
        expirationYear: string;
        securityCode: string;
      };
    };
    orderInformation: {
      amountDetails: {
        totalAmount: string;
        currency: string;
      };
      billTo: {
        firstName: string;
        lastName: string;
        address1: string;
        locality: string;
        administrativeArea: string;
        postalCode: string;
        country: string;
        email: string;
        phoneNumber: string;
      };
    };
  }
}
