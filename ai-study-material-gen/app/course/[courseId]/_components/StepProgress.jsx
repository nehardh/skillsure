import React from 'react'

function StepProgress({ stepCount, setStepCount, data }) {
  return (
    <div className="flex gap-4 items-center ">
        {stepCount != 0 && <button className="bg-primary text-white px-4 py-2 rounded-lg" onClick={() => setStepCount(stepCount - 1)}>Back</button>}
        {data?.map((item, index) => {
          <div key={index} className={`w-full h-2 rounded-full `}></div>
        })}
    </div>
  )
}

export default StepProgress