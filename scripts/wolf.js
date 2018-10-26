/*jshint esversion: 6 */


function Wolf() {
  this.lives = 3;
  this.x = 400;
  this.y = 700;
  this.xVel = 0;
  this.yVel = 0;
  this.img = undefined;
  this.balseVel = 6;
  this.propX = 0;
  this.propY = 0;
  this.propAngle = 0;

  this.init = function(someSrc) {
    this.img = new Image();
    this.img.src = someSrc;
    this.propX = this.x-1.5;
    this.propY = this.y-12;
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
    // draw wolf
    CTX.drawImage(this.img, this.x-40, this.y-40, 80, 80);
    // draw propeller center
    // CTX.save();
    // CTX.translate(this.propX,this.propY);
    // CTX.beginPath();
    // CTX.fillStyle = "lightblue";
    // CTX.rect(0,0,4,4);
    // CTX.fill();
    // CTX.restore();
    // draw propeller
    CTX.save();
    CTX.translate(this.propX+1.5,this.propY+2);
    CTX.rotate(getRadianAngle(this.propAngle));
    CTX.beginPath();
    CTX.strokeStyle = "grey";
    CTX.lineWidth = 4;
    CTX.lineCap = "round";
    CTX.moveTo(-45,0);
    CTX.lineTo(45,0);
    CTX.stroke();
    CTX.restore();
  }; // draw

  this.update = function() {
    if (myGame.lastDirKey !== undefined) {
      this.x += this.xVel;
      this.y += this.yVel;
      this.propX = this.x-1.5;
      this.propY = this.y-12;
    }
    this.propAngle += 38;
    if (this.propAngle === 38000) { // reset when it gets large
      this.propAngle = 0;
    }
  }; // update
}
