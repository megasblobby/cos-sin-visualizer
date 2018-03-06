"use strict";

import {validateNullUndifined, validateEmptyString} from './validator';

const REQUEST_DONE = 4;
const RESPONSE_READY = 200;

export default class ImageLoader {
  constructor() {}

  @validateNullUndifined
  @validateEmptyString
  load(key, filePath) {
    return new Promise((resolve, reject) => {
      let image = document.createElement("img");
      image.src = filePath;
      image.onloadstart = () => {};
      image.onload = () => {resolve({key, "value": image})};
      image.onerror = () => {reject(filePath);};
    });
  }
}
