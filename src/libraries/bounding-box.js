"use strict"

import Vector2 from "./vector2";
import Rectangle from "./rectangle";
import TagManager from "./tag-manager";
import {engine} from "./engine";

export default class BoundingBox extends Rectangle {
  constructor(position = new Vector2(), sizes = new Vector2()) {
    super(position, sizes);
    this._tagManager = new TagManager();
    this._color = '#00ff00'
  }

  contains(rectangle) {
    for (let point of rectangle.points) {
      if (this.containsPoint(point) === false){
        return false;
      }
    }
    return true;
  }

  render(deltaTime) {
    engine.canvasContext.strokeStyle = this._color;
    engine.canvasContext.strokeRect(this.leftTopCorner.x,
                                  this.leftTopCorner.y,
                                  this.width, this.height);
  }

  intersect(boundingBox) {
    for (let point of boundingBox.points) {
      if (this.containsPoint(point)) {
        return true;
      }
    }
    return false;
  }

  onCollision(boundingBox) {console.log('noBIND')}

  get tagManager() {
    return this._tagManager;
  }

  set color(_color) {
    this._color = _color;
  }

  get color() {
    return this._color;
  }
}
