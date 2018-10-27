var config = {
  apiKey: "AIzaSyBxydwxzGgy28Divmi2ik1i6CPO--UCiME",
  authDomain: "fir-01-a7616.firebaseapp.com",
  databaseURL: "https://fir-01-a7616.firebaseio.com",
  projectId: "fir-01-a7616",
  storageBucket: "fir-01-a7616.appspot.com",
  messagingSenderId: "729272718789"
};
firebase.initializeApp(config);

var database = firebase.database();


//button id jquery
$("#add-employee-btn").on("click", function(){
  console.log("click");
  var trainName = $("#train").val().trim();
  var destination = $("#destination").val().trim();
  var startTrain = $("#arrival").val().trim();
  var frequency = $("#freq").val().trim();


  console.log(startTrain);




  database.ref().push({
    name: trainName,
    route: destination,
    freqTime: frequency,
    firstTrain: startTrain
  });


  $("#train").val("");
  $("#destination").val("");
  $("#frequency").val("");
  $("#arrival").val("");
});

database.ref().on("child_added",function(snapshot){
  


  var trainLine = snapshot.val().name;
  var trainRoute = snapshot.val().route;
  var trainFreq = snapshot.val().freqTime;
  var trainArrival = snapshot.val().firstTrain;



  var firstTrainPretty = moment(trainArrival, "hh:mm").subtract(1, "years");
  var currentTime = moment();
  var diffTime = moment().diff(moment(firstTrainPretty), "minutes");
  var remainder = diffTime % trainFreq;
  var minutesTillTrain = trainFreq - remainder;
  var nextTrain = moment().add(minutesTillTrain, "minutes");
  



  var newRow = $("<tr>").append(
    $("<td>").text(trainLine),
    $("<td>").text(trainRoute),
    $("<td>").text(trainFreq),
    $("<td>").text(trainArrival),
    $("<td>").text(minutesTillTrain),
    

  );


  $("#train-table > tbody").append(newRow);
});






