import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import formatTimeToString from "../utils/formatTimeToString";

const Settings = ({
  isVisible,
  onClose,
  workDuration,
  breakDuration,
  setBreakDuration,
  setWorkDuration,
  mode,
  setSeconds,
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
      <div className="bg-slate-800 text-white p-6 max-w-sm w-full border rounded flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg leading-6 font-medium">Settings</h3>
          <button
            className="bg-transparent border-0 float-right"
            onClick={onClose}
          >
            <span className="text-white text-xl">&times;</span>
          </button>
        </div>
        <div className="mt-2 flex flex-col gap-4">
          <div>
            <label>work: {formatTimeToString(workDuration)}</label>
            <Slider
              onChange={(v) => {
                setWorkDuration(v);
                console.log("AfterChange:", v);
              }}
              onChangeComplete={(value) => {
                mode === "work" && setSeconds(value);
              }}
              min={900} // 15 minutes
              max={3000} // 50 minutes
              value={workDuration}
              step={10}
            />
          </div>
          <div>
            <label>break: {formatTimeToString(breakDuration)}</label>

            <Slider
              onChange={(v) => {
                setBreakDuration(v);

                console.log("AfterChange:", v);
              }}
              onChangeComplete={(value) => {
                mode === "break" && setSeconds(value);
              }}
              min={300} // 5 minutes
              max={900} // 15 minutes
              value={breakDuration}
              step={10}
            />
          </div>
        </div>
        <button
          onClick={onClose}
          className="bg-gray-50 text-gray-900 rounded font-semibold px-4 py-2 hover:bg-gray-200"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default Settings;
