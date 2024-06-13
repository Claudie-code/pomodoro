import { useEffect, useRef, useState } from "react";
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import { LuPause, LuPlay, LuRotateCcw, LuSkipForward } from "react-icons/lu";
import "react-circular-progressbar/dist/styles.css";
import { toast } from "react-toastify";
import bell from "../assets/bell-98033.mp3";
import formatTimeToString from "../utils/formatTimeToString";

const Timer = ({
  firstTask,
  handleDelete,
  toggleModal,
  workDuration,
  breakDuration,
  mode,
  setMode,
  setSeconds,
  seconds,
}) => {
  const [isActive, setIsActive] = useState(false);
  const bellRef = useRef(null);

  function resetTimer() {
    setSeconds(workDuration);
    setIsActive(false);
  }

  const toggleTimer = () => {
    setIsActive((prevIsActive) => !prevIsActive);
  };

  const switchMode = () => {
    if (mode === "work") {
      setMode("break");
      setSeconds(breakDuration);
      toggleTimer();
      handleDelete(firstTask?.id);
    } else {
      setMode("work");
      setSeconds(workDuration);
    }
  };

  useEffect(() => {
    if (isActive) {
      const id = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);

      // quand le composant est démonté
      return () => clearInterval(id);
    }
  }, [isActive]);

  useEffect(() => {
    if (seconds === 0) {
      toast("La session est terminée !");
      bellRef.current.play();
      setIsActive(false);
      switchMode();
    }
  }, [seconds]);

  const percentage =
    (seconds / (mode === "work" ? workDuration : breakDuration)) * 100;

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
        <div className="flex gap-2">
          <button onClick={resetTimer}>
            <LuRotateCcw size={30} />
          </button>
          <button onClick={toggleTimer}>
            {isActive ? <LuPause size={60} /> : <LuPlay size={60} />}
          </button>
          <button onClick={switchMode}>
            <LuSkipForward size={30} />
          </button>
        </div>
        <audio ref={bellRef} src={bell} />
      </div>
    </CircularProgressbarWithChildren>
  );
};

export default Timer;
