import React, { useState } from "react";

export default function useVisualMode (initial) {
  const [ mode, setMode ] = useState(initial);
  const [ history, setHistory ] = useState([ initial ]);

  const transition = (mode, replace) => {
    if (replace) {
      setHistory(prev => {
        prev.splice(prev.length - 1, 1, mode);
        return prev;
      });
    } else {
      setHistory(prev => [...prev, mode]);
    }
    setMode(mode);
  };

  const back = () => {
    // setHistory(prev => {
    //   prev.pop();
    //   return prev;
    // })

    // back limit
    if (history && history.length > 1) {
      history.pop();
      setMode(history[history.length - 1]);
    }
  };
 
  return { mode, transition, back };
};

// note: using history.pop instead of something like setHistory(prev => {prev.pop; return prev;}) because of what seems to be asychronous time. 
// setMode runs before the history updates;