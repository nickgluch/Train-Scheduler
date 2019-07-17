




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
//"#employee-name"
//"#role"
//"#start-date"
//"#monthly-rate"
//"#submit-form"  - name of the submit button
var database = firebase.database();

var name = "";
var role = "";
var startDate = "";
var monthsWorked = 0;
var monthlyRate = 0;
var totalBilled = 0;

$("#submit-form").on("click", function (event) {

    event.preventDefault();
    name = $("#employee-name").val().trim();
    role = $("#role").val().trim();
    startDate = $("#start-date").val().trim();
    monthlyRate = parseFloat($("#monthly-rate").val().trim());
    //totalBilled = $("#total-billed").val().trim();
    //$(".table").empty();
    database.ref().push({
        name: name,
        role: role,
        startDate: startDate,
        monthlyRate: monthlyRate
    });

})
database.ref().on("child_added", function (snapshot) {
    var sv = snapshot.val();
    console.log(snapshot);
    console.log(sv.name);
    console.log(sv.role);
    console.log(sv.startDate);
    console.log(sv.monthlyRate);

    console.log(snapshot.key + " - name is " + snapshot.val().name);
    createRow(snapshot.val());


}, function (errorObject) {
    console.log('Errors Handled: ' + errorObject.code);
});



function createRow(data) {
    var startDataFormat = "YYYY/MM/DD";
    var convertedDate = moment(data.startDate, startDataFormat);
    console.log("start date: " + convertedDate);

    //var readablestartDate=data.startDate
    var monthsWorked = -convertedDate.diff(moment(), "months");
    console.log(monthsWorked);
    var monthlyRate = data.monthlyRate;
    var totalBilled = monthsWorked * monthlyRate;
    var tbl = $('.table');

    var row = $('<tr>');
    row.append($('<td>').text(data.name));
    row.append($('<td>').text(data.role));
    row.append($('<td>').text(data.startDate));
    row.append($('<td>').text(monthsWorked));
    row.append($('<td>').text(data.monthlyRate));
    row.append($('<td>').text(totalBilled));

    tbl.append(row);

}



// MAIN PROCESSES (METHODS, (FUNCTION CALLS))
//=============================================




