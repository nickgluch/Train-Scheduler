






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
    //firstTrainTime = moment($("#InputFirstTrainTime").val().trim(), "HH:mm").subtract(10, "years").format("X");
    var firstTimeInput = $("#InputFirstTrainTime").val().trim();
    var firstTimeConverted = moment(firstTimeInput, "HH:mm").subtract(1, "years");

    trainFrequency = $("#InputTrainFrequency").val().trim();

    //$(".table").empty();
    database.ref().push({
        trainName: trainName,
        desinationName: desinationName,
        firstTrainTime: firstTrainTime,
        trainFrequency: trainFrequency
    });


    $("#currentTime").append(moment().format("hh:mm A"));

    trainData.push(newTrain);




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


    // Minute Until Train
    //var firstTimeConverted = moment(firstTrainTime, "HH:mm").subtract(1, "years");
    console.log("firstTimeConverted: " + firstTrainTime);


    // var firstTimeConverted = moment(firstTrainTime, "HH:mm")

    //var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    //var tRemainder = diffTime % trainFrequency;
    //var tMinutesTillTrain = trainFrequency - tRemainder;


    // Next Train
    //var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    //console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);



    // Calculate the minutes until arrival using hardcore math
    // To calculate the minutes till arrival, take the current time in unix subtract the FirstTrain time and find the modulus between the difference and the frequency  
    var tRemainder = moment().diff(moment.unix(data.firstTrainTime), "minutes") % data.trainFrequency;
    var tMinutes = data.trainFrequency - tRemainder;

    // To calculate the arrival time, add the tMinutes to the currrent time
    nextTrain = moment().add(tMinutes, "m").format("hh:mm A");

    //maybe have to push all calculation data to a  data object so it can be accessed and reused on page load




    var row = $('<tr>');

    row.append($('<td>').text(data.trainName));
    row.append($('<td>').text(data.desinationName));
    row.append($('<td>').text(data.trainFrequency));
    row.append($('<td>').text(nextTrain));

    row.append($('<td>').text(tMinutes));


    $('#newTrainEntry').append(row);

}



// MAIN PROCESSES (METHODS, (FUNCTION CALLS))
//=============================================




