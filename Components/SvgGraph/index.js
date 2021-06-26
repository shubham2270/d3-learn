import React, { useEffect } from "react";
import * as d3 from "d3";

const SvgGraph = () => {
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

    x(new Date(Date.parse("2014-02-01")));
    // 103.3811949976841
  }, []);

  return (
    <div>
      <svg width='350' height='160'>
        <g className='layer' transform='translate(60,10)'>
          <circle r='5' cx='0' cy='105' />
          <circle r='5' cx='90' cy='90' />
          <circle r='5' cx='180' cy='60' />
          <circle r='5' cx='270' cy='0' />

          <g className='y axis'>
            <line
              x1='0'
              y1='0'
              x2='0'
              y2='120'
              strokeWidth='2'
              style={{ stroke: "black" }}
            />
            <text x='-40' y='105' dy='5'>
              $10
            </text>
            <text x='-40' y='0' dy='5'>
              $80
            </text>
          </g>
          <g className='x axis' transform='translate(0, 120)'>
            <line
              x1='0'
              y1='0'
              x2='270'
              y2='0'
              strokeWidth='2'
              style={{ stroke: "black" }}
            />
            <text x='-30' y='20'>
              January 2014
            </text>
            <text x='240' y='20'>
              April
            </text>
          </g>
        </g>
      </svg>
    </div>
  );
};
export default SvgGraph;
