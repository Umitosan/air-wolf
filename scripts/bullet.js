/*jshint esversion: 6 */


function Bullet(nX,nY,nXvel,nYvel) {
  this.x = nX;
  this.y = nY;
  this.xVel = nXvel;
  this.yVel = -nYvel;
  this.len = 10;
  this.timeBorn = undefined;

  this.init = function() {
    this.timeBorn = performance.now();
  };

  this.draw = function() {
    CTX.beginPath();
    CTX.lineWidth = 3;
    CTX.lineCap = "round";
    CTX.strokeStyle = 'grey';
    CTX.moveTo(this.x,this.y);
    CTX.lineTo(this.x,this.y-this.len);
    CTX.stroke();
    CTX.beginPath();
    CTX.strokeStyle = 'red';
    CTX.moveTo(this.x,this.y-this.len);
    CTX.lineTo(this.x,this.y-this.len-4);
    CTX.stroke();
  };

  this.update = function() {
    this.x += this.xVel;
    this.y += this.yVel;
  };

}
