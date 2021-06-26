import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

import map from "../../data/map.json";
import { geoEquirectangular, svg } from "d3";

const indiaJson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {},
      geometry: {
        type: "Point",
        coordinates: [77.87109375, 26.27371402440643],
      },
    },
  ],
};

const aa = [103.623046875, 2.28455066023697];
const bb = [73.389809, 23.72728];
const cc = [31.376953125, 18.145851771694467];
const dd = [88.06640625, 31.952162238024975];

let plots = [aa, bb, cc, dd];

// get random coordinates

const DataBinding = () => {
  const [point, setPoint] = useState([88.06640625, 31.952162238024975]);
  const svgRef = useRef(null);

  useEffect(() => {
    let coordinate = [88.06640625, 31.952162238024975];

    let geojson = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {
            name: "Africa",
          },
          geometry: {
            type: "Polygon",
            coordinates: [
              [
                [-6, 36],
                [33, 30],
                [43, 11],
                [51, 12],
                [29, -33],
                [18, -35],
                [7, 5],
                [-17, 14],
                [-6, 36],
              ],
            ],
          },
        },
        {
          type: "Feature",
          properties: {
            name: "Australia",
          },
          geometry: {
            type: "Polygon",
            coordinates: [
              [
                [143, -11],
                [153, -28],
                [144, -38],
                [131, -31],
                [116, -35],
                [114, -22],
                [136, -12],
                [140, -17],
                [143, -11],
              ],
            ],
          },
        },
        {
          type: "Feature",
          properties: {
            name: "Timbuktu",
          },
          geometry: {
            type: "Point",
            coordinates: [-3.0026, 16.7666],
          },
        },
      ],
    };
    const projection = d3.geoEquirectangular().scale(200).translate([200, 150]); // convert lon lat to x y
    const geoGenerator = d3.geoPath().projection(projection);
    const svg = d3.select(svgRef.current);
    const geoGeneratorIndia = d3.geoPath().projection(projection);

    svg
      .selectAll("path")
      .data(map.features)
      .join("path")
      .attr("d", geoGenerator)
      .attr("stroke", "grey")
      .attr("fill", "lightgrey");

    svg
      .selectAll("circle")
      .data([point])
      .join("circle")
      .attr("cx", (d) => projection(d)[0])
      .attr("cy", (d) => projection(d)[1])
      .attr("r", "5px")
      .transition()
      .duration(750)
      .ease(d3.easeLinear)
      .style("fill", "red");

    const t = d3.transition().duration(750).ease(d3.easeLinear);

    const random = setInterval(() => {
      let coordinate = plots[Math.floor(Math.random() * plots.length)];
      setPoint(coordinate);
    }, 1000);
    // d3.select("circle").remove();

    return () => clearInterval(random);
  }, [point]);

  return (
    <div>
      <svg ref={svgRef} width='800' height='400'></svg>
    </div>
  );
};

export default DataBinding;
