"use client";
import CustomTooltip from "@/components/sections/CustomTooltip";
import React, { Component, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Label,
  LabelList,
} from "recharts";
import CustomChartLabel from "../CustomChartLabel";

const UserProfileChart = ({ data, handleSelectedChartCurrentValue, activeChartTag }) => {
  const [cursorValue, setCursorValue] = useState(null);

  const handleMouseMove = (e) => {
    if (e.activeLabel) {
      // Use the activeLabel as the x-axis value
      const xValue = e.activeLabel;
      const correspondingDataPoint = data.find(
        (point) => point.name === xValue
      );

      if (correspondingDataPoint) {
        setCursorValue(correspondingDataPoint.uv);
      }
    }
  };

  const handleMouseLeave = () => {
    setCursorValue(null);
  };

  const formatNumber = (value) => {
    // Check if the value has a floating point number greater than 0
    if (Number.isFinite(value) && value % 1 !== 0) {
      // If true, show with two decimal places
      return value.toFixed(1);
    } else {
      // If false, show without decimal places
      return String(value);
    }
  };

  const renderCustomLabel = () => {
    return (<g>
        <foreignObject x={10} y={10} width={100} height={100}>
        <text
    position="insideBottomRight" 
    y="10"
    x="10" 
    className="bg-[#de434f]"
  >
    {parseFloat(data[data.length - 1].uv).toFixed(2)}
  </text>
        </foreignObject>
    </g>)
}

  return (
    <div>
      {/* {cursorValue !== null && <p>Cursor Value: {cursorValue}</p>} */}
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          style={{ direction: "rtl" }}
          width={600}
          height={300}
          data={data}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          margin={{ top: 40, right: -15, bottom: 5, left: 5 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="1" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={
                  data[0].uv < data[data.length - 1].uv ? "#51C77A" : "#C15959"
                }
              />
              <stop
                offset="5%"
                stopColor={
                  data[0].uv < data[data.length - 1].uv ? "#51C77A" : "#C15959"
                }
              />
              <stop
                offset="5%"
                stopColor={
                  data[0].uv < data[data.length - 1].uv ? "#51C77A" : "#C15959"
                }
              />
              <stop offset="93%" stopColor="#ffffff" />
            </linearGradient>
          </defs>
          <Tooltip
            content={<CustomTooltip />}
            cursor={{
              stroke:
                data[0].uv < data[data.length - 1].uv ? "#46a667" : "#C15959",
              strokeWidth: 2,
            }}
          />
          <Area
            type="monotone"
            dataKey="uv"
            stroke={
              data[0].uv < data[data.length - 1].uv ? "#46a667" : "#C15959"
            }
            className=" cursor-pointer"
            activeDot={{
              stroke:
                data[0].uv < data[data.length - 1].uv ? "#46a667" : "#C15959",
              strokeWidth: 2,
              r: 8,
              zIndex: 1,
              // fill: (data[0].uv < data[data.length - 1].uv) ? "#51C77A" : "#fc7b7b",
              fill: "#fff",
            }}
            strokeWidth={2}
            fill="url(#colorUv)"
          />

          <CartesianGrid
            stroke="#ccc"
            strokeDasharray=""
            // horizontal={false}
            vertical={false}
          />

          <ReferenceLine
            y={data[data.length - 1].uv}
            fill="black"
            stroke="#C15959"
            type="monotone"
            strokeDasharray="5 5"
            position="center"
            // dx="right"
            // label={<CustomChartLabel data={data} />}
            // label={renderCustomLabel}
            label={{value:parseFloat(data[data.length - 1].uv).toFixed(2), fontSize: "12px", fill: "red", position: "insideBottomRight", dy: 10, dx: 10, className:"bg-redColor"}}
          />
          <XAxis
            dataKey="name"
            tickLine={false}
            // axisLine={false}
            // stroke="some-color"
            tickFormatter={value => `${value}`}
            dy={8}
            className="font-medium text-sm text-darkColor"
          />
          <YAxis
            // label={{
            //   value: formatNumber(data[data.length - 1].uv),
            //   angle: 0,
            //   position: "left",
            // }}
            orientation="right"
            axisLine={false}
            dx={20}
            tickLine={false}
            className="text-xs text-black"
            domain={["auto", "auto"]}
            tickCount={6}
            tickFormatter={(num) => formatNumber(num)}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserProfileChart;
