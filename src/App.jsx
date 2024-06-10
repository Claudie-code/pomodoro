import { useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskItem from "./components/TaskItem";
import TaskList from "./components/TaskList";
import Timer from "./components/Timer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [tasks, setTasks] = useState([]);

  const handleDelete = (id) => {
    setTasks((prevTasks) => prevTasks.filter((prevTask) => prevTask.id !== id));
  };

  const firstTask = tasks[0];

  return (
    <div className="bg-slate-900 min-h-screen">
      <div className="max-w-lg p-4 flex flex-col gap-3">
        <Timer firstTask={firstTask} handleDelete={handleDelete} />
        <TaskForm setTasks={setTasks} />
        <TaskList
          tasks={tasks}
          setTasks={setTasks}
          handleDelete={handleDelete}
        />
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
