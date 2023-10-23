// pd thing

// for confetti shhhh
function drawdimond(x,y){
  ctx.beginPath();
  ctx.moveTo(x,y-12.5);
  ctx.lineTo(x+12.5,y);
  ctx.lineTo(x,y+12.5);
  ctx.lineTo(x-12.5,y);
  ctx.fill();
}

const sleep = ms => new Promise(res => setTimeout(res, ms));

const canvas = document.querySelector('.myCanvas');
const ctx = canvas.getContext('2d');
const width = canvas.width = window.innerWidth; 
const height = canvas.height = window.innerHeight-100;

var center = [window.innerWidth/2,window.innerHeight/2];
var pressedit = false;
var timestamps = [[],[],[]];
var squareactive = false;
var falseclick = [0,0,0];
var kpressed = [[],[],[]];
var kexpected = [[],[],[]];
var wrongclicks = [0,0,0];
var rightclicks = [0,0,0];

if (localStorage.getItem('pdcompleted') == 'true'){
  window.location.href = 'https://skparab1.github.io/pd/src/done.html';
}

var currentround = 0;

function avg(arr){
  let u = 0;
  let total = 0;
  while (u < arr.length){
    total += arr[u];
    u += 1;
  }
  return total/arr.length;
}

function drawrect(){
  ctx.beginPath();
  ctx.strokeStyle = 'rgb(255,0,0)';
  ctx.lineWidth = 10;

  ctx.strokeRect(center[0]-center[1]/2,center[1]/2,center[1],center[1]);
}

function eraserect(){
  ctx.beginPath();
  ctx.strokeStyle = 'rgb(255,255,255)';
  ctx.lineWidth = 15;

  ctx.strokeRect(center[0]-center[1]/2,center[1]/2,center[1],center[1]);
}


function stringize(e){
  let y = 0;
  let returnstr = "";
  while (y < e.length){
    returnstr += e[y]+'NEXT';
    y += 1;
  }

  return returnstr;
}

function senddata(){
  (async () => {
    //        http://localhost:3000/?PDKEY&user=skp&times=1,2,3,4,5&false=9&realkeys=0,9,8,7,6&expkeys=3,4,5,6&times=1,2,3,4,5&false=9&realkeys=0,9,8,7,6&expkeys=3,4,5,6
    fetch((`https://newmicro-1-b9063375.deta.app/?PDKEY&user=${window.location.href.replace('https://skparab1.github.io/pd/src/keyboard.html?','')}&times1=${stringize(timestamps[0])}&false1=${falseclick[0]}&realkeys1=${stringize(kpressed[0])}&expkeys1=${stringize(kexpected[0])}&times2=${stringize(timestamps[1])}&false2=${falseclick[1]}&realkeys2=${stringize(kpressed[1])}&expkeys2=${stringize(kexpected[1])}&times3=${stringize(timestamps[2])}&false3=${falseclick[2]}&realkeys3=${stringize(kpressed[2])}&expkeys3=${stringize(kexpected[2])}`))
      .then(response => {
        document.getElementById('headertitle').textContent = "All done! Thanks for participating in this test! You can now close this tab.";
        localStorage.setItem('pdcompleted','true');
        return response.json();
      })
      .then(data => {
        console.log(data);
      })
    return 'VALID';
  })();
}

function dispstats(round){
  let y = document.getElementById('statsdisp');
  y.textContent = "Results:";
  y = document.getElementById('statsdisp1');
  y.textContent = "Avg response time: "+avg(timestamps[round])+" ms";
  y = document.getElementById('statsdisp2');
  y.textContent = "False clicks: "+falseclick[round];
  y = document.getElementById('statsdisp3');
  y.textContent = "Correct presses: "+rightclicks[round];
  y = document.getElementById('statsdisp4');
  y.textContent = "Wrong presses: "+wrongclicks[round];
}

function hidestats(){
  let y = document.getElementById('statsdisp');
  y.textContent = "";
  y = document.getElementById('statsdisp1');
  y.textContent = "";
  y = document.getElementById('statsdisp2');
  y.textContent = "";
  y = document.getElementById('statsdisp3');
  y.textContent = "";
  y = document.getElementById('statsdisp4');
  y.textContent = "";
}


// get a random letter
let letters = 'abcdefghijklmnopqrstuvqxyz';

let rand = Math.floor(Math.random()*26);
var subjletter = letters.substring(rand,rand+1);

