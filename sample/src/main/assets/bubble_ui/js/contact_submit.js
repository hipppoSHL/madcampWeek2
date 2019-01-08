$(document).ready(function() {
   // click on button submit
   $("#submit").on('click', function() {
    // send ajax
    $.ajax({
      url: 'http://socrip3.kaist.ac.kr:5780/api/contacts/',
      type: "POST",
      data: $("#inputForm").serialize(),
      success : function(result) {
        console.log(result);
        location.reload();
      }
    })
  });
});