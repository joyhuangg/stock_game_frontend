class Graph{
  constructor(symbol){
    this.symbol = symbol
    this.parseData = this.parseData.bind(this)
    this.drawChart = this.drawChart.bind(this)
  }

  renderGraph(){
    document.querySelector("svg").innerHTML = ""
    let api = `https://api.iextrading.com/1.0/stock/${this.symbol}/batch?types=chart`
    fetch(api)
       .then(response => { return response.json(); })
       .then(data => {
           //DO SOMETHING WITH DATA
           console.log(this);
           let parsedData = this.parseData(data);
           this.drawChart(parsedData);
       })
  }

  //graph function
  parseData(data) {
     let arr = [];
     for (let i in data.chart) {
        arr.push(
           {
              date: new Date(data.chart[i].date), //date
              value: data.chart[i].close //convert string to number
           });
     }
     return arr;
  }

  drawChart(data) {
     let svgWidth = 300, svgHeight = 200;
     let margin = { top: 20, right: 20, bottom: 30, left: 50 };
     let width = svgWidth - margin.left - margin.right;
     let height = svgHeight - margin.top - margin.bottom - 5;
     let svg = d3.select('svg')
       .attr("width", svgWidth)
       .attr("height", svgHeight);
     let g = svg.append("g")
      .attr("transform",
         "translate(" + margin.left + "," + margin.top + ")"
      );

    let parseTime = d3.timeParse("%d-%b-%y")

    let x = d3.scaleTime().range([0, width]);
    let y = d3.scaleLinear().rangeRound([height, 0]);

    let line = d3.line()
     .x(function(d) { return x(d.date)})
     .y(function(d) { return y(d.value)})

     x.domain(d3.extent(data, function(d) { return d.date }));
     y.domain(d3.extent(data, function(d) { return d.value }));

     g.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%m-%d")))
      .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)");

     g.append("g")
       .call(d3.axisLeft(y))
       .append("text")
       .attr("fill", "#000")
       .attr("transform", "rotate(-90)")
       .attr("y", 6)
       .attr("dy", "0.71em")
       .attr("text-anchor", "end")
       .text("Price ($)");

    g.append("path")
     .datum(data)
     .attr("fill", "none")
     .attr("stroke", "steelblue")
     .attr("stroke-linejoin", "round")
     .attr("stroke-linecap", "round")
     .attr("stroke-width", 1.5)
     .attr("d", line);
    }
}
