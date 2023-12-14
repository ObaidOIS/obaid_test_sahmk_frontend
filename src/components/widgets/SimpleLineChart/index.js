"use client";
import React, { Component } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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

  return (
    <div>
    <ResponsiveContainer width="100%" height={300} >
      <AreaChart style={{direction: 'rtl'}} width={600} height={300} data={data} margin={{ top: 5, right: -15, bottom: 5, left: 5 }}>
      <defs>
          <linearGradient id="colorUv" x1="1" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#51C77A" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#ffffff" stopOpacity={0}/>
          </linearGradient>
      </defs>
            <Area type="monotone" dataKey="uv" stroke="#1D6362" className=' cursor-pointer'
            activeDot={{ stroke: '#1D6362', strokeWidth: 4, r: 7, fill: '#51C77A'}} strokeWidth={2} fill="url(#colorUv)" />
            <CartesianGrid stroke="#ccc" strokeDasharray="" horizontal={false} />
            <XAxis dataKey="name" tickLine={false} dy={8} className='font-bold text-sm !text-black' />
            <YAxis orientation='right' axisLine={false} dx={20} tickLine={false} className='text-xs text-black'/>
            <Tooltip 
              cursor={{ stroke:"teal", strokeWidth:2 }}
              />
        </AreaChart>
    </ResponsiveContainer>
    </div>
  )
}

export default SimpleLineChart;
