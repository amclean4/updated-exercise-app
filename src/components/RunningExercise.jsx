import { useState, useEffect } from "react";

export default function RunningExercise({ name, onGoHome }) {
  console.log("RunningExercise Component Rendered"); // Debugging

  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => setTime(prev => prev + 1), 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  const formatTime = () => {
    const minutes = String(Math.floor(time / 60)).padStart(2, "0");
    const seconds = String(time % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const recordLap = () => {
    setLaps([...laps, formatTime()]);
  };

  return (
    <div className="container">
      <h1>{name}</h1>
      <span className="timer">{formatTime()}</span>
      <button onClick={() => setIsRunning(true)}>Start</button>
      <button onClick={() => setIsRunning(false)}>Stop</button>
      <button onClick={recordLap} style={{ backgroundColor: "#FF6347", color: "white" }}>Record Lap</button>
      <button onClick={() => { setIsRunning(false); setTime(0); setLaps([]); }}>Reset</button>
      <button onClick={onGoHome}>Home</button>
      <h2>Laps</h2>
      <ul>
        {laps.map((lap, index) => (
          <li key={index}>Lap {index + 1}: {lap}</li>
        ))}
      </ul>
    </div>
  );
}
