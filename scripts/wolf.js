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
  this.bulletList = undefined;
  this.bulletSpacingTime = 200;
  this.bulletBarrel = 0;

  this.init = function(someSrc) {
    this.img = new Image();
    this.img.src = someSrc;
    this.propX = this.x-1.5;
    this.propY = this.y-12;
    this.bulletList = [];
    console.log('myWolf init');
  };

  this.updateVel = function(someDir) {
    // console.log('myWolf.updateVel dir = ', someDir);
    if (someDir !== undefined) {
      if (someDir === 'up') {
        this.yVel = -this.balseVel;
      } else if (someDir === 'down') {
        this.yVel = this.balseVel;
      } else if (someDir === 'left') {
        this.xVel = -this.balseVel;
      } else if (someDir === 'right') {
        this.xVel = this.balseVel;
      } else {
        console.log('not up down right or left');
      }
    } else {
      console.log('no dir for myWolf.updateVel');
    }
  };

  this.changeBarrel = function() {
    if (this.bulletBarrel === 0) {
      this.bulletBarrel = 1;
    } else {
      this.bulletBarrel = 0;
    }
  };

  this.shoot = function() {
    // check if another bullet can shoot yet based on time from last bullet created
    let len = this.bulletList.length;
    let newX;
    if (this.bulletBarrel === 0) {
      newX = (this.x+11);
    } else {
      newX = (this.x-11);
    }
    if (len === 0) { // if no bullets simple just make one

      let newBullet = new Bullet(newX,this.y-15,0,10); // Bullet(nX,nY,nXvel,nYvel)
      newBullet.init();
      this.bulletList.push(newBullet);
      this.changeBarrel();
    }  else if ((performance.now() - this.bulletList[len-1].timeBorn) > this.bulletSpacingTime) {
      let newBullet = new Bullet(newX,this.y-15,0,10);
      newBullet.init();
      this.bulletList.push(newBullet);
      this.changeBarrel();
    } else {
      // nothin
    }
  };

  this.draw = function() {
    // CTX.drawImage(img, dx, dy, dWidth, dHeight);
    // draw wolf
    CTX.drawImage(this.img, this.x-40, this.y-40, 80, 80);
    // draw propeller
    CTX.save();
    CTX.translate(this.propX+1.5,this.propY+2);
    CTX.rotate(getRadianAngle(this.propAngle));
    CTX.beginPath();
    CTX.strokeStyle = "grey";
    CTX.lineWidth = 2;
    CTX.lineCap = "round";
    CTX.moveTo(-45,2);
    CTX.lineTo(-45,0);
    CTX.lineTo(40,0);
    CTX.lineTo(40,-2);
    CTX.lineTo(-45,2);
    CTX.stroke();
    CTX.rotate(getRadianAngle(90));
    CTX.beginPath();
    CTX.moveTo(-45,2);
    CTX.lineTo(-45,0);
    CTX.lineTo(40,0);
    CTX.lineTo(40,-2);
    CTX.lineTo(-45,2);
    CTX.stroke();
    CTX.restore();
    // draw propeller center
    CTX.save();
    CTX.translate(this.propX,this.propY);
    CTX.beginPath();
    CTX.fillStyle = "black";
    CTX.rect(0,0,4,4);
    CTX.fill();
    CTX.restore();
    // bulletList
    if (this.bulletList.length > 0) {
      for (let i = 0; i < this.bulletList.length; i++) {
        this.bulletList[i].draw();
      }
    }
  };

  this.update = function() {
    if (myGame.lastDirKeyX !== undefined) {
      this.x += this.xVel;
      this.propX = this.x-1.5;
    }
    if (myGame.lastDirKeyY !== undefined) {
      this.y += this.yVel;
      this.propY = this.y-12;
    }
    this.propAngle += 25; // rotate the prop
    if (this.propAngle === 25000) { this.propAngle = 0; } // reset when it gets large just cuz
    if (this.bulletList.length > 0) {
      for (let i = 0; i < this.bulletList.length; i++) {
        if (this.bulletList[i].y < 0) {
          this.bulletList.splice(i,1);
        } else {
          this.bulletList[i].update();
        }
      } // for
    } // if
  };
}
