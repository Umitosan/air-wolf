/*jshint esversion: 6 */


function clearCanvas() {
  CTX.clearRect(-1, -1, canvas.width+1, canvas.height+1); // offset by 1 px because the whole canvas is offset initially (for better pixel accuracy)
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

function generalLoopReset() {
  if (State.myReq !== undefined) {  // reset game loop if already started
    cancelAnimationFrame(State.myReq);
  }
  softReset();
  myGame = new Game(State.simSpeed); // ms per update()
  myGame.init();
  State.myReq = requestAnimationFrame(gameLoop);
}

function getRadianAngle(degreeValue) {
  return degreeValue * Math.PI / 180;
}

function randSign() {
  let num = getRandomIntInclusive(1,2);
  if (num === 1) {
    return 1;
  } else {
    return -1;
  }
}


function hex(x) {
    return ("0" + parseInt(x).toString(16)).slice(-2);
}
function hexrgb(str) {
  let convertedColorStr = "";
  if (typeof str === 'string') {
    if (str[0] === '#') { // HEX so convert to RGB
      let r = parseInt(str.slice(1,3),16);
      let g = parseInt(str.slice(3,5),16);
      let b = parseInt(str.slice(5,7),16);
      convertedColorStr = 'rgb('+r+','+g+','+b+')';
    } else if (str[0] === 'r') { // RGB so convert to HEX
      let tmpStr;
      if (/^#[0-9A-F]{6}$/i.test(str)) {
        convertedColorStr = str;
      }
      tmpStr = str.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
      convertedColorStr = ("#" + hex(tmpStr[1]) + hex(tmpStr[2]) + hex(tmpStr[3]));
    } else {
      console.log('not a valid color in HEX or RGBA format');
    }
  } else {
    console.log('not valid string');
  }
  return convertedColorStr;
}


function randColor(type) {
  // more muted colors example
      // return ( "#" + Math.round((getRandomIntInclusive(0,99999999) + 0x77000000)).toString(16) );
  // full spectum below
  let getRII = getRandomIntInclusive; // perf
  if (type === 'hex') {
    return ( "#" + Math.round((getRII(0,0xffffff))).toString(16) );
  } else if (type === 'rgba') {
    return ( 'rgba('+ getRII(0,255) +','+ getRII(0,255) +','+ getRII(0,255) +','+1+')' );
  } else {
    console.log("Not valid option for randColor()");
    return undefined;
  }
}

function invertRGBAstr(str) {
  let arr1 = str.slice(5,-1); // arr1 = "173,216,230,0.2"
  let arr2 = arr1.split(','); // arr2 = ["173","216","230","0.2"]
  let r = -1 * arr2[0] + 255;
  let g = -1 * arr2[1] + 255;
  let b = -1 * arr2[2] + 255;
  let a = arr2[3];
  return 'rgba('+r+','+g+','+b+','+a+')';
}
