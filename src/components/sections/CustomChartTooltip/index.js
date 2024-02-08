import React from 'react'

const CustomChartTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <>
        <div className="custom-tooltip bg-whiteColor border border-primaryColor rounded-xl py-2 px-4 shadow-2xl">

          <div>
            {payload.map((pld, index) => (
              <div key={index} style={{ display: "inline-block", padding: 2 }}>
                <div style={{ color: pld.fill }} dir='ltr'> 
                  {/* {Math.floor(pld.value * 100) / 100 } &nbsp; */}
                  {parseFloat(pld.value).toFixed(2)} SAR</div>
                {/* <div>{pld.dataKey}</div> */}
              </div>
            ))}
          </div>
        </div>
        <div className="custom-tooltip bg-whiteColor border border-primaryColor mt-48 z-50 rounded-xl py-2 px-4  shadow-2xl">
          <p className="label">{`${label}`}</p>
        </div>
        </>
      );
    }
    return null;
};

export default CustomChartTooltip
