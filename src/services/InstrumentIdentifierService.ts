"use strict";
import cybersourceRestApi from "cybersource-rest-client";
import configObj from "../config/CybersourceConfig";

interface InstrumentIdentifier {
  cardNumber: string;
}

const setupInstrumentIdentifier = async (
  instrumentIdentifier: InstrumentIdentifier
): Promise<any> => {
  const apiClient = new cybersourceRestApi.ApiClient();
  const configObject = configObj;
  const requestObj = new cybersourceRestApi.PostInstrumentIdentifierRequest();

  const card = new cybersourceRestApi.TmsEmbeddedInstrumentIdentifierCard();
  card.number = instrumentIdentifier.cardNumber;
  requestObj.card = card;

  const instance = new cybersourceRestApi.InstrumentIdentifierApi(
    configObject,
    apiClient
  );

  const opts: any = {};

  try {
    const response: any = await new Promise((resolve, reject) => {
      instance.postInstrumentIdentifier(
        requestObj,
        opts,
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
    console.error("Error in setupInstrumentIdentifier: ", error);
    throw new Error(`Instrument identifier setup failed: ${error}`);
  }
};

export { setupInstrumentIdentifier };
