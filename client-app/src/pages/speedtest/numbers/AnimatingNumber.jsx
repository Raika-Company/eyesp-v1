import {useEffect, useRef, useState} from "react";
import {motion} from "framer-motion";
import usePrevious from "../../../app/hooks/usePrevious";
import {Box, Typography} from "@mui/material";
import "./AnimatingNumber.css";

const formatForDisplay = (number = 0) => {
  return parseFloat(Math.max(number, 0)).toFixed(2).split("").reverse();
};

const NumberColumn = ({digit, delta}) => {
  const numberColumnRef = useRef();
  const [position, setPosition] = useState(0);
  const [animationClass, setAnimationClass] = useState(null);
  const previousDigit = usePrevious(digit);
  const columnContainer = useRef();

  const setColumnToNumber = (number) => {
    setPosition(columnContainer.current.clientHeight * parseInt(number));
  };

  useEffect(() => {
    setAnimationClass(previousDigit !== digit ? delta : "");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delta, digit]);

  useEffect(() => {
    if (!animationClass) return;
    const timer = setTimeout(() => {
      setAnimationClass("");
    }, 201);

    return () => clearTimeout(timer);
  }, [digit, delta, animationClass]);

  useEffect(() => {
    setColumnToNumber(digit);
  }, [digit]);

  return (
    <div style={{position: "relative"}} ref={columnContainer}>
      <motion.div
        animate={{
          y: position,
        }}
        className={`ticker-column ${animationClass}`}
        style={{
          position: "absolute",
          height: "1000%",
          bottom: "0",
        }}
        ref={numberColumnRef}
      >
        {[9, 8, 7, 6, 5, 4, 3, 2, 1, 0].map((num) => (
          <div key={num} style={{height: "10%"}}>
            <span>{num}</span>
          </div>
        ))}
      </motion.div>
      <Typography
        sx={{
          visibility: "hidden",
        }}
      >
        0
      </Typography>
    </div>
  );
};

const DecimalColumn = () => {
  return (
    <div>
      <span>.</span>
    </div>
  );
};

const AnimatingNumber = ({value}) => {
  const numArray = formatForDisplay(value);
  const previousNumber = usePrevious(value);

  let delta = null;
  if (value > previousNumber) delta = "increase";
  if (value < previousNumber) delta = "decrease";
  return (
    <Box
      sx={{
        height: "100%",
        margin: "auto",
        display: "flex",
        overflow: "hidden",
        position: "relative",
        color: "#fff",
      }}
    >
      {numArray.map((number, index) =>
        number === "." ? (
          <DecimalColumn key={index} />
        ) : (
          <NumberColumn key={index} digit={number} delta={delta} />
        )
      )}
    </Box>
  );
};

export default AnimatingNumber;
