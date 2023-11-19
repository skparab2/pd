// pd thing


let data1 = {"age":"74","gender":"Male","key":"1677704716922key","race":"White","status":"pd","wporth":"940","wportw":"1449","wr1points":["114s432strues1.1666666666666856","119s432strues1.1666666666666856","175s434strues3.1666666666666856","294s434strues3.1666666666666856","461s433strues2.1666666666666856","696s433strues2.1666666666666856","880s432strues1.1666666666666856","1044s429strues-1.8333333333333144","1300s424strues-6.833333333333314",""],"wr2points":["116s641sfalse","184s530strue","239s360strue","299s343strue","380s522strue","459s688strue","537s591strue","598s400strue","651s330strue","707s389strue","801s663strue","843s705strue","901s576sfalse","991s332sfalse","1046s300strue","1117s463strue","1196s667strue","1259s648strue","1317s459sfalse","1360s348sfalse",""],"wr3points":["792s640strue","798s676strue","765s826strue","571s805strue","539s523strue","861s333strue","1293s517sfalse","1286s656sfalse",""],"expkeys1":["u","u","u","u","u","u","u","u","u","u",""],"expkeys2":["q","y","y","q","y","q","y","y","y","q",""],"expkeys3":["e","y","m","q","c","n","i","h","m","z",""],"false1":"0","false2":"2","false3":"0","realkeys1":["u","u","u","u","u","u","u","u","u","u",""],"realkeys2":["q","y","y","q","y","q","q","y","y","q",""],"realkeys3":["e","y","m","q","c","n","i","h","m","z",""],"timestamps1":["1973","664","487","740","588","498","595","446","404","381",""],"timestamps2":["360","1459","1413","1836","396","591","540","521","625","399",""],"timestamps3":["2672","1565","1892","630","800","1099","368","1420","715","345",""]}

let datap1 = data1.wr3points;

let dparr = [];

let ctr = 0;
while (ctr < datap1.length){
  let tempc = datap1[ctr].split("s");

  dparr.push([parseInt(tempc[0]),parseInt(tempc[1])]);

  ctr += 1;
}

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
  window.location.href = 'https://skparab1.github.io/pd/done.html';
}

const sleep = ms => new Promise(res => setTimeout(res, ms));

