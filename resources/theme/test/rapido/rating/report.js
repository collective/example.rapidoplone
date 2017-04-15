require(['mockup-utils', '//d3js.org/d3.v3.min.js'], function(utils, d3) {
    var authenticator = utils.getAuthenticator();
    var local_folder_path = location.pathname.split('/@@rapido')[0];
    var width = 960,
        height = 500,
        radius = Math.min(width, height) / 2;
    
    var arc = d3.svg.arc()
        .outerRadius(radius - 10)
        .innerRadius(0);
    
    var pie = d3.layout.pie()
        .sort(null)
        .value(function(d) { return d.value; });
    
    var svg = d3.select("#chart").append("svg")
        .attr("width", width)
        .attr("height", height)
      .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    d3.json("../@@rapido/rating/search")
    .header("X-Csrf-Token", authenticator)
    .post(
        JSON.stringify({"query": "total>0"}),
        function(err, results) {
            console.log(results);
            var data = [];
            var color = d3.scale.linear().domain([0,results.length]).range(["#005880","#9abdd6"]);
            var index = 0;
            results.forEach(function(d) {
                if(d.items.id.startsWith(local_folder_path)) {
                    var label = d.items.id.split('/')[d.items.id.split('/').length - 1];
                    data.push({
                        'i': index,
                        'value': d.items.total,
                        'label': label
                    });
                    index += 1;
                }
            });
            var g = svg.selectAll(".arc")
              .data(pie(data))
            .enter().append("g")
              .attr("class", "arc");
            
            g.append("path")
              .attr("d", arc)
              .style("fill", function(d) { return color(d.data.i); });
            
            g.append("text")
              .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
              .attr("dy", ".35em")
              .style("text-anchor", "middle")
              .text(function(d) { return d.data.label; })
              .style("fill", "white");
        }
    );
});