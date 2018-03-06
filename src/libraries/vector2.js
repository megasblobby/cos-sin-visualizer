"use strict";

export default class Vector2 {
  constructor(x = 0, y = 0) {
    this._x = x;
    this._y = y;
  }

  static add(vectorA, vectorB) {
    return new Vector2(vectorA.x + vectorB.x, vectorA.y + vectorB.y);
  }

  static subtract(vectorA, vectorB) {
    return new Vector2(vectorA.x - vectorB.x, vectorA.y - vectorB.y);
  }

  static distance(vectorA, vectorB) {
    return Vector2.subtract(vectorA, vectorB).length();
  }

  static multiply(vectorA, vectorB) {
    return new Vector2(vectorA.x * vectorB.x, vectorA.y * vectorB.y);
  }

  copy(vector2) {
    this._x = vector2.x;
    this._y = vector2.y;
  }

  clone() {
    return new Vector2(this._x, this._y);
  }

  negate() {
    this._x *= -1;
    this._y *= -1;
  }

  normalize() {
    let length = this.length();
    this._x /= length, this._y /= length;

    return this;
  }

  normalized() {
    let length = this.length();
    return new Vector2(this._x / length, this._y / length);
  }

  add(vector2) {
    this._x += vector2.x;
    this._y += vector2.y;

    return this;
  }

  subtract(vector2) {
    this._x -= vector2.x;
    this._y -= vector2.y;

    return this;
  }

  multiply(vector2) {
    this._x *= vector2.x;
    this._y *= vector2.y;

    return this;
  }

  scale(scalar) {
    this._x *= scalar;
    this._y *= scalar;

    return this;
  }

  scaled(scalar) {
    return new Vector2( this._x * scalar, this._y * scalar);
  }

  dot(vector2) {
    return this._x * vector2.x + this._y + vector2.y;
  }

  toString() {
    let description = `[x: ${this._x}, y: ${this._y}] length: ${this.length}`;
    return description;
  }

  set x(_x) {
    this._x = _x;
  }

  get x() {
    return this._x;
  }

  set y(_y) {
    this._y = _y;
  }

  get y() {
    return this._y;
  }

  get length() {
    return Math.sqrt(this.lengthSquared);
  }

  get lengthSquared() {
    return Math.pow(this._x, 2) + Math.pow(this._y, 2);
  }
}
