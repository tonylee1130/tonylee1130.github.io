// Current Location Scripts
$(function () {
    $.ajax({
        url : "https://api.wunderground.com/api/78f98b6b5939b41c/geolookup/conditions/q/ID/Franklin.json",
        dataType : "jsonp",
        success : function(data) {
            var location = data['location']['city'];
            var state = data['location']['state'];
            var temp_f = data['current_observation']['temp_f'];
            var weather = data['current_observation']['weather'];
            var windchill = data['current_observation']['windchill_string']
            var feels_like = data['current_observation'][
                'feelslike_f']
            var time = data['current_observation']['local_time_rfc822']
            console.log("Current temperature in " + location + " is: " + temp_f);
            console.log(data);

            let city = document.getElementById("cityDisplay");
            city.innerHTML = location + ", " + state;

            let temp =         document.getElementById("currentTemp");
            temp.innerHTML = temp_f;

            let summary = document.getElementById("summary");
            summary.innerHTML = weather;

            let add1 = document.getElementById("add1");
            add1.innerHTML = "Feels like " + feels_like;

            let add2 = document.getElementById("add2");
            add2.innerHTML = time;

            let add3 = document.getElementById("add3");
            add3.innerHTML = "Wind chill at " + windchill;

            $("#cover").fadeOut(250);
        }
    });



    })();

    // A function for changing a string to TitleCase
    function toTitleCase(str){
        return str.replace(/\w+/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    }
