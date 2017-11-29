var object;

$('#query').keyup(function() {
    var value = $('#query').val();
    var rExp = new RegExp(value, "i");
    $.getJSON("//autocomplete.wunderground.com/aq?query=" + value + "&cb=?", function(data) {
        console.log(data); // test for JSON received
        object = data;
        // Begin building output
        var output = '<ol>';
        $.each(data.RESULTS, function(key, val) {
            if (val.name.search(rExp) != -1) {
                output += '<li>';
                output += '<a href="https://api.wunderground.com/api/78f98b6b5939b41c/conditions' + val.l + ".json" + '" title="See results for ' + val.name + '">' + val.name + '</a>';
                output += '</li>';
            }
        }); // end each
        output += '</ol>';

        $("#searchResults").html(output);
        // send results to the page
    }); // end getJSON
}); // end onkeyup

$("#searchResults").on("click", "a", function(evt) {
    evt.preventDefault();
    console.log('click occured');
    // With the text value get the needed value from the weather.json file
    var index = $(this).index("a");
    var zmw = object.RESULTS[index-5].zmw;
    getData(zmw);
});

// Get weather data from wunderground.com
function getData(input) {
    // Get the data from the wunderground API
    $.ajax({
        url: "https://api.wunderground.com/api/ffbbf1db03d22000/geolookup/conditions/q/" +
        input + ".json",
        dataType: "jsonp",
        success: function(data) {
            console.log(data);
            var location = data.location.city + ', ' + data.location.state;
            var temp_f = data.current_observation.temp_f;
            console.log('Location is: ' + location);
            console.log('Temp is: ' + temp_f);
            $("#cityDisplay").text(location);
            $("title").html(location + " | Weather Center");
            $("#currentTemp").html(Math.round(temp_f) + '°'); $("#summary").text(toTitleCase(data.current_observation.icon));
            $("#cover").fadeOut(250);
        }
    });
}

// A function for changing a string to TitleCase
function toTitleCase(str) {
    return str.replace(/\w+/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}
