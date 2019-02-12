// I make the object statistics to senate-attendance

var statistics = {

    'numberRepublican': totalPerParty("R"),

    'numberDemocrat': totalPerParty("D"),

    'numberIndependent': totalPerParty("I"),

    'numberTotal': numberTot(),

    'percentRepublican': averageParty("R"),

    'percentDemocrat': averageParty("D"),

    'percentIndependent': averageParty("I"),

    'numberTotalPct': numberTotPct(),

    'bottomAttendance': bottomAttend(),

    'topAttendance': topAttend()


};

//Call the function about to make the table glance
tableGlance();

TableGlancepct();

//Call the function about to make the the table 10pct bottom attendance
bottomAttendance();
//Call the function about to make the table 10pct top attendance
topAttendance();


//Function to calculate the total number of parties

function numberTot() {

    var membersPerParty = data.results[0].members;

    var totalParty = membersPerParty.length;

    return totalParty;


}

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

    var averageRound = average.toFixed() + " %";

    return averageRound;
}

//Function to calculate the total per cert of parties

function numberTotPct() {

    var members = data.results[0].members;

    var arr = [];

    var sum = 0;

    for (var i = 0; i<members.length; i++) {

        arr.push(members[i].votes_with_party_pct);

        sum = sum + arr[i];
    }

    var num = sum / members.length;
    
     var totalRound = num.toFixed() + " %";

    return totalRound;


}

//Functio to calculate bottom names

function bottomAttend() {


    var membersPerParty = data.results[0].members;

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
//Function to calculate top names
function topAttend() {


    var arrTop = [];


    var membersPerParty = data.results[0].members;


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

//Make the first table for senate glance. Firstly for the number of total members of every party
function tableGlance() {

    var tableRep = document.querySelector("#glance").rows;
    var novaFilaRep = document.createElement("td");
    novaFilaRep.innerHTML = statistics.numberRepublican;
    tableRep[0].append(novaFilaRep);

    var tableDem = document.querySelector("#glance").rows;
    var novaFilaDem = document.createElement("td");
    novaFilaDem.innerHTML = statistics.numberDemocrat;
    tableDem[1].append(novaFilaDem);

    var tableIn = document.querySelector("#glance").rows;
    var novaFilaIn = document.createElement("td");
    novaFilaIn.innerHTML = statistics.numberIndependent;
    tableIn[2].append(novaFilaIn);

    var tableTot = document.querySelector("#glance").rows;
    var novaFilaTot = document.createElement("td");
    novaFilaTot.innerHTML = statistics.numberTotal;
    tableIn[3].append(novaFilaTot);

}

//Secondly the % of votes

function TableGlancepct() {
    
    var tableReppct = document.querySelector("#glance").rows;
    var novaFilaReppct = document.createElement("td");
    novaFilaReppct.innerHTML = statistics.percentRepublican;
    tableReppct[0].append(novaFilaReppct);
    
    var tableDempct = document.querySelector("#glance").rows;
    var novaFilaDempct = document.createElement("td");
    novaFilaDempct.innerHTML = statistics.percentDemocrat;
    tableDempct[1].append(novaFilaDempct);
    
    var tableInpct = document.querySelector("#glance").rows;
    var novaFilaInpct = document.createElement("td");
    novaFilaInpct.innerHTML = statistics.percentIndependent;
    tableInpct[2].append(novaFilaInpct);
    
    var tabletotpct = document.querySelector("#glance").rows;
    var novaFilatotpct = document.createElement("td");
    novaFilatotpct.innerHTML = statistics.numberTotalPct;
    tabletotpct[3].append(novaFilatotpct);

    

}

//I make de table about bottom 10% attendance

function bottomAttendance() {

    var tableBottomSenate = document.getElementById("bottom-attendance");
    for (var i = 0; i < statistics.bottomAttendance.length; i++) {
        var novaFila = document.createElement("tr");
        novaFila.insertCell().innerHTML = statistics.bottomAttendance[i].first_name + " " + statistics.bottomAttendance[i].last_name;
        novaFila.insertCell().innerHTML = statistics.bottomAttendance[i].missed_votes;
        novaFila.insertCell().innerHTML = statistics.bottomAttendance[i].missed_votes_pct + " %";

        tableBottomSenate.append(novaFila);
    }

    //I make de table about top 10% attendance
}

function topAttendance() {

    var tableBottomSenate = document.getElementById("top-attendance");
    for (var i = 0; i < statistics.topAttendance.length; i++) {
        var novaFila = document.createElement("tr");
        novaFila.insertCell().innerHTML = statistics.topAttendance[i].first_name + " " + statistics.topAttendance[i].last_name;
        novaFila.insertCell().innerHTML = statistics.topAttendance[i].missed_votes;
        novaFila.insertCell().innerHTML = statistics.topAttendance[i].missed_votes_pct + " %";

        tableBottomSenate.append(novaFila);
    }
}
