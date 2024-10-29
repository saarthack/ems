import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";

const NewTask = ({ data, taskKey }) => {
  const [userData, setUserData] = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [employeeTaskCount, setEmployeeTaskCount] = useState({})
  const [forwardTo, setForwardTo] = useState('')

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (user && user.data) {
      const firstName = user.data.firstName;
      const employee = userData.find((e) => e.firstName === firstName);
      if (employee) {
        setTasks([...employee.tasks]);
        // console.log(employee.taskCount)
        setEmployeeTaskCount({...employee.taskCount})
      }
    }
  }, [userData]);

  const taskAccepted = (tasks, taskKey) => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    const firstName = user.data.firstName;
    const employee = userData.find((e) => e.firstName === firstName);

    const countToBeUpdated = {...employeeTaskCount}
    countToBeUpdated.active += 1

    const taskToUpdate = [...tasks];
    // console.log(taskKey)
    // console.log(taskToUpdate[taskKey]);

    taskToUpdate[taskKey].active = true;
    taskToUpdate[taskKey].completed = false;
    taskToUpdate[taskKey].newTask = false;
    taskToUpdate[taskKey].failed = false;
    // console.log(taskToUpdate[taskKey])

    setTasks(taskToUpdate);
    // console.log(tasks);

    const updatedEmployee = {
      ...employee,
      taskCount: countToBeUpdated,
      tasks: tasks,
    };
    // console.log(updatedEmployee)
    // console.log([updatedEmployee,...userData.filter((e) => e.firstName!== firstName)])

    const data = [
      updatedEmployee,
      ...userData.filter((e) => e.firstName !== firstName)
    ];
    // console.log(data)
    setUserData(data);
  };

  const ForwardTask= (e, tasks, taskKey)=>{
    e.preventDefault()
    // console.log(forwardTo)

    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    const firstName = user.data.firstName;
    const employee = userData.find((e) => e.firstName === firstName);

    const countToBeUpdated = {...employeeTaskCount}
    countToBeUpdated.newTask -= 1

    const taskToUpdate = [...tasks];
    const taskToforward = taskToUpdate[taskKey]
    // console.log(taskToforward)
    // console.log(taskKey)
    // console.log(taskToUpdate[taskKey]);

    taskToUpdate[taskKey].active = false;
    taskToUpdate[taskKey].completed = false;
    taskToUpdate[taskKey].newTask = false;
    taskToUpdate[taskKey].failed = false;
    taskToUpdate[taskKey].forwarded = true;
    // console.log(taskToUpdate[taskKey])

    taskToUpdate[taskKey].forwardedTo = forwardTo;

    setTasks(taskToUpdate);
    // console.log(tasks);

    const updatedEmployee = {
      ...employee,
      taskCount: countToBeUpdated,
      tasks: tasks,
    };
    // console.log(updatedEmployee)
    // console.log([updatedEmployee,...userData.filter((e) => e.firstName!== firstName)])

    const data = [
      updatedEmployee,
      ...userData.filter((e) => e.firstName !== firstName)
    ];
    // console.log(data)
    // setUserData(data)
    
    // conditional check

    const newTask = {
      ...taskToforward,
      newTask: true,
      forwarded: false,
      forwardedBy: firstName,
    }
    // console.log(newTask)

    const data1 = data
    let taskAssigned = false;
    // console.log(data1)
    
    data1.forEach(function(elem){
        // console.log(elem.firstName)
        if ( forwardTo == elem.firstName ) {
            // console.log(elem)
            
            elem.tasks.push(newTask)
            // console.log(elem)
            
            elem.taskCount.newTask = elem.taskCount.newTask + 1
            taskAssigned = true;
        }
    })

    if (!taskAssigned) {
        alert(`No employee found with the name "${forwardTo}". Please check and try again.`);
        return;
    }else {
      setUserData(data1)
    }

    // console.log(data1)    
  }

  return (
    <div className="flex-shrink-0 h-full w-[300px] p-5 bg-blue-400 rounded-xl ">
      <div className="flex justify-between items-center">
        <h3 className="bg-red-600 px-3 py-1 rounded text-sm">
          {data.category}
        </h3>
        <h4 className="text-sm">{data.taskDate}</h4>
      </div>
      <h2 className="mt-5 text-2xl font-semibold">{data.taskTitle}</h2>
      <p className="text-sm mt-2">{data.taskDescription}</p>
      <div className="mt-4">
        <button
          onClick={() => taskAccepted(tasks, taskKey)}
          className="w-full bg-emerald-500"
        >
          Accept Task
        </button>
      {data.forwardedBy?<div className="mt-2 w-full bg-puple-600"> Forwarded by: {data.forwardedBy}</div>: ''}      
      </div>
      <div className="mt-2">
      <form 
          onSubmit={(e) => ForwardTask(e, tasks, taskKey)}
          className='flex flex-wrap w-full items-start justify-between'
      >
          <div className='w-1/2'>
            <input 
                className='text-sm px-2 py-1 w-4/5 rounded outline-none bg-white text-black border-[1px] border-gray-400 mb-4' 
                type="text" 
                placeholder='forwardTo' 
                value={forwardTo}
                onChange={(e) => setForwardTo(e.target.value)}
            />              
          </div>
          <div className='w-1/2 flex flex-col items-start'>  
            <button
            className="w-full bg-purple-600"
            >
            Forward Task
            </button>
          </div>
      </form>
      </div>
    </div>
  );
};

export default NewTask;
