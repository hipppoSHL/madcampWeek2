$(document).ready(function () {
  $(".gallery-img").click(function(){
    var t = $(this).attr("src");
    $(".modal-body").html("<img src='"+t+"' class='modal-img'>");
    $("#myModal").modal();
  });
});
$.getJSON('http://socrip3.kaist.ac.kr:5180/api/photo', function(data){
  $.each(data, function(i,item){
    var new_url = "<img src=\"";
    new_url += item.url;
    new_url += "?downsize=715:*&output-format=auto&output-quality=auto\" alt=\"\" width=\"100%\" height=\"auto\" class=\"gallery-img\" />"
    $(".gallery").append(new_url);
})
})
