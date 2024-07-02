import cybersourceRestApi from "cybersource-rest-client";
import configObj from "../config/CybersourceConfig";

interface PaymentData {
  cardNumber: string;
  expirationMonth: string; // Expected format: MM
  expirationYear: string; // Expected format: YYYY
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
  console.log(paymentData.expirationMonth);
  const instance = new cybersourceRestApi.PaymentsApi(configObj);

  if (!paymentData.expirationMonth || !paymentData.expirationYear) {
    throw new Error(
      "Invalid expiry date. Expected separate expiration month and year."
    );
  }

  const request = {
    clientReferenceInformation: {
      code: "TC50171_3",
    },
    processingInformation: {
      commerceIndicator: "internet",
    },
    paymentInformation: {
      card: {
        number: paymentData.cardNumber,
        expirationMonth: paymentData.expirationMonth,
        expirationYear: paymentData.expirationYear,
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
  } catch (error) {
    console.error("Error in processPayment: ", error);
    return { error: `Payment processing failed: ${error}` };
  }
};

export { processPayment };
