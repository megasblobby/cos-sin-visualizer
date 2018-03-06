"use strict"

import Vector2 from "./vector2";

export default class Rectangle {
  constructor(position = new Vector2(), sizes = new Vector2()) {
    this._position = position;
    this._sizes = sizes;
  }

  contains(rectangle) {
    for (let point of rectangle.points) {
      if (this.containsPoint(point) === false){
        return false;
      }
    }
    return true;
  }

  containsPoint(point) {
    if (point.x <= this.minX) {
      return false;
    }
    if (point.x >= this.maxX) {
      return false;
    }
    if (point.y <= this.minY) {
      return false;
    }
    if (point.y >= this.maxY) {
      return false;
    }
    return true;
  }

  set position(_position) {
    this._position = _position.clone();
  }

  get position() {
    return this._position;
  }

  set sizes(_sizes) {
    this._sizes = _sizes.clone();
  }

  get sizes() {
    return this._sizes;
  }

  get halfSizes() {
    return this._sizes.scaled(0.5);
  }

  set width(newWidth) {
    this._sizes.x = newWidth;
  }

  get width() {
    return this._sizes.x;
  }

  set height(newHeight) {
    this._sizes.y = newHeight;
  }

  get height() {
    return this._sizes.y;
  }

  get minX() {
    return this._position.x;
  }

  get maxX() {
    return this._position.x + this.width;
  }

  get minY() {
    return this._position.y;
  }

  get maxY() {
    return this._position.y + this.height;
  }

  get leftTopCorner() {
    return this._position.clone();
  }

  get rightTopCorner() {
    return new Vector2(this.maxX, this.minY);
  }

  get leftBottomCorner() {
    return new Vector2(this.minX, this.maxY);
  }

  get rightBottomCorner() {
    return new Vector2(this.maxX, this.maxY);
  }

  get center() {
    return new Vector2.add(this.leftTopCorner, this.halfSizes);
  }

  get points() {
    let points = [this.leftTopCorner.clone(),
                   this.rightTopCorner.clone(),
                   this.rightBottomCorner.clone(),
                   this.leftBottomCorner.clone()]
    return points;
  }
}
