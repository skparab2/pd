let stat = "";

if (localStorage.getItem('pdcompleted') == 'true'){
  window.location.href = 'https://skparab1.github.io/pd/src/done.html';
}

function storestatus(st){
  let thepd = document.getElementById('pd');
  let nonpd = document.getElementById('nonpd');
  if (st == 'pd'){
    // disable the non pd
    nonpd.style.opacity = 0.25;
    nonpd.style.border = '0px solid black';
    thepd.style.opacity = 1;
    thepd.style.border = '2px solid black';
    stat = 'pd';
  } else {
    // disable the pd
    thepd.style.opacity = 0.25;
    thepd.style.border = '0px solid black';
    nonpd.style.opacity = 1;
    nonpd.style.border = '2px solid black';
    stat = 'nonpd';
  }
}

let theid = 0;

function startverify(){

  senddata();

  let blocker = document.getElementById('blocker');
  let verify = document.getElementById('verify');
  blocker.style.display = 'block';
  blocker.style.opacity = 1;
  verify.style.display = 'block';

  document.getElementById('aged').textContent = "Age: "+document.getElementById('age').value+" years old";
  document.getElementById('gend').textContent = "Gender: "+document.getElementById('gender').value;
  document.getElementById('raced').textContent = "Race: "+document.getElementById('race').value;

  if (stat == 'pd'){
    document.getElementById('pdd').textContent = "PD Status: Has PD";
  } else {
    document.getElementById('pdd').textContent = "PD Status: Does not have PD";
  }
}

function closeverify(){
  let blocker = document.getElementById('blocker');
  let verify = document.getElementById('verify');
  blocker.style.display = 'none';
  blocker.style.opacity = 0;
  verify.style.display = 'none';
}

async function senddata(){
  let userid = new Date();
  userid = userid.getTime();
  theid = userid;
  (async () => {
     //        http://localhost:3000/?PDINFO&user=person4&age=65&gender=male&race=asian&status=nonpd
     fetch((`https://newmicro-1-b9063375.deta.app/?PDINFO&user=${userid}&age=${document.getElementById('age').value}&gender=${document.getElementById('gender').value}&race=${document.getElementById('race').value}&status=${stat}`))
      .then(response => {
        console.log("DONEE");
        return response.json();
      })
      .then(data => {
        console.log("DATA "+data);
      })
    return 'VALID';
  })();
}

function commencetests(){
  // nah just send it directly
  //http://localhost:3000/?PDINFO&user=person4&age=65&gender=male&race=asian&status=nonpd

  document.getElementById('ttrs').textContent = "Launching...";
  
  window.open('https://skparab1.github.io/pd/src/mouse.html?'+theid,'_self');

}