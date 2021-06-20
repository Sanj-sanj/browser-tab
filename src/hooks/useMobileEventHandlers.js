import { useRef } from "react";

const useMobileEventHandler = (onDoubleClick, onLongPress) => {
  const timeRef = useRef(0);
  const targetRef = useRef();
  const { set, clear } = resetTime();

  function resetTime() {
    let timeoutRef;
    const set = () => {
      timeoutRef = setTimeout(() => {
        timeRef.current = 0;
        clear(); // clears itself if fired.
      }, 500);
    };
    const clear = () => clearTimeout(timeoutRef);
    return { set, clear };
  }

  const longPressHandler = (e) => {
    // timer activates at the end of the first touch click, sets a timer to reset the timer to 0
    // if the user is long pressing, fire onLongPress then clear timer.
    set();
    if (timeRef.current !== 0 && e.timeStamp - timeRef.current >= 250) {
      onLongPress(targetRef.current);
      timeRef.current = 0;
      clear();
    }
    targetRef.current.target.removeEventListener("touchend", longPressHandler);
  };

  const onTouchStart = (touchE) => {
    targetRef.current = touchE; // save the onTouchStart click event into a ref to hold closure
    if (timeRef.current !== 0) {
      const timeBetweenTouches = targetRef.current.timeStamp - timeRef.current;
      if (timeBetweenTouches <= 500) {
        clear();
        timeRef.current = 0;
        return onDoubleClick();
      }
      clear();
      return (timeRef.current = 0);
    }
    timeRef.current = targetRef.current.timeStamp;
    targetRef.current.target.addEventListener("touchend", longPressHandler);
  };
  return [onTouchStart];
};
export default useMobileEventHandler;
