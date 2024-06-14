import { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskItem from "./components/TaskItem";
import TaskList from "./components/TaskList";
import Timer from "./components/Timer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Settings from "./components/Settings";
import useFetch from "./hooks/useFetch";

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedData = localStorage.getItem("tasks");
    return savedData ? JSON.parse(savedData) : [];
  });

  const [isVisible, setVisible] = useState(false);
  const { loading, data, error } = useFetch(
    "https://api.adviceslip.com/advice",
    []
  );

  const toggleModal = () => {
    setVisible(!isVisible);
  };

  const handleDelete = (id) => {
    setTasks((prevTasks) => prevTasks.filter((prevTask) => prevTask.id !== id));
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const firstTask = tasks[0];

  const advice = data?.slip?.advice;

  return (
    <div className="bg-slate-900 min-h-screen">
      <div className="max-w-lg p-4 flex flex-col gap-3 m-auto">
        <div className="border h-24 rounded overflow-auto text-white p-2 flex justify-center items-center">
          {loading ? (
            <p>"Loading..."</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            advice && <p>{advice}</p>
          )}
        </div>
        <Timer
          firstTask={firstTask}
          handleDelete={handleDelete}
          toggleModal={toggleModal}
        />
        <TaskForm setTasks={setTasks} />
        <TaskList
          tasks={tasks}
          setTasks={setTasks}
          handleDelete={handleDelete}
        />
      </div>
      <ToastContainer />
      <Settings isVisible={isVisible} onClose={toggleModal} />
    </div>
  );
}

export default App;
