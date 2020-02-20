import { useState } from 'react';

export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);

  //goes back to last mode
  const back = () => {
    if (history.length > 1) {
      const updatedHist = [...history].slice(0, (history.length - 1));
      setHistory(prev => updatedHist);
    }

  }

  //transitions between modes
  const transition = (mode, replace = false) => {
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