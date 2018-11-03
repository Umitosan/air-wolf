/*jshint esversion: 6 */


function Bullet(nX,nY,nXvel,nYvel) {
  this.x = nX;
  this.y = nY;
  this.xVel = nXvel;
  this.yVel = -nYvel;
  this.len = 10;
  this.timeBorn = undefined;
  this.destroyMe = undefined;

  this.init = function() {
    this.timeBorn = performance.now();
    this.destroyMe = false;
  };

  this.stop = function() {
    this.xVel = 0;
    this.yVel = 0;
  };

  this.checkHitMob = function() {
    for (var m = 0; m < myGame.mobs.length; m++) {
      let mob = myGame.mobs[m];
      if ( (((this.y - this.len) < (mob.y + mob.size)) && ((this.y - this.len) > mob.y)) &&
            ((this.x >= mob.x) && (this.x < (mob.x + mob.size))) ) {
        // this.stop();
        this.destroyMe = true;
        mob.die();
      }
    }
  };

  this.checkBounds = function() {
    if (this.y < 0) {
      this.destroyMe = true;
    }
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
    this.checkBounds();
    this.checkHitMob();
  };

}