const canvas = document.querySelector('.myCanvas');
const ctx = canvas.getContext('2d');
const width = canvas.width = data1.wportw-10; 
const height = canvas.height = data1.wporth-10;

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
    fetch((`https://newmicro-1-b9063375.deta.app/?PDMOUSE&user=${window.location.href.replace('https://skparab1.github.io/pd/mouse.html?','')}&w=${data1.wportw}&h=${data1.wporth}&r1points=${stringize(r1points)}&r2points=${stringize(r2points)}&r3points=${stringize(r3points)}`))
      .then(response => {
        document.getElementById('headertitle').textContent = "Data sent! Launching keyboard tests...";
        window.open('https://skparab1.github.io/pd/keyboard.html?'+window.location.href.replace('https://skparab1.github.io/pd/mouse.html?',''),'_self');
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

let wid = data1.wporth/12;

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
ctx.fillText("Start", 100, data1.wporth/2+wid-10); 
ctx.fillText("Finish", data1.wportw-110, data1.wporth/2+wid-10); 


console.log(dparr);



// lvl 1
(async () => {
  let ep = 0;
  while (false){
    //console.log(mousepos);

    ep += 1;

    if (mousepos[0] > 100 && mousepos[0] < 120 && mousepos[1] > data1.wporth/2-wid && mousepos[1] < data1.wporth/2){
      started = true;
    }

    if (started && mousepos[0] >= maxx){
      maxx = mousepos[0];
    }

    let inside = false;

    let i = 100;
    while (i < data1.wportw-45){
      // 200 is the basis
      // distance from i 
      let d = Math.abs(i-highlighter);
      let diff = 55-d;
      diff = positify(diff);

      if (started && i < maxx){
        // is it in the shape or not

        if (mousepos[1] > data1.wporth/2-wid && mousepos[1] < data1.wporth/2){
          ctx.fillStyle = 'black';
          inside = true;
        } else {
          ctx.fillStyle = 'rgb(50,50,50)';
          inside = false;
        }

      } else {
        ctx.fillStyle = 'rgb('+(200+diff)+','+diff*2+',0)';
      }
      ctx.fillRect(i,data1.wporth/2-wid,2,wid);
      i += 1;
    }


    let deviation = mousepos[1]-(data1.wporth/2-wid/2);

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

    if (highlighter > data1.wportw*1.5){
      highlighter = 0;
    }

    if (maxx >= data1.wportw-55){
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
  ctx.fillText("Start", 100, data1.wporth/2+wid+data1.wporth/5+30); 
  ctx.fillText("Finish", data1.wportw-110, data1.wporth/2+wid+data1.wporth/5+30); 

  // level 2
  while (false){
    //console.log(mousepos);

    if (mousepos[0] > 100 && mousepos[0] < 120 && mousepos[1] > Math.sin(120/60)*data1.wporth/5+data1.wporth/2 && mousepos[1] < Math.sin(100/60)*data1.wporth/5+data1.wporth/2+wid){
      started = true;
    }

    if (started && mousepos[0] >= maxx){
      maxx = mousepos[0];
    }

    let i = 100;
    while (i < data1.wportw-45){
      // 200 is the basis
      // distance from i 
      let d = Math.abs(i-highlighter);
      let diff = 55-d;
      diff = positify(diff);

      if (started && i < maxx){
        // is it in the shape or not

        if (mousepos[1] > Math.sin(mousepos[0]/60)*data1.wporth/5+data1.wporth/2 && mousepos[1] < Math.sin(mousepos[0]/60)*data1.wporth/5+data1.wporth/2+wid){
          ctx.fillStyle = 'black';
          inside = true;
        } else {
          ctx.fillStyle = 'rgb(50,50,50)';
          inside = false;
        }
      } else {
        ctx.fillStyle = 'rgb('+(200+diff)+','+diff*2+',0)';
      }
      ctx.fillRect(i,Math.sin(i/60)*data1.wporth/5+data1.wporth/2,2,wid);
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


    if (highlighter > data1.wportw*1.5){
      highlighter = 0;
    }

    if (maxx >= data1.wportw-55){
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
  ctx.fillText("Start", data1.wportw/2, 2*data1.wporth/3-10); 
  ctx.fillText("Finish", data1.wportw/2+data1.wporth/2, 2*data1.wporth/3+75); 


  // level 3
  while (true){
    //console.log(mousepos);

    ctx.clearRect(0,0,data1.wportw,window,innerHeight);

    // if (mousepos[0] > 100 && mousepos[0] < 120 && mousepos[1] > Math.sin(120/60)*data1.wporth/5+data1.wporth/2 && mousepos[1] < Math.sin(100/60)*data1.wporth/5+data1.wporth/2+wid){
    //   started = true;
    // }

    // if (started && mousepos[0] >= maxx){
    //   maxx = mousepos[0];
    // }

    let minrad = data1.wporth/30;
    let maxrad = data1.wporth/2;

    //ctx.arc(data1.wportw/2, 2*data1.wporth/3, wid/4, 0, Math.PI*2);

    let nearestd = 10000;
    let inside = false;
    let i = 0; // in this case i shud be the spiral degree thing
    while (i < 360){

      let d = Math.abs(i-highlighter);
      let diff = 55-d;
      diff = positify(diff);

      ctx.lineWidth = wid;

      if (data1.wportw/2 < mousepos[0] && data1.wportw/2+wid > mousepos[0] && 2*data1.wporth/3 < mousepos[1] && 2*data1.wporth/3+wid > mousepos[1]){
        started = true;
      }

      let theangle = (180/Math.PI)*Math.atan((mousepos[1]-2*data1.wporth/3)/(mousepos[0]-data1.wportw/2));

      if (theangle > maxx && started){
        //maxx = theangle;
      }

      //ctx.arc(data1.wportw/2, 2*data1.wporth/3, (maxrad-minrad)*(i/360)+minrad, (Math.PI/180)*i,(Math.PI/180)*(i+0.1));
      let thisrad = (maxrad-minrad)*(i/360)+minrad;

      //  is mouse inside
      if (mousepos[0] > thisrad*Math.cos((Math.PI/180)*i)+data1.wportw/2 && mousepos[0] < thisrad*Math.cos((Math.PI/180)*i)+data1.wportw/2+wid && mousepos[1] > thisrad*Math.sin((Math.PI/180)*i)+2*data1.wporth/3 && mousepos[1] < thisrad*Math.sin((Math.PI/180)*i)+2*data1.wporth/3+wid){
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

      ctx.fillRect(thisrad*Math.cos((Math.PI/180)*i)+data1.wportw/2,thisrad*Math.sin((Math.PI/180)*i)+2*data1.wporth/3,wid,wid);
      


      // let thed = Math.sqrt(Math.pow(thisrad*Math.cos((Math.PI/180)*i)+data1.wportw/2,2)+Math.pow(thisrad*Math.sin((Math.PI/180)*i)+2*data1.wporth/3,2));

      // if (thed < nearestd){
      //   nearestd = thed;
      // }

      // is it considerable for maxx big margin
      // if (mousepos[0] > thisrad*Math.cos((Math.PI/180)*i)+data1.wportw/2-wid && mousepos[0] < thisrad*Math.cos((Math.PI/180)*i)+data1.wportw/2+wid*2 && mousepos[1] > thisrad*Math.sin((Math.PI/180)*i)+2*data1.wporth/3-wid && mousepos[1] < thisrad*Math.sin((Math.PI/180)*i)+2*data1.wporth/3+wid*2){
      //   if (i > maxx && started){
      //     maxx = i;
      //   }
      // }

      //ctx.stroke();
      i += 1;
    }


    let re = 0;
    ctx.beginPath();
    ctx.moveTo(dparr[0][0],dparr[0][1]);
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 7;


    while (re < dparr.length){
      ctx.lineTo(dparr[re][0],dparr[re][1]);

      ctx.strokeRect(dparr[re][0]-5,dparr[re][1]-5,10,10);

      ctx.stroke();
      re += 1;
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




