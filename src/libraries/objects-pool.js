"use strict";

import Observable from "./observable";
import TagManager from "./tag-manager";

let ID = 0;

export default class ObjectsPool {
  constructor(objectType, initialSize = 0) {
    this._objectType = objectType;
    this._objects = new Array();
    this._objects.length = initialSize;
    this._firstObjectAvailable = initialSize;

    if (this._firstObjectAvailable > 0) {
      for (var index = 0; index < initialSize; index++) {
        this._objects[index] = new this._objectType();
        this._objects[index].observable.register("dispose", this);
      }

      this._firstObjectAvailable = this._objects.length - 1;
    }
  }

  getObject() {
    let object = null;
    if (this._firstObjectAvailable > 0) {
      object = this._objects[this._firstObjectAvailable];
      this._objects[this._firstObjectAvailable] = null;
      this._firstObjectAvailable--;

      //object.isActive = true;
    }
    else {
      object = new this._objectType();
    }

    return object;
  }

  disposeObject(object) {
    if (this._firstObjectAvailable < this._objects.length - 1) {
      this._firstObjectAvailable++;
      object.isActive = false;
      this._objects[this._firstObjectAvailable] = object;
    }
    console.log("disposeObject");
  }

  onNotify(subject, object) {
    if (subject === "dispose") {
      this.disposeObject(object);
    }
  }
}
