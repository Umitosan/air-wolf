/*jshint esversion: 6 */


function SpriteSheet(dx,dy,src,cTotal,rTotal,fDur,fW,fH,dW,dH) {
  this.destX = dx;
  this.destY = dy;
  this.sheetImg = undefined;
  this.sheetSrc = src;
  this.colTotal = cTotal;
  this.rowTotal = rTotal;
  this.curFrameIndex = 0;
  this.curRowIndex = 0;
  this.frameDur = fDur;  // in milliseconds
  this.frameWidth = fW;
  this.frameHeight = fH;
  this.displayWidth = dH;
  this.displayHeight = dW;
  this.curFrameStartTime = 0;
  this.on = false;

  this.init = function() {
    this.sheetImg = new Image();
    this.sheetImg.src = this.sheetSrc;
  };

  this.nextFrame = function() {
    if ((this.curFrameIndex) === this.colTotal-1) {  // if at end of sheet go to beginning
      this.curFrameIndex = 0;
    } else {
      this.curFrameIndex += 1;
    }
  };

  this.start = function() {
    this.curFrameIndex = 0;
    this.on = true;
    this.curFrameStartTime = performance.now();
  };

  this.stop = function() {
    this.on = false;
    this.curFrameStartTime = undefined;
  };

  this.draw = function() {
    // simple draw image:     drawImage(image, x, y)
    // draw slice of image:   drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
    let startX = this.destX;
    let startY = this.destY;
    CTX.save();
    CTX.globalAlpha = 0.4;
    for (let r = 0; r < 16; r++) {
      for (let c = 0; c < 16; c++) {
        CTX.drawImage(  /*image*/   this.sheetImg,
                        /* sx */    (this.frameWidth*this.curFrameIndex), // read sprite shit right to left like this:  (this.spriteWidth*this.frameTotal-this.spriteWidth) - (this.spriteWidth*this.curFrame)
                        /* sy */    this.curRowIndex,
                        /*sWidth*/  this.frameWidth,
                        /*sHeight*/ this.frameHeight,
                        /* dx */    startX+(c*this.displayWidth),
                        /* dy */    startY+(r*this.displayHeight),
                        /*dWidth*/  this.displayWidth,
                        /*dHidth*/  this.displayHeight );
      }
    }
    CTX.restore();
  }; // draw

  this.update = function() {
    let now = performance.now();
    if ((now - this.curFrameStartTime) > this.frameDur) {
      this.nextFrame();
      this.curFrameStartTime = now;
    }
  };

}
