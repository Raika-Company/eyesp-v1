import { forwardRef } from "react";
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
import { useEffect, useState } from "react";
import moment from "moment-jalaali";
import { convertToPersianNumbers } from "../../app/utils/convertToPersianNumbers";
import elipse from "../../app/assets/image/elipse.svg";
import elipseDark from "../../app/assets/image/elipse-dark.svg";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import { STATUS_MAP } from "../speedtest/constant";

import io from "socket.io-client";
import CardContainer from "../../app/common/CardContainer";
import useDynamicMP from "../../app/hooks/useDynamicMP";
import useFetchServers from "../../app/hooks/useFetchServers";
import HistoryIcon from "@mui/icons-material/History";
import SwitchBtn from "../../app/common/SwitchBtn";
import FloatingResult from "../speedtest/FloatingResult";
import axios from "axios";
import { Link } from "react-router-dom";

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

const AddressAndServer = ({ ip, server }) => (
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
  const isSmScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const pXCardContainers = useDynamicMP(390, 1440, 1.81, 4);
  const pYCardContainers = useDynamicMP(390, 1440, 1.19, 3.5);
  const [status, setStatus] = useState(2);
  const [isTestEnds, setIsTestEnds] = useState(false);
  const [socket, setSocket] = useState(null);
  const [latency, setLatency] = useState(0);
  const [download, setDownload] = useState(0);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [upload, setUpload] = useState(0);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [testStateNumber, setTestStateNumber] = useState(0);
  const [isDl, setIsDl] = useState(true);
  const [clientIp, setClientIp] = useState("");
  const { isFetchingServers, selectBestServer } = useFetchServers();
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  useEffect(() => {
    const handleButtonClick = () => {
      if (!isServerSelected) return;
      startPingTest();
      handleStart();
    };

    if (selectedServerURL) {
      handleButtonClick();
    }
  }, [selectedServerURL, isServerSelected]);

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
            ping: latency,
            speed_dl: dlStatus,
            speed_ul: ulStatus,
            test_type: "Fast",
            server_name: "TIC",
            jitter: 0,
            packet_lost: 0,
            service: "ADSL",
            user_request: false,
          };
          axios
            .post("https://speed-api.eyesp.live/api/v1/speed-test/", testResults)
            .then((response) => {
              console.log("Response:", response.data);
              setIsTestEnds(true);
            })
            .catch((error) => {
              console.error("Error:", error);
            });
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
    <p>
      Hi :D
    </p>
  );
};

export default SpeedTest;
