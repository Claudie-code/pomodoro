import { useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskItem from "./components/TaskItem";
import TaskList from "./components/TaskList";
import Timer from "./components/Timer";

function App() {
  const [tasks, setTasks] = useState([]);

  const firstTask = tasks[0]?.name;

  return (
    <div className="bg-slate-900 min-h-screen">
      <div className="max-w-lg p-4 flex flex-col gap-3">
        <Timer firstTask={firstTask} />
        <TaskForm setTasks={setTasks} />
        <TaskList tasks={tasks} setTasks={setTasks} />
      </div>
    </div>
  );
}

export default App;
