
//Here an if-else to charge the correct API (senate or house). If the path is senate charge senate if not charge house API url
if (location.pathname == '/senate-data.html' || location.pathname == '/senate-attendance-statistics.html' || location.pathname == '/senate-party-loyalty-statistics.html')

{
    start('https://api.propublica.org/congress/v1/113/senate/members.json');


} else {

    start('https://api.propublica.org/congress/v1/113/house/members.json');

}
//Fetch function. As as parameter I put the url API
function start(url) {


    fetch(url, {
            // method GET to get information of the server pro publica
            method: 'GET',
            //API Key from propublica
            headers: new Headers({
                'X-API-Key': 'ErRMpHEa29IHVaRlGhaKWRijIvC2dNwrtuq7zUJm'
            })
            //call the json
        }).then(function (response) {
            return response.json();

        })
        //convert the json in data   
        .then(function (json) {

            //members global variable to function of statistic object
            var members = json.results[0].members;

            //members object Vue take the value of json.results[0].members;
            objectVue.members = json.results[0].members;


            //  statistics object

            var statistics = {

                'numberRepublican': totalPerParty(members, "R"),

                'numberDemocrat': totalPerParty(members, "D"),

                'numberIndependent': totalPerParty(members, "I"),

                'numberTotal': numberTot(members),

                'percentRepublican': averageParty(members, "R"),

                'percentDemocrat': averageParty(members, "D"),

                'percentIndependent': averageParty(members, "I"),

                'numberTotalPct': numberTotPct(members),

                'bottomAttendance': bottomAttend(members),

                'topAttendance': topAttend(members),

                'bottomParty': bottomPart(members),

                'topParty': topPart(members),

            };
            //after to declare statistics object, statistics object vue take the value of statistics
            objectVue.statistics = statistics;

            //Here all the calls to functions
            dropDownStates(members);
            filters(members);

        })
}

//here the object vue
var objectVue = new Vue({
    el: "#app",
    //in data we put all the variables, in this case statistics and members (they took the values in fetch)
    data: {
        statistics: [],
        members: [],
        read: "Read More",
    },
    methods: {

        appearRead() {

            if (this.read == "Read More") {

                this.read = "Read Less"
            } else if (this.read == "Read Less") {

                this.read = "Read More"

            }
        }

    }
});




//I crreate a event listener when the user click the 3 butttons or the dropdown selct will call the functions with the name filters

document.getElementById("miBotonRepublica").addEventListener("click", filters);

document.getElementById("miBotonDemocrat").addEventListener("click", filters);

document.getElementById("miBotonInde").addEventListener("click", filters);

document.getElementById('filter-state').addEventListener('change', filters);

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

    var isEmpty=true;
    
    for (var i = 0; i < table.rows.length; i++) {
        //creem variable que captura el valor de la fila que ens interessa. Accedim a cada fila. el fill posició 1 agafaem el seu text.
        var partyCell = table.rows[i].children[1].innerText;
        //el mateix per accedir a dada dels estats
        var stateCell = table.rows[i].children[2].innerText;
        //Creem un condicional per quan usuari trii check box combinat amb dropdown select
        if ((partyArray.includes(partyCell) || partyArray.length == 0) && (valor == stateCell || valor == "")) {
            //mostra files o no amb propietat css display
            table.rows[i].style.display = "table-row";
            isEmpty=false 
            document.getElementById("noresult").style.visibility="hidden";
        } else {
            table.rows[i].style.display = "none";
        }

    }
    
    
}


//Function to calculate the total number of parties

function numberTot(members) {

    var members;

    var totalParty = members.length;

    return totalParty;
}

// Function to calculate the total number of members per party

function totalPerParty(members, party) {


    var members;

    var totalArr = [];

    for (var i = 0; i < members.length; i++) {


        if (members[i].party == party) {

            totalArr.push(members[i]);
        }
    }

    var totalNumberParty = totalArr.length;



    return totalNumberParty;

}

// Function to calculate the average of vote per every party

