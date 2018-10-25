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

  this.draw = function() {
    // CTX.drawImage(img, dx, dy, dWidth, dHeight);
    CTX.drawImage(this.img, this.x-40, this.y-40, 80, 80);
  };

  this.update = function() {
    if (myGame.curKey !== undefined) {
        if (myGame.curKey === 'up') {
          this.yVel = -this.balseVel;
          this.xVel = 0;
        } else if (myGame.curKey === 'down') {
          this.yVel = this.balseVel;
          this.xVel = 0;
        } else if (myGame.curKey === 'left') {
          this.xVel = -this.balseVel;
          this.yVel = 0;
        } else if (myGame.curKey === 'right') {
          this.xVel = this.balseVel;
          this.yVel = 0;
        }
        this.x += this.xVel;
        this.y += this.yVel;
    } // keydown
    // console.log('myWolf update');
  };
}
