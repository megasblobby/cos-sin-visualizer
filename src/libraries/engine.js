"use strict";

import AssetManager from "./asset-manager";
import InputManager from "./input-manager";
import EntitiesManager from "./entities-manager";

const MILLISECONDS_TO_SECONDS = 1/1000;
const DEFAULT_CANVAS_WIDTH = 800;
const DEFAULT_CANVAS_HEIGHT = 600;

function log(target, name, descriptor) {
  console.log(`target: ${target}, name: ${name}, descriptor ${descriptor}`);
  const original = descriptor.value;
  if (typeof original === 'function') {
    descriptor.value = function(...args) {
      console.log(`Arguments: ${args}`);
      try {
        const result = original.apply(this, args);
        console.log(`Result: ${result}`);
        return result;
      } catch (e) {
        console.log(`Error: ${e}`);
        throw e;
      }
    }
  }
  return descriptor;
}

class Engine {
  constructor(width = DEFAULT_CANVAS_WIDTH, height = DEFAULT_CANVAS_HEIGHT) {
    this._width = width;
    this._height = height;

    this._time = new Date().getTime();
    this._oldTime = this._time;
    this._deltaTime = 0;

    this._canvas = null;
    this._canvasContext = null;

    this._inputManager = null;

    this._assetManager = new AssetManager();
    this._assetManager.observable.register("all-assets-loaded", this);

    this._entitiesManager = new EntitiesManager();
  }

  _initCanvas(width, height) {
    let canvas = document.createElement("canvas");
    canvas.width = this._validateSize(width, "width", DEFAULT_CANVAS_WIDTH);
    canvas.height = this._validateSize(height, "height", DEFAULT_CANVAS_HEIGHT);
    canvas.id = "gameCanvas";
    document.body.appendChild(canvas);

    this._canvas = canvas;
    this._canvasContext = this.canvas.getContext("2d");
  }

  preload() {}

  _loadAssets() {
    this._assetManager.loadAssets().then(value => {
      console.log(this._assetManager.assets);
      this._startGame();})
  }

  _startGame() {
    this._initCanvas(this._width, this._height);
    this._inputManager = new InputManager(this._canvas);

    this.init();
    this._loop();
  }

  init() {}

  update(deltaTime) {}

  render(deltaTime) {}

  _computeDeltaTime () {
    this.time = new Date().getTime();
  	this.deltaTime = (this.time - this.oldTime) * MILLISECONDS_TO_SECONDS;
  	this.oldTime = this.time;
  }

  _loop () {
    this._computeDeltaTime();

    this.update(this.deltaTime);
    this.render(this.deltaTime);

    requestAnimationFrame(this._loop.bind(this));
  }

  onNotify (subject, object) {
    if (subject === "all-assets-loaded") {
      console.log(this._assetManager.assets);
      this._startGame();
    }
  }

  _validateSize(size, name, defaultValue) {
    if (typeof size !== "number") {
      console.log(`canvas ${name} must be a number, assigning default value: ${defaultValue}`);
      size = defaultValue
    }
    else if (size <= 0) {
      console.log(`canvas ${name} must be greater than zero, assigning default value: ${defaultValue}`);
      size = defaultValue
    }

    return size;
  }

  // GETTERS SETTERS
  set canvasWidth(width) {
    this._canvas.width = this._validateSize(width, "width", DEFAULT_CANVAS_WIDTH);
  }

  get canvasWidth() {
    return this._canvas.width;
  }

  set canvasHeight(height) {
    this._canvas.heigth = this._validateSize(height, "height", DEFAULT_CANVAS_HEIGHT);
  }

  get canvasHeight() {
    return this._canvas.height;
  }

  get canvas() {
    return this._canvas;
  }

  get canvasContext() {
    return this._canvasContext;
  }

  get inputManager() {
    return this._inputManager;
  }

  get assetManager() {
    return this._assetManager;
  }

  get entitiesManager() {
    return this._entitiesManager;
  }
}

export const engine = new Engine();
