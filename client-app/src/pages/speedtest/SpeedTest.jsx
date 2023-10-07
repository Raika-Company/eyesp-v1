import React, {forwardRef} from "react";
import {
  Box,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
  keyframes,
  Slide,
  Paper,
  InputBase,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Radio,
  Tooltip,
} from "@mui/material";
import {useEffect, useState} from "react";
import moment from "moment-jalaali";
import {convertToPersianNumbers} from "../../app/utils/convertToPersianNumbers";
import elipse from "../../app/assets/image/elipse.svg";
import elipseDark from "../../app/assets/image/elipse-dark.svg";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import {STATUS_MAP} from "./constant";

import io from "socket.io-client";
import CardContainer from "../../app/common/CardContainer";
import useDynamicMP from "../../app/hooks/useDynamicMP";
import useFetchServers from "../../app/hooks/useFetchServers";
import HistoryIcon from "@mui/icons-material/History";
import SwitchBtn from "../../app/common/SwitchBtn";
import FloatingResult from "./FloatingResult";
import DrawMeterAnimate from "./DrawMeterAnimate";
import axios from "axios";
import {Link} from "react-router-dom";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const mbpsToAmount = (s) => {
  return 1 - 1 / Math.pow(1.3, Math.sqrt(s));
};

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AddressAndServer = ({ip, server}) => (
  <Box>
    {["آدرس", "سرور"].map((text, index) => (
      <Typography key={index} variant="h4" color="text.main">
        {text}:
        <Typography component="span" variant="h5" color="text" marginX="0.5rem">
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

const SpeedTest = () => {
  const theme = useTheme();
  const isMdScreen = useMediaQuery(theme.breakpoints.up("md"));
  const pXCardContainers = useDynamicMP(390, 1440, 1.81, 4);
  const pYCardContainers = useDynamicMP(390, 1440, 1.19, 3.5);
  const [status, setStatus] = useState(2);
  const [isTestEnds, setIsTestEnds] = useState(false);
  const [isGoButtonVisible, setIsGoButtonVisible] = useState(true);
  const [socket, setSocket] = useState(null);
  const [latency, setLatency] = useState(0);
  const [download, setDownload] = useState(0);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [upload, setUpload] = useState(0);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [testStateNumber, setTestStateNumber] = useState(0);
  const [isDl, setIsDl] = useState(true);
  const [clientIp, setClientIp] = useState("");
  const {isFetchingServers, selectBestServer} = useFetchServers();
  const [selectedServerURL, setSelectedServerURL] = useState("");
  const [isServerSelected, setIsServerSelected] = useState(false);
  const [openSelectServer, setOpenSelectServer] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios
      .get("https://server1.eyesp.live/get-ip")
      .then((res) => setClientIp(res.data.ip));
    // .catch((error) => console.error("Error fetching client IP:", error));
  }, []);

  const fetchServers = async () => {
    try {
      const response = await axios.get("https://server1.eyesp.live/servers");
      return response.data;
    } catch (error) {
      console.error("Error fetching servers:", error);
    }
  };

  const [servers, setServers] = useState([]);

  useEffect(() => {
    const getServers = async () => {
      const serverData = await fetchServers();
      setServers(serverData);
    };

    getServers();
  }, []);

  useEffect(() => {
    if (selectedServerURL) {
      setIsServerSelected(true);
    }
  }, [selectedServerURL]);

  useEffect(() => {
    if (selectedServerURL) return;

    if (!isFetchingServers) {
      selectBestServer().then((url) => {
        if (url) {
          setSelectedServerURL(url);
        }
      });
    }
  }, [isFetchingServers, selectBestServer, selectedServerURL]);

  const PING_TIMES = 10;

  useEffect(() => {
    if (selectedServerURL === "") {
      return;
    }
    const s = socket || io(selectedServerURL);
    setSocket(s);

    s.on("connect", () => {
      console.log("Socket connected");
    });

    s.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });

    return () => s.disconnect();
  }, [selectedServerURL]);

  useEffect(() => {
    if (!socket || !isServerSelected) return;
    let pingCount = 0,
      minLatency = Infinity;
    socket.on("pong_event", async (timestamp) => {
      const currentLatency = performance.now() - timestamp;
      minLatency = Math.min(minLatency, currentLatency);
      pingCount++;
      if (pingCount === PING_TIMES) {
        setLatency(minLatency.toFixed(2));
      } else {
        socket.emit("ping_event", performance.now());
      }
    });
  }, [socket, isServerSelected]);

  const startPingTest = () => {
    if (!isServerSelected) return;
    socket && socket.emit("ping_event", performance.now());
  };

  const handleButtonClick = () => {
    if (!isServerSelected) return;
    setIsGoButtonVisible(false);
    startPingTest();
    handleStart();
  };

  let flag = true;

  const handleStart = () => {
    if (window.speedtest.getState() === STATUS_MAP.RUNNING) {
    } else {
      window.speedtest.onupdate = (data) => {
        const {
          dlProgress,
          dlStatus,
          ulProgress,
          ulStatus,
          pingStatus,
          jitterStatus,
          testState,
        } = data;
        setTestStateNumber(testState);
        if (isDl && flag) {
          setDownload(dlStatus);
          setDownloadProgress(dlProgress);
          if (dlProgress == 1) {
            setIsDl(false);
            flag = false;
          }
        }

        if (!isDl || dlProgress == 1) {
          setUpload(ulStatus);
          setUploadProgress(ulProgress);
        }

        if (dlProgress == 1 && ulProgress == 1) {
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
            englishDate: currentJalaliDateInEnglish,
            time: convertToPersianNumbers(getCurrentTime()),
            englishTime: getCurrentTime(),
            ping: convertToPersianNumbers(latency),
            download: convertToPersianNumbers(dlStatus),
            testDuration: convertToPersianNumbers("00:16"),
            testType: "دقیق",
            upload: convertToPersianNumbers(ulStatus),
            server: "ایرانسل-تهران",
            ip: clientIp,
          };
          const existingResults = JSON.parse(
            localStorage.getItem("testResults") || "[]"
          );
          existingResults.push(testResults);
          localStorage.setItem("testResults", JSON.stringify(existingResults));
          // setIsGoButtonVisible(true);
          setIsTestEnds(true);
        }
      };
      window.speedtest.onend = () => {
        setStatus(STATUS_MAP.READY);
      };
      setStatus(STATUS_MAP.RUNNING);
      window.speedtest.start();
    }
  };

  const handleSelectServer = () => {
    setOpenSelectServer(true);
  };

  const handleCloseSelectServer = () => {
    setOpenSelectServer(false);
  };

  return (
    <>
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
          <Box display="flex" flexDirection="column" alignItems="flex-end">
            <AddressAndServer ip={clientIp} server={selectedServerURL} />
            {isServerSelected ? (
              <Button onClick={handleSelectServer}>
                <Typography variant="h6" color="primary" component="span">
                  انتخاب سرور
                </Typography>
              </Button>
            ) : (
              <></>
            )}
          </Box>
          <Box
            width={isMdScreen ? "25vmin" : "55vmin"}
            height={isMdScreen ? "25vmin" : "55vmin"}
          >
            {isGoButtonVisible ? (
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
                    progress={isDl ? downloadProgress : uploadProgress}
                    mbps={isDl ? download : upload}
                    isDl={isDl}
                    testState={testStateNumber}
                    theme="light"
                  />
                </div>
              </Box>
            )}
          </Box>
          <Box display="flex" flexDirection="column" alignItems="flex-end">
            <SwitchBtn textOn="تست دقیق" textOff="تست فوری" />
            <Typography
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
                mt: "0.2rem",
              }}
              variant="h5"
              color="text.main"
              marginLeft="1rem"
            >
              نوع تست
              <Tooltip title="Delete">
                <IconButton>
                  <InfoOutlinedIcon sx={{ mr: "0.2rem", fontSize: "1.2rem" }} />
                </IconButton>
              </Tooltip>
            </Typography>
          </Box>
          <FloatingResult
            download={download}
            upload={upload}
            latency={latency}
            isTestEnds={isTestEnds}
          />
        </Box>
        <Dialog
          open={openSelectServer}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleCloseSelectServer}
          aria-describedby="تغییر سرور"
          PaperProps={{
            sx: {
              borderRadius: "2rem",
              background:
                theme.palette.mode === "light"
                  ? "radial-gradient(157.11% 128.46% at 12.62% 0%, rgba(247, 250, 254, 0.80) 0.01%, #F3F3F3 100%)"
                  : "radial-gradient(157.11% 128.46% at 12.62% 0%, rgba(40, 44, 52, 0.80) 0.01%, #2D2D2D 100%)",
              marginRight: "5%",
            },
          }}
        >
          <DialogTitle
            sx={{display: "flex", justifyContent: "space-between", gap: "4rem"}}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <Paper
                component="form"
                sx={{
                  p: "2px 4px",
                  display: "flex",
                  alignItems: "center",
                  borderRadius: "25px",
                }}
              >
                <InputBase
                  sx={{mr: 1}}
                  placeholder="جست و جو"
                  inputProps={{"aria-label": "جست و جو"}}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <IconButton type="button" sx={{p: "10px"}} aria-label="search">
                  <SearchIcon />
                </IconButton>
              </Paper>
            </Box>
            <Button
              color="text"
              onClick={handleCloseSelectServer}
              endIcon={<CloseIcon sx={{marginX: "0.5rem"}} />}
            >
              بستن
            </Button>
          </DialogTitle>
          <DialogContent>
            {servers.map((server) => (
              <Box
                key={server.id}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                width="100%"
                padding="0.5rem"
                borderRadius="1.4375rem"
                backgroundColor={
                  theme.palette.mode === "light" ? "#FFF" : "#000"
                }
              >
                <Typography variant="body1">
                  {server.name} - {server.location}
                </Typography>
                <Radio
                  value={server.url}
                  checked={selectedServerURL === server.url}
                  onChange={(e) => setSelectedServerURL(e.target.value)}
                />
              </Box>
            ))}
          </DialogContent>
        </Dialog>
      </CardContainer>
    </>
  );
};

export default SpeedTest;
