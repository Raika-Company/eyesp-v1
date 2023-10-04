import {useEffect, useRef} from "react";

const useDebounceTime = (value) => {
  const timeRef = useRef(Date.now());
  const valueRef = useRef(value);

  useEffect(() => {
    if (value !== valueRef.current && Date.now() - timeRef.current > 300) {
      valueRef.current = value;
      timeRef.current = Date.now();
    }
  });

  return valueRef.current;
};

export default useDebounceTime;
