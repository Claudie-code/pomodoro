import { toast } from "react-toastify";
import { LuPause, LuPlay, LuRotateCcw, LuSkipForward } from "react-icons/lu";
import { useContext, useEffect, useRef, useState } from "react";
import bell from "../assets/bell-98033.mp3";
import { SettingsContext } from "../contexts/SettingsContext";

const Controls = ({ handleDelete, taskId, currentDuration }) => {
  const { setSeconds, seconds, setMode, mode, workDuration, breakDuration } =
    useContext(SettingsContext);
  const [isActive, setIsActive] = useState(false);
  const bellRef = useRef(null);

  function resetTimer() {
    setSeconds(currentDuration);
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
      handleDelete(taskId);
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

  return (
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
      <audio ref={bellRef} src={bell} />
    </div>
  );
};

export default Controls;
