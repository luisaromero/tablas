let towers = [];
let tls = [];
let objectForTl = [];
const db = $.ajax({
  url: 'https://frontendgts.us-south.cf.appdomain.cloud/get1',
  type: 'GET',
  async: false,
  dataType: 'json',
}).responseJSON; console.log("db :",db);

//Quien tiene turno hoy
const turnoshoy = $.ajax({
  url: 'https://frontendgts.us-south.cf.appdomain.cloud/turnoshoy',
  type: 'GET',
  async: false,
  dataType: 'json',
}).responseJSON; 
console.log(" largeturnos hoy :" , turnoshoy.length);
console.log("turnos hoy :" , turnoshoy);

 //Obteniendo los turnos
// const turnos = $.ajax({
//   url: 'https://frontendgts.us-south.cf.appdomain.cloud/workShiftEmployee',
//   type: 'GET',
//   async: false,
//   //dataType: 'json',
// }).responseJSON; 
// console.log(" todos los turnos:" , turnos.length);
// console.log("todos los turnos :" , turnos);


//Hacer update de los turnos , en desarrollo...





let btnEventClick = document.getElementById("btn");
btnEventClick.addEventListener("click", (e) => {

  e.preventDefault();
  let user = document.getElementById("user2").value;
  console.log("user :", user);

  getTowers()
    .then(res => {
      let towersArr = res.towers;
      let tlArr = res.tls; console.log(towersArr); console.log(tlArr);

      let Tl = tlArr.find(e => { return e === user });
      console.log("TL : " + Tl);

      let valor =
        db.forEach(element => {
          if (element.T_NOM_TL === Tl) { objectForTl.push(element); }
        });

      createTable(objectForTl);

    })
    .catch(err => { console.log(err) });

});



function checkDate(){
  console.log("HOLI")
  var idate = document.getElementById("date"),
      resultDiv = document.getElementById("datewarn"),
      dateReg = /(0[1-9]|[12][0-9]|3[01])[\/](0[1-9]|1[012])[\/]201[4-9]|20[2-9][0-9]/;

  if(dateReg.test(idate.value)){
      if(isFutureDate(idate.value)){
          resultDiv.innerHTML = "Entered date is a future date";
          resultDiv.style.color = "red";
      } else {
          resultDiv.innerHTML = "It's a valid date";
          resultDiv.style.color = "green";
      }
  } else {
      resultDiv.innerHTML = "Invalid date!";
      resultDiv.style.color = "red";
  }
}

function isFutureDate(idate){
  var today = new Date().getTime(),
      idate = idate.split("/");

  idate = new Date(idate[2], idate[1] - 1, idate[0]).getTime();
  return (today - idate) < 0 ? true : false;
}



//get:
const getTowers = () => {
  return new Promise((resolve, reject) => {
    db.map(element => {
      towers;  // console.log("torres :" + towers);  
      let torre = element.T_TOR_EMPL;
      let n = towers.indexOf(torre);
      if (n === -1) return towers.push(torre);

      tls;  // console.log("tls :" + tls);  
      let tl = element.T_NOM_TL;
      let p = tls.indexOf(tl);
      // si no esta repetido se pushea al array tls
      if (p === -1) {
        console.log(tl)
        tls.push(tl)
        return tls;
      }
    });
    resolve({
      towers, tls
    });
    reject(err);
  });
}



