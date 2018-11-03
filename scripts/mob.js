/*jshint esversion: 6 */

function Mob(nX,nY,nXvel,nYvel) {
  this.x = nX;
  this.y = nY;
  this.size = 24;
  this.xVel = nXvel;
  this.yVel = nYvel;
  this.timeBorn = undefined;
  this.dead = undefined;
  this.timeDeath = undefined;
  this.timeDeathDur = 1000; // ms to show death animation
  this.destroyMe = undefined;

  this.init = function() {
    this.timeBorn = performance.now();
    this.dead = false;
    this.destroyMe = false;
  };

  this.stop = function() {
    this.xVel = 0;
    this.yVel = 0;
  };

  this.die = function() {
    this.stop();
    this.dead = true;
    this.timeDeath = performance.now();
  };

  this.hitWall = function() {
    let hitWallBool = false;
    if ( ((this.x + this.xVel + this.size) >= CANVAS.width) || ((this.x + this.xVel) <= 0) ) {
      // console.log("RIGHT wall hit = ", ((this.x + this.xVel + this.size) >= CANVAS.width));
      // console.log("LEFT wall hit = ", ((this.x + this.xVel - this.size) <= 0));
      hitWallBool = true;
    } else {
      // free to move x direction
    }
    return hitWallBool;
  };

  this.draw = function() {
    if (this.dead === true) {
      CTX.save();
      CTX.translate(this.x+(this.size/2),this.y+(this.size/2));
      CTX.beginPath();
      CTX.lineWidth = 2;
      CTX.strokeStyle = 'red';
      for (let i = 0; i < 10; i++) {
        CTX.rotate(getRadianAngle(35));
        CTX.moveTo(10,0);
        CTX.lineTo(20,0);
      }
      CTX.stroke();
      CTX.restore();
    } else {
      CTX.beginPath();
      CTX.lineWidth = 1;
      CTX.strokeStyle = 'purple';
      CTX.fillStyle = 'purple';
      CTX.rect(this.x,this.y,this.size,this.size);
      CTX.stroke();
      CTX.fill();
    }
  };

  this.update = function() {
    if (this.hitWall()) { this.xVel *= -1; }
    if (this.dead === true) {
      if ((performance.now() - this.timeDeath) > this.timeDeathDur) {
        this.destroyMe = true;
      }
    }
    this.x += this.xVel;
    this.y += this.yVel;
  };

}
