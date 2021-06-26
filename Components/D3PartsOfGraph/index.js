import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const D3PartsOfGraph = () => {
  const svgRef = useRef(null);

  useEffect(() => {
    const data = [10, 5, 10, 7, 8];
    const extent = d3.extent(data); //returns the min & max value [5, 10]
    const y = d3.scaleLinear().domain([0, 80]).range([200, 0]);

    var x = d3
      .scaleTime()
      .domain([
        new Date(Date.parse("2014-01-01")),
        new Date(Date.parse("2014-04-01")),
      ])
      .range([0, 300]);

    x(new Date(Date.parse("2014-03-01")));
    // 103.3811949976841

    const xAxis = d3.axisBottom(x).ticks(4);

    const svg = d3.select("svg").attr("width", 400).attr("height", 150);

    svg.append("g").attr("class", "x Axis").call(xAxis);
  }, []);

  const numbers = [5, 4, 10, 1];
  const data = [
    { date: "2014-01-01", amount: 10 },
    { date: "2014-02-01", amount: 20 },
    { date: "2014-03-01", amount: 90 },
    { date: "2014-04-01", amount: 80 },
  ];

  return (
    <div>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default D3PartsOfGraph;
