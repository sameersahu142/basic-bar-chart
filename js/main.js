/*
 *    main.js
 *    Mastering Data Visualization with D3.js
 *    Project 1 - Star Break Coffee
 */

//margin set (1st step)
const MARGIN = { LEFT: 100, RIGHT: 10, TOP: 10, BOTTOM: 100 }
const WIDTH = 600 - MARGIN.RIGHT - MARGIN.LEFT;
const HEIGHT = 400 - MARGIN.TOP - MARGIN.BOTTOM;

//select svg (1st step)
const svg = d3.select("#chart-area").append("svg")
  .attr("width", WIDTH + MARGIN.RIGHT + MARGIN.LEFT)
  .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM);

//group the svg (1st step)
const g = svg.append("g")
  .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`);

//x-label (4th step)
g.append("text")
  .attr("class", "x-axis-label")
  .attr("x", WIDTH / 2)
  .attr("y", HEIGHT + 60)
  .attr("font-size", "20px")
  .attr("font-weight", "700")
  .attr("text-anchor", "middle")
  .text("MONTH");

//y-label (4th step)
g.append("text")
  .attr("class", "y axis-label")
  .attr("x", - (HEIGHT / 2))
  .attr("y", -60)
  .attr("font-size", "20px")
  .attr("font-weight", "700")
  .attr("text-anchor", "middle")
  .attr("transform", "rotate(-90)")
  .text("REVENUE ($)")

//initial step
d3.csv("data/revenues.csv").then((data) => {
  data.forEach((d) => {
    d.profit = Number(d.profit);
    d.revenue = Number(d.revenue);
  })

//create scale for x axis (2nd step)
  const x = d3.scaleBand()
    .domain(data.map(d => d.month))
    .range([0, WIDTH])
    .paddingInner(0.3)
    .paddingOuter(0.2)

//create scale for y axis (2nd step)
  const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.revenue)])
    .range([HEIGHT, 0]) //In 5th step change range from .range([0, HEIGHT]) to .range([HEIGHT, 0])

//For bottom line (3rd step)
  const xAxisCall = d3.axisBottom(x)
  g.append("g")
    .attr("classs", "x-axis")
    .attr("transform", `translate(0, ${HEIGHT})`)
    .call(xAxisCall)

//For left line (3rd step)
  const yAxisCall = d3.axisLeft(y)
    .tickFormat(d => "$" + d)
  g.append("g")
    .attr("class", "y-axis")
    .call(yAxisCall)

//After data get data bind to rectangle (1st step)
  const rect = g.selectAll("rect").data(data)

//rect attr (1st step)
  rect
    .enter()
    .append("rect")
    .attr("x", d => x(d.month))
    .attr("y", d => y(d.revenue)) //In 5th step y point change from 0 to d => y(d.revenue)
    .attr("width", x.bandwidth)
    .attr("height", d => HEIGHT - y(d.revenue)) //In 5th step height change from d => y(d.revenue) to d => HEIGHT - y(d.revenue)
    .attr("fill", "green");
});
