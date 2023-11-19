// this file powers the data collector for demographics, and send the data to the database


// store pd status
let pd_status = "";

// if the user has already taken test, redirect to landing page
if (localStorage.getItem('pdcompleted') == 'true'){
  window.location.href = 'https://skparab1.github.io/pd/src/done.html';
}

// do the interactivity for the pd status selector
function storestatus(st){

  // get the two display buttons
  let thepd = document.getElementById('pd');
  let nonpd = document.getElementById('nonpd');

  // if the user has selected pd
  if (st == 'pd'){
    // mute the nonpd button
    nonpd.style.opacity = 0.25;
    nonpd.style.border = '0px solid black';

    // highlight the pd button
    thepd.style.opacity = 1;
    thepd.style.border = '2px solid black';

    // set the status variable
    pd_status = 'pd';

  // if the user has selected nonpd
  } else {
    // mute the pd button
    thepd.style.opacity = 0.25;
    thepd.style.border = '0px solid black';

    // highligth the nonpd button
    nonpd.style.opacity = 1;
    nonpd.style.border = '2px solid black';

    // change the variable
    pd_status = 'nonpd';
  }
}

// assign the user an id based on timestamp
let theid = 0;

// when the user clicks start open verification window and save status
function startverify(){

  // send the data to the database
  senddata();

  // make the background blocker and verification dialogue visible
  let blocker = document.getElementById('blocker');
  let verify = document.getElementById('verify');
  blocker.style.display = 'block';
  blocker.style.opacity = 1;
  verify.style.display = 'block';

  // display demographics on the verification dialogue
  document.getElementById('aged').textContent = "Age: "+document.getElementById('age').value+" years old";
  document.getElementById('gend').textContent = "Gender: "+document.getElementById('gender').value;
  document.getElementById('raced').textContent = "Race: "+document.getElementById('race').value;

  // display pd status on the dialogue
  if (pd_status == 'pd'){
    document.getElementById('pdd').textContent = "PD Status: Has PD";
  } else {
    document.getElementById('pdd').textContent = "PD Status: Does not have PD";
  }
}

// close the verification dialogue if user wants to change anything
function closeverify(){
  let blocker = document.getElementById('blocker');
  let verify = document.getElementById('verify');
  blocker.style.display = 'none';
  blocker.style.opacity = 0;
  verify.style.display = 'none';
}

// send data to the database
async function senddata(){

  // assign the user an id based on timestamp
  let userid = new Date();
  userid = userid.getTime();
  theid = userid;

  // send a request to the collector api
  (async () => {
     fetch((`https://pdcollector-1-y3298216.deta.app/putdemographics&user=${userid}&age=${document.getElementById('age').value}&gender=${document.getElementById('gender').value}&race=${document.getElementById('race').value}&status=${pd_status}`))
      .then(response => {
        console.log("DONE");
        return response.json();
      })
      .then(data => {
        console.log("DATA "+data);
      })
    return 'VALID';
  })();
}

// redirect user to the mouse test after they verify data
function commencetests(){
  // nah just send it directly
  //http://localhost:3000/?PDINFO&user=person4&age=65&gender=male&race=asian&status=nonpd

  document.getElementById('ttrs').textContent = "Launching...";
  
  window.open('https://skparab1.github.io/pd/src/mouse.html?'+theid,'_self');

}