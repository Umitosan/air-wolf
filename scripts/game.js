/*jshint esversion: 6 */


function Game(updateDur) {
  this.timeGap = 0;
  this.lastUpdate = 0;
  this.updateDuration = updateDur; // milliseconds wait between update()
  this.paused = false;
  this.lastDirKey = undefined;
  this.bg = new Image();
  // this.boxy = undefined;
  this.pausedTxt = undefined;
  this.myWolf = undefined;
  this.mode = 'init'; // init, play

  this.init = function() {
    this.bg.src = 'images/air_wolf_screen.jpg';
    this.myWolf = new Wolf();
    this.myWolf.init('images/wolf1.png');
    // this.boxy = new Box(20,20,myColors.red,20,1);
    this.lastUpdate = performance.now();
  };

  this.pauseIt = function() {
    this.paused = true;
    // this.pausedTxt.show = true;
  };
  this.unpauseIt = function() {
    this.paused = false;
    // this.pausedTxt.show = false;
    // this prevents pac from updating many times after UNpausing
    this.lastUpdate = performance.now();
    this.timeGap = 0;
  };

  this.updateLastDirKey = function(someDir) {
    if (someDir !== this.lastDirKey) {
      this.lastDirKey = someDir;
      this.myWolf.updateVel(someDir);
    } else {
      // ignore input since key is the same
    }
  };

  this.tryClearLastDirKey = function(someDir) {
    if (someDir === this.lastDirKey) {
      this.lastDirKey = undefined;
    } else {
      // lastDirKey is still down so let it continue
    }
  };

  this.drawBG = function() { // display background over canvas
    CTX.imageSmoothingEnabled = false;  // turns off AntiAliasing
    CTX.drawImage(this.bg,0,0,CANVAS.width,CANVAS.height);
  };

  this.draw = function() {  // draw everything!
    // this.boxy.draw();
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
                // this.boxy.update();
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
