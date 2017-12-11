
// Intercept the menu link clicks
$("#page-nav").on("click", "a", function (evt) {
    evt.preventDefault();
    // With the text value get the needed value from the weather.json file
    var acmeNav = $(this).text(); // Franklin, etc...

    if (acmeNav === "Home") {
        document.getElementById("page-main").style.display = "block";
        document.getElementById("product_content").style.display = "none";
    }

    else {
        document.getElementById("page-main").style.display = "none";
        document.getElementById("product_content").style.display = "block";

    }

    //  document.getElementById("page_content").style.display = "block";

    console.log('Name is ' + acmeNav);
    $.ajax({
        url: "js/acme.json"
        , dataType: "json"
        , success: function (data) {
            console.log(data);
            console.log(data[acmeNav]);

            var name = data[acmeNav].name;

            var picture = data[acmeNav].path;
            var descrip = data[acmeNav].description;
            var manufact = data[acmeNav].manufacturer;
            var review = data[acmeNav].reviews;
            var price = data[acmeNav].price;

            console.log(name);
            console.log(descrip);
            console.log(manufact);
            console.log(review);
            console.log(price);

            document.getElementById("product_name").innerHTML = name;

            document.getElementById("product_picture").innerHTML = '<img src="' + picture + '" alt="pictures">';
            document.getElementById("product_description").innerHTML = descrip;

            document.getElementById("product_manufacturer").innerHTML = "Made by: " + manufact;
            document.getElementById("product_reviews").innerHTML = "Reviews: " + review + "/5 stars";
            document.getElementById("product_price").innerHTML = "price: $" + price;
            //
            //     sum.innerHTML = weather + '<img src="' + icon + '" alt="today weather summary">';
            //
            //
            //      $("#cityDisplay").text(location);
            //      $("title").html(location + " | Weather Center");

        }
    });
});
