import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import formatTimeToString from "../utils/formatTimeToString";
import Controls from "./Controls";
import { useContext } from "react";
import { SettingsContext } from "../contexts/SettingsContext";

const Timer = ({ firstTask, handleDelete, toggleModal }) => {
  const { mode, workDuration, breakDuration, seconds } =
    useContext(SettingsContext);
  const currentDuration = mode === "work" ? workDuration : breakDuration;

  const percentage = (seconds / currentDuration) * 100;

  return (
    <CircularProgressbarWithChildren
      value={percentage}
      styles={buildStyles({
        pathColor: mode === "work" ? "red" : "green",
        trailColor: "gray",
      })}
      strokeWidth={5}
    >
      <div className="text-white flex flex-col items-center gap-3">
        <button
          onClick={toggleModal}
          className="bg-gray-50 text-gray-900 rounded font-semibold px-4 py-2 hover:bg-gray-200"
        >
          Settings
        </button>
        <p className="text-7xl">{formatTimeToString(seconds)}</p>
        <p>{firstTask?.name}</p>
        <Controls
          handleDelete={handleDelete}
          taskId={firstTask?.id}
          currentDuration={currentDuration}
        />
      </div>
    </CircularProgressbarWithChildren>
  );
};

export default Timer;
