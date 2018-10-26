/*jshint esversion: 6 */


function Wolf() {
  this.lives = 3;
  this.x = 400;
  this.y = 700;
  this.xVel = 0;
  this.yVel = 0;
  this.img = undefined;
  this.balseVel = 5;

  this.init = function(someSrc) {
    this.img = new Image();
    this.img.src = someSrc;
    console.log('myWolf init');
  };

  this.updateVel = function(someDir) {
    // console.log('myWolf.updateVel');
    if (someDir !== undefined) {
      if (someDir === 'up') {
        this.yVel = -this.balseVel;
        this.xVel = 0;
      } else if (someDir === 'down') {
        this.yVel = this.balseVel;
        this.xVel = 0;
      } else if (someDir === 'left') {
        this.xVel = -this.balseVel;
        this.yVel = 0;
      } else if (someDir === 'right') {
        this.xVel = this.balseVel;
        this.yVel = 0;
      }
    } else {
      console.log('no dir for myWolf.updateVel');
    }
    console.log("xVel: "+this.xVel+"  yVel: "+this.yVel);
  };

  this.draw = function() {
    // CTX.drawImage(img, dx, dy, dWidth, dHeight);
    CTX.drawImage(this.img, this.x-40, this.y-40, 80, 80);
  }; // draw

  this.update = function() {
    if (myGame.lastDirKey !== undefined) {
      this.x += this.xVel;
      this.y += this.yVel;
    }
  }; // update
}
