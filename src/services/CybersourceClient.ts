import { PaymentsApi, CreatePaymentRequest } from "cybersource-rest-client";
import apiClient from "../config/config"; // Asegúrate de que la ruta es correcta

interface PaymentData {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  amount: string;
  billingInfo: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    email: string;
    phoneNumber: string;
  };
}

const processPayment = async (paymentData: PaymentData): Promise<any> => {
  const instance = new PaymentsApi(apiClient);

  const request: CreatePaymentRequest = {
    clientReferenceInformation: {
      code: "TC50171_3",
    },
    processingInformation: {
      commerceIndicator: "internet",
    },
    paymentInformation: {
      card: {
        number: paymentData.cardNumber,
        expirationMonth: paymentData.expiryDate.split("/")[0],
        expirationYear: paymentData.expiryDate.split("/")[1],
        securityCode: paymentData.cvv,
      },
    },
    orderInformation: {
      amountDetails: {
        totalAmount: paymentData.amount,
        currency: "MXN",
      },
      billTo: {
        firstName: paymentData.billingInfo.firstName,
        lastName: paymentData.billingInfo.lastName,
        address1: paymentData.billingInfo.address,
        locality: paymentData.billingInfo.city,
        administrativeArea: paymentData.billingInfo.state,
        postalCode: paymentData.billingInfo.zipCode,
        country: paymentData.billingInfo.country,
        email: paymentData.billingInfo.email,
        phoneNumber: paymentData.billingInfo.phoneNumber,
      },
    },
  };

  try {
    console.log("Request to Cybersource: ", request);
    const response = await new Promise<any>((resolve, reject) => {
      instance.createPayment(
        request,
        (error: any, data: any, response: any) => {
          if (error) {
            reject(error);
          } else {
            resolve(response);
          }
        }
      );
    });

    if (response && response.status) {
      return response;
    } else {
      throw new Error("Invalid response from Cybersource");
    }
  } catch (error: any) {
    console.error("Error in processPayment: ", error);
    throw new Error(`Payment processing failed: ${error.message}`);
  }
};

export default {
  processPayment,
};
