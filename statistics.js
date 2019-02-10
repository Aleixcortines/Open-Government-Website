// I make the object statistics to senate-attendance

var statistics = {

    'Number republican': totalPerParty("R"),

    'Number democrat': totalPerParty("D"),

    'Number independent': totalPerParty("I"),

    'Percent republican': averageParty("R"),

    'Percent democrat': averageParty("D"),

    'Percent independent': averageParty("I"),

    'Missed votes pct republican': namesMissVotespct("R"),

    'Missed votes pct democrat': namesMissVotespct("D"),

    'Missed votes pct independent': namesMissVotespct("I"),

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

    return average;
}



function namesMissVotespct(party) {

    var total = totalPerParty(party);

    var ArrTotalMissVotes = [];

    var percentMissed = [];

    var TotalMembersParty = [];

    var membersPerParty = data.results[0].members;

    // I Make an array to put the total number of members per party

    for (var i = 0; i < membersPerParty.length; i++) {

        if (membersPerParty[i].party == party) {

            TotalMembersParty.push(membersPerParty[i]);
        }
    }

    for (var i = 0; i < TotalMembersParty.length; i++) {

        ArrTotalMissVotes.push(TotalMembersParty[i].missed_votes_pct + " " + membersPerParty[i].first_name + " " + (TotalMembersParty[i].middle_name || "") + TotalMembersParty[i].last_name);


    }

    var totalMissVtSort = ArrTotalMissVotes.sort();

    var tenPctMissed = totalMissVtSort.slice(0, 10);

    var string = tenPctMissed.toString();

    var res = string.match(/isNaN/g);




    //    var string2 = string.replace(/,/g," ");
    //    
    //    var arr= string2.split(" ");
    //    
    //    for( var i =0; i<arr.length;i++){
    //        
    //        if (!isNaN(arr[i])){
    //            
    //            delete arr[i];
    //        }
    //    }





    return res;

}


//var numeros="0123456789";
//
//function tiene_numeros(texto){
//   for(i=0; i<texto.length; i++){
//      if (string.indexOf(texto.charAt(i),0)!=-1){
//         return 1;
//      }
//   }
//  
//}


// var names = TotalMembersParty[i].first_name + " " + (TotalMembersParty[i].middle_name || "") + " " + TotalMembersParty[i].last_name;


// var tenpct = membersPerParty.length/10;
//    var totalMissVtSort = ArrTotalMissVotes.sort();
//
//    var tenPctMissed = totalMissVtSort.slice(0, tenpct);
//    var topTenPctMissed = totalMissVtSort.slice(membersPerParty.length - tenpct, membersPerParty.length);
//
//
//    return tenPctMissed;
