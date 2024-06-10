import { useState } from "react";
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import { LuPlay, LuRotateCcw, LuSkipForward } from "react-icons/lu";
import "react-circular-progressbar/dist/styles.css";

const Timer = ({ firstTask }) => {
  const [seconds, setSeconds] = useState(1500);

  const startTimer = () => {
    setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);
  };

  const formatTimeToString = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const percentage = (seconds / 1500) * 100;

  return (
    <CircularProgressbarWithChildren
      value={percentage}
      styles={buildStyles({
        pathColor: "red",
        trailColor: "gray",
      })}
      strokeWidth={5}
    >
      <div className="text-white flex flex-col items-center gap-3">
        <button className="bg-gray-50 text-gray-900 rounded font-semibold px-4 py-2 hover:bg-gray-200">
          Settings
        </button>
        <p className="text-7xl">{formatTimeToString(seconds)}</p>
        <p>{firstTask}</p>
        <div className="flex gap-2">
          <button>
            <LuRotateCcw size={30} />
          </button>
          <button onClick={startTimer}>
            <LuPlay size={60} />
          </button>
          <button>
            <LuSkipForward size={30} />
          </button>
        </div>
      </div>
    </CircularProgressbarWithChildren>
  );
};

export default Timer;
