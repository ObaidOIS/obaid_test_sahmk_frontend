import React from 'react'

const CustomChartTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <>
        <div className="custom-tooltip bg-whiteColor border rounded-md py-1.5 px-3 shadow-2xl">

          <div>
            {payload.map((pld, index) => (
              <div key={index} style={{ display: "inline-block"}}>
                <div style={{ color: pld.fill }} dir='ltr' className='flex text-xs'> 
                  {/* {Math.floor(pld.value * 100) / 100 } &nbsp; */}
                  
                  {parseFloat(pld.value).toFixed(2)} SAR 
                  <div className='ml-2 text-darkGreyColor'>{`${label}`}</div>
                  </div>
                {/* <div>{pld.dataKey}</div> */}
              </div>
            ))}
          </div>
        </div>
        {/* <div className="custom-tooltip bg-whiteColor border border-primaryColor mt-48 z-50 rounded-xl py-2 px-4  shadow-2xl">
          <p className="label">{`${label}`}</p>
        </div> */}
        </>
      );
    }
    return null;
};

export default CustomChartTooltip
