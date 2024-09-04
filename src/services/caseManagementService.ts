"use strict";
import cybersourceRestApi from "cybersource-rest-client";
import configObj from "../config/CybersourceConfig";

const caseManagementService = async (caseManagementData: any) => {
  console.log("caseManagementData", caseManagementData);

  const configObject = configObj;
  const apiClient = new cybersourceRestApi.ApiClient();
  const requestObj = new cybersourceRestApi.CaseManagementActionsRequest();

  const id = caseManagementData.id;

  const decisionInformation =
    new cybersourceRestApi.Riskv1decisionsidactionsDecisionInformation();
  decisionInformation.decision = "ACCEPT";

  requestObj.decisionInformation = decisionInformation;

  console.log("requestObj", requestObj);

  const instance = new cybersourceRestApi.DecisionManagerApi(
    configObject,
    apiClient
  );

  try {
    const response: any = await new Promise((resolve, reject) => {
      instance.actionDecisionManagerCase(
        id,
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

export { caseManagementService };
