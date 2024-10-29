import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthProvider';

const CreateTask = () => {
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDate, setTaskDate] = useState('');
    const [assignedTo, setAssignedTo] = useState('');
    const [category, setCategory] = useState('');
    const [taskDescription, setTaskDescription] = useState('');

    const [userData, setUserData] = useContext(AuthContext)

    const submitHandler = (e) => {
        e.preventDefault();

        // form submission logic here
        // Check if any field is empty
        if (!taskTitle || !taskDate || !assignedTo || !category || !taskDescription) {
            alert('Please fill in all fields before submitting.');
            return;
        }
        // console.log(taskTitle, taskDate, assignedTo, category, taskDescription)
        
        const newTask = {
            taskTitle,
            taskDate,
            category,
            taskDescription,
            active: false,
            newTask: true,
            failed: false,
            completed: false,
        }
        // console.log(newTask)

        const data = userData
        let taskAssigned = false;
        // console.log(data)
        
        data.forEach(function(elem){
            // console.log(elem.firstName)
            if ( assignedTo == elem.firstName ) {
                // console.log(elem)
                
                elem.tasks.push(newTask)
                // console.log(elem)
                
                elem.taskCount.newTask = elem.taskCount.newTask + 1
                taskAssigned = true;
            }
        })

        if (!taskAssigned) {
            alert(`No employee found with the name "${assignedTo}". Please check and try again.`);
            return;
        }else {
            setUserData(data)
        }    

        // Reset form fields after submission
        setTaskTitle('');
        setTaskDate('');
        setAssignedTo('');
        setCategory('');
        setTaskDescription('');
    };

    return (
        <div>
            <div className='p-5 bg-[#1C1C1C] mt-7 rounded'>
                <form 
                    onSubmit={submitHandler}
                    className='flex flex-wrap w-full items-start justify-between'
                >
                    <div className='w-1/2'>
                        <div>
                            <h3 className='text-sm text-gray-300 mb-0.5'>Task Title</h3>
                            <input 
                                className='text-sm px-2 py-1 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4' 
                                type="text" 
                                placeholder='Make a new Task' 
                                value={taskTitle}
                                onChange={(e) => setTaskTitle(e.target.value)}
                            />
                        </div>
                        <div>
                            <h3 className='text-sm text-gray-300 mb-0.5'>Date</h3>
                            <input 
                                className='text-sm px-2 py-1 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4' 
                                type="date" 
                                value={taskDate}
                                onChange={(e) => setTaskDate(e.target.value)}
                            />
                        </div>
                        <div>    
                            <h3 className='text-sm text-gray-300 mb-0.5'>Assign To</h3>
                            <input 
                                className='text-sm px-2 py-1 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4' 
                                type="text" 
                                placeholder='Employee Name' 
                                value={assignedTo}
                                onChange={(e) => setAssignedTo(e.target.value)}
                            />
                        </div>
                        <div>
                            <h3 className='text-sm text-gray-300 mb-0.5'>Category</h3>
                            <input 
                                className='text-sm px-2 py-1 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4' 
                                type="text" 
                                placeholder='Design, dev, etc'
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className='w-1/2 flex flex-col items-start'>
                        <h3 className='text-sm text-gray-300 mb-0.5'>Description</h3>
                        <textarea 
                            className='w-full h-44 text-sm py-2 px-4 rounded outline-none bg-transparent border-[1px] border-gray-400' 
                            placeholder='Enter task description'
                            value={taskDescription}
                            onChange={(e) => setTaskDescription(e.target.value)}
                        />
                        <button className='bg-emerald-500 py-3 hover:bg-emerald-600 px-5 rounded text-sm mt-4 w-full'>Create Task</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateTask;
