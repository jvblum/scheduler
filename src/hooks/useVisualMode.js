import { useState } from "react";

export default function useVisualMode (initial) {
  const [ mode, setMode ] = useState(initial);
  const [ history, setHistory ] = useState([ initial ]);

  const transition = (mode, replace) => {
    setHistory(prev => {
      if (replace) {
        const copyPrev = [...prev];
        copyPrev.splice(prev.length - 1, 1, mode);
        return copyPrev
      }
      return [...prev, mode];
    });
    setMode(mode);
  };

  const back = () => {
    // back limit check
    if (history && history.length > 1) {
      setHistory(prev => {
        const copyHistory = [...prev];
        copyHistory.pop();
        setMode(copyHistory[copyHistory.length - 1]);
        return copyHistory;
      }); // nesting setters to manage async time
    }
  };
  return { mode, transition, back };
};