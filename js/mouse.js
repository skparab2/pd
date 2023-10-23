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

function stringize(e){
  let y = 0;
  let returnstr = "";
  while (y < e.length){
    returnstr += e[y]+'NEXT';
    y += 1;
  }

  return returnstr;
}

if (localStorage.getItem('pdcompleted') == 'true'){
  window.location.href = 'https://skparab1.github.io/pd/src/done.html';
}

const sleep = ms => new Promise(res => setTimeout(res, ms));

const canvas = document.querySelector('.myCanvas');
const ctx = canvas.getContext('2d');
const width = canvas.width = window.innerWidth-10; 
const height = canvas.height = window.innerHeight-10;

var mousepos = [0,0];

ctx.fillStyle = 'orange';

let username = localStorage.getItem('namepd');
if (username == null || username == ""){
  username = 'userguest'+Math.floor(Math.random()*1000);
}

console.log(username);

function senddata(){
  (async () => {
    //        http://localhost:3000/?PDMOUSE&user=skp&w=2048&h=460&r1points=5,6,7&r2points=0,9,8&r3points=0,9,8
    //                              ?PDMOUSE&skp=parab&this=that
    fetch((`https://newmicro-1-b9063375.deta.app/?PDMOUSE&user=${window.location.href.replace('https://skparab1.github.io/pd/src/mouse.html?','')}&w=${window.innerWidth}&h=${window.innerHeight}&r1points=${stringize(r1points)}&r2points=${stringize(r2points)}&r3points=${stringize(r3points)}`))
      .then(response => {
        document.getElementById('headertitle').textContent = "Data sent! Launching keyboard tests...";
        window.open('https://skparab1.github.io/pd/src/keyboard.html?'+window.location.href.replace('https://skparab1.github.io/pd/src/mouse.html?',''),'_self');
        return response.json();
      })
      .then(data => {
        console.log(data);
      })
    return 'VALID';
  })();
}


function positify(i){
  if (i < 0){
    return 0;
  } else {
    return i;
  }
}

let wid = window.innerHeight/12;

let started = false;

let maxx = 0;

let lastpos = [0,0];
let r1points = [];
let r2points = [];
let r3points = [];

let starttime = new Date();

let highlighter = 0;


ctx.font = "30px Arial";
ctx.fillStyle = 'black';
ctx.fillText("Start", 100, window.innerHeight/2+wid-10); 
ctx.fillText("Finish", window.innerWidth-110, window.innerHeight/2+wid-10); 


