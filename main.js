//I declare the global variable about all members

var members;

//if the html is senate charge the senate json, if not chrage the house json

if (location.pathname == '/senate-data.html')

{
    start('https://api.propublica.org/congress/v1/113/senate/members.json');
} else {

    start('https://api.propublica.org/congress/v1/113/house/members.json');
}

//Fetch API to work async

function start(url) {



    fetch(url, {

            method: 'GET',

            headers: new Headers({
                'X-API-Key': 'ErRMpHEa29IHVaRlGhaKWRijIvC2dNwrtuq7zUJm'
            })

        }).then(function (response) {
            return response.json();

        })
        .then(function (json) {

            // members take the object members
            members = json.results[0].members;
            //object vue members take the value of members variable
            objectVueTable.members = members;

            //Here all the calls to functions
            dropDownStates(members);
            filters(members);


        }).catch(function (error) {
            console.log("Request failed: " + error.message);

        });

}

// Vue object . In data I declarethe variable members that took the value of json.results[0].members in fecth

var objectVueTable = new Vue({
    el: "#app",
    data: {
        members: []
    }

});

//This function create a dropdown for states. After that I  erase the repeat states and then sort the array. Finally I create a new array (statesUniqs)

function dropDownStates(members) {

     
    var noDupl = [];

    for (var i = 0; i < members.length; i++) {

        if (!noDupl.includes(members[i].state)) {

            noDupl.push(members[i].state);
        }
    }
    
    var statesUniqs = noDupl.sort();

    console.log(statesUniqs);

    //I make the every option with a for loop

    var options = document.getElementById("filter-state");

    for (var i = 0; i < statesUniqs.length; i++) {

        var novaOption = document.createElement("option");

        var estado = statesUniqs[i];

        novaOption.append(estado);
        
        //with setAttribute I put an attribute  value = estado 

        novaOption.setAttribute("value", estado);

        options.append(novaOption);

    }
}

//I crreate a event listener when the user click the 3 butttons or the dropdown selct will call the functions with the name filters

document.getElementById("miBotonRepublica").addEventListener("click", filters);

document.getElementById("miBotonDemocrat").addEventListener("click", filters);

document.getElementById("miBotonInde").addEventListener("click", filters);

document.getElementById('filter-state').addEventListener('change', filters);

//Function filters

function filters(members) {


    var table = document.getElementById("allTable");
    //Creem un array buit on enmagatzemarem el valor o valors que ens interessa del checkbox 
    var partyArray = [];

    var valor = document.querySelector("#filter-state").value;
    //Creem tres condicionals dient que si el valor que ens interessa (R,D,I)  esta check el posi dins el array partyArray fent metode push.

    if (document.getElementById('miBotonRepublica').checked) {
        partyArray.push("R");
    }
    if (document.getElementById('miBotonDemocrat').checked) {
        partyArray.push("D");
    }
    if (document.getElementById('miBotonInde').checked) {
        partyArray.push("I");
    }

    //Creem un bucle per recorre tota la taula i accedir als valors que ens interessen 

    for (var i = 0; i < table.rows.length; i++) {
        //creem variable que captura el valor de la fila que ens interessa. Accedim a cada fila. el fill posició 1 agafaem el seu text.
        var partyCell = table.rows[i].children[1].innerText;
        //el mateix per accedir a dada dels estats
        var stateCell = table.rows[i].children[2].innerText;
        //Creem un condicional per quan usuari trii check box combinat amb dropdown select
        if ((partyArray.includes(partyCell) || partyArray.length == 0) && (valor == stateCell || valor == "")) {
            //mostra files o no amb propietat css display
            table.rows[i].style.display = "table-row";
        } else {
            table.rows[i].style.display = "none";
        }

    }
}
