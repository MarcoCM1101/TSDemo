"use strict";
import cybersourceRestApi from "cybersource-rest-client";
import configObj from "../config/CybersourceConfig";

interface InstrumentIdentifier {
  id: number;
}

const retrieveInstrumentIdentifier = async (
  instrumentIdentifier: InstrumentIdentifier
): Promise<any> => {
  const apiClient = new cybersourceRestApi.ApiClient();
  const configObject = configObj;
  const instance = new cybersourceRestApi.InstrumentIdentifierApi(
    configObject,
    apiClient
  );

  const opts: any = {};

  try {
    const response: any = await new Promise((resolve, reject) => {
      console.log("instrumentIdentifier.id: ", instrumentIdentifier.id);
      instance.getInstrumentIdentifier(
        instrumentIdentifier.id,
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
    console.error("Error in retrieveInstrumentIdentifier: ", error);
    throw new Error(`Instrument identifier retrieval failed: ${error}`);
  }
};
export { retrieveInstrumentIdentifier };
