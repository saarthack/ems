import React from 'react'
import ActiveTask from './ActiveTask'
import NewTask from './NewTask'
import FailedTask from './FailedTask'
import CompleteTak from './CompleteTak'
import ForwardedTask from './ForwardedTask'

const TaskList = ({data}) => {
  return (
    <div id='tasklist' className='h-[65%] overflow-x-auto flex items-center justify-start gap-5 flex-nowrap w-full py-5 mt-10'>
      {data.tasks.map((elem, idx)=>{
        if(elem.active){
          return <ActiveTask key={idx} data={elem} taskKey={idx}/>
        }
        if(elem.completed){
          return <CompleteTak key={idx} data={elem}/>
        }
        if(elem.failed){
          return <FailedTask key={idx} data={elem}/>
        }
        if(elem.forwarded){
          return <ForwardedTask key={idx} data={elem}/>
        }
        if(elem.newTask){
          return <NewTask key={idx} data={elem} taskKey={idx}/>
        }
      })}
    </div>
  )
}

export default TaskList
