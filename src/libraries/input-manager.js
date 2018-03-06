"use strict";

import Observable from "./observable";
import Vector2 from "./vector2";

/*function getMousePosition(evt) {
	let rect = this._canvas.getBoundingClientRect();
	let root = document.documentElement;

	let x = evt.clientX - rect.left - root.scrollLeft;
	let y = evt.clientY - rect.top - root.scrollTop;
	this.mouse.position = new Vector2(x, y);
}

function onMouseDown(evt) {
	if(evt.button == this.mouse.LEFT_BUTTON) {
		console.log("mouse down");
		this.mouse.leftButton = true;
		this.observable.notify("mouse-left-down", this.mouse)
	}
}

function onMouseUp(evt) {
		if(evt.button == this.mouse.LEFT_BUTTON) {
			console.log("mouse up");
			this.mouse.leftButton = false;
		}
}*/

function keyPressed(evt) {
	console.log(`key pressed "${evt.key}"`);
	this._keyBoard.set(evt.key, true);
}

function keyReleased(evt) {
	console.log(`key released "${evt.key}"`);
	this._keyBoard.set(evt.key, false);
}

export default class InputManager {
	constructor(canvas) {
		this._canvas = canvas;
		/*this.mouse = new Mouse();*/
		this._keyBoard = null;
		this.observable = new Observable();

		//this.getMousePosition = getMousePosition.bind(this);
		//this.onMouseDown = onMouseDown.bind(this);
		//this.onMouseUp = onMouseUp.bind(this);
		this.keyPressed = keyPressed.bind(this);
		this.keyReleased = keyReleased.bind(this);

		this._setCallbacks();
		this._initKeyboard();
	}

	_setCallbacks() {
		this._canvas.addEventListener("mousemove", this.getMousePosition);

		document.addEventListener("keydown", this.keyPressed);
		document.addEventListener("keyup", this.keyReleased);
	}

	_initKeyboard() {
		this._keyBoard = new Map();
		this._keyBoard.set("a", false);
		this._keyBoard.set("w", false);
		this._keyBoard.set("s", false);
		this._keyBoard.set("d", false);
		this._keyBoard.set("z", false);
		this._keyBoard.set("ArrowLeft", false);
		this._keyBoard.set("ArrowRight", false);
	}

	get KeyBoard() {
		return this._keyBoard;
	}
}
