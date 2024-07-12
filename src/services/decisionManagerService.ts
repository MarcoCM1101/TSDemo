"use strict";
import cybersourceRestApi from "cybersource-rest-client";
import configObj from "../config/CybersourceConfig";

const decisionManagerService = async (decisionManagerData: any) => {
  console.log("decisionManagerData", decisionManagerData);
  const configObject = configObj;
  const apiClient = new cybersourceRestApi.ApiClient();
  const requestObj =
    new cybersourceRestApi.CreateBundledDecisionManagerCaseRequest();

  const clientReferenceInformation =
    new cybersourceRestApi.Riskv1decisionsClientReferenceInformation();
  clientReferenceInformation.code =
    decisionManagerData.clientReferenceInformation.code;
  requestObj.clientReferenceInformation = clientReferenceInformation;

  const orderInformation =
    new cybersourceRestApi.Riskv1decisionsOrderInformation();
  const orderInformationAmountDetails =
    new cybersourceRestApi.Riskv1decisionsOrderInformationAmountDetails();
  orderInformationAmountDetails.currency =
    decisionManagerData.orderInformation.amountDetails.currency;
  orderInformationAmountDetails.totalAmount =
    decisionManagerData.orderInformation.amountDetails.totalAmount;
  orderInformation.amountDetails = orderInformationAmountDetails;

  const orderInformationBillTo =
    new cybersourceRestApi.Riskv1decisionsOrderInformationBillTo();
  orderInformationBillTo.address1 =
    decisionManagerData.orderInformation.billTo.address1;
  orderInformationBillTo.administrativeArea =
    decisionManagerData.orderInformation.billTo.administrativeArea;
  orderInformationBillTo.country =
    decisionManagerData.orderInformation.billTo.country;
  orderInformationBillTo.locality =
    decisionManagerData.orderInformation.billTo.locality;
  orderInformationBillTo.firstName =
    decisionManagerData.orderInformation.billTo.firstName;
  orderInformationBillTo.lastName =
    decisionManagerData.orderInformation.billTo.lastName;
  orderInformationBillTo.phoneNumber =
    decisionManagerData.orderInformation.billTo.phoneNumber;
  orderInformationBillTo.email =
    decisionManagerData.orderInformation.billTo.email;
  orderInformationBillTo.postalCode =
    decisionManagerData.orderInformation.billTo.postalCode;
  orderInformation.billTo = orderInformationBillTo;

  requestObj.orderInformation = orderInformation;

  const paymentInformation =
    new cybersourceRestApi.Riskv1decisionsPaymentInformation();
  const paymentInformationCard =
    new cybersourceRestApi.Riskv1decisionsPaymentInformationCard();
  paymentInformationCard.type =
    decisionManagerData.paymentInformation.card.type;
  paymentInformationCard.number =
    decisionManagerData.paymentInformation.card.number;
  paymentInformationCard.expirationMonth =
    decisionManagerData.paymentInformation.card.expirationMonth;
  paymentInformationCard.expirationYear =
    decisionManagerData.paymentInformation.card.expirationYear;
  paymentInformation.card = paymentInformationCard;
  paymentInformation.securityCode =
    decisionManagerData.paymentInformation.securityCode;

  requestObj.paymentInformation = paymentInformation;

  const deviceInformation =
    new cybersourceRestApi.Riskv1decisionsDeviceInformation();
  deviceInformation.ipAddress = decisionManagerData.deviceInformation.ipAddress;
  deviceInformation.hostName = decisionManagerData.deviceInformation.hostName;
  deviceInformation.fingerprintSessionId =
    decisionManagerData.deviceInformation.fingerprintSessionId;
  requestObj.deviceInformation = deviceInformation;

  const merchantDefinedInformation = new Array();
  const merchantDefinedInformation1 =
    new cybersourceRestApi.Riskv1decisionsMerchantDefinedInformation();
  merchantDefinedInformation1.key = "1";
  merchantDefinedInformation1.value = "Test";
  merchantDefinedInformation.push(merchantDefinedInformation1);

  requestObj.merchantDefinedInformation = merchantDefinedInformation;

  const instance = new cybersourceRestApi.DecisionManagerApi(
    configObject,
    apiClient
  );

  console.log("requestObj", requestObj);

  try {
    const response: any = await new Promise((resolve, reject) => {
      instance.createBundledDecisionManagerCase(
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
    console.error("Error in decisionManagerService: ", error);
    throw new Error(`Decision Manager failed: ${error}`);
  }
};

export { decisionManagerService };
