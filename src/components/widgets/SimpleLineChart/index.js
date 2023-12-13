"use client";
import React, { Component } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import dynamic from 'next/dynamic'

const SimpleLineChart = () => {
 
    const data = [
      {name: 'الاحد', uv: 40, pv: 2400, amt: 2400},
      {name: 'السبت', uv: 55, pv: 2400, amt: 2400},
      {name: 'الجمعة', uv: 55, pv: 2400, amt: 2400},
      {name: 'الخميس', uv: 35, pv: 2400, amt: 2400},
      {name: 'الاربعاء', uv: 10, pv: 2400, amt: 2400},
      {name: 'الثلاثاء', uv: 20, pv: 2400, amt: 2400},
      {name: 'الاثنين', uv: 15, pv: 2400, amt: 2400},
      {name: 'الاحد', uv: 25, pv: 2400, amt: 2400},

    ];

    const CustomizedDot = (props) => {
      const { cx, cy, r, stroke, payload, value } = props;
    
      if (payload.active) {
        return (
          <circle cx={cx - 10} cy={cy - 10} r={25} stroke="black" strokeWidth={3} fill="red" />
        );
      }}

  return (
    <div>
    <ResponsiveContainer width="100%" height={300} >
      <AreaChart style={{direction: 'rtl'}} width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
      <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#51C77A" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#ffffff" stopOpacity={0}/>
          </linearGradient>
      </defs>
            <Area type="monotone" dataKey="uv" stroke="#1D6362"
            dot={<CustomizedDot/>} strokeWidth={2} fill="url(#colorUv)" />
            <CartesianGrid stroke="#ccc" strokeDasharray="" />
            <XAxis dataKey="name" tickLine={false} dy={5} className='text-sm font-medium !text-black' />
            <YAxis orientation='right' dx={30} tickLine={false} className='text-sm text-black'/>
            <Tooltip />
        </AreaChart>
    </ResponsiveContainer>
    </div>
  )
}

export default SimpleLineChart;
