// External Libraries
import React, {useEffect, useState} from "react";
import {v4 as uuidv4} from "uuid";
import axios from "axios";
import moment from "moment-jalaali";
import {
  Box,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
  keyframes,
} from "@mui/material";
import HistoryIcon from "@mui/icons-material/History";
import {Link} from "react-router-dom";

// Internal Utilities and Components
import {convertToPersianNumbers} from "../../app/utils/convertToPersianNumbers";
import useFetchServers from "../../app/utils/useFetchServers";
import useDynamicMP from "../../app/hooks/useDynamicMP";
import CardContainer from "../../app/common/CardContainer";
import SwitchBtn from "../../app/common/SwitchBtn";

// Assets
import elipse from "../../app/assets/image/elipse.svg";
import elipseDark from "../../app/assets/image/elipse-dark.svg";

// Local Components and Constants
import FloatingResult from "./FloatingResult";
import DrawMeterAnimate from "./DrawMeterAnimate";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const mbpsToAmount = (s) => {
  return 1 - 1 / Math.pow(1.3, Math.sqrt(s));
};

//set base url for api
const BASE_URL = "http://127.0.0.1:8000/api/v1";

//set maximum time for test in seconds
const MAX_TIME = 20;

const PING_TIMES = 10;

/**
 * Component to display the address and server information.
 *
 * @component
 * @param {Object} props - The properties object.
 * @param {string} props.ip - The IP address to display.
 * @param {string} props.server - The server information to display.
 * @return {JSX.Element} The rendered AddressAndServer component.
 */
const AddressAndServer = ({ip, server}) => (
  <Box>
    {["آدرس", "سرور"].map((text, index) => (
      <Typography key={index} variant="h4" color="text.main">
        {text}:
        <Typography
          component="span"
          variant="h5"
          color="text.main"
          marginX="0.5rem"
        >
          {text === "آدرس"
            ? ip === ""
              ? "در حال پیدا کردن ip"
              : ip
            : server === ""
            ? "در حال انتخاب سرور"
            : "تهران - زیرساخت"}
        </Typography>
      </Typography>
    ))}
  </Box>
);

/**
 * The SpeedTest component provides a user interface for performing an internet speed test.
 * This component measures the download, upload and latency of the internet connection.
 * It also provides a mechanism for selecting the best server to perform the test.
 *
 * @component
 * @example
 * return (
 *   <SpeedTest />
 * )
 */
