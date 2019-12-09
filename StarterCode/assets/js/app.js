//making my svg canvas
var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var svgCanvas = d3.select("#scatter")
    .append("svg")
    .attr("width",width)
    .attr("height",height)
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

//importing data & drawing
d3.csv("/assets/data/data.csv", function(error, data) {
    if (error) throw error;

    data.forEach( function(d) {
        d.id = +d.id;
        d.poverty = +d.poverty;
        d.povertyMoe = +d.poverty;
        d.age = +d.age;
        d.ageMoe = +d.ageMoe;
        d.income = +d.income;
        d.incomeMoe = +d.incomeMoe;
        d.healthcare = +d.healthcare;
        d.healthcareLow = +d.healthcareLow;
        d.healthcareHigh = +d.healthcareHigh;
        d.obesity = +d.obesity;
        d.obesityLow = +d.obesityLow;
        d.obesityHigh = +d.obesityHigh;
        d.smokes = +d.smokes;
        d.smokesLow = +d.smokesLow;
        d.smokesHigh = +d.smokesHigh;
    });

    //add X axis
    var x = d3.scaleLinear()
    .domain([0, max(d.healthcare)])
    .range([ 0, width ]);

    svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, max(d.income)])
    .range([ height, 0]);

  svg.append("g")
    .call(d3.axisLeft(y));

  data.forEach(function(d) { 
  // Add dots
  svg.append('g')
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
      .attr("cx", function (d) { return x(d.healthcare); } )
      .attr("cy", function (d) { return y(d.income); } )
      .attr("r", 1.5)
      .style("fill", "#69b3a2")
      .text(d.abbr)
  });

});




