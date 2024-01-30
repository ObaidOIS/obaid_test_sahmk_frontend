import React from 'react';

const ProgressBarUI = ({precentageIn, precentageOut}) => {
//   const coveredPercentage = 40;
//   const remainingPercentage = 100 - coveredPercentage;

  return (
    <div className='flex items-center'>
      <div className='ml-2'>{precentageIn}%</div>
      <div className='flex-1'>
        <div className='overflow-hidden rounded-full bg-redColor'>
          <div
            className='h-3 rounded-r-full bg-primaryColor'
            style={{ width: `${precentageIn}%` }}
          />
        </div>
      </div>
      <div className='mr-2'>{precentageOut}%</div>
    </div>
  );
};

export default ProgressBarUI;
