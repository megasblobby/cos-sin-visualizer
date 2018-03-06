"use strict";

import Observable from "./observable";
import TagManager from "./tag-manager";

let ID = 0;

export default class Entity {
  constructor(name = "entity", components = new Map(), renderer = null) {
    this.components = components;
    this._ID = Entity.obtainID();
    this._name = `${this.constructor.name}_${this._ID}`;
    this._tagManager = new TagManager();

  //  this.renderer = renderer;
    this._observable = new Observable();
    this._isActive = true;
  }

  static obtainID() {
    return ID++;
  }

  update(deltaTime) {
    for (let [key, value] of this.components) {
      value.update(deltaTime);
    }
  }

  render(deltaTime) {
    /*if (this.renderer !== null) {
      this.renderer.render(deltaTime);
    }*/
  }

  addComponent(name, component) {
    this.components.set(name, component);
  }

  getComponent(name) {
    return this.components.get(name);
  }

  addTag(name, value) {
    this._tags.set(name, value);
  }

  get ID() {
    return this._ID;
  }

  get name() {
    return this._name;
  }

  get tagManager() {
    return this._tagManager;
  }

  get observable() {
    return this._observable;
  }

  set isActive(_isActive) {
    this._isActive = _isActive;
  }

  get isActive() {
    return this._isActive;
  }
}
