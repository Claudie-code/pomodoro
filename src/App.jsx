import { useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskItem from "./components/TaskItem";
import TaskList from "./components/TaskList";
import Timer from "./components/Timer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Settings from "./components/Settings";

function App() {
  const [workDuration, setWorkDuration] = useState(3);
  const [breakDuration, setBreakDuration] = useState(300);
  const [seconds, setSeconds] = useState(workDuration);
  const [tasks, setTasks] = useState([]);
  const [isVisible, setVisible] = useState(false);
  const [mode, setMode] = useState("work");

  const toggleModal = () => {
    setVisible(!isVisible);
  };

  const handleDelete = (id) => {
    setTasks((prevTasks) => prevTasks.filter((prevTask) => prevTask.id !== id));
  };

  const firstTask = tasks[0];

  return (
    <div className="bg-slate-900 min-h-screen">
      <div className="max-w-lg p-4 flex flex-col gap-3">
        <Timer
          firstTask={firstTask}
          handleDelete={handleDelete}
          toggleModal={toggleModal}
          workDuration={workDuration}
          breakDuration={breakDuration}
          mode={mode}
          setMode={setMode}
          setSeconds={setSeconds}
          seconds={seconds}
        />
        <TaskForm setTasks={setTasks} />
        <TaskList
          tasks={tasks}
          setTasks={setTasks}
          handleDelete={handleDelete}
        />
      </div>
      <ToastContainer />
      <Settings
        isVisible={isVisible}
        onClose={toggleModal}
        breakDuration={breakDuration}
        setWorkDuration={setWorkDuration}
        workDuration={workDuration}
        setBreakDuration={setBreakDuration}
        mode={mode}
        setSeconds={setSeconds}
      />
    </div>
  );
}

export default App;
