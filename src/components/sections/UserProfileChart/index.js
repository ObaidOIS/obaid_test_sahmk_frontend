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
} from "recharts";

const UserProfileChart = ({ data }) => {
  console.log(data[0].uv, "hello");
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
          margin={{ top: 20, right: -15, bottom: 5, left: 5 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="1" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={data[0].uv < data[data.length - 1].uv ? "#51C77A" : "#C15959"}  />
              <stop offset="5%" stopColor={data[0].uv < data[data.length - 1].uv ? "#51C77A" : "#C15959"}  />
              <stop offset="90%" stopColor="#ffffff" />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="uv"
            stroke={data[0].uv < data[data.length - 1].uv ? "#1D6362" :"#C15959"}
            className=" cursor-pointer"
            activeDot={{
              stroke: (data[0].uv < data[data.length - 1].uv) ? "#1D6362" : "#C15959",
              strokeWidth: 2,
              r: 8,
              zIndex: 1,
              // fill: (data[0].uv < data[data.length - 1].uv) ? "#51C77A" : "#fc7b7b",
              fill: "#fff"
            }}
            strokeWidth={2}
            fill="url(#colorUv)"
          />
          <CartesianGrid stroke="#ccc" strokeDasharray="" 
          // horizontal={false}
          vertical={false}
           />
          <XAxis
            dataKey="name"
            tickLine={false}
            // axisLine={false}
            // stroke="some-color"
            dy={8}
            className="font-medium text-sm text-darkColor"
          />
          <YAxis
            orientation="right"
            axisLine={false}
            dx={25}
            tickLine={false}
            className="text-xs text-black"
            domain={['auto', 'auto']}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: (data[0].uv < data[data.length - 1].uv) ? "teal" : "#C15959", strokeWidth: 2 }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserProfileChart;
