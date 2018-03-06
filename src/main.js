import "babel-polyfill";
import {engine} from "../src/libraries/engine";

import Vector2 from "../src/libraries/vector2";
import Graph from "../src/graph";

import {drawLine} from "./libraries/graphics/primitives-rendering"

let graph;
let values;

window.onload = () => {
  engine.preload = preload.bind(engine);
  engine.init = init.bind(engine);
  engine.update = update.bind(engine);
  engine.render = render.bind(engine);
  engine.preload();
}

function preload() {

  this._loadAssets();
}

function init() {
  const AXIS_OFFSET = 5;
  const xAxisStart = new Vector2(AXIS_OFFSET, this.canvasHeight / 2);
  const xAxisEnd = new Vector2(this.canvasWidth - AXIS_OFFSET, this.canvasHeight / 2);
  const yAxisStart = new Vector2(this.canvasWidth / 2, AXIS_OFFSET);
  const yAxisEnd = new Vector2(this.canvasWidth / 2, this.canvasHeight - AXIS_OFFSET);
  const configuration = { xStart : xAxisStart, xFinish: xAxisEnd,
                          xMinValue: -5, xMaxValue: 5, xDivisions: 1,
                          yStart : yAxisStart, yFinish: yAxisEnd,
                          yMinValue: -5, yMaxValue: 5, yDivisions: 1,
                          axisColor: '#000000', axisWidth : 2}
  graph = new Graph(configuration);
  values = generateValues(-100, 100, 1);
}

function update(deltaTime) {
  console.log('update');
}

function render(deltaTime) {
  this._canvasContext.fillStyle = '#FFFFFF';
	this._canvasContext.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

  graph._drawAxis(this.canvasContext, this.canvasHeight, this.canvasWidth);
  
  this.canvasContext.save();

  this._canvasContext.translate(this.canvasWidth / 2, this.canvasHeight / 2);
  
  for (let index = 0; index < values.length - 1; index++) {
    const pointA = values[index];
    const pointB = values[index + 1];
    
    drawLine(this._canvasContext, pointA, pointB, '#FF0000', 2);
  }
  
  this.canvasContext.restore();
  console.log('render');
}

function generateValues(startingValue, endingValue, resolution) {
  let values = [];
  for (let value = startingValue; value <= endingValue; value += resolution) {
    values.push(new Vector2(Math.cos(value), Math.sin(value)));
  }
  return values;
}
/*function drawAxis(engine) {
  let xAxisStart = new Vector2(AXIS_OFFSET, engine.canvasHeight / 2);
  let xAxisEnd = new Vector2(engine.canvasWidth - AXIS_OFFSET,
                             engine.canvasHeight / 2);

  drawLine(engine.canvasContext, xAxisStart, xAxisEnd, AXIS_COLOR,
           AXIS_LINE_WIDTH);
  let verticesLeftArrow = [new Vector2(10, 295), new Vector2(10, 305),
                            new Vector2(0, 300)];
  let verticesRightArrow = [new Vector2(790, 295), new Vector2(790, 305),
                                                      new Vector2(800, 300)];
  drawFilledShape(engine.canvasContext, verticesLeftArrow);
  drawFilledShape(engine.canvasContext, verticesRightArrow);


  let yAxisStart = new Vector2(engine.canvasWidth / 2, AXIS_OFFSET);
  let yAxisEnd = new Vector2(engine.canvasWidth / 2,
                             engine.canvasHeight - AXIS_OFFSET);

  drawLine(engine.canvasContext, yAxisStart, yAxisEnd, AXIS_COLOR,
           AXIS_LINE_WIDTH);
  let verticesUpArrow = [new Vector2(395, 10), new Vector2(405, 10),
                         new Vector2(400, 0)];
  let verticesDownArrow = [new Vector2(395, 590), new Vector2(405, 590),
                         new Vector2(400, 600)];
  drawFilledShape(engine.canvasContext, verticesUpArrow);
  drawFilledShape(engine.canvasContext, verticesDownArrow);
}*/

function drawDivisions() {}
