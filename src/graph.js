import {drawLine} from "../src/libraries/graphics/primitives-rendering"
import {drawFilledShape} from "../src/libraries/graphics/primitives-rendering"
import Vector2 from "../src/libraries/vector2";

export default class Graph {
  constructor(configuration) {
    this._xAxis = {
      start : configuration.xStart, finish : configuration.xFinish,
      minValue : configuration.xMinValue, maxValue : configuration.xMaxValue,
      divisions : configuration.xDivisions };
    this._yAxis = {
        start : configuration.yStart, finish : configuration.yFinish,
        minValue : configuration.yMinValue, maxValue : configuration.yMaxValue,
        divisions : configuration.yDivisions };
    this._axisColor = configuration.axisColor;
    this._axisWidth = configuration.axisWidth;
  }


  _drawAxis(canvasContext, width, height) {

    drawLine(canvasContext, this._xAxis.start, this._xAxis.finish,
             this._axisColor, this._axisWidth);
    drawLine(canvasContext, this._yAxis.start, this._yAxis.finish,
             this._axisColor, this._axisWidth);

    this._drawDivisions(canvasContext, this._xAxis);
  }

  _drawDivisions(canvasContext, axis, divisions = 10) {
    let numericStep = 1;
    let spatialStep = (axis.finish.x - axis.start.x) / divisions;

    let start = new Vector2(axis.start.x, axis.start.y - 5);
    let finish = new Vector2(axis.start.x, axis.start.y + 5);
    let x = axis.start.x;
    for (let index = axis.minValue; index < axis.maxValue; index += numericStep) {
      drawLine(canvasContext, new Vector2(x, start.y), new Vector2(x, finish.y),
               this._axisColor, this._axisWidth);

      x += spatialStep;
    }
  }

}
