import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { LuPen, LuTrash } from "react-icons/lu";
import TaskForm from "./TaskForm";

const TaskItem = ({ task, setTasks, handleDelete }) => {
  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className="grow">
      {isEdit ? (
        <TaskForm
          selectedTask={task}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          setTasks={setTasks}
        />
      ) : (
        <div className="flex p-2 font-semibold">
          <p className="grow">{task.name}</p>
          <button className="mr-2" onClick={() => setIsEdit(!isEdit)}>
            <LuPen />
          </button>
          <button onClick={() => handleDelete(task.id)}>
            <LuTrash />
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
