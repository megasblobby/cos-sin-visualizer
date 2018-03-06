"use strict";

import {validateNullUndifined, validateEmptyString} from './validator';

export default class EntitiesManager {
  constructor() {
    this._entities = new Map();
    this._groups = new Map();
    this._logIsActive = false;
  }

  @validateNullUndifined
  @validateEmptyString
  add(id, entity) {
    this._entities.set(id, entity);
    if (this.logIsActive) {
      console.log(`Add entity "${id}" to entities`);
    }
  }

  @validateNullUndifined
  @validateEmptyString
  addAtGroup(id, groupName, entity) {
    if (this._groups.has(groupName) == false) {
      this._groups.set(groupName, new Set());
      if (this.logIsActive) {
        console.warn(`Creating group: "${groupName}".`);
      }
    }
    this._groups.get(groupName).add(id);
    this.add(id, entity);
  }

  @validateEmptyString
  remove(id) {
    if (this._entities.has(id)) {
      let groups = Array.from(this._groups.keys());
      for (let group of groups) {
        if (this._groups.get(group).has(id)) {
            this.removeFromGroup(id, group);
        }
      }
      this._entities.delete(id);
    }
    else {
      console.warn(`Entity "${id}" doesn't exists in entities`);
    }
  }

  @validateEmptyString
  removeFromGroup(id, groupName) {
    if (this._groups.has(groupName)) {
      if (this._groups.get(groupName).has(id)) {
        this._groups.get(groupName).delete(id);
        this._entities.delete(id);
        if (this._groups.get(groupName).size === 0) {
          this.removeGroup(groupName);
        }
      }
      else {
        console.warn(`Group: "${groupName}" does not have entity ${id}.`);
      }
    }
    else{
      console.warn(`Group: "${groupName}" does not exists.`);
    }
  }

  @validateEmptyString
  removeGroup(groupName) {
    if (this._groups.has(groupName)) {
      this._groups.delete(groupName);
    }
    else{
      console.warn(`Group: "${groupName}" doesn't exists.`);
    }
  }

  @validateEmptyString
  get(id) {
    if (this._entities.has(id)) {
      return this._entities.get(id);
    }
    else {
      console.warn(`Entity "${id}" doesn't exists`);
      return null
    }
  }

  @validateEmptyString
  getGroup(groupName) {
    if (this._groups.has(groupName)) {
      let ids = this._groups.get(groupName).values();
      let entities = new Array();
      for (let id of ids) {
        entities.push(this.get(id));
      }

      return entities;
    }
    else{
      if (this.logIsActive === true) {
        console.warn(`Group: "${groupName}" doesn't exists.`);
      }
    }
  }

  get entities() {
    return this._entities;
  }

  get groups() {
    return this._groups;
  }

  set logIsActive(_logIsActive) {
    this._logIsActive = _logIsActive;
  }

  get logIsActive() {
    return this._logIsActive;
  }
}
