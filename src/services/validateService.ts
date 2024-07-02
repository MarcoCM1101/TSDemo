"use strict";
import cybersourceRestApi from "cybersource-rest-client";
import configObj from "../config/CybersourceConfig";

const validateService = async (validateData: any) => {
  console.log("validateData", validateData);
  const configObject = configObj;
  const apiClient = new cybersourceRestApi.ApiClient();
  const requestObj = new cybersourceRestApi.ValidateRequest();

  const clientReferenceInformation =
    new cybersourceRestApi.Riskv1decisionsClientReferenceInformation();
  clientReferenceInformation.code =
    validateData.clientReferenceInformation.code;
  requestObj.clientReferenceInformation = clientReferenceInformation;

  const orderInformation =
    new cybersourceRestApi.Riskv1authenticationresultsOrderInformation();
  const orderInformationAmountDetails =
    new cybersourceRestApi.Riskv1authenticationresultsOrderInformationAmountDetails();
  orderInformationAmountDetails.currency =
    validateData.orderInformation.amountDetails.currency;
  orderInformationAmountDetails.totalAmount =
    validateData.orderInformation.amountDetails.totalAmount;
  orderInformation.amountDetails = orderInformationAmountDetails;

  requestObj.orderInformation = orderInformation;

  const paymentInformation =
    new cybersourceRestApi.Riskv1authenticationresultsPaymentInformation();
  const paymentInformationCard =
    new cybersourceRestApi.Riskv1authenticationresultsPaymentInformationCard();
  paymentInformationCard.type = validateData.paymentInformation.card.type;
  paymentInformationCard.number = validateData.paymentInformation.card.number;
  paymentInformationCard.expirationMonth =
    validateData.paymentInformation.card.expirationMonth;
  paymentInformationCard.expirationYear =
    validateData.paymentInformation.card.expirationYear;
  paymentInformation.card = paymentInformationCard;

  requestObj.paymentInformation = paymentInformation;

  const consumerAuthenticationInformation =
    new cybersourceRestApi.Riskv1authenticationresultsConsumerAuthenticationInformation();
  consumerAuthenticationInformation.authenticationTransactionId =
    validateData.consumerAuthenticationInformation.authenticationTransactionId;

  requestObj.consumerAuthenticationInformation =
    consumerAuthenticationInformation;

  const instance = new cybersourceRestApi.PayerAuthenticationApi(
    configObject,
    apiClient
  );

  console.log("requestObj", requestObj);

  try {
    const response: any = await new Promise((resolve, reject) => {
      instance.validateAuthenticationResults(
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
    console.error("Error in validateService: ", error);
    throw new Error(`Validation failed: ${error}`);
  }
};

export { validateService };
