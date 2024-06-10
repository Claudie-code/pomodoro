import TaskItem from "./TaskItem";
import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableItem } from "./SortableItem";

const TaskList = ({ tasks, setTasks }) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event) {
    const { active, over } = event;

    // vérifie si l'élément actif est différent de  l'élément survolé
    if (active.id !== over.id) {
      setTasks((prevTasks) => {
        // index de l'élément actif
        const oldIndex = prevTasks.findIndex(
          (prevTask) => prevTask.id === active.id
        );
        // index de l'élément survolé
        const newIndex = prevTasks.findIndex(
          (prevTask) => prevTask.id === over.id
        );

        // réorganise le tableau en fonction des 2 index
        return arrayMove(tasks, oldIndex, newIndex);
      });
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
        {tasks.map((task) => (
          <SortableItem key={task.id} id={task.id}>
            <TaskItem key={task.id} task={task} setTasks={setTasks} />
          </SortableItem>
        ))}
      </SortableContext>
    </DndContext>
  );
};

export default TaskList;
