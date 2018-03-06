"use strict";

function register(subject, observer) {
  this._validate(subject, "subject");
  this._validate(observer, "observer");

  if (this.subjects.has(subject) === false) {
    this.subjects.set(subject, new Array());
  }
  this.subjects.get(subject).push(observer);
}

function notify(subject, object = null) {
  this._validate(subject, "subject");

  if (this._subjects.has(subject)) {
    let observers = this.subjects.get(subject);
    for (let observer of observers) {
      observer.onNotify(subject, object);
    }
  }
  else {
    console.warn(`Subject ${subject} is not a registered subject!`);
  }
}

/*function validate(target, key, descriptor) {
  let _arguments = [...descriptor.value];
  for (let arguments of _arguments) {
    if (target === null || typeof target === "undefined") {
      let errorMessage = `${name} can not be ${target}!`;
      throw errorMessage;
    }
  }
}*/

class Observable {
  constructor() {
    this._subjects = new Map();

    this.register = register.bind(this);
    this.notify = notify.bind(this);
  }

  _validate(target, name) {
    if (target === null || typeof target === "undefined") {
      let errorMessage = `${name} can not be ${target}!`;
      throw errorMessage;
    }

    return target;
  }

  set subjects(subjects) {
    this._subjects = this._validate(subjects, "subjects");
  }

  get subjects() {
    return this._subjects;
  }
}

export default Observable;
