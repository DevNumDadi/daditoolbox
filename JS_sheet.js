

//fetch('https://spreadsheets.google.com/feeds/cells/1vZHQRGxhb8Bukf3iqK4yTrBLtQf3VVDYdLrWYGDYGCU/1/public/full?alt=json')
fetch('https://spreadsheets.google.com/feeds/cells/1xxIH5neKw5zTKn7dP5I6lbFhfvbVxJ0_3eE6albPeVM/1/public/full?alt=json')

    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        saveData(data);
    })
    .catch(function (err) {
        console.log('error: ' + err);
    });


let dataContainer = [];
let columnHeads = ["Type","Nom","Système d'exploitation","Prix","Description","Lien"]

let nbLines = 13;
//let nbCols = 3;


function saveData(data) {

  let nbLines = data.feed.entry.length / columnHeads.length

    for (var i = 0; i < nbLines; i++) {
        let key = "line" + i
        dataContainer.push([]);
    }

    for (var i = 0; i < data.feed.entry.length; i++) {

        let col = data.feed.entry[i].gs$cell.col
        let row = data.feed.entry[i].gs$cell.row-1
        let value = data.feed.entry[i].content.$t

        dataContainer[row].push(value);
    }
}


function generateTableHead(table, data) {
  let thead = table.createTHead();
  let row = thead.insertRow();
  for (let key of data) {
    let th = document.createElement("th");
    let text = document.createTextNode(key);
    th.appendChild(text);
    row.appendChild(th);
  }
}


function generateTable(table, data) {
    
var sel = document.getElementById('Disciplines');
let sel_discipline = sel.value;
console.log(sel_discipline);  

    for (let element of data) {
    let row = table.insertRow();
            
            if (element[6] == sel_discipline || element[6] == "Toutes"){

                //for (var n = 0; n < catTable.length; n++){

                for (var i = 0; i < (element.length-6); i++) {
                    let cell = row.insertCell();
                    let text = document.createTextNode(element[i]);
                    cell.appendChild(text)
                }
            }
        
        //}
    }
}


function onClick() {

    console.log(catTable);

    let table = document.querySelector("table");
  
    while (table.firstChild) {
        table.removeChild(table.firstChild);
      }

    generateTable(table, dataContainer);
    generateTableHead(table, columnHeads);
}


let catTable = []

function filterCol(n, cat){
    const cb = document.getElementById('Check'+ n);
    if  (cb.checked){
        catTable.push(cat);        
    }
    else {
        catTable.splice(catTable.indexOf(cat), 1);
    }


    onClick();
    }