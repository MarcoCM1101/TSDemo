"use strict";
import cybersourceRestApi from "cybersource-rest-client";
import configObj from "../config/CybersourceConfig";

const enrollmentService = async (enrollmentData: any) => {
  console.log("enrollmentData", enrollmentData);
  const configObject = configObj;
  const apiClient = new cybersourceRestApi.ApiClient();
  const requestObj = new cybersourceRestApi.CheckPayerAuthEnrollmentRequest();

  const clientReferenceInformation =
    new cybersourceRestApi.Riskv1decisionsClientReferenceInformation();
  clientReferenceInformation.code =
    enrollmentData.clientReferenceInformation.code;
  requestObj.clientReferenceInformation = clientReferenceInformation;

  const orderInformation =
    new cybersourceRestApi.Riskv1authenticationsOrderInformation();
  const orderInformationAmountDetails =
    new cybersourceRestApi.Riskv1authenticationsOrderInformationAmountDetails();
  orderInformationAmountDetails.currency =
    enrollmentData.orderInformation.amountDetails.currency;
  orderInformationAmountDetails.totalAmount =
    enrollmentData.orderInformation.amountDetails.totalAmount;
  orderInformation.amountDetails = orderInformationAmountDetails;

  const orderInformationBillTo =
    new cybersourceRestApi.Riskv1authenticationsOrderInformationBillTo();
  orderInformationBillTo.address1 =
    enrollmentData.orderInformation.billTo.address1;
  orderInformationBillTo.administrativeArea =
    enrollmentData.orderInformation.billTo.administrativeArea;
  orderInformationBillTo.country =
    enrollmentData.orderInformation.billTo.country;
  orderInformationBillTo.locality =
    enrollmentData.orderInformation.billTo.locality;
  orderInformationBillTo.firstName =
    enrollmentData.orderInformation.billTo.firstName;
  orderInformationBillTo.lastName =
    enrollmentData.orderInformation.billTo.lastName;
  orderInformationBillTo.phoneNumber =
    enrollmentData.orderInformation.billTo.phoneNumber;
  orderInformationBillTo.email = enrollmentData.orderInformation.billTo.email;
  orderInformationBillTo.postalCode =
    enrollmentData.orderInformation.billTo.postalCode;
  orderInformation.billTo = orderInformationBillTo;

  requestObj.orderInformation = orderInformation;

  const paymentInformation =
    new cybersourceRestApi.Riskv1authenticationsPaymentInformation();
  const paymentInformationCard =
    new cybersourceRestApi.Riskv1authenticationsPaymentInformationCard();
  paymentInformationCard.type = enrollmentData.paymentInformation.card.type;
  paymentInformationCard.number = enrollmentData.paymentInformation.card.number;
  paymentInformationCard.expirationMonth =
    enrollmentData.paymentInformation.card.expirationMonth;
  paymentInformationCard.expirationYear =
    enrollmentData.paymentInformation.card.expirationYear;
  paymentInformation.card = paymentInformationCard;

  requestObj.paymentInformation = paymentInformation;

  const consumerAuthenticationInformation =
    new cybersourceRestApi.Riskv1decisionsConsumerAuthenticationInformation();
  consumerAuthenticationInformation.referenceId =
    enrollmentData.consumerAuthenticationInformation.referenceId;
  consumerAuthenticationInformation.returnUrl =
    enrollmentData.consumerAuthenticationInformation.returnUrl;
  requestObj.consumerAuthenticationInformation =
    consumerAuthenticationInformation;

  const instance = new cybersourceRestApi.PayerAuthenticationApi(
    configObject,
    apiClient
  );

  console.log("RequestObj: ", requestObj);

  try {
    const response: any = await new Promise((resolve, reject) => {
      instance.checkPayerAuthEnrollment(
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
    console.error("Error in enrollmentService: ", error);
    throw new Error(`Payer authentication enrollment failed: ${error}`);
  }
};

export { enrollmentService };
