"use strict"

export default class AnimatedSprite {
  constructor(sprite, numberOfFrames, frameSize, interval) {
    this._sprite = sprite;
    this._numberOfFrames = numberOfFrames;
    this._frameSize = frameSize;
    this._interval = interval;
    this._currentFrame = 0;
    this._counter = 0;
    this._loop = true;

  }

  render(deltaTime, canvasContext, position) {

    this._updateFrame();

    let x = this._currentFrame * this._frameSize.x;
    let y = 0;
    canvasContext.drawImage(this._sprite, x, y, this._frameSize.x, this._frameSize.y,  position.x,  position.y, this._frameSize.x, this._frameSize.y);
  }

  _updateFrame() {
      if (this._counter >= this._interval) {
        this._counter = 0;
        if (this._currentFrame < this._numberOfFrames - 1) {
          this._currentFrame++;
        }
        else {
          if (this._loop) {
            this._currentFrame = 0;
          }
        }
      }
      else {
        this._counter++;
      }
  }
}
