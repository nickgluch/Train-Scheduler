






// SETUP VARIABLES 
//=============================================


// FUNCTIONS
//=============================================
var config = {
    apiKey: "AIzaSyD3s5m-J-eNwSHSwKV-ZNPNKUjwXdatgAw",
    authDomain: "train-scheduler-6b945.firebaseapp.com",
    databaseURL: "https://train-scheduler-6b945.firebaseio.com",
    projectId: "train-scheduler-6b945",
    storageBucket: "",
    messagingSenderId: "991501990202",
    appId: "1:991501990202:web:b258daa62e94f2cb"
};

firebase.initializeApp(config);
//Here's a list of our ID names in the HTML
//"#InputTrain"
//"#InputDestination"
//"#InputFirstTrainTime"
//"#InputTrainFrequency"
//"#submit-form"  - name of the submit button
var database = firebase.database();

var trainName = "";
var desinationName = "";
//convert somehow into time
var firstTrainTime = "";
var trainFrequency = 0;


$("#submit-form").on("click", function (event) {

    event.preventDefault();

    trainName = $("#InputTrain").val().trim();
    desinationName = $("#InputDestination").val().trim();
    firstTrainTime = $("#InputFirstTrainTime").val().trim();
    trainFrequency = $("#InputTrainFrequency").val().trim();

    //$(".table").empty();
    database.ref().push({
        trainName: trainName,
        desinationName: desinationName,
        firstTrainTime: firstTrainTime,
        trainFrequency: trainFrequency
    });

})
database.ref().on("child_added", function (snapshot) {
    var sv = snapshot.val();
    console.log(snapshot);
    console.log(sv.trainName);
    console.log(sv.desinationName);
    console.log(sv.firstTrainTime);
    console.log(sv.trainFrequency);

    console.log(snapshot.key + " - name is " + snapshot.val().name);
    createRow(snapshot.val());


}, function (errorObject) {
    console.log('Errors Handled: ' + errorObject.code);
});



function createRow(data) {
    var firstTrainFormat = "HH:mm";
    var convertedNextArrival = moment(data.trainFrequency, firstTrainFormat);
    console.log("converted: " + convertedNextArrival);

    //var readablestartDate=data.startDate
    var monthsWorked = -convertedDate.diff(moment(), "months");
    console.log(monthsWorked);
    var monthlyRate = data.monthlyRate;
    var totalBilled = monthsWorked * monthlyRate;

    var row = $('<tr>');
    row.append($('<td>').text(data.trainName));
    row.append($('<td>').text(data.desinationName));
    row.append($('<td>').text(data.trainFrequency));
    row.append($('<td>').text(firstTrainTime + trainFrequency));
    //Next arrival (nextArrival, firstTrainTime + trainFrequency)
    row.append($('<td>').text(monthsWorked));
    //minutes away to next arrival (minutesAway)
    row.append($('<td>').text(data.monthlyRate));

    $('#newTrainEntry').append(row);

}



// MAIN PROCESSES (METHODS, (FUNCTION CALLS))
//=============================================




