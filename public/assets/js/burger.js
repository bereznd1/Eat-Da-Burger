//Makes sure that the app waits to attach handlers until the DOM is fully loaded
$(function() {

  //When the Burger Submit button is clicked...
  $("#burger-submit").on("click", function(event) {

    //Creates a new object that stores the value that was typed into the Burger Submit box & that burger's devoured state (false)
    var newBurger = {
      burger_name: $("#burger-box").val().trim(),
      devoured: false
    };

    //Sends a POST request to the server containing the new Burger object
    $.ajax("/api/burgers", {
      type: "POST",
      data: newBurger
    }).then(function() {

      //When the request has gone through, this reloads the page to get the updated list of burgers
      location.reload();
    });
  });

  //When a "Devour It!" button is clicked...
  $(".devour").on("click", function(event) {

    //Obtains the id of that specific button (which is the same as the id of the burger next to it)
    var id = $(this).attr("id");
    
    //Creates an object that stores the new devoured state of the buger after it's been devoured (true, or 1)
    var newDevouredState = {
      devoured: 1
    };

    //Sends a PUT request to the server containing the new Devoured State of the burger
    $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: newDevouredState
    }).then(function() {
      
      //When the request has gone through, this reloads the page to get the updated list of burgers
      location.reload();
    });
  });
});