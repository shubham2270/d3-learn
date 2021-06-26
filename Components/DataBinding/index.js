import React, { useEffect, useRef } from "react";
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

let aa = [73.490402, 23.786453];
let bb = [73.389809, 23.72728];
let cc = [31.376953125, 18.145851771694467];
let dd = [88.06640625, 31.952162238024975];

const DataBinding = () => {
  const svgRef = useRef(null);

  useEffect(() => {
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
      .data([bb, aa, cc, dd])
      .join("circle")
      .attr("cx", (d) => projection(d)[0])
      .attr("cy", (d) => projection(d)[1])
      .attr("r", "5px")
      .attr("fill", "red");
  }, []);

  return (
    <div>
      <svg ref={svgRef} width='800' height='400'></svg>
    </div>
  );
};

export default DataBinding;
