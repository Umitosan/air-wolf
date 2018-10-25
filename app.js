/*jshint esversion: 6 */

var CANVAS,
    canH,
    canW,
    ctx,
    myGame;
var myColors = new Colors();

var defaultSimSpeed = 100;

var State = {
  myReq: undefined,
  loopRunning: false,
  gameStarted: false,
  lastFrameTimeMs: 0, // The last time the loop was run
  maxFPS: 60, // The maximum FPS allowed
  simSpeed: defaultSimSpeed, // speed of simulation loop
  playTime: 0,
  frameCounter: 0,
  lastKey: 'none',
  mouseX: 0,
  mouseY: 0,
  mouseLeftDown: false,
  mouseRightDown: false
};

function softReset() {
  console.log('soft reset!');
  myGame = undefined;
  State = {
    myReq: undefined,
    loopRunning: false,
    gameStarted: false,
    lastFrameTimeMs: 0, // The last time the loop was run
    maxFPS: 60, // The maximum FPS allowed
    simSpeed: defaultSimSpeed, // speed of simulation loop
    playTime: 0,
    frameCounter: 0,
    lastKey: 'none',
    mouseX: 0,
    mouseY: 0,
    mouseLeftDown: false,
    mouseRightDown: false
  };
}

function Colors() {
  this.black = 'rgba(0, 0, 0, 1)';
  this.darkGrey = 'rgba(50, 50, 50, 1)';
  this.lightGreyTrans = 'rgba(50, 50, 50, 0.3)';
  this.greyReset = 'rgb(211,211,211)';
  this.lighterGreyReset = 'rgb(240,240,240)';
  this.lightGreyBox = 'rgba(220, 220, 220, 1)';
  this.white = 'rgba(250, 250, 250, 1)';
  this.red = 'rgba(230, 0, 0, 1)';
  this.cherry = 'rgba(242,47,8,1)';
  this.green = 'rgba(0, 230, 0, 1)';
  this.blue = 'rgba(0, 0, 230, 1)';
  this.electricBlue = 'rgba(20, 30, 230, 1)';
}

function Box(x,y,color,size,vel) {
  this.x = x;
  this.y = y;
  this.color = color;
  this.size =  size;
  this.xVel = vel;
  this.yVel = vel;

  this.draw = function() {
    ctx.beginPath();
    ctx.rect(this.x,this.y,this.size,this.size);
    ctx.fillStyle = this.color;
    ctx.fill();
    // ctx.stroke();
  };

  this.update = function() {
    if ((this.xVel > 0) && ((this.x + this.size + this.xVel) > canW)) {
      this.xVel *= -1;
    }
    if ((this.xVel < 0) && ((this.x + this.xVel) < 0)) {
      this.xVel *= -1;
    }
    if ((this.yVel > 0) && ((this.y + this.size + this.yVel) > canH)) {
      this.yVel *= -1;
    }
    if ((this.yVel < 0) && ((this.y + this.yVel) < 0)) {
      this.yVel *= -1;
    }
    this.x += this.xVel;
    this.y += this.yVel;
  };

} // end box


//////////////////////////////////////////////////////////////////////////////////
// KEYBOARD INPUT
//////////////////////////////////////////////////////////////////////////////////
function keyDown(event) {
    event.preventDefault(); // prevents page from scrolling within window frame
    myGame.lastKey = event.keyCode;
    let code = event.keyCode;
    // console.log('key');
    // console.dir(event);
    // console.log("key code = ", code);
    switch (code) {
        case 37: // Left key
          if (myGame.paused === false) {
            State.lastKey = 'left';
          }
          break;
        case 39: //Right key
          if (myGame.paused === false) {
            State.lastKey = 'right';
          }
          break;
        case 38: // Up key
          if (myGame.paused === false) {
            State.lastKey = 'up';
          }
          break;
        case 40: //Down key
          if (myGame.paused === false) {
            State.lastKey = 'down';
          }
          break;
        case 65: // A key
          if (myGame.paused === false) {
              State.lastKey = 'left';
          }
          break;
        case 68: // D key
          if (myGame.paused === false) {
            State.lastKey = 'right';
          }
          break;
        case 87: // W key
          if (myGame.paused === false) {
            State.lastKey = 'up';
          }
          break;
        case 83: // S key
          if (myGame.paused === false) {
            State.lastKey = 'down';
          }
          break;
        case 32: // spacebar
          State.lastKey = 'spacebar';
          if (State.gameStarted === true) {
            if (myGame.paused === true) {
              myGame.unpauseIt();
            } else if (myGame.paused === false) {
              myGame.pauseIt();
            } else {
              //nothin
            }
            console.log('Game pause state = ', myGame.paused);
          }
          break;
        default: // Everything else
          State.lastKey = code;
          break;
    }
    $("#lastkey-name").text("'"+event.code+"'");
    $("#lastkey-code").text(event.keyCode);
}


