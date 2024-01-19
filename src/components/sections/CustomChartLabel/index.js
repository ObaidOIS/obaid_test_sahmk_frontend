import React from 'react'

const CustomChartLabel = ({data}) => {
  return (
  <text
    position="insideBottomRight" 
    y="10"
    x="10" 
    className="bg-[#de434f]"
  >
    {parseFloat(data[data.length - 1].uv).toFixed(2)}
  </text>
  )
}

export default CustomChartLabel
