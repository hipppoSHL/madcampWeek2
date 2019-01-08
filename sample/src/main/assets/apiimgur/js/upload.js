var get_link = "";
var feedback = function(res) {
    if (res.success === true) {
        get_link = res.data.link.replace(/^http:\/\//i, 'https://');
        document.querySelector('.status').classList.add('bg-success');
        document.querySelector('.status').innerHTML =
            'Image : ' + '<br><input class="image-url" value=\"' + get_link + '\"/>';
            $.ajax({
              url: 'http://socrip3.kaist.ac.kr:5180/api/photo/',
              type: "POST",
              data: {"url": get_link},
              success : function(result) {
                console.log(result);
                location.reload();
              }
            })
    }
};

new Imgur({
    clientid: 'e0da0c5df2eabf3', //You can change this ClientID
    callback: feedback
});
