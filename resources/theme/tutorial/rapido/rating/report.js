// Source: http://rapidoplone.readthedocs.io/en/latest/tutorial.html#creating-a-new-page-for-reports
/* It is a feature of the RequireJS library
 * (provided with Plone by default) to load
 * our dependencies like:
 * - mockup-utils, which is a Plone internal resource,
 * - D3js (and we load it by passing its remote URL to RequireJS).
 */
require(['mockup-utils', '//d3js.org/d3.v3.min.js'], function(utils, d3) {
    /* Get the Plone getAuthenticator method
     * mockup-utils allows us to get the authenticator token
     * (with the getAuthenticator method), we need it to use
     * the Rapido REST API.
     */
    var authenticator = utils.getAuthenticator();
    // Get the local folders path
    var local_folder_path = location.pathname.split('/@@rapido')[0];
    // Get SVG element from the rapido block html named 'report.html'
    var width = 960,
        height = 500,
        radius = Math.min(width, height) / 2;

    /* d3.js Arc Generator
     * Generates path data for an arc (typically for pie charts).
     */
    var arc = d3.svg.arc()
        .outerRadius(radius - 10)
        .innerRadius(0);

    /* d3.js Pie Chart Generator
     * Generates data from an array of data.
     */
    var pie = d3.layout.pie()
        .sort(null)
        .value(function(d) { return d.value; });
    
    var svg = d3.select("#chart").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    // d3.json() calls the Rapido endpoint @@rapido/rating/search (a rest api endpoint)
    d3.json("@@rapido/rating/search")
        // d3.json() puts the authenticator token in the X-Csrf-Token header,
        .header("X-Csrf-Token", authenticator)
        // and d3.json() passes the search query in the request BODY.
        .post(
            JSON.stringify({"query": "total>0"}),
            function(err, results) {
                var data = [];
                var color = d3.scale.linear().domain([0,results.length]).range(["#005880","#9abdd6"]);
                var index = 0;
                results.forEach(function(d) {
                    var label = d.items.id.split('/')[d.items.id.split('/').length - 1];
                    data.push({
                        'i': index,
                        'value': d.items.total,
                        'label': label
                    });
                    index += 1;
                });

                // add arc element
                var g = svg.selectAll(".arc")
                    // call pie() function
                    .data(pie(data))
                    // add g element
                    .enter().append("g")
                    .attr("class", "arc");
            
                // add path element
                g.append("path")
                    .attr("d", arc)
                    .style("fill", function(d) { return color(d.data.i); });
            
                // add text element
                g.append("text")
                    .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
                    .attr("dy", ".35em")
                    .style("text-anchor", "middle")
                    .text(function(d) { return d.data.label; })
                    .style("fill", "white");
            }
        );
});

