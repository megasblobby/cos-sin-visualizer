"use strict"

export default class TagManager {
  constructor() {
    this._tags = new Map();
  }

  add(tag, value) {
    this._tags.set(tag, value);
  }

  valueOf(tag) {
    if (this._tags.has(tag)) {
      return this._tags.get(tag);
    }
    return null;
  }

  has(tag) {
    return this._tags.has(tag);
  }

  get tags() {
    return this._tags;
  }
}