const SpeedTest = () => {
  const theme = useTheme();
  const isMdScreen = useMediaQuery(theme.breakpoints.up("md"));
  const pXCardContainers = useDynamicMP(390, 1440, 1.81, 4);
  const pYCardContainers = useDynamicMP(390, 1440, 1.19, 3.5);
  // const abortController = new AbortController();

  const [state, setState] = useState({
    isTestEnds: false,
    isGoButtonVisible: true,
    progress: 0,
    socket: null,
    latency: 0,
    download: 0,
    upload: 0,
    isDl: true,
    testStateNumber: 0,
    clientIp: "",
    selectedServerURL: "",
    isServerSelected: false,
    isDetailedTest: false,
    uid: uuidv4(),
  });

  const {isFetchingServers, selectBestServer} = useFetchServers();

  useEffect(() => {
    axios
      .get(`${BASE_URL}/ip-info`)
      .then((res) =>
        setState((prevState) => ({...prevState, clientIp: res.data.data.ip}))
      );
  }, []);

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      isServerSelected: !!state.selectedServerURL,
    }));
  }, [state.selectedServerURL]);

  useEffect(() => {
    if (state.selectedServerURL || isFetchingServers) return;
    selectBestServer().then(
      (url) =>
        url && setState((prevState) => ({...prevState, selectedServerURL: url}))
    );
  }, [isFetchingServers, selectBestServer, state.selectedServerURL]);

  /* useEffect(() => {
    if (!state.selectedServerURL) return;
    const s = state.socket || io(state.selectedServerURL);
    setState((prevState) => ({ ...prevState, socket: s }));

    s.on("connect", () => console.log("Socket connected"));
    s.on("connect_error", (error) =>
      console.error("Socket connection error:", error)
    );

    return () => s.disconnect();
  }, [state.selectedServerURL]); */

  /* useEffect(() => {
    if (!state.socket || !state.isServerSelected) return;
    let pingCount = 0,
      minLatency = Infinity;
    state.socket.on("ping_event", async (timestamp) => {
      const currentLatency = performance.now() - timestamp;
      minLatency = Math.min(minLatency, currentLatency);
      pingCount++;
      if (pingCount === PING_TIMES) {
        setState((prevState) => ({
          ...prevState,
          latency: minLatency.toFixed(2),
        }));
      } else {
        state.socket.emit("ping_event", performance.now());
      }
    });
  }, [state.socket, state.isServerSelected]); */

  const startHelloRequest = () => {
    axios
      .get(`${BASE_URL}/hello?uid=${state.uid}&cid=cid-sample`)
      .then((res) => console.log(res));
  };

  const startPingTest = () => {
    if (!state.isServerSelected) return;
    axios.get(`${BASE_URL}/ping?uid=${state.uid}&cid=cid-sample`).then((res) =>
      setState((prevState) => ({
        ...prevState,
        latency: res.data,
      }))
    );
  };

  const measureSpeed = async (type) => {
    const now = performance.now();
    const abortController = new AbortController();
    const numConnections = state.isDetailedTest ? 4 : 1;
    const promises = Array(numConnections)
      .fill()
      .map(async (_, i) => {
        try {
          const response = await fetch(
            `${BASE_URL}/${type}-speed?uid=${state.uid}&cid=cid-sample&$conn=${i}`,
            {signal: abortController.signal}
          );

          setTimeout(() => {
            abortController.abort();
          }, MAX_TIME * 1000);

          if (!response.ok || !response.body) throw response.statusText;
          const reader = response.body.getReader();
          const decoder = new TextDecoder();

          let min = null;
          while (true) {
            const percentValue = ((performance.now() - now) / 9000) * 100;

            if (!min) min = percentValue;
            setState((prev) => ({
              ...prev,
              progress: percentValue - min,
            }));
            const {value, done} = await reader.read();
            if (done) break;
            const decodedChunk = decoder.decode(value, {stream: true});
            decodedChunk.split(" ").map((speed) => {
              speed = parseFloat(speed);
              if (!isNaN(speed)) {
                setState((prevState) => ({...prevState, [type]: speed}));
              }
            });
          }
        } catch (error) {
          if (error.name === "AbortError") console.log(error);
        }
      });
    await Promise.all(promises);
  };

  const handleButtonClick = () => {
    if (!state.isServerSelected) return;
    setState((prevState) => ({...prevState, isGoButtonVisible: false}));
    startHelloRequest();
    startPingTest();
    handleStart();
  };

  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };
  const handleStart = async () => {
    if (!state.isServerSelected /*  || !state.socket */) {
      console.error("Server not selected or socket not ready");
      return;
    }
    await measureSpeed("download");
    setState((prevState) => ({...prevState, isDl: !state.isDl}));
    await sleep(2000);
    await measureSpeed("upload");

    const currentJalaliDateInEnglish = moment().format("jYYYY/jM/jD");
    const currentJalaliDateInFarsi = convertToPersianNumbers(
      currentJalaliDateInEnglish
    );

    const getCurrentTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");

      return `${hours}:${minutes}:${seconds}`;
    };

    const testResults = {
      date: currentJalaliDateInFarsi,
      time: convertToPersianNumbers(getCurrentTime()),
      ping: convertToPersianNumbers(state.latency),
      download: convertToPersianNumbers(state.download),
      testDuration: convertToPersianNumbers("00:16"),
      testType: "دقیق",
      upload: convertToPersianNumbers(state.upload),
      server: "ایرانسل-تهران",
      ip: state.clientIp,
    };
    const existingResults = JSON.parse(
      localStorage.getItem("testResults") || "[]"
    );
    existingResults.push(testResults);
    localStorage.setItem("testResults", JSON.stringify(existingResults));
    setState((prev) => ({...prev, isTestEnds: true}));
  };

  return (
    <CardContainer
      component="main"
      sx={{
        paddingX: pXCardContainers,
        paddingY: pYCardContainers,
        height: isMdScreen ? "calc(90vh - 10rem)" : "calc(100vh - 10rem)",
        position: "relative",
        overflow: "visible",
      }}
    >
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h1" color="" gutterBottom>
          تست اینترنت
        </Typography>
        <Button
          component={Link}
          to="/history"
          variant="h3"
          color="text.subHeading"
          startIcon={<HistoryIcon sx={{mx: "0.5rem"}} />}
        >
          تست های گذشته
        </Button>
      </Box>
      <Box
        display="flex"
        flexDirection={isMdScreen ? "row" : "column"}
        justifyContent="space-evenly"
        alignItems="center"
        height="100%"
        paddingBottom="10%"
      >
        <AddressAndServer
          ip={state.clientIp}
          server={state.selectedServerURL}
        />
        <Box
          width={isMdScreen ? "25vmin" : "55vmin"}
          height={isMdScreen ? "25vmin" : "55vmin"}
        >
          {state.isGoButtonVisible ? (
            <Button
              onClick={handleButtonClick}
              sx={{
                boxShadow: `
        inset 0 0 20px #9DB8C8,  /* inner shadow */
        0px 4px 59px 0px rgba(0, 163, 255, 0.22)  /* outer shadow */
    `,
                borderRadius: "50%",
                width: "100%",
                height: "100%",
              }}
            >
              <Typography
                color={theme.palette.mode === "light" ? "#000" : "#FFF"}
                variant="start"
              >
                شروع
              </Typography>
            </Button>
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                animation: `${fadeIn} 1s ease-in-out`,
                height: "100%",
                width: "100%",
              }}
            >
              <img
                src={theme.palette.mode === "dark" ? elipseDark : elipse}
                alt="speed-meter"
                style={{maxWidth: "100%", height: "100%", zIndex: 1}}
              />
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  zIndex: 2,
                }}
              >
                <DrawMeterAnimate
                  bk={
                    /Trident.*rv:(\d+\.\d+)/i.test(navigator.userAgent)
                      ? "#45628A"
                      : "#1B70EE1C"
                  }
                  fg={"#1B70EE1C"}
                  progress={state.progress}
                  mbps={state.isDl ? state.download : state.upload}
                  isDl={state.isDl}
                  testState={state.testStateNumber}
                  theme="light"
                />
              </div>
            </Box>
          )}
        </Box>
        <Box display="flex" flexDirection="column" alignItems="flex-end">
          <SwitchBtn
            textOn="تست دقیق"
            textOff="تست فوری"
            checked={state.isDetailedTest}
            onChange={() => {
              setState((prevState) => ({
                ...prevState,
                isDetailedTest: !state.isDetailedTest,
              }));
            }}
          />
          <Typography variant="h5" color="text.main" marginLeft="1rem">
            نوع تست
          </Typography>
        </Box>

        <FloatingResult
          download={state.download}
          upload={state.upload}
          latency={state.latency}
          isTestEnds={state.isTestEnds}
        />
      </Box>
    </CardContainer>
  );
};

export default SpeedTest;
