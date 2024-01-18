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
              <stop offset="5%" stopColor={data[0].uv < data[data.length - 1].uv ? "#51C77A" : "#C15959"}  />
              <stop offset="93%" stopColor="#ffffff" />
            </linearGradient>
          </defs>
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: (data[0].uv < data[data.length - 1].uv) ? "#46a667" : "#C15959", strokeWidth: 2 }} />
          <Area
            type="monotone"
            dataKey="uv"
            stroke={data[0].uv < data[data.length - 1].uv ? "#46a667" :"#C15959"}
            className=" cursor-pointer"
            activeDot={{
              stroke: (data[0].uv < data[data.length - 1].uv) ? "#46a667" : "#C15959",
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
           
          <ReferenceLine y={data.length - 1} fill="black" stroke="#8884d8" type="monotone"  strokeDasharray="3 3"/>
          {/* Add a text label for the last value */}
          <Label content={
            <text
            x={data.length - 1}
            y={data.length - 1}
            // y={300}
            dy={-8}
            textAnchor="middle"
            fill="black"
          >
            {parseFloat(data[data.length - 1].uv).toFixed(2)}
          </text>
          } position={"right"}/>
          {/* <text
            x={data.length - 1}
            y={data.length - 1}
            // y={300}
            dy={-8}
            textAnchor="middle"
            fill="black"
          >
            {parseFloat(data[data.length - 1].uv).toFixed(2)}
          </text> */}
          {/* <LabelList dataKey="name" position="top" /> */}
          <XAxis
            dataKey="name"
            tickLine={false}
            // axisLine={false}
            // stroke="some-color"
            dy={8}
            className="font-medium text-sm text-darkColor"
          />
          <YAxis
            label={{ value: parseFloat(data[data.length - 1].uv).toFixed(2), angle: 0, position: 'left' }}
            orientation="right"
            axisLine={false}
            dx={20}
            tickLine={false}
            className="text-xs text-black"
            domain={['auto', 'auto']}
            tickCount={6}
            tickFormatter={(num)=>parseFloat(num).toFixed(0)}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserProfileChart;