// lvl 1
(async () => {
  while (true){
    //console.log(mousepos);

    if (mousepos[0] > 100 && mousepos[0] < 120 && mousepos[1] > window.innerHeight/2-wid && mousepos[1] < window.innerHeight/2){
      started = true;
    }

    if (started && mousepos[0] >= maxx){
      maxx = mousepos[0];
    }

    let inside = false;

    let i = 100;
    while (i < window.innerWidth-45){
      // 200 is the basis
      // distance from i 
      let d = Math.abs(i-highlighter);
      let diff = 55-d;
      diff = positify(diff);

      if (started && i < maxx){
        // is it in the shape or not

        if (mousepos[1] > window.innerHeight/2-wid && mousepos[1] < window.innerHeight/2){
          ctx.fillStyle = 'black';
          inside = true;
        } else {
          ctx.fillStyle = 'rgb(50,50,50)';
          inside = false;
        }

      } else {
        ctx.fillStyle = 'rgb('+(200+diff)+','+diff*2+',0)';
      }
      ctx.fillRect(i,window.innerHeight/2-wid,2,wid);
      i += 1;
    }

    let deviation = mousepos[1]-(window.innerHeight/2-wid/2);

    var endtime = new Date();
    var dtime = endtime - starttime;

    // has it been 500 ms since last measure
    if (dtime > 500 && started){
      // ok its time 
      r1points.push(mousepos[0]+'s'+mousepos[1]+'s'+inside+'s'+deviation);
      console.log(r1points);
      starttime = new Date();
    }

    highlighter += 5;

    if (highlighter > window.innerWidth*1.5){
      highlighter = 0;
    }

    if (maxx >= window.innerWidth-55){
      break;
    }

  await sleep(2);
  }

  document.getElementById('headertitle').textContent = "Done!";
  await sleep(1000);

  document.getElementById('headertitle').textContent = "Mouse Test 2: hover over the object in a rightward direction";

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  started = false;
  maxx = 0;
  highlighter = -100;

  ctx.font = "30px Arial";
  ctx.fillStyle = 'black';
  ctx.fillText("Start", 100, window.innerHeight/2+wid+window.innerHeight/5+30); 
  ctx.fillText("Finish", window.innerWidth-110, window.innerHeight/2+wid+window.innerHeight/5+30); 

  // level 2
  while (true){
    //console.log(mousepos);

    if (mousepos[0] > 100 && mousepos[0] < 120 && mousepos[1] > Math.sin(120/60)*window.innerHeight/5+window.innerHeight/2 && mousepos[1] < Math.sin(100/60)*window.innerHeight/5+window.innerHeight/2+wid){
      started = true;
    }

    if (started && mousepos[0] >= maxx){
      maxx = mousepos[0];
    }

    let i = 100;
    while (i < window.innerWidth-45){
      // 200 is the basis
      // distance from i 
      let d = Math.abs(i-highlighter);
      let diff = 55-d;
      diff = positify(diff);

      if (started && i < maxx){
        // is it in the shape or not

        if (mousepos[1] > Math.sin(mousepos[0]/60)*window.innerHeight/5+window.innerHeight/2 && mousepos[1] < Math.sin(mousepos[0]/60)*window.innerHeight/5+window.innerHeight/2+wid){
          ctx.fillStyle = 'black';
          inside = true;
        } else {
          ctx.fillStyle = 'rgb(50,50,50)';
          inside = false;
        }
      } else {
        ctx.fillStyle = 'rgb('+(200+diff)+','+diff*2+',0)';
      }
      ctx.fillRect(i,Math.sin(i/60)*window.innerHeight/5+window.innerHeight/2,2,wid);
      i += 1;
    }

    var endtime = new Date();
    var dtime = endtime - starttime;

    // has it been 500 ms since last measure
    if (dtime > 500 && started){
      // ok its time 
      r2points.push(mousepos[0]+'s'+mousepos[1]+'s'+inside);
      console.log(r2points);
      starttime = new Date();
    }

    highlighter += 5;


    if (highlighter > window.innerWidth*1.5){
      highlighter = 0;
    }

    if (maxx >= window.innerWidth-55){
      break;
    }

    await sleep(2);
  }

  document.getElementById('headertitle').textContent = "Done!";
  await sleep(1000);

  document.getElementById('headertitle').textContent = "Mouse Test 3: hover over the object in a clockwise direction";

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  started = false;
  maxx = 0;
  highlighter = -100;


  ctx.font = "30px Arial";
  ctx.fillStyle = 'black';
  ctx.fillText("Start", window.innerWidth/2, 2*window.innerHeight/3-10); 
  ctx.fillText("Finish", window.innerWidth/2+window.innerHeight/2, 2*window.innerHeight/3+75); 


  // level 3
  while (true){
    //console.log(mousepos);

    ctx.clearRect(0,0,window.innerWidth,window,innerHeight);

    // if (mousepos[0] > 100 && mousepos[0] < 120 && mousepos[1] > Math.sin(120/60)*window.innerHeight/5+window.innerHeight/2 && mousepos[1] < Math.sin(100/60)*window.innerHeight/5+window.innerHeight/2+wid){
    //   started = true;
    // }

    // if (started && mousepos[0] >= maxx){
    //   maxx = mousepos[0];
    // }

    let minrad = window.innerHeight/30;
    let maxrad = window.innerHeight/2;

    //ctx.arc(window.innerWidth/2, 2*window.innerHeight/3, wid/4, 0, Math.PI*2);

    let nearestd = 10000;
    let inside = false;
    let i = 0; // in this case i shud be the spiral degree thing
    while (i < 360){

      let d = Math.abs(i-highlighter);
      let diff = 55-d;
      diff = positify(diff);

      ctx.lineWidth = wid;

      if (window.innerWidth/2 < mousepos[0] && window.innerWidth/2+wid > mousepos[0] && 2*window.innerHeight/3 < mousepos[1] && 2*window.innerHeight/3+wid > mousepos[1]){
        started = true;
      }

      let theangle = (180/Math.PI)*Math.atan((mousepos[1]-2*window.innerHeight/3)/(mousepos[0]-window.innerWidth/2));

      if (theangle > maxx && started){
        //maxx = theangle;
      }

      //ctx.arc(window.innerWidth/2, 2*window.innerHeight/3, (maxrad-minrad)*(i/360)+minrad, (Math.PI/180)*i,(Math.PI/180)*(i+0.1));
      let thisrad = (maxrad-minrad)*(i/360)+minrad;

      //  is mouse inside
      if (mousepos[0] > thisrad*Math.cos((Math.PI/180)*i)+window.innerWidth/2 && mousepos[0] < thisrad*Math.cos((Math.PI/180)*i)+window.innerWidth/2+wid && mousepos[1] > thisrad*Math.sin((Math.PI/180)*i)+2*window.innerHeight/3 && mousepos[1] < thisrad*Math.sin((Math.PI/180)*i)+2*window.innerHeight/3+wid){
        // yes is inside
        inside = true;
        if (i > maxx && started){
          maxx = i;
        }
      }

      if (maxx > i){
        ctx.fillStyle = 'black';
      } else {
        ctx.fillStyle = 'rgb('+(200+diff)+','+diff*2+',0)';
      }

      ctx.fillRect(thisrad*Math.cos((Math.PI/180)*i)+window.innerWidth/2,thisrad*Math.sin((Math.PI/180)*i)+2*window.innerHeight/3,wid,wid);
      


      // let thed = Math.sqrt(Math.pow(thisrad*Math.cos((Math.PI/180)*i)+window.innerWidth/2,2)+Math.pow(thisrad*Math.sin((Math.PI/180)*i)+2*window.innerHeight/3,2));

      // if (thed < nearestd){
      //   nearestd = thed;
      // }

      // is it considerable for maxx big margin
      // if (mousepos[0] > thisrad*Math.cos((Math.PI/180)*i)+window.innerWidth/2-wid && mousepos[0] < thisrad*Math.cos((Math.PI/180)*i)+window.innerWidth/2+wid*2 && mousepos[1] > thisrad*Math.sin((Math.PI/180)*i)+2*window.innerHeight/3-wid && mousepos[1] < thisrad*Math.sin((Math.PI/180)*i)+2*window.innerHeight/3+wid*2){
      //   if (i > maxx && started){
      //     maxx = i;
      //   }
      // }

      //ctx.stroke();
      i += 1;
    }

    var endtime = new Date();
    var dtime = endtime - starttime;

    // has it been 500 ms since last measure
    if (dtime > 500 && started){
    // ok its time 
      r3points.push(mousepos[0]+'s'+mousepos[1]+'s'+inside);
      console.log(r3points);
      starttime = new Date();
    }

    highlighter += 2;


    if (highlighter > 450){
      highlighter = -100;
    }

    if (maxx >= 357){
      break;
    }

    await sleep(2);
  }

  document.getElementById('headertitle').textContent = "Sending data...";
  senddata();
})();




