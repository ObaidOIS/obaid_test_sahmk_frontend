import React from 'react'

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip bg-whiteColor rounded-xl p-2 shadow-2xl">
          <p className="label">{`${label}`}</p>
          {/* : ${payload[0].value} */}
          <div>
            {payload.map((pld, index) => (
              <div key={index} style={{ display: "inline-block", padding: 10 }}>
                <div style={{ color: pld.fill }} dir='ltr'>{parseFloat(pld.value).toFixed(2)} SAR</div>
                {/* <div>{pld.dataKey}</div> */}
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
};

export default CustomTooltip
