// Initialize Firebase
var config = {
    apiKey: "AIzaSyBEwnr_R2pjbyqaKWxKuSyQBtm3LbTdgS4",
    authDomain: "trailblazer-project.firebaseapp.com",
    databaseURL: "https://trailblazer-project.firebaseio.com",
    projectId: "trailblazer-project",
    storageBucket: "trailblazer-project.appspot.com",
    messagingSenderId: "615321105967"
};

firebase.initializeApp(config);

// Create a variable to reference the database.
var database = firebase.database();

    // Javascript for Date Picker Form Input 
    $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 1, // Creates a dropdown of 15 years to control year,
        today: 'Today',
        clear: 'Clear',
        close: 'Ok',
        format: 'mm/dd/yyyy',
        closeOnSelect: false // Close upon selecting a date,
      });

// Document Loads Before Code Runs

$(document).ready(function() {
    $('select').material_select(); 

    // Updates Miles in HTML When Range is Clicked
    $('.range-field').on('click', function(event){
        $('#miles-value').text($('#radius-input').val());
    });

  // When Submit Button is Clicked
$(('#submit-button')).on('click', function (event){
    var latitude;
    var longitude;

    // Clear Trail Divs
    $('.row-1').empty();
    $('.row-2').empty();
    $('.row-3').empty();

    // Prevent the page from refreshing
    event.preventDefault();

    // Stores Inputs as Variables
    var city = $("#city-input").val().trim();
    console.log('City: ', city);
    var state = $('#state-input').val();
    console.log('State: ')
    var radius = $("#radius-input").val();
    console.log('Search Radius: ', radius)
   
    // Prevents Submit If Fields Are Empty
    if (city==="" || state==="" || radius ==="") {
        alert('Error! Please Enter All Info.')
    
    // Otherwise
    } else {
        // Grab Latitude and Longitude from API
        var googleURL = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + city + ',+' + state + '&key=AIzaSyBNceJKZRhFdZSITn-8ZwmzDyJ8Co6iZhQ'

        $.ajax({
            url: googleURL,
            method: "GET",
    
            // When AJAX Call is "Done"
            }).done(function(response) {
                console.log(response);
                for (var i=0; i<response.results.length;i++) {
                    console.log(response.results[i].geometry.location);
                    latitude = response.results[i].geometry.location.lat
                    console.log(latitude)
                    longitude = response.results[i].geometry.location.lng
                    console.log(longitude)
                }
            // Save Variables to Firebase Database
            database.ref('/searches').push({
                city: city,
                radius: radius,
                state: state,
                longitude: longitude,
                latitude: latitude,
            })
        displayTrailInfo(latitude, longitude, radius);
        })
    }
});


function displayTrailInfo(latitude, longitude, radius) {

    // Empties Trail Info Container
    $('#trail-info').empty();

    var apiKey = '200209309-2a8d10ade11cd96cedf39716cfa65127';

    // Creates URL with Search Term for Trail API
    var trailURL ='https://www.hikingproject.com/data/get-trails?lat=' + latitude + '&lon=' + longitude + '&sort=distance&maxResults=12&maxDistance=' + radius + '&key=' + apiKey;

    $.ajax({
        url: trailURL,
        method: "GET",
        // When AJAX Call is "Done"
        }).success(function(response) {
            console.log(response);

            for (var i=0; i<4;i++) {
            $('.row-1').append(
                '<div class="col s12 m3"><div class="card trail" data-name="' + response.trails[i].name +'"data-location="' + response.trails[i].location + '"data-latitude="' + response.trails[i].latitude + '"data-longitude="' + response.trails[i].longitude
                + '"data-id="' + response.trails[i].id + '"><div class="card-image"><img class="thumbnail" src="' + response.trails[i].imgSmallMed + '"><span class="card-title">' + response.trails[i].name + '</span></div><div class="card-content"><p>Summary: ' +response.trails[i].summary + '</p><br><p>Location: ' + response.trails[i].location + '</p><br><p>Length: ' + response.trails[i].length + ' Miles</p></div><div class="card-action"><a href="#">More Trail Info</a></div</div></div>'
                )

                $('.trail').data('Name', response.trails[i].name);
                $('.trail').data('Trail Latitude', response.trails[i].latitude);
                $('.trail').data('Trail Longitude', response.trails[i].longitude);
            }
            for (var i=4; i<8;i++) {
                $('.row-2').append(
                    '<div class="col s12 m3"><div class="card trail" data-name="' + response.trails[i].name +'"data-location="' + response.trails[i].location + '"data-latitude="' + response.trails[i].latitude + '"data-longitude="' + response.trails[i].longitude
                    + '"data-id="' + response.trails[i].id + '"><div class="card-image"><img class="thumbnail" src="' + response.trails[i].imgSmallMed + '"><span class="card-title">' + response.trails[i].name + '</span></div><div class="card-content"><p>Summary: ' +response.trails[i].summary + '</p><br><p>Location: ' + response.trails[i].location + '</p><br><p>Length: ' + response.trails[i].length + ' Miles</p></div><div class="card-action"><a href="#">More Trail Info</a></div</div></div>'
                    )

                    $('.trail').data('Name', response.trails[i].name);
                    $('.trail').data('Trail Latitude', response.trails[i].latitude);
                    $('.trail').data('Trail Longitude', response.trails[i].longitude);
                }
                for (var i=8; i<12;i++) {
                    $('.row-3').append(
                        '<div class="col s12 m3"><div class="card trail" data-name="' + response.trails[i].name +'"data-location="' + response.trails[i].location + '"data-latitude="' + response.trails[i].latitude + '"data-longitude="' + response.trails[i].longitude
                        + '"data-id="' + response.trails[i].id + '"><div class="card-image"><img class="thumbnail" src="' + response.trails[i].imgSmallMed + '"><span class="card-title">' + response.trails[i].name + '</span></div><div class="card-content"><p>Summary: ' +response.trails[i].summary + '</p><br><p>Location: ' + response.trails[i].location + '</p><br><p>Length: ' + response.trails[i].length + ' Miles</p></div><div class="card-action"><a href="#">More Trail Info</a></div</div></div>'
                        )

                        $('.trail').data('Name', response.trails[i].name);
                        $('.trail').data('Trail Latitude', response.trails[i].latitude);
                        $('.trail').data('Trail Longitude', response.trails[i].longitude);
                    }

        }).error(function(error){
            console.log('Error', error);
        })
};

$(document).on('click', '.trail', function(event){
    var trailLatitude = $(this).data("latitude");
    console.log('Trail Latitude: ', trailLatitude);
    var trailLongitude = $(this).data('longitude');
    console.log('Trail Longitude: ', trailLongitude);
    var trailName = $(this).data("name");
    console.log('Trail Name: ', trailName)
    var trailLocation = $(this).data('location');
    console.log('Trail Location: ', trailLocation);

    var trailCityState = trailLocation.split(", ");
    console.log(trailCityState);

    var trailCity = trailCityState[0];
    trailCity.replace(' ', '+');
    var trailState = trailCityState[1];

    database.ref('/trails').push({
        trailName: trailName,
        trailLatitude: trailLatitude,
        trailLongitude: trailLongitude,
        trailCity: trailCity,
        trailState: trailState,
    })
});

});
