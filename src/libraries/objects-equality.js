"use strict"
import {validateNullUndifined} from './validator';

export default class ObjectsEquality {
  //@validateNullUndifined
  static areEqual(objectA, objectB) {
    let prototypeA = Object.getPrototypeOf(objectA);
    let prototypeB = Object.getPrototypeOf(objectB);

    if (prototypeA !== prototypeB) {
      console.warn(`Prototypes are not equal: ${objectA.constructor.name}, ${objectB.constructor.name}`);
      return false;
    }

    let entriesObjectA = new Map(Object.entries(objectA));
    let entriesObjectB = new Map(Object.entries(objectB));

    for (let memberName of entriesObjectA.keys()) {
      let memberAValue = entriesObjectA.get(memberName);
      let memberBValue = entriesObjectB.get(memberName);
      if (memberAValue instanceof Object) {
        if (ObjectsEquality.areEqual(memberAValue, memberBValue) === false) {
          console.warn(`Members '${memberName}' are not equal: ${memberAValue.toString()}, ${memberBValue.toString()}`);
          return false;
        }
      }
      else if (memberAValue !== memberBValue) {
        console.warn(`Members '${memberName}' are not equal: ${memberAValue}, ${memberBValue}`);
        return false;
      }
    }
    return true;
  }

}
