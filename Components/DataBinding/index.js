import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import * as R from "ramda";

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
    {
      type: "Feature",
      properties: {},
      geometry: {
        type: "Point",
        coordinates: [103.623046875, 2.28455066023697],
      },
    },
    {
      type: "Feature",
      properties: {},
      geometry: {
        type: "Point",
        coordinates: [31.376953125, 18.145851771694467],
      },
    },
    {
      type: "Feature",
      properties: {},
      geometry: {
        type: "Point",
        coordinates: [88.06640625, 31.952162238024975],
      },
    },
    {
      type: "Feature",
      properties: {},
      geometry: {
        type: "Point",
        coordinates: [125.5078125, -20.96143961409684],
      },
    },
    {
      type: "Feature",
      properties: {},
      geometry: {
        type: "Point",
        coordinates: [23.90625, -27.68352808378776],
      },
    },
    {
      type: "Feature",
      properties: {},
      geometry: {
        type: "Point",
        coordinates: [117.0703125, 32.84267363195431],
      },
    },
    {
      type: "Feature",
      properties: {},
      geometry: {
        type: "Point",
        coordinates: [-1.0546875, 19.642587534013032],
      },
    },
    {
      type: "Feature",
      properties: {},
      geometry: {
        type: "Point",
        coordinates: [-47.109375, -10.833305983642491],
      },
    },
    {
      type: "Feature",
      properties: {},
      geometry: {
        type: "Point",
        coordinates: [77.16796875, 14.774882506516272],
      },
    },
    {
      type: "Feature",
      properties: {},
      geometry: {
        type: "Point",
        coordinates: [84.0234375, 24.046463999666567],
      },
    },
    {
      type: "Feature",
      properties: {},
      geometry: {
        type: "Point",
        coordinates: [115.31249999999999, 4.740675384778373],
      },
    },
    {
      type: "Feature",
      properties: {},
      geometry: {
        type: "Point",
        coordinates: [47.28515625, 26.115985925333536],
      },
    },
  ],
};

// get random coordinates

const DataBinding = () => {
  const [point, setPoint] = useState(indiaJson);
  // const [point, setPoint] = useState([88.06640625, 31.952162238024975]);
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
      .data(point?.features)
      .join("circle")
      .attr("r", "5px")
      .attr("transform", (d) => {
        // console.log("===", geoGenerator.centroid(d), d);
        return `translate(${geoGenerator.centroid(d)})`;
      })
      .attr("cx", (d) => {
        // console.log("==", d);
        return projection(d)[0];
      })
      .attr("cy", (d) => projection(d)[1])
      .style("opacity", "0")
      .style("fill", "blue")
      .transition()
      .duration(2000)
      .ease(d3.easeLinear)
      .style("opacity", "1")
      .style("fill", "red");

    const randomRemove = setInterval(() => {
      let randomIndex = Math.floor(Math.random() * point.length);
      let pickRandomCoordinate = indiaJson?.features[randomIndex];

      let allCord = point.features;
      let tempPoint;
      // Remove random coordinate from state array;
      allCord.splice(randomIndex, 1);

      // allCord.pop(pickRandomCoordinate);
      tempPoint = {
        ...point,
        features: [...allCord],
      };

      // Reset coordinates if they are less then 6
      if (point.features.length < 6) {
        setPoint(indiaJson);
      } else {
        setPoint(tempPoint);
      }
    }, 300);

    const randomAdd = setInterval(() => {
      let pickRandomCoordinate =
        indiaJson?.features[
          Math.floor(Math.random() * indiaJson?.features.length)
        ];

      let allCord = point.features;
      let tempPoint;

      // Add random coordinate into state array;
      allCord.push(pickRandomCoordinate);
      const uniqueCord = R.uniq(allCord);
      tempPoint = {
        ...point,
        features: [...allCord],
      };

      setPoint(tempPoint);
    }, 300);
    console.log("-----", point);

    return () => {
      clearInterval(randomRemove);
      clearInterval(randomAdd);
    };
  }, [point]);

  return (
    <div>
      <svg ref={svgRef} width='1600' height='1000'></svg>
    </div>
  );
};

export default DataBinding;
