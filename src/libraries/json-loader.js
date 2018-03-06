"use strict";

import {validateNullUndifined, validateEmptyString} from './validator';

const REQUEST_DONE = 4;
const RESPONSE_READY = 200;
const REQUEST_METHOD = "GET";
const IS_ASYNCRONOUS_REQUEST = true;

export default class JSONLoader {
  constructor() {}

  @validateNullUndifined
  @validateEmptyString
  load(key, filePath) {
    return new Promise((resolve, reject) => {
      let request = new XMLHttpRequest();
      request.open(REQUEST_METHOD, filePath, IS_ASYNCRONOUS_REQUEST);
      request.onload = () => {
            if (request.readyState === REQUEST_DONE && request.status === RESPONSE_READY) {
                resolve({key, "value": request.response});
            } else {
                reject(request.statusText);
            }
        };
      request.onerror = () => reject(request.statusText);
      request.send();
    });
  }
}
