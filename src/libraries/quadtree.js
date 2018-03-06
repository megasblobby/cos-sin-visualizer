"use strict"

import Vector2 from "./vector2";
import BoundingBox from "./bounding-box";
import {engine} from "./engine";

export const DEFAULT_MAX_OBJECTS_PER_NODE = 10;
export const DEFAULT_MAX_LEVELS = 4;
export const DEFAULT_NAME = 'root';
const NODE_NAME = 'leaf'
const PARENT = -1;
const AREA_NODE_A = 0, AREA_NODE_B = 1, AREA_NODE_C = 2, AREA_NODE_D = 3;

export default class Quadtree {
  constructor(area = new BoundingBox(), level = 0, name = DEFAULT_NAME,
              maxObjectsPerNode = DEFAULT_MAX_OBJECTS_PER_NODE,
              maxLevels = DEFAULT_MAX_LEVELS) {
    this._area = area;
    this._area.tagManager.add('name', name);
    this._level = level;
    this._maxObjectsPerNode = maxObjectsPerNode;
    this._maxLevels = maxLevels;
    this._objects = new Array();
    this._nodes = new Array();
  }

  clear() {
    if (this._level === 0) {
      this._nodes.length = 0;
      this._objects.length = 0;
    }
  }

  insert(boundingBox) {
    if (this._nodes.length > 0) {
      let indeces = this._getIndecesNode(boundingBox);
      this._insertObjectAtIndeces(indeces, boundingBox);
    }
    else {
      this._objects.push(boundingBox);
      if (this._shouldSplit()) {
        this._split();

        for (let index = 0; index < this._objects.length; index++) {
          let indeces = this._getIndecesNode(this._objects[index]);
          this._insertObjectAtIndeces(indeces, this._objects[index]);
          this._objects.splice(index, 1);
          index--;
        }
      }
    }
  }

  retrieve(boundingBox) {
    let indeces = this._getIndecesNode(boundingBox);
    let objects = null;
    let nearObjects = new Set();

    //console.log(this.name);
    for (let index of indeces) {
      if (index !== PARENT && this._nodes.length > 0) {
        objects = this._nodes[index].retrieve(boundingBox);
        objects.forEach(object => {//console.log(object.tagManager.valueOf('name'));
        nearObjects.add(object)});
      }
    }

    if (this._objects.length > 0) {
      this._objects.forEach(object => nearObjects.add(object));
    }
    return nearObjects;
  }

  _split() {
    let level = this._level + 1;
    let halfSizes = this._area.halfSizes;

    /**************************
    * _________  *  _________ *
    * | A | B |  *  | 0 | 1 | *
    * ───────── --> ───────── *
    * | C | D |  *  | 2 | 3 | *
    * ─────────  *  ───────── *
    ***************************/
    let areaNodeA = new BoundingBox(this._area.leftTopCorner.clone(),
                                  halfSizes.clone());
    let areaNodeB = new BoundingBox(new Vector2(this._area.center.x,
                                  this._area.minY), halfSizes.clone());
    let areaNodeC = new BoundingBox(new Vector2(this._area.minX,
                                  this._area.center.y), halfSizes.clone());

    let areaNodeD = new BoundingBox(this._area.center, halfSizes.clone());
    let parentName = this.name;

    this._nodes.push(new Quadtree(areaNodeA, level,
      `${parentName}_${NODE_NAME}_${AREA_NODE_A}`));
    this._nodes.push(new Quadtree(areaNodeB, level,
      `${parentName}_${NODE_NAME}_${AREA_NODE_B}`));
    this._nodes.push(new Quadtree(areaNodeC, level,
      `${parentName}_${NODE_NAME}_${AREA_NODE_C}`));
    this._nodes.push(new Quadtree(areaNodeD, level,
      `${parentName}_${NODE_NAME}_${AREA_NODE_D}`));
  }

  _getIndecesNode(boundingBox) {
    let indeces = new Set();

    if (this._nodes.length === 0) {
      indeces.add(PARENT);
      return indeces;
    }
    for (let index = 0; index < this._nodes.length; index++) {
      if (this._nodes[index].area.intersect(boundingBox)) {
        indeces.add(index);
      }
    }
    return indeces;
  }

  _insertObjectAtIndeces(indeces, object) {
    for (let index of indeces) {
      this._nodes[index].insert(object);
    }
  }

  _shouldSplit() {
    return this._objects.length > this._maxObjectsPerNode &&
          this._level < this._maxLevels - 1;
  }

  render(deltaTime) {
    engine.canvasContext.strokeStyle = '#FF0000';
    engine.canvasContext.strokeRect(this._area.leftTopCorner.x,
                                  this._area.leftTopCorner.y,
                                  this._area.width, this._area.height);

    for (let object of this._objects) {
      object.render(deltaTime);
    }

    for (let node of this._nodes) {
      node.render(deltaTime);
    }
  }

  get area() {
    return this._area;
  }

  get level() {
    return this._level;
  }

  get name() {
    return this.area.tagManager.valueOf('name');
  }

  get maxObjectsPerNode() {
    return this._maxObjectsPerNode;
  }

  get maxLevels() {
    return this._maxLevels;
  }

  get objects() {
    return this._objects;
  }

  get nodes() {
    return this._nodes;
  }
}