var pressedkey = '';

var eachround = 10; // number of prompts per round


(async () => {

  // level 1
  document.getElementById('headertitle').textContent = "Level 1: Press "+subjletter+" when the square appears";
  let u = 0;
  let passedtrials = 0;
  while (passedtrials < eachround){
    await sleep(Math.random()*3500+1);
    console.log('drew');
    drawrect();
    squareactive = true;
    let starttime = new Date();
    while (!pressedit){
      await sleep(2);
    }
    passedtrials += 1;
    pressedit = false;
    eraserect();
    let endtime = new Date();
    let elapsedtime = (endtime-starttime);

    if (pressedkey == subjletter){
      rightclicks[0] += 1;
    } else {
      wrongclicks[0] += 1;
    }

    kpressed[0].push(pressedkey);
    kexpected[0].push(subjletter);
    timestamps[0].push(elapsedtime);
    console.log(timestamps);
    u += 1;
  }
  dispstats(0);
  //detadb('person3',avg(timestamps),falseclick);

  document.getElementById('headertitle').textContent = "Press any key to proceed to level 2";

  squareactive = true; // for temp
  while (!pressedit){
    await sleep(2);
  }
  squareactive = false; // go back
  pressedit = false;
  hidestats();

  currentround += 1;

  rand = Math.floor(Math.random()*26);
  var subjletter1 = letters.substring(rand,rand+1);
  rand = Math.floor(Math.random()*26);
  var subjletter2 = letters.substring(rand,rand+1);


  // level 2
  passedtrials = 0;
  while (passedtrials < eachround){
    rand = Math.floor(Math.random()*2);
    if (rand == 0){
      document.getElementById('headertitle').textContent = "Level 2: Press "+subjletter1+" when the square appears";
      subjletter = subjletter1;
    } else {
      document.getElementById('headertitle').textContent = "Level 2: Press "+subjletter2+" when the square appears";
      subjletter = subjletter2;
    }

    await sleep(Math.random()*3500+1);
    drawrect();
    squareactive = true;
    let starttime = new Date();
    while (!pressedit){
      await sleep(2);
    }
    passedtrials += 1;
    pressedit = false;
    eraserect();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let endtime = new Date();
    let elapsedtime = (endtime-starttime);

    if (pressedkey == subjletter){
      rightclicks[1] += 1;
    } else {
      wrongclicks[1] += 1;
    }

    kpressed[1].push(pressedkey);
    kexpected[1].push(subjletter);
    timestamps[1].push(elapsedtime);
    console.log(timestamps);
    u += 1;
  }
  dispstats(1);

  dispstats(0);
  //detadb('person3',avg(timestamps),falseclick);

  document.getElementById('headertitle').textContent = "Press any key to proceed to level 3";

  squareactive = true; // for temp
  while (!pressedit){
    await sleep(2);
  }
  squareactive = false; // go back
  pressedit = false;
  hidestats();

  currentround += 1;

  rand = Math.floor(Math.random()*26);

  // level 3
  passedtrials = 0;
  while (passedtrials < eachround){
    rand = Math.floor(Math.random()*26);
    let subjletter3 = letters.substring(rand,rand+1);
    document.getElementById('headertitle').textContent = "Level 3: Press "+subjletter3+" when the square appears";


    await sleep(Math.random()*3500+1);
    drawrect();
    squareactive = true;
    let starttime = new Date();
    while (!pressedit){
      await sleep(2);
    }
    passedtrials += 1;
    pressedit = false;
    eraserect();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let endtime = new Date();
    let elapsedtime = (endtime-starttime);

    if (pressedkey == subjletter3){
      rightclicks[2] += 1;
    } else {
      wrongclicks[2] += 1;
    }

    kpressed[2].push(pressedkey);
    kexpected[2].push(subjletter3);
    timestamps[2].push(elapsedtime);
    console.log(timestamps);
    u += 1;
  }
  dispstats(2);

  document.getElementById('headertitle').textContent = "Sending data...";
  senddata();
})();




(async () => {
  window.addEventListener("keydown", function(event) {
    if (event.defaultPrevented) {
      return;
    }

    let actkey = event.code.replace('Key','').replace('Digit','')

    if (squareactive){
      pressedit = true;
      squareactive = false;
      pressedkey = actkey.toLowerCase();
    } else {
      // false click
      falseclick[currentround] += 1;
    }
  }, true);
})();