function averageParty(members, party) {

    var total = totalPerParty(members, party);

    var members;

    var SumTotalVotes = [];

    var TotalMembersParty = [];


    var sum = 0;

    //I Make an array to put the total number members per party

    for (var i = 0; i < members.length; i++) {


        if (members[i].party == party) {

            TotalMembersParty.push(members[i]);
        }
    }

    //I make a loop to put the total votes in a new array 


    for (var i = 0; i < TotalMembersParty.length; i++) {

        SumTotalVotes.push(TotalMembersParty[i].votes_with_party_pct);

        //Sumatory

        sum = sum + SumTotalVotes[i];
    }

    var average = (sum / total || 0);

    var averageRound = average.toFixed();

    return averageRound;
}

//Function to calculate the total per cert of parties

function numberTotPct(members) {

    var members;

    var arr = [];

    var sum = 0;

    for (var i = 0; i < members.length; i++) {

        arr.push(members[i].votes_with_party_pct);

        sum = sum + arr[i];
    }

    var num = sum / members.length;

    var totalRound = num.toFixed();

    return totalRound;


}

//Function to calculate bottom attendance

function bottomAttend(members) {


    var membersPerParty = members;

    // I Make an array to put the total number of members per party

    membersPerParty.sort(function (x, y) {
        return x.missed_votes_pct - y.missed_votes_pct;
    });

    //In case of 10 per cent of 105 members

    var total = Math.round(membersPerParty.length / 10);

    var tenPctMissed = membersPerParty.slice(0, total);

    //Take the last member in case to do the same on the actual 



    for (var i = total; i < membersPerParty.length; i++) {

        if (membersPerParty[i].missed_votes_pct == tenPctMissed[tenPctMissed.length - 1].missed_votes_pct) {

            tenPctMissed.push(membersPerParty[i]);

        }

    }

    return tenPctMissed;
}

//Function to calculate top attendace

function topAttend(members) {


    var arrTop = [];


    var membersPerParty = members;


    // I Make an array to put the total number of members per party

    membersPerParty.sort(function (x, y) {
        return y.missed_votes_pct - x.missed_votes_pct;
    });

    //In case of 10 per cent of total members, does'nt matter if senate or house

    var total = Math.round(membersPerParty.length / 10);

    var tenPctMissed = membersPerParty.slice(0, total);

    //Take the last member in case to do the same on the actual 

    for (var i = total; i < membersPerParty.length; i++) {

        if (membersPerParty[i].missed_votes_pct == tenPctMissed[tenPctMissed.length - 1].missed_votes_pct) {

            tenPctMissed.push(membersPerParty[i]);

        }

    }

    return tenPctMissed;
}

//Function to calculate bottom names in party

function bottomPart(members) {

    var membersPerParty = members;

    // I Make an array to put the total number of members per party

    membersPerParty.sort(function (x, y) {
        return x.votes_with_party_pct - y.votes_with_party_pct;
    });

    //In case of 10 per cent of 105 members

    var total = Math.round(membersPerParty.length / 10);

    var tenPctParty = membersPerParty.slice(0, total);

    //Take the last member in case to do the same on the actual 

    for (var i = total; i < membersPerParty.length; i++) {

        if (membersPerParty[i].votes_with_party_pct == tenPctParty[tenPctParty.length - 1].votes_with_party_pct) {

            tenPctParty.push(membersPerParty[i]);
        }
    }
    return tenPctParty;
}

//function to calculate the top party names

function topPart(members) {

    var arrTop = [];


    var membersPerParty = members;


    // I Make an array to put the total number of members per party

    membersPerParty.sort(function (x, y) {
        return y.votes_with_party_pct - x.votes_with_party_pct;
    });

    //In case of 10 per cent of total members, does'nt matter if senate or house

    var total = Math.round(membersPerParty.length / 10);

    var topParty = membersPerParty.slice(0, total);

    //Take the last member in case to do the same on the actual 

    for (var i = total; i < membersPerParty.length; i++) {

        if (membersPerParty[i].votes_with_party_pct == topParty[topParty.length - 1].votes_with_party_pct) {

            topParty.push(membersPerParty[i]);

        }

    }

    return topParty;

}
