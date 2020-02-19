import { useState } from 'react';

export default function useVisualMode(initial) {
  // const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const back = () => {
    if (history.length > 1) {
      const updatedHist = [...history].slice(0, (history.length - 1));
      setHistory(prev => updatedHist);
    }

  }

  const transition = (mode, replace) => {
    if (replace === true) {
      const updatedHist = [...history].slice(0, (history.length - 1));
      setHistory(prev => [...updatedHist, mode]);
    } else {
      setHistory(prev => [...history, mode]);
    }
  };

  return (
    {
      mode: history[history.length - 1],
      transition,
      back
    }
  )
};