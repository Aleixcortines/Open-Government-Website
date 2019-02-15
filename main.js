//global variable about all members

var members;

//if the html is senate charge the senate json, if not chrage the house json

if (location.pathname == '/senate-data.html' || location.pathname == '/senate-attendance-statistics.html' || location.pathname == '/senate-party-loyalty-statistics.html')

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
            console.log(JSON.stringify(json));
            // members taje the object members
            members = json.results[0].members;
            //object vue
            objectVueTable.members = members;


            dropDownStates(members);
            filters(members);

        }).catch(function (error) {
            console.log("Request failed: " + error.message);

        });

}

// Vue object 

var objectVueTable = new Vue({
    el: "#app",
    data: {
        members: []
    }

});


// Anem a crear select dropdown per estats. Abans ordenem i treiem estat repetits del Array members creant nou array

function dropDownStates(members) {

    var noDupl = [];

    for (var i = 0; i < members.length; i++) {

        if (!noDupl.includes(members[i].state)) {

            noDupl.push(members[i].state);
        }
    }

    var statesUniqs = noDupl.sort();

    //Treiem els elements repetits del array


    console.log(statesUniqs);

    //Creem automaticament les opcions del filtre per estat

    var options = document.getElementById("filter-state");

    for (var i = 0; i < statesUniqs.length; i++) {

        var novaOption = document.createElement("option");

        var estado = statesUniqs[i];

        novaOption.append(estado);

        novaOption.setAttribute("value", estado);

        options.append(novaOption);

    }
}

// Creem un event listener on al fer click a cada dels 3 botons i el dropdown select cridará a la funcio filters


document.getElementById("miBotonRepublica").addEventListener("click", filters);

document.getElementById("miBotonDemocrat").addEventListener("click", filters);

document.getElementById("miBotonInde").addEventListener("click", filters);

document.getElementById('filter-state').addEventListener('change', filters);

//Creem la funcio filter per realitzar tots els tipus de filtre

function filters(members) {


    var table = document.getElementById("app");
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
