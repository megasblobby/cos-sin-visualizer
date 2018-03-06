"use strict";

import Vector2 from "../vector2";
import {engine} from "../engine";

function drawLine(canvasContext, pointA, pointB, color = '#000000', width = 1) {
  canvasContext.strokeStyle = color;
  canvasContext.lineWidth = width;
  canvasContext.beginPath();
  canvasContext.moveTo(pointA.x, pointA.y);
  canvasContext.lineTo(pointB.x, pointB.y);
  canvasContext.stroke();
}

function drawFilledShape(canvasContext, points, color = '#000000') {
  canvasContext.fillStyle = color;
  canvasContext.beginPath();
  canvasContext.moveTo(points[0].x, points[0].y);
  for (let point of points) {
    canvasContext.lineTo(point.x, point.y);
  }
  canvasContext.fill();
}

export {drawLine, drawFilledShape};
