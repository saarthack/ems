import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";

const ActiveTask = ({ data, taskKey }) => {
  const [userData, setUserData] = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [employeeTaskCount, setEmployeeTaskCount] = useState({})

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (user && user.data) {
      const firstName = user.data.firstName;
      const employee = userData.find((e) => e.firstName === firstName);
      if (employee) {
        setTasks([...employee.tasks]);
        setEmployeeTaskCount({...employee.taskCount})
      }
    }
  }, [userData]);

  const changeToCompleted = (tasks, taskKey) => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    const firstName = user.data.firstName;
    const employee = userData.find((e) => e.firstName === firstName);  
    
    const countToBeUpdated = {...employeeTaskCount}
    countToBeUpdated.completed += 1
    countToBeUpdated.active -= 1
    
    const taskToUpdate = [...tasks]
    // console.log(taskKey)
    // console.log(taskToUpdate[taskKey])

    taskToUpdate[taskKey].active = false 
    taskToUpdate[taskKey].completed= true 
    taskToUpdate[taskKey].newTask= false 
    taskToUpdate[taskKey].failed= false
    // console.log(taskToUpdate[taskKey])

    setTasks(taskToUpdate)
    // console.log(tasks);

    const updatedEmployee = {
        ...employee,
        taskCount: countToBeUpdated,
        tasks: tasks,
    };
    // console.log(updatedEmployee)
    // console.log([updatedEmployee,...userData.filter((e) => e.firstName!== firstName)])

    const data = [updatedEmployee,...userData.filter((e) => e.firstName!== firstName)]
    setUserData(data)
  };

  const changeToFailed = (tasks, taskKey) => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    const firstName = user.data.firstName;
    const employee = userData.find((e) => e.firstName === firstName);
    
    const countToBeUpdated = {...employeeTaskCount}
    countToBeUpdated.failed += 1
    countToBeUpdated.active -= 1
    
    const taskToUpdate = [...tasks]
    console.log(taskToUpdate[taskKey])

    taskToUpdate[taskKey].active = false 
    taskToUpdate[taskKey].completed= false 
    taskToUpdate[taskKey].newTask= false 
    taskToUpdate[taskKey].failed= true

    setTasks(taskToUpdate)

    const updatedEmployee = {
        ...employee,
        taskCount: countToBeUpdated,
        tasks: tasks,
    };

    const data = [updatedEmployee,...userData.filter((e) => e.firstName!== firstName)]
    setUserData(data)
  };

  return (
    <div className="flex-shrink-0 h-full w-[300px] p-5 bg-yellow-400 rounded-xl ">
      <div className="flex justify-between items-center">
        <h3 className="bg-blue-600 px-3 py-1 rounded text-sm">
          {data.category}
        </h3>
        <h4 className="text-sm">{data.taskDate}</h4>
      </div>
      <h2 className="mt-5 text-2xl font-semibold">{data.taskTitle}</h2>
      <p className="text-sm mt-2">{data.taskDescription}</p>
      <div className="flex justify-between mt-4">
        <button
          onClick={() => changeToCompleted(tasks, taskKey)}
          className="bg-green-600 px-2 py-1 text-sm"
        >
          Mark as Completed
        </button>
        <button onClick={() => changeToFailed(tasks, taskKey)} className="bg-red-600 px-2 py-1 text-sm">Mark as Failed</button>
      </div>
    </div>
  );
};

export default ActiveTask;
