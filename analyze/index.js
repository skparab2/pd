// display the data

(async () => {
  let alldata;

  await fetch((`https://pdcollector-1-y3298216.deta.app/fetch`))
  .then(response => {
    return response.json();
  })
  .then(data => {
    alldata = data;
  })

  // now go through and make a row in table for each

  let readable = alldata.items;

  let table = document.getElementById('display');


  let i = 0;
  while (i < readable.length-2){

    // console.log(readable[i].false1, readable[i].wporth);

    let completed = true;
    let completedcolor = "green";

    if (readable[i].false1 == undefined || readable[i].wporth == undefined){
      completed = false;
      completedcolor = "red";
    }

    table.innerHTML += `
    <tr>
      <td><a href='https://pdcollector-1-y3298216.deta.app/get?key=${readable[i].key}' target='_blank'>Get JSON</a></td>
      <td style="background-color: ${completedcolor}">${completed}</td>
      <td>${readable[i].key}</td>
      <td>${readable[i].age}</td>
      <td>${readable[i].gender}</td>
      <td>${readable[i].race}</td>
      <td>${readable[i].status}</td>
    
      <td>${readable[i].expkeys1}</td>
      <td>${readable[i].expkeys2}</td>
      <td>${readable[i].expkeys3}</td>
      <td>${readable[i].realkeys1}</td>
      <td>${readable[i].realkeys2}</td>
      <td>${readable[i].realkeys3}</td>
      <td>${readable[i].false1}</td>
      <td>${readable[i].false2}</td>
      <td>${readable[i].false3}</td>
      <td>${readable[i].timestamps1}</td>
      <td>${readable[i].timestamps2}</td>
      <td>${readable[i].timestamps3}</td>


      <td>${readable[i].wportw}</td>
      <td>${readable[i].wporth}</td>
      <td>${String(readable[i].wr1points).substring(0,30)}...</td>
      <td>${String(readable[i].wr2points).substring(0,30)}...</td>
      <td>${String(readable[i].wr3points).substring(0,30)}...</td>


    </tr>
    `;

    i += 1;
  }

})();
