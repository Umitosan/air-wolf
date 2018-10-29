/*jshint esversion: 6 */


function Game(updateDur) {
  this.timeGap = 0;
  this.lastUpdate = 0;
  this.updateDuration = updateDur; // milliseconds wait between update()
  this.paused = false;
  this.lastDirKeyX = undefined;
  this.lastDirKeyY = undefined;
  this.bgSplash = undefined;
  this.bgAnim = undefined;
  this.pausedTxt = undefined;
  this.myWolf = undefined;
  this.mode = 'init'; // init, play

  this.init = function() {
    this.bgSplash = new Image();
    this.bgSplash.src = 'images/air_wolf_screen.jpg';
    this.myWolf = new Wolf();
    this.myWolf.init('images/wolf1.png');
    this.bgAnim = new SpriteSheet(  /* dx     */  0,
                                    /* dy     */  0,
                                    /* src    */  'images/waves.png',
                                    /* cTotal */  7,
                                    /* rTotal */  1,
                                    /* fDur   */  500,
                                    /* fW     */  32,
                                    /* fH     */  32,
                                    /* dW     */  50,
                                    /* dH     */  50  );
    this.bgAnim.init();
    this.bgAnim.start();
    this.lastUpdate = performance.now();
  };

  this.pauseIt = function() {
    this.paused = true;
  };

  this.unpauseIt = function() {
    this.paused = false;
    // this prevents updating many times after UNpausing
    this.lastUpdate = performance.now();
    this.timeGap = 0;
  };

  this.updateLastDirKeyX = function(someDir) {
    if (someDir !== this.lastDirKeyX) {
      this.lastDirKeyX = someDir;
      this.myWolf.updateVel(someDir);
    } else {
      // ignore input since key is the same
    }
  };

  this.updateLastDirKeyY = function(someDir) {
    if (someDir !== this.lastDirKeyY) {
      this.lastDirKeyY = someDir;
      this.myWolf.updateVel(someDir);
    } else {
      // ignore input since key is the same
    }
  };

  this.tryClearLastDirKeyX = function(someDir) {
    if ((someDir === this.lastDirKeyX) && ((State.keysDown.a === false) && (State.keysDown.d === false) &&
                                           (State.keysDown.left === false) && (State.keysDown.right === false))) {
      this.lastDirKeyX = undefined;
    } else if (someDir === this.lastDirKeyX) {
      if ( (someDir === 'left') && ((State.keysDown.d === true) || (State.keysDown.right === true)) ) {
        this.lastDirKeyX = 'right';
        this.myWolf.updateVel('right');
      } else if ( (someDir === 'right') && ((State.keysDown.a === true) || (State.keysDown.left === true)) ) {
        this.lastDirKeyX = 'left';
        this.myWolf.updateVel('left');
      } else {
        // nothin
      }
    } else if ((State.keysDown.a === false) && (State.keysDown.d === false) &&
               (State.keysDown.left === false) && (State.keysDown.right === false))  {
      this.lastDirKeyX = undefined;
    } else {
      // ignore input since key is the same
    }
  };

  this.tryClearLastDirKeyY = function(someDir) {
    if ((someDir === this.lastDirKeyY) && ((State.keysDown.w === false) && (State.keysDown.s === false) &&
                                           (State.keysDown.up === false) && (State.keysDown.down === false))) {
      this.lastDirKeyY = undefined;
    } else if (someDir === this.lastDirKeyY) {
      if ( (someDir === 'up') && ((State.keysDown.s === true) || (State.keysDown.down === true)) ) {
        this.lastDirKeyY = 'down';
        this.myWolf.updateVel('down');
      } else if ( (someDir === 'down') && ((State.keysDown.w === true) || (State.keysDown.up === true)) ) {
        this.lastDirKeyY = 'up';
        this.myWolf.updateVel('up');
      } else {
        // nothin
      }
    } else if ((State.keysDown.w === false) && (State.keysDown.s === false) &&
               (State.keysDown.up === false) && (State.keysDown.down === false))  {
      this.lastDirKeyY = undefined;
    } else {
      // ignore input since key is the same
    }
  };

  this.drawBG = function() { // display background over canvas
    CTX.imageSmoothingEnabled = false;  // turns off AntiAliasing
    CTX.drawImage(this.bgSplash,0,144,CANVAS.width*1.58*0.65,CANVAS.height*0.65); // 1.58 to keep aspect ratio
  };

  this.draw = function() {  // draw everything!
    if ( this.bgAnim.on === true ) { this.bgAnim.draw(); }
    this.myWolf.draw();
  }; // end draw

  this.update = function() {
      if (this.paused === false) { // performance based update: myGame.update() runs every myGame.updateDuration milliseconds
            this.timeGap = performance.now() - this.lastUpdate;

            if ( this.timeGap >= this.updateDuration ) { // this update is restricted to updateDuration
              let timesToUpdate = this.timeGap / this.updateDuration;
              for (let i=1; i < timesToUpdate; i++) { // update children objects
                // if (timesToUpdate > 2) {
                //   console.log('timesToUpdate = ', timesToUpdate);
                // }
                // general update area
                if ( this.bgAnim.on === true ) { this.bgAnim.update(); }
                this.myWolf.update();
              }
              this.lastUpdate = performance.now();
            } // end if

      } else if (this.paused === true) {
        // PAUSED! do nothin
      } else {
        console.log('game pause issue');
      }

  }; // end update

} // end myGame
