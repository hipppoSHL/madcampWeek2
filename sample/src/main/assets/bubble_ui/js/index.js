var colors = new Array;
colors = ['#ffd0d0', '#fdaeae', '#ff8f8f', '#f66c6c', '#fb4e4e'];
var options = {};
var nodes = new vis.DataSet([]);
var edges = new vis.DataSet();
var index = 0;
var num = 0;

$.getJSON('http://socrip3.kaist.ac.kr:5780/api/contacts/', function (data) {
  $.each(data, function (key, val) {
    if (val.frequency >= 20) {index = 4}
    else if (val.frequency >= 15) {index = 3}
    else if (val.frequency >= 10) {index = 2}
    else if (val.frequency >= 5) {index = 1}
    else {index = 0};
    nodes.add([{
      label: val.name,
      value: parseInt(val.frequency),
      color: {
        background: colors[index],
        highlight: {
          background: colors[index],
          border: colors[index],
        }
      },
      num: val.number,
      email: val.email,
      id: val._id
    }]);
    $("#listlist").append("<a style='padding:4%' href='#' class='list-group-item list-group-item-action'><div>" + val.name + "</div><div align='right'><small>" + val.number + "</small><br><small>" + val.email + "</small></div></a>");
    num++;
  })
  $("#people_num").append("총 ", num, "명");
})

var container = document.getElementById('bubbles');
var data = {
  nodes: nodes,
  edges: edges
};

var options = {
  nodes: {
    shape: 'circle',
    scaling: {
      customScalingFunction: function (min, max, total, value) {
        return value / total;
      },
      min: 30,
      max: 150
    },
    borderWidth: 0,
    // color: {
    //   background: colors[(index=Math.floor(Math.random()*4))],
    //   highlight: {
    //     background: colors[index],
    //     border: colors[index]
    //   }
    // },
    font: {
      color: '#FFF'
    }
  },
  physics: {
    stabilization: false,
    minVelocity: 0.01,
    solver: "repulsion",
    repulsion: {
      nodeDistance: 55
    }
  }
};
var network = new vis.Network(container, data, options);

// Events, when clicked, changes frequency value
network.on("click", function (e) {
  if (e.nodes.length) {
    var ids = e.nodes;
    console.log("ids: ", e.nodes);
    console.log("nodes.get(e.nodes[0]): ", nodes.get(e.nodes[0]));
    var node = nodes.get(e.nodes[0]);
    // Do something when clicked?
    nodes.update(node);
    console.log(node.email, node.num);
    // alert(node.label + " " + node.email + " " + node.num + " " + node.id);
    $("#exampleModalCenter2").modal();
    $("#modal_name").html(node.label);
    $("#number_list").html(node.num);
    $("#email_list").html(node.email);

    $.ajax({
      url: "http://socrip3.kaist.ac.kr:5780/api/contacts/" + node.id,
      type: 'PUT',
      dataType: 'application/json',
      data: {
        "frequency": (node.value + 1).toString()
      },
    });
    // location.reload();
  }
});

$("#refresh").click(function () {
  location.reload();
})

$("#phonecall").click(function () {
    var str ="";
    str = $("#number_list").text();
//    alert(str);
    window.Zeany.justDoItCall(str);
})

$("#message").click(function () {
    var str="";
    str = $("#number_list").text();
    window.Zeany.justDoItMessage(str);
})