//desarrollo
const createTable = (data) => {
  console.log(data);
  let table = document.querySelector("table");
  table.className = "table";

  let thead = table.createTHead();
  let row = thead.insertRow();
  // ORDER => 
  // NOMBRE - TURNO - CORREO -  DETALLE TURNO - SELECT

  let thName = document.createElement("th"); let thShift = document.createElement("th");
  let thMail = document.createElement("th"); let thPhono = document.createElement("th");
  let thDetailShift = document.createElement("th"); let thCheckbox = document.createElement("th");
  let edit = document.createElement("td"); 

  let textName = document.createTextNode("Nombre"); let textShift = document.createTextNode("Turno");
  let textMail = document.createTextNode("Mail"); let textPhono = document.createTextNode("Telefono");
  let textDetailShift = document.createTextNode("turno in-fin"); let textCheckbox = document.createTextNode("check");
  let editCalendar = document.createTextNode("editar turno");

  thName.appendChild(textName); thShift.appendChild(textShift);
  thMail.appendChild(textMail); thPhono.appendChild(textPhono);
  thDetailShift.appendChild(textDetailShift); thCheckbox.appendChild(textCheckbox);
  edit.appendChild(editCalendar);

  row.appendChild(thName); row.appendChild(thShift); row.appendChild(thMail); row.appendChild(thPhono);
  row.appendChild(thDetailShift); row.appendChild(thCheckbox); row.appendChild(edit);

  data.forEach(e => {
    console.log(e);
    let row = table.insertRow(); // creo el tr para cada dato

    // le creo un td
    let tdName = document.createElement("td"); let tdShift = document.createElement("td");
    let tdMail = document.createElement("td"); let tdPhono = document.createElement("td");
    let tdDetailShift = document.createElement("td"); let tdCheckbox = document.createElement("td");
    let editDateAndTime = document.createElement("td"); 

    // y le paso su contenido
    let name = document.createTextNode(e.T_NOM_EMPL);
    let mail = document.createTextNode(e.T_CORREO_EMPL);
    let phono = document.createTextNode(e.T_TEL_EMPL);

    tdCheckbox.innerHTML = `<input type="checkbox" class ="check"value="false" name="${e.T_CORREO_EMPL}" onClick="modal(id)" id="${e.T_NOM_EMPL}">`;
    editDateAndTime.innerHTML = `<button>Editar turno</button>`;
    
    //turnos hoy en la tabla
    let largeturnosdia = turnoshoy.length;
    console.log("largo", largeturnosdia);


    turnoshoy.forEach(yesShift => {
      console.log(yesShift)
      if (yesShift === e.T_NOMBRE_EMPL) {
        tdShift.innerHTML = `<p class="yes">SI</p>">`;
  
        console.log("sii tiene turnito wiii");
      } else {
        tdShift.innerHTML = `<p class="not">NO</p>`;
        console.log("No tiene turnos buu")
  
      }
    });

    tdName.appendChild(name);
    tdMail.appendChild(mail);
    tdPhono.appendChild(phono);

    // relaciono padre e hijo 
    row.appendChild(tdName); row.appendChild(tdShift); row.appendChild(tdMail); row.appendChild(tdPhono);
    row.appendChild(tdDetailShift); row.appendChild(tdCheckbox); row.appendChild(editDateAndTime);

    /****************************************************************************************************************************************/

    // faltantes poner 2 columna para turno : turno de inicio/turno de fin
  });

  console.log(table);
}


//Funciom que se ejecuta cuando se presiona en check
function modal(id) {

//   console.log(id)
  $('#turnos').modal('show');
  //Eliminar un controlador de eventos adjunto previamente de los elementos.
  $("#submit").unbind();
  $("#submit").click(function(e){

    console.log("dentro de evento click",id)
    let takeDateStart = document.getElementById("finicio").value;
    let takeDateEnd = document.getElementById("ffin").value;
    let takeTimeStart = document.getElementById("hinicio").value;
    let takeTimeEnd = document.getElementById("hfin").value;
    console.log("datos del form", takeDateStart, +" " + takeDateEnd, +" " + takeTimeStart, +" " + takeTimeEnd);
 
    let info_form = {
      "T_NOM_EMPL": id,
      "T_INICIO": takeDateStart,
      "T_FIN": takeDateEnd,
      "H_INICIO": takeTimeStart,
      "H_FIN": takeTimeEnd
    }
    console.log(takeDateStart, takeDateEnd, takeTimeStart, takeTimeEnd , id)

    $.ajax({
      type: "POST",
      url: 'https://frontendgts.us-south.cf.appdomain.cloud/saveShift',
      data: info_form,
     // dataType: dataType,
      success: function (response) {
        alert(response);
      }

    });

    console.log(takeDateStart, takeDateEnd, takeTimeStart, takeTimeEnd)
  });
};


var d = new Date();
document.write(d.getDate() + "/" + (d.getMonth() +1) + "/" + d.getFullYear());