//////////////////////////////////////////////////////////////////////////////////
// MOUSE INPUT
//////////////////////////////////////////////////////////////////////////////////
function mDown(evt) {
    if (evt.button === 0) {  // left-click
      // console.log('MOUSE: left down');
      if (State.mouseRightDown === false) { State.mouseLeftDown = true; } // only allow one mouse button down at a time, ignore change if both are down
    } else if (evt.button === 2) { // right-click
      // console.log('MOUSE: right down');
      if (State.mouseLeftDown === false) { State.mouseRightDown = true; }
    }
}

function mUp(evt) {
    if (evt.button === 0) {  // left-click
      // console.log('MOUSE: left up');
      State.mouseLeftDown = false;
    } else if (evt.button === 2) { // right-click
      // console.log('MOUSE: left up');
      State.mouseRightDown = false;
    }
}

//////////////////////////////////////////////////////////////////////////////////
// GAME LOOP
//////////////////////////////////////////////////////////////////////////////////
function gameLoop(timestamp) {
  // timestamp is automatically returnd from requestAnimationFrame
  // timestamp uses performance.now() to compute the time
  State.myReq = requestAnimationFrame(gameLoop);

  if ( (State.loopRunning === true) && (State.gameStarted === true) ) { myGame.update(); }

  clearCanvas();
  if (State.gameStarted === false) {
    myGame.drawBG();
  } else {
    myGame.draw();
  }

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$(document).ready(function() {

  function test() {
    console.log('test works');
  }

  CANVAS =  $('#canvas')[0];
  ctx =  CANVAS.getContext('2d');
  canH = CANVAS.height;
  canW = CANVAS.width;
  CANVAS.addEventListener("keydown",keyDown);
  CANVAS.addEventListener("mousedown", mDown);
  CANVAS.addEventListener("mouseup", mUp);
  $('body').on('contextmenu', '#canvas', function(e){ return false; }); // prevent right click context menu default action
  CANVAS.addEventListener('mousemove', function(evt) {
      let rect = CANVAS.getBoundingClientRect();
      State.mouseX = evt.clientX - rect.left + -0.5;
      State.mouseY = evt.clientY - rect.top;
      $("#coords-x").text(State.mouseX);
      $("#coords-y").text(State.mouseY);
  }, false);

  //INPUT
  var leftMouseDown = false;

  // this is to correct for canvas blurryness on single pixel wide lines etc
  // important when animating to reduce rendering artifacts and other oddities
  // ctx.translate(0.5, 0.5);

  // start things up!
  myGame = new Game(State.simSpeed); // ms per update()
  myGame.init();
  State.myReq = requestAnimationFrame(gameLoop);
  State.loopRunning = true;
  State.gameStarted = false;
  myGame.mode = 'init';

  $('#start-btn').click(function() {
    console.log("start button clicked");
    if (myGame.mode === 'init') {
      myGame.mode = 'play';
      console.log('mode now play');
      State.gameStarted = true;
      $('#mode-current-status')[0].innerText = 'play';
      let v = $('#speed-slider').val();
      $('#speed-input').prop("value", v);
      myGame.updateDuration = (1000/v);
      myGame.lastUpdate = performance.now();
    } else {
      console.log('must reset before starting again');
    }
  });

  $('#reset-btn').click(function() {
    console.log("reset button clicked");
    generalLoopReset();
    State.loopRunning = true;
    State.gameStarted = false;
    myGame.mode = 'init';
    $('#pause-btn')[0].innerText = 'PAUSE';
    $('#mode-current-status')[0].innerText = 'init';
  });

  $('#pause-btn').click(function() {
    console.log("pause button clicked");
    if (myGame.paused === false) {
      myGame.pauseIt();
      $('#pause-btn')[0].innerText = 'UN-PAUSE';
    } else if (myGame.paused === true) {
      myGame.unpauseIt();
      $('#pause-btn')[0].innerText = 'PAUSE';
    }
  });

  //INPUT
  $('#speed-slider').mousedown(function(e1) {
    leftMouseDown = true;
  }).mouseup(function(e2) {
    leftMouseDown = false;
  });
  $('#speed-input').on('change', function(e) {
    let v = this.value;
    $('#speed-slider').prop("value", v);
    if (myGame.mode === 'play') {
      myGame.updateDuration = (1000/v);
    }
  });

  $('#speed-slider').mousemove(function(e) {
    if (leftMouseDown === true) {
      let v = this.value;
      $('#speed-input').prop("value", v);
      if (myGame.mode === 'play') {
        myGame.updateDuration = (1000/v);
      }
    }
  });

});
