/*jshint esversion: 6 */


function Wolf() {
  this.lives = 3;
  this.x = 400;
  this.y = 700;
  this.img = undefined;

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
    console.log('myWolf update');
  };
}
