import {Fragment, useEffect, useState} from "react";
import {SvgIcon, styled, useTheme} from "@mui/material";
import {useLocation, useNavigate} from "react-router-dom";
import provinceCoords from "../../../public/data/provincesCoords.json";
import services from "../api/index";
import convertToPersian from "../utils/convertToPersian";
import Rects from "./Rects";
import MapShapes from "./MapShapes";

const BackgroundSvg = ({provinces = [], ...props}) => {
  const navigate = useNavigate();
  const {pathname} = useLocation();
  const theme = useTheme();
  const fillColor = theme.palette.mode === "dark" ? "#3F3F3F" : "#DADADA";

  const AnimatedCircle = styled("circle")(({theme, pulse, index, cx, cy}) => ({
    animation: pulse ? `pulse 1s ${195 * index}ms  infinite ` : "none",
    transformOrigin: `${cx}px ${cy}px`,
    "@keyframes pulse": {
      "0%": {
        transform: "scale(1)",
        opacity: 1,
      },

      "50%": {
        opacity: 0.5,
      },

      "100%": {
        transform: "scale(3)",
        opacity: 0,
      },
    },
  }));

  const [selectedProvince, setSelectedProvicne] = useState(null);
  const [provinceData, setProvinceData] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!selectedProvince) return;
    setLoading(true);
    services.dashboard.getCityMetrics(selectedProvince).then((response) => {
      setProvinceData(response.data.data);
      setLoading(false);
    });
  }, [selectedProvince]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSelectedProvicne(null);
    }, 3000);

    return () => clearTimeout(timer);
  }, [selectedProvince]);
  return (
    <SvgIcon
      {...props}
      sx={{
        minHeight: "100vh",
        height: "943px",
        width: "997px",
        transform: "scale(1.2)",
        top: "0",
        left: "5%",
        position: "fixed",
        zIndex: pathname === "/dashboard" ? "1" : "-1",
        opacity: pathname === "/dashboard" ? "1" : ".2",
        transition: "opacity .25s linear",
      }}
    >
      <svg
        width="1494"
        height="1117"
        viewBox="0 0 1494 1117"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <g filter="url(#filter0_d_467_4701)">
          <ellipse
            cx="-644.5"
            cy="1619.89"
            rx="2060.5"
            ry="2142.89"
            fill={theme.palette.mode === "dark" ? "#313131" : "#FFF"}
          />
        </g>
        <Rects fillColor={fillColor} />
        <defs>
          <radialGradient id="animatedGradient" cx="50%" cy="50%">
            <stop offset="0%" style={{stopColor: "#FE454388", stopOpacity: 1}}>
              <animate
                attributeName="stop-color"
                values="#FE4543;#FE454311;#FE4543ff"
                dur="2s"
                repeatCount="indefinite"
              />
            </stop>
            <stop
              offset="100%"
              style={{stopColor: "#FE4543ff", stopOpacity: 0}}
            />
          </radialGradient>

          <radialGradient
            id="paint0_radial_467_4701"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(313.659 725.048) rotate(-37.5178) scale(472.244 666.389)"
          >
            <stop stopColor="#414141" />
            <stop offset="1" stopColor="#414141" stopOpacity="0" />
          </radialGradient>

          <radialGradient
            id="paint0_radial_202_4189"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(313.5 712.5) rotate(-33.4512) scale(699.11 663.189)"
          >
            <stop stopColor="#4B788B" />
            <stop offset="1" stopColor="#1D576F" stopOpacity="0" />
          </radialGradient>

          <radialGradient
            id="tooltip_gradient"
            cx="19.58%"
            cy="-10.78%"
            r="225.55%"
            fx="19.58%"
            fy="-10.78%"
          >
            <stop offset="0%" stopColor="#333" stopOpacity="1" />
            <stop offset="100%" stopColor="#181818" stopOpacity="0.69" />
          </radialGradient>
        </defs>
        {provinces &&
          provinces.map((province, index) => (
            <Fragment key={index}>
              <AnimatedCircle
                cx={province.x}
                cy={province.y}
                r="7"
                index={index}
                pulse
                stroke="#FE4543"
              />
              <AnimatedCircle
                cx={province.x}
                cy={province.y}
                r="6.5"
                fill="#FE4543"
                s
              />
              <AnimatedCircle
                cx={province.x}
                cy={province.y}
                r="25"
                fill={"url(#animatedGradient)"}
              />
            </Fragment>
          ))}
        {Object.keys(provinceCoords).map((province, index) => (
          <circle
            key={index}
            cx={provinceCoords[province].x}
            cy={provinceCoords[province].y}
            onClick={() => {
              // TEMPORARY
              navigate("/province-profile/" + provinceCoords[province].name);
            }}
            onMouseEnter={() => {
              setSelectedProvicne(province);
            }}
            r={provinceCoords[province]?.size || 35}
            fill="transparent"
          />
        ))}
        <MapShapes />
        {provinceData && selectedProvince && (
          <g>
            <rect
              x={provinceCoords[selectedProvince].x - 100}
              y={provinceCoords[selectedProvince].y - 120}
              width={200}
              height={100}
              fill="url(#tooltip_gradient)"
              rx={15}
            />
            <text
              x={provinceCoords[selectedProvince].x + 90}
              y={provinceCoords[selectedProvince].y - 90}
              fontFamily="Arial"
              fontSize="28"
              fill="white"
            >
              {convertToPersian(selectedProvince)}
            </text>
            <text
              x={provinceCoords[selectedProvince].x + 90}
              y={provinceCoords[selectedProvince].y - 40}
              fontFamily="Arial"
              fontSize="38"
              fill="red"
            >
              {loading ? "-" : Object.keys(provinceData.issues).length}
            </text>
            <text
              x={provinceCoords[selectedProvince].x + 60}
              y={provinceCoords[selectedProvince].y - 45}
              fontFamily="Arial"
              fontSize="20"
              fill="white"
            >
              مورد اختلاف
            </text>
          </g>
        )}
      </svg>
    </SvgIcon>
  );
};

export default BackgroundSvg;
