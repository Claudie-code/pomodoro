import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { LuSave } from "react-icons/lu";

const TaskForm = ({ setTasks, selectedTask, isEdit, setIsEdit }) => {
  const [task, setTask] = useState(
    selectedTask?.name ? selectedTask?.name : ""
  );

  const handleClick = (e) => {
    e.preventDefault();
    if (isEdit) {
      setTasks((prevTasks) =>
        prevTasks.map((prevTask) =>
          selectedTask.id === prevTask.id
            ? { ...prevTask, name: task }
            : prevTask
        )
      );
      setIsEdit(false);
    } else {
      setTasks((prevTasks) => [...prevTasks, { id: Date.now(), name: task }]);
    }
    setTask("");
  };

  return (
    <form onSubmit={handleClick} className="p-2 bg-slate-600 flex rounded">
      <input
        className="bg-slate-600 text-white placeholder:text-white grow mr-2"
        placeholder="Nouvelle tâche..."
        value={task}
        autoFocus={isEdit ? true : false}
        onChange={(e) => setTask(e.target.value)}
      />
      <button type="submit" className="text-white">
        {isEdit ? <LuSave /> : <FaPlus />}
      </button>
    </form>
  );
};

export default TaskForm;
