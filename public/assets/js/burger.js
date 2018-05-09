// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
  $("#burger-submit").on("click", function(event) {
    var newBurger = {
      burger_name: $("#burger-box")
        .val()
        .trim(),
      devoured: false
    };

    // Send the POST request.
    $.ajax("/api/burgers", {
      type: "POST",
      data: newBurger
    }).then(function() {
      console.log("created new burger");
      // Reload the page to get the updated list
      location.reload();
    });
  });



  $(".devour").on("click", function(event) {
    
    // $(this).remove();
    
    var id = $(this).attr("id");

    

    // var newDevour = $(this).data("newdevour");
  
    var newDevouredState = {
      devoured: 1
    };

    // Send the DELETE request.
    $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: newDevouredState
    }).then(function() {
      // console.log("changed devoured state to", newDevour);
      // Reload the page to get the updated list
      location.reload();
    });

    


  });




});

// var newSleep = $(this).data("newsleep");

// var newSleepState = {
//   sleepy: newSleep
// };

//   // Send the PUT request.
//   $.ajax("/api/post/" + id, {
//     type: "PUT",
//     data: newSleepState
//   }).then(function() {
//     console.log("changed sleep to", newSleep);
//     // Reload the page to get the updated list
//     location.reload();
//   });
// });

// $(".create-form").on("submit", function(event) {
//   // Make sure to preventDefault on a submit event.
//   event.preventDefault();

//   var newCat = {
//     name: $("#ca").val().trim(),
//     sleepy: $("[name=sleepy]:checked").val().trim()
//   };

//   // Send the POST request.
//   $.ajax("/api/cats", {
//     type: "POST",
//     data: newCat
//   }).then(
//     function() {
//       console.log("created new cat");
//       // Reload the page to get the updated list
//       location.reload();
//     }
//   );
// });
