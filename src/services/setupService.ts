"use strict";
import cybersourceRestApi from "cybersource-rest-client";
import configObj from "../config/CybersourceConfig";

const setupPayerAuthentication = async (authenticationData: any) => {
  console.log("authenticationData", authenticationData);
  const configObject = configObj;
  const apiClient = new cybersourceRestApi.ApiClient();
  const requestObj = new cybersourceRestApi.PayerAuthSetupRequest();

  const clientReferenceInformation =
    new cybersourceRestApi.Ptsv2paymentsClientReferenceInformation();
  clientReferenceInformation.code =
    authenticationData.clientReferenceInformation.code;
  requestObj.clientReferenceInformation = clientReferenceInformation;

  const paymentInformation =
    new cybersourceRestApi.Ptsv2paymentsPaymentInformation();
  const paymentInformationCard =
    new cybersourceRestApi.Ptsv2paymentsPaymentInformationCard();
  paymentInformationCard.type = authenticationData.paymentInformation.card.type;
  paymentInformationCard.number =
    authenticationData.paymentInformation.card.number;
  paymentInformationCard.expirationMonth =
    authenticationData.paymentInformation.card.expirationMonth;
  paymentInformationCard.expirationYear =
    authenticationData.paymentInformation.card.expirationYear;
  paymentInformation.card = paymentInformationCard;

  requestObj.paymentInformation = paymentInformation;

  console.log("requestObj", requestObj);

  const instance = new cybersourceRestApi.PayerAuthenticationApi(
    configObject,
    apiClient
  );

  try {
    const response: any = await new Promise((resolve, reject) => {
      instance.payerAuthSetup(
        requestObj,
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
    console.error("Error in setupPayerAuthentication: ", error);
    throw new Error(`Payer authentication setup failed: ${error}`);
  }
};

export { setupPayerAuthentication };
