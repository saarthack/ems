import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";

const CreateTask = () => {
  const [userData, setUserData] = useContext(AuthContext);

  // Individual state for form inputs
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [assignTo, setAssignTo] = useState("");
  const [category, setCategory] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    // Validate inputs
    if (!taskTitle || !taskDate || !assignTo || !category) {
      alert("Please fill in all required fields.");
      return;
    }

    // Construct the new task
    const newTask = {
      taskTitle,
      taskDescription,
      taskDate,
      category,
      active: false,
      newTask: true,
      failed: false,
      completed: false,
    };

    // Update user data immutably
    const updatedEmployees = userData.map((employee) => {
      if (assignTo === employee.firstName) {
        return {
          ...employee,
          tasks: [...employee.tasks, newTask], // New array with the new task
          taskCounts: {
            ...employee.taskCounts,
            newTask: employee.taskCounts.newTask + 1, // Increment task count
          },
        };
      }
      return employee; // Return unchanged employee if no match
    });

    // Update state and localStorage
    setUserData(updatedEmployees);
    localStorage.setItem("employees", JSON.stringify(updatedEmployees));

    // Clear the form
    setTaskTitle("");
    setTaskDescription("");
    setTaskDate("");
    setAssignTo("");
    setCategory("");
  };

  return (
    <div className="p-5 bg-[#1c1c1c] mt-5 rounded">
      <form onSubmit={submitHandler} className="flex flex-wrap w-full items-start justify-between">
        <div className="w-1/2">
          <InputField
            label="Task Title"
            type="text"
            placeholder="Make a UI design"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
          />
          <InputField
            label="Date"
            type="date"
            value={taskDate}
            onChange={(e) => setTaskDate(e.target.value)}
          />
          <InputField
            label="Assign to"
            type="text"
            placeholder="Employee name"
            value={assignTo}
            onChange={(e) => setAssignTo(e.target.value)}
          />
          <InputField
            label="Category"
            type="text"
            placeholder="Design, Dev, etc."
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>

        <div className="w-2/5 flex flex-col items-start">
          <h3 className="text-sm text-gray-300 mb-0.5">Description</h3>
          <textarea
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            className="w-full h-44 text-sm py-2 px-4 rounded outline-none bg-transparent border-[1px] border-gray-400"
            placeholder="Task description"
          />
          <button className="bg-emerald-500 py-3 hover:bg-emerald-600 px-5 rounded text-sm mt-4 w-full">
            Create Task
          </button>
        </div>
      </form>
    </div>
  );
};

// Reusable input field component
const InputField = ({ label, type, placeholder, value, onChange }) => (
  <div>
    <h3 className="text-sm text-gray-300 mb-0.5">{label}</h3>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4"
    />
  </div>
);

export default CreateTask;
