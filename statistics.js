// I make the object statistics to senate-attendance

var statistics = {

    'numberRepublican': totalPerParty("R"),

    'numberDemocrat': totalPerParty("D"),

    'numberIndependent': totalPerParty("I"),

    'percentRepublican': averageParty("R"),

    'percentDemocrat': averageParty("D"),

    'percentIndependent': averageParty("I"),

    'bottomAttendance': bottomAttend(),

    'topAttendance': topAttend(),


};


// Function to calculate the total number of members per party


function totalPerParty(party) {

    var membersPerParty = data.results[0].members;

    var totalArr = [];

    for (var i = 0; i < membersPerParty.length; i++) {


        if (membersPerParty[i].party == party) {

            totalArr.push(membersPerParty[i]);
        }
    }
    var totalNumberParty = totalArr.length;



    return totalNumberParty;
}

// Function to calculate the average of vote per every party

function averageParty(party) {

    var total = totalPerParty(party);

    var membersPerParty = data.results[0].members;

    var SumTotalVotes = [];

    var TotalMembersParty = [];


    var sum = 0;

    //I Make an array to put the total number members per party

    for (var i = 0; i < membersPerParty.length; i++) {


        if (membersPerParty[i].party == party) {

            TotalMembersParty.push(membersPerParty[i]);
        }
    }

    //I make a loop to put the total votes in a new array 


    for (var i = 0; i < TotalMembersParty.length; i++) {

        SumTotalVotes.push(TotalMembersParty[i].votes_with_party_pct);

        //Sumatory

        sum = sum + SumTotalVotes[i];
    }

    var average = sum / total;

    var averageRound = average.toFixed();

    return averageRound;
}


//Functio to calculate the names on 10% missed votes

function bottomAttend() {


    var membersPerParty = data.results[0].members;


    // I Make an array to put the total number of members per party

    var ar = [];

    membersPerParty.sort(function (x, y) {
        return x.missed_votes_pct - y.missed_votes_pct;
    });

    //In case of 10 per cent of 105 members

    //var total = (membersPerParty.length/10);

    var tenPctMissed = membersPerParty.slice(0, 11);

    for (var i = 11; i<membersPerParty.length; i++) {
        
        for( var j=11; i<tenPctMissed.length;j++){
            
            if(membersPerParty[i]==)
            
            
        }

        
            
            ar.push(tenPctMissed);
        }


    }
    
    return ar;

}









function topAttend() {


    var arrTop = [];


    var membersPerParty = data.results[0].members;


    // I Make an array to put the total number of members per party

    membersPerParty.sort(function (x, y) {
        return y.missed_votes_pct - x.missed_votes_pct;
    });

    //In case of 10 per cent of 105 members

    //var total = (10/membersPerParty.length)*100;

    var tenPctMissed = membersPerParty.slice(0, 10);

    for (var i = 0; i < tenPctMissed.length; i++) {

        arrTop.push(tenPctMissed[i]);
    }
    return arrTop;
}


//Make the first table for senate glance. Firstly for the number of total members of every party
var tableSenateGlance = document.getElementById("republican-total");

var novaFila = document.createElement("tr");

novaFila.insertCell().innerHTML = statistics.numberRepublican;

tableSenateGlance.append(novaFila);

var tableSenateGlance = document.getElementById("democrat-total");

var novaFila = document.createElement("tr");

novaFila.insertCell().innerHTML = statistics.numberDemocrat;

tableSenateGlance.append(novaFila);

var tableSenateGlance = document.getElementById("independent-total");

var novaFila = document.createElement("tr");

novaFila.insertCell().innerHTML = statistics.numberIndependent;

tableSenateGlance.append(novaFila);

//Secondly the % of votes

var tableSenateGlance = document.getElementById("republican-average");

var novaFila = document.createElement("tr");

novaFila.insertCell().innerHTML = statistics.percentRepublican;

tableSenateGlance.append(novaFila);

var tableSenateGlance = document.getElementById("democrat-average");

var novaFila = document.createElement("tr");

novaFila.insertCell().innerHTML = statistics.percentDemocrat;

tableSenateGlance.append(novaFila);

var tableSenateGlance = document.getElementById("independent-average");

var novaFila = document.createElement("tr");

novaFila.insertCell().innerHTML = statistics.percentIndependent;

tableSenateGlance.append(novaFila);

//I make de table about bottom 10% attendance

var tableBottomSenate = document.getElementById("bottom-attendance");


for (var i = 0; i < statistics.bottomAttendance.length; i++) {
    var novaFila = document.createElement("tr");
    novaFila.insertCell().innerHTML = statistics.bottomAttendance[i].first_name + " " + statistics.bottomAttendance[i].last_name;
    novaFila.insertCell().innerHTML = statistics.bottomAttendance[i].missed_votes;
    novaFila.insertCell().innerHTML = statistics.bottomAttendance[i].missed_votes_pct;

    tableBottomSenate.append(novaFila);
}

//I make de table about top 10% attendance

//var tableBottomSenate = document.getElementById(" ");
//
//
//for (var i = 0; i < statistics.bottomAttendance.length; i++) {
//    var novaFila = document.createElement("tr");
//    novaFila.insertCell().innerHTML = statistics.bottomAttendance[i].first_name +" "+ statistics.bottomAttendance[i].last_name;
//    novaFila.insertCell().innerHTML = statistics.bottomAttendance[i].missed_votes;
//    novaFila.insertCell().innerHTML = statistics.bottomAttendance[i].missed_votes_pct;
//    
//    tableBottomSenate.append(novaFila);
//}
