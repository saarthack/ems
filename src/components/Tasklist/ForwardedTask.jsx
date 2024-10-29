import React from 'react'

const ForwardedTask = ({data}) => {
    return (
        <div className='flex-shrink-0 h-full w-[300px] p-5 bg-purple-600 rounded-xl '>
            <div className='flex justify-between items-center'>
                <h3 className='bg-red-600 px-3 py-1 rounded text-sm'>
                    {data.category}
                </h3>
                <h4 className='text-sm'>
                    {data.taskDate}
                </h4>
            </div>
            <h2 className='mt-5 text-2xl font-semibold'> 
                {data.taskTitle}
            </h2>
            <p className='text-sm mt-2'>
                {data.taskDescription}
            </p>
            <div className='mt-2'>
                <div className='w-full bg-purple-600'>Forwarded To: {data.forwardedTo} </div>
            </div>
        </div>
    )
}

export default ForwardedTask
