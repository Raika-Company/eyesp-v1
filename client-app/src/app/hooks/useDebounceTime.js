import {useEffect, useRef} from "react";

const useDebounceTime = (value) => {
  const timeRef = useRef(Date.now());
  const valueRef = useRef(value);

  useEffect(() => {
    if (Date.now() - timeRef.current > 250) {
      valueRef.current = value;
      timeRef.current = Date.now();
    }
  }, [value]);

  return valueRef.current;
};

export default useDebounceTime;
