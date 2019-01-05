var nodes = new vis.DataSet([
]);
var edges = new vis.DataSet();

$.getJSON('http://socrip3.kaist.ac.kr:5780/api/contacts/', function(data) {
  $.each(data, function(key, val) {
    var name = val.name;
    nodes.add([
      {label: name}
    ]);
  })
})

var container = document.getElementById('bubbles');
var data = {
  nodes: nodes,
  edges: edges
};

var options = {
  nodes: {borderWidth:0,shape:"circle",color:{background:'#F92C55', highlight:{background:'#F92C55', border: '#F92C55'}},font:{color:'#fff'}},
  physics: {
    stabilization: false,
    minVelocity:  0.01,
    solver: "repulsion",
    repulsion: {
      nodeDistance: 70
    }
  }
};
var network = new vis.Network(container, data, options);


// Events
network.on("click", function(e) {
  if (e.nodes.length) {
    var node = nodes.get(e.nodes[0]);
    // Do something when clicked?
    nodes.update(node);
  }
});