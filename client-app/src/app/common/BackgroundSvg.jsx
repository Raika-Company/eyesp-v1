import {Fragment, useEffect, useState} from "react";
import {SvgIcon, styled, useTheme} from "@mui/material";
import {useLocation, useNavigate} from "react-router-dom";
import provinceCoords from "../../../public/data/provincesCoords.json";
import services from "../api/index";
import convertToPersian from "../utils/convertToPersian";

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
        <rect
          x="-209"
          y="-1"
          width="913"
          height="7"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="-209"
          y="14"
          width="930"
          height="8"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="-209"
          y="29"
          width="947"
          height="8"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="-209"
          y="45"
          width="964"
          height="7"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="-209"
          y="60"
          width="979"
          height="7"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="-209"
          y="75"
          width="328"
          height="8"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="-209"
          y="90"
          width="307"
          height="8"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="-209"
          y="106"
          width="321"
          height="7"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="-177"
          y="121"
          width="296"
          height="7"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="-164.657"
          y="136.116"
          width="294.466"
          height="7.62866"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="-138.72"
          y="151.373"
          width="268.529"
          height="7.62866"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="-100.577"
          y="166.63"
          width="238.014"
          height="7.62866"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="-79.2164"
          y="181.888"
          width="227.334"
          height="7.62866"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="-68.5362"
          y="197.145"
          width="238.014"
          height="7.62866"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="-68.5362"
          y="212.402"
          width="256.323"
          height="7.62866"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="-68.5362"
          y="227.66"
          width="277.683"
          height="7.62866"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="-94.4741"
          y="242.917"
          width="318.878"
          height="7.62866"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="-208.904"
          y="258.174"
          width="465.348"
          height="7.62866"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="-208.904"
          y="273.432"
          width="465.348"
          height="7.62866"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          width="250.22"
          height="7.62866"
          rx="2.5"
          transform="matrix(1 0 0 -1 -208.904 296.318)"
          fill={fillColor}
        />
        <rect
          width="244.117"
          height="7.62866"
          rx="2.5"
          transform="matrix(1 0 0 -1 -208.904 311.575)"
          fill={fillColor}
        />
        <rect
          width="248.694"
          height="7.62866"
          rx="2.5"
          transform="matrix(1 0 0 -1 -208.904 326.832)"
          fill={fillColor}
        />
        <rect
          width="248.694"
          height="7.62866"
          rx="2.5"
          transform="matrix(1 0 0 -1 -208.904 342.089)"
          fill={fillColor}
        />
        <rect
          width="262.426"
          height="7.62866"
          rx="2.5"
          transform="matrix(1 0 0 -1 -208.904 357.347)"
          fill={fillColor}
        />
        <rect
          width="265.477"
          height="7.62866"
          rx="2.5"
          transform="matrix(1 0 0 -1 -208.904 372.604)"
          fill={fillColor}
        />
        <rect
          width="268.529"
          height="7.62866"
          rx="2.5"
          transform="matrix(1 0 0 -1 -208.904 387.861)"
          fill={fillColor}
        />
        <rect
          width="268.529"
          height="7.62866"
          rx="2.5"
          transform="matrix(1 0 0 -1 -208.904 403.119)"
          fill={fillColor}
        />
        <rect
          width="286.837"
          height="7.62866"
          rx="2.5"
          transform="matrix(1 0 0 -1 -208.904 418.376)"
          fill={fillColor}
        />
        <rect
          width="299.043"
          height="7.62866"
          rx="2.5"
          transform="matrix(1 0 0 -1 -208.904 433.633)"
          fill={fillColor}
        />
        <rect
          width="306.672"
          height="7.62866"
          rx="2.5"
          transform="matrix(1 0 0 -1 -208.904 448.891)"
          fill={fillColor}
        />
        <rect
          width="320.404"
          height="7.62866"
          rx="2.5"
          transform="matrix(1 0 0 -1 -208.904 464.148)"
          fill={fillColor}
        />
        <rect
          width="337.187"
          height="7.62866"
          rx="2.5"
          transform="matrix(1 0 0 -1 -208.904 479.405)"
          fill={fillColor}
        />
        <rect
          width="358.547"
          height="7.62866"
          rx="2.5"
          transform="matrix(1 0 0 -1 -208.904 494.663)"
          fill={fillColor}
        />
        <rect
          width="364.65"
          height="7.62866"
          rx="2.5"
          transform="matrix(1 0 0 -1 -208.904 509.92)"
          fill={fillColor}
        />
        <rect
          width="357.021"
          height="7.62866"
          rx="2.5"
          transform="matrix(1 0 0 -1 -208.904 525.177)"
          fill={fillColor}
        />
        <rect
          width="355.495"
          height="7.62866"
          rx="2.5"
          transform="matrix(1 0 0 -1 -208.904 540.435)"
          fill={fillColor}
        />
        <rect
          width="358.547"
          height="7.62866"
          rx="2.5"
          transform="matrix(1 0 0 -1 -208.904 555.692)"
          fill={fillColor}
        />
        <rect
          width="358.547"
          height="7.62866"
          rx="2.5"
          transform="matrix(1 0 0 -1 -208.904 570.949)"
          fill={fillColor}
        />
        <rect
          width="373.804"
          height="7.62866"
          rx="2.5"
          transform="matrix(1 0 0 -1 -208.904 586.206)"
          fill={fillColor}
        />
        <rect
          width="389.061"
          height="7.62866"
          rx="2.5"
          transform="matrix(1 0 0 -1 -208.904 601.464)"
          fill={fillColor}
        />
        <rect
          width="399.742"
          height="7.62866"
          rx="2.5"
          transform="matrix(1 0 0 -1 -208.904 616.721)"
          fill={fillColor}
        />
        <rect
          width="439.411"
          height="7.62866"
          rx="2.5"
          transform="matrix(1 0 0 -1 -208.904 631.979)"
          fill={fillColor}
        />
        <rect
          width="460.771"
          height="7.62866"
          rx="2.5"
          transform="matrix(1 0 0 -1 -208.904 647.236)"
          fill={fillColor}
        />
        <rect
          width="471.451"
          height="7.62866"
          rx="2.5"
          transform="matrix(1 0 0 -1 -208.904 662.493)"
          fill={fillColor}
        />
        <rect
          width="472.977"
          height="7.62866"
          rx="2.5"
          transform="matrix(1 0 0 -1 -208.904 677.75)"
          fill={fillColor}
        />
        <rect
          width="472.977"
          height="7.62866"
          rx="2.5"
          transform="matrix(1 0 0 -1 -208.904 693.008)"
          fill={fillColor}
        />
        <rect
          width="489.76"
          height="7.62866"
          rx="2.5"
          transform="matrix(1 0 0 -1 -208.904 708.265)"
          fill={fillColor}
        />
        <rect
          width="498.914"
          height="7.62866"
          rx="2.5"
          transform="matrix(1 0 0 -1 -208.904 723.522)"
          fill={fillColor}
        />
        <rect
          width="518.749"
          height="7.62866"
          rx="2.5"
          transform="matrix(1 0 0 -1 -208.904 738.78)"
          fill={fillColor}
        />
        <rect
          width="529.429"
          height="7.62866"
          rx="2.5"
          transform="matrix(1 0 0 -1 -208.904 754.037)"
          fill={fillColor}
        />
        <rect
          width="529.429"
          height="7.62866"
          rx="2.5"
          transform="matrix(1 0 0 -1 -208.904 769.294)"
          fill={fillColor}
        />
        <rect
          width="523.326"
          height="7.62866"
          rx="2.5"
          transform="matrix(1 0 0 -1 -208.904 784.552)"
          fill={fillColor}
        />
        <rect
          width="526.377"
          height="7.62866"
          rx="2.5"
          transform="matrix(1 0 0 -1 -208.904 799.809)"
          fill={fillColor}
        />
        <rect
          width="535.532"
          height="7.62866"
          rx="2.5"
          transform="matrix(1 0 0 -1 -208.904 815.066)"
          fill={fillColor}
        />
        <rect
          width="546.212"
          height="7.62866"
          rx="2.5"
          transform="matrix(1 0 0 -1 -208.904 830.323)"
          fill={fillColor}
        />
        <rect
          width="556.892"
          height="7.62866"
          rx="2.5"
          transform="matrix(1 0 0 -1 -208.904 845.581)"
          fill={fillColor}
        />
        <rect
          width="566.046"
          height="7.62866"
          rx="2.5"
          transform="matrix(1 0 0 -1 -208.904 860.838)"
          fill={fillColor}
        />
        <rect
          width="584.355"
          height="7.62866"
          rx="2.5"
          transform="matrix(1 0 0 -1 -208.904 876.095)"
          fill={fillColor}
        />
        <rect
          width="610.292"
          height="7.62866"
          rx="2.5"
          transform="matrix(1 0 0 -1 -208.904 891.353)"
          fill={fillColor}
        />
        <rect
          width="625.55"
          height="7.62866"
          rx="2.5"
          transform="matrix(1 0 0 -1 -208.904 906.61)"
          fill={fillColor}
        />
        <rect
          width="642.333"
          height="7.62866"
          rx="2.5"
          transform="matrix(1 0 0 -1 -208.904 921.867)"
          fill={fillColor}
        />
        <rect
          width="653.013"
          height="7.62866"
          rx="2.5"
          transform="matrix(1 0 0 -1 -208.904 937.125)"
          fill={fillColor}
        />
        <rect
          width="642.333"
          height="7.62866"
          rx="2.5"
          transform="matrix(1 0 0 -1 -208.904 952.382)"
          fill={fillColor}
        />
        <rect
          width="32.0404"
          height="7.62866"
          rx="2.5"
          transform="matrix(1 0 0 -1 473.098 952.382)"
          fill={fillColor}
        />
        <rect
          width="59.5035"
          height="7.62866"
          rx="2.5"
          transform="matrix(1 0 0 -1 637.877 952.382)"
          fill={fillColor}
        />
        <rect
          width="85.4409"
          height="7.62866"
          rx="2.5"
          transform="matrix(1 0 0 -1 627.197 967.639)"
          fill={fillColor}
        />
        <rect
          width="163.253"
          height="7.62866"
          rx="2.5"
          transform="matrix(1 0 0 -1 621.094 982.897)"
          fill={fillColor}
        />
        <rect
          width="187.665"
          height="7.62866"
          rx="2.5"
          transform="matrix(1 0 0 -1 608.888 998.154)"
          fill={fillColor}
        />
        <rect
          width="225.808"
          height="7.62866"
          rx="2.5"
          transform="matrix(1 0 0 -1 587.528 1013.41)"
          fill={fillColor}
        />
        <rect
          width="279.209"
          height="7.62866"
          rx="2.5"
          transform="matrix(1 0 0 -1 549.385 1028.67)"
          fill={fillColor}
        />
        <rect
          width="42.7205"
          height="7.62866"
          rx="2.5"
          transform="matrix(1 0 0 -1 643.98 937.125)"
          fill={fillColor}
        />
        <rect
          width="33.5661"
          height="7.62866"
          rx="2.5"
          transform="matrix(1 0 0 -1 648.557 921.867)"
          fill={fillColor}
        />
        <rect
          width="21.3602"
          height="7.62866"
          rx="2.5"
          transform="matrix(1 0 0 -1 654.66 906.61)"
          fill={fillColor}
        />
        <rect
          width="12.2058"
          height="7.62866"
          rx="2.5"
          transform="matrix(1 0 0 -1 662.289 891.353)"
          fill={fillColor}
        />
        <rect
          width="32.0404"
          height="7.62866"
          rx="2.5"
          transform="matrix(1 0 0 -1 473.098 967.639)"
          fill={fillColor}
        />
        <rect
          width="36.6175"
          height="7.62866"
          rx="2.5"
          transform="matrix(1 0 0 -1 473.098 982.897)"
          fill={fillColor}
        />
        <rect
          width="32.0404"
          height="7.62866"
          rx="2.5"
          transform="matrix(1 0 0 -1 477.675 998.154)"
          fill={fillColor}
        />
        <rect
          width="653.013"
          height="7.62866"
          rx="2.5"
          transform="matrix(1 0 0 -1 -208.904 967.639)"
          fill={fillColor}
        />
        <rect
          width="671.322"
          height="7.62866"
          rx="2.5"
          transform="matrix(1 0 0 -1 -208.904 982.897)"
          fill={fillColor}
        />
        <rect
          width="680.476"
          height="7.62866"
          rx="2.5"
          transform="matrix(1 0 0 -1 -208.904 998.154)"
          fill={fillColor}
        />
        <rect
          width="718.619"
          height="7.62866"
          rx="2.5"
          transform="matrix(1 0 0 -1 -208.904 1013.41)"
          fill={fillColor}
        />
        <rect
          width="735.402"
          height="7.62866"
          rx="2.5"
          transform="matrix(1 0 0 -1 -208.904 1028.67)"
          fill={fillColor}
        />
        <rect
          width="1037.5"
          height="7.62866"
          rx="2.5"
          transform="matrix(1 0 0 -1 -208.904 1043.93)"
          fill={fillColor}
        />
        <rect
          width="1034.45"
          height="7.62866"
          rx="2.5"
          transform="matrix(1 0 0 -1 -208.904 1059.18)"
          fill={fillColor}
        />
        <rect
          width="1031.39"
          height="7.62866"
          rx="2.5"
          transform="matrix(1 0 0 -1 -208.904 1074.44)"
          fill={fillColor}
        />
        <rect
          width="1025.29"
          height="7.62866"
          rx="2.5"
          transform="matrix(1 0 0 -1 -208.904 1089.7)"
          fill={fillColor}
        />
        <rect
          width="1022.24"
          height="7.62866"
          rx="2.5"
          transform="matrix(1 0 0 -1 -208.904 1104.96)"
          fill={fillColor}
        />
        <rect
          width="1019.19"
          height="7.62866"
          rx="2.5"
          transform="matrix(1 0 0 -1 -208.904 1120.21)"
          fill={fillColor}
        />
        <rect
          x="64.2023"
          y="288.689"
          width="111.378"
          height="7.62866"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="97.7685"
          y="303.946"
          width="62.555"
          height="7.62866"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="193.889"
          y="288.689"
          width="45.7719"
          height="7.62866"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="216.776"
          y="303.946"
          width="33.5661"
          height="7.62866"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="222.878"
          y="319.203"
          width="33.5661"
          height="7.62866"
          rx="2.5"
          fill={fillColor}
        />
        <rect x="162" y="75" width="626" height="8" rx="2.5" fill={fillColor} />
        <rect x="186" y="90" width="614" height="8" rx="2.5" fill={fillColor} />
        <rect
          x="195"
          y="106"
          width="623"
          height="7"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="290.01"
          y="181.888"
          width="598.087"
          height="7.62866"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="207"
          y="121"
          width="625"
          height="7"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="302.216"
          y="197.145"
          width="599.612"
          height="7.62866"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="334.257"
          y="258.174"
          width="616.395"
          height="7.62866"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="233.558"
          y="136.116"
          width="616.395"
          height="7.62866"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="312.896"
          y="212.402"
          width="602.664"
          height="7.62866"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="347.988"
          y="273.432"
          width="614.87"
          height="7.62866"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="248.815"
          y="151.373"
          width="614.87"
          height="7.62866"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="326.628"
          y="227.66"
          width="602.664"
          height="7.62866"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="358.669"
          y="288.689"
          width="614.87"
          height="7.62866"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="271.701"
          y="166.63"
          width="604.19"
          height="7.62866"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="334.257"
          y="242.917"
          width="605.715"
          height="7.62866"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="361.72"
          y="303.946"
          width="620.973"
          height="7.62866"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="398.337"
          y="319.203"
          width="593.509"
          height="7.62866"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="502.087"
          y="334.461"
          width="500.44"
          height="7.62866"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="534.128"
          y="349.718"
          width="479.08"
          height="7.62866"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="573.797"
          y="364.976"
          width="450.091"
          height="7.62866"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="592.105"
          y="380.233"
          width="440.936"
          height="7.62866"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="636.351"
          y="395.49"
          width="404.319"
          height="7.62866"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="643.98"
          y="410.747"
          width="404.319"
          height="7.62866"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="654.66"
          y="426.005"
          width="402.793"
          height="7.62866"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="660.763"
          y="441.262"
          width="404.319"
          height="7.62866"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="665.341"
          y="456.519"
          width="407.37"
          height="7.62866"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="659.237"
          y="471.777"
          width="422.628"
          height="7.62866"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="665.341"
          y="487.034"
          width="425.679"
          height="7.62866"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="665.341"
          y="502.291"
          width="433.308"
          height="7.62866"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="679.072"
          y="517.549"
          width="425.679"
          height="7.62866"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="677.546"
          y="532.806"
          width="434.833"
          height="7.62866"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="698.907"
          y="563.32"
          width="427.205"
          height="7.62866"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="708.061"
          y="578.578"
          width="424.153"
          height="7.62866"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="735.524"
          y="593.835"
          width="404.319"
          height="7.62866"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="743.152"
          y="609.093"
          width="402.793"
          height="7.62866"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="744.678"
          y="624.35"
          width="407.37"
          height="7.62866"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="738.576"
          y="639.607"
          width="419.576"
          height="7.62866"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="737.05"
          y="654.865"
          width="427.205"
          height="7.62866"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="752.307"
          y="670.122"
          width="414.999"
          height="7.62866"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="766.039"
          y="685.379"
          width="405.844"
          height="7.62866"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="793.501"
          y="700.636"
          width="382.959"
          height="7.62866"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="810.285"
          y="715.894"
          width="370.753"
          height="7.62866"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="822.49"
          y="731.151"
          width="358.547"
          height="7.62866"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="834.696"
          y="746.408"
          width="346.341"
          height="7.62866"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="845.376"
          y="761.666"
          width="338.712"
          height="7.62866"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="843.851"
          y="776.923"
          width="344.815"
          height="7.62866"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="828.593"
          y="792.18"
          width="363.124"
          height="7.62866"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="950.652"
          y="807.438"
          width="242.591"
          height="7.62866"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="958.28"
          y="822.695"
          width="238.014"
          height="7.62866"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="975.925"
          y="838.021"
          width="223.985"
          height="7.62866"
          rx="2.5"
          transform="rotate(-0.0351165 975.925 838.021)"
          fill={fillColor}
        />
        <rect
          x="985.744"
          y="853.357"
          width="215.944"
          height="7.62866"
          rx="2.5"
          transform="rotate(-0.0351165 985.744 853.357)"
          fill={fillColor}
        />
        <rect
          x="1013.47"
          y="868.582"
          width="191.494"
          height="7.62866"
          rx="2.5"
          transform="rotate(-0.0351165 1013.47 868.582)"
          fill={fillColor}
        />
        <rect
          x="1045.14"
          y="883.822"
          width="159.824"
          height="7.62866"
          rx="2.5"
          transform="rotate(-0.0351165 1045.14 883.822)"
          fill={fillColor}
        />
        <rect
          x="1026.85"
          y="899.09"
          width="178.12"
          height="7.62866"
          rx="2.5"
          transform="rotate(-0.0351165 1026.85 899.09)"
          fill={fillColor}
        />
        <rect
          x="1041.98"
          y="914.339"
          width="166.436"
          height="7.62866"
          rx="2.5"
          transform="rotate(-0.0351165 1041.98 914.339)"
          fill={fillColor}
        />
        <rect
          x="1056.05"
          y="929.589"
          width="153.767"
          height="7.62866"
          rx="2.5"
          transform="rotate(-0.0351165 1056.05 929.589)"
          fill={fillColor}
        />
        <rect
          x="1109.18"
          y="944.815"
          width="103.802"
          height="7.62866"
          rx="2.5"
          transform="rotate(-0.0351165 1109.18 944.815)"
          fill={fillColor}
        />
        <rect
          x="1112"
          y="960.073"
          width="100.986"
          height="7.62866"
          rx="2.5"
          transform="rotate(-0.0351165 1112 960.073)"
          fill={fillColor}
        />
        <rect
          x="1118.33"
          y="975.326"
          width="94.6531"
          height="7.62866"
          rx="2.5"
          transform="rotate(-0.0351165 1118.33 975.326)"
          fill={fillColor}
        />
        <rect
          x="1123.61"
          y="990.58"
          width="89.3749"
          height="7.62866"
          rx="2.5"
          transform="rotate(-0.0351165 1123.61 990.58)"
          fill={fillColor}
        />
        <rect
          x="1128.19"
          y="1005.83"
          width="84.8"
          height="7.62866"
          rx="2.5"
          transform="rotate(-0.0351165 1128.19 1005.83)"
          fill={fillColor}
        />
        <rect
          x="1134.52"
          y="1021.09"
          width="78.4657"
          height="7.62866"
          rx="2.5"
          transform="rotate(-0.0351165 1134.52 1021.09)"
          fill={fillColor}
        />
        <rect
          x="1141.91"
          y="1036.34"
          width="75.3002"
          height="7.62866"
          rx="2.5"
          transform="rotate(-0.0351165 1141.91 1036.34)"
          fill={fillColor}
        />
        <rect
          x="1145.95"
          y="1051.6"
          width="73.0235"
          height="7.62866"
          rx="2.5"
          transform="rotate(-0.0351165 1145.95 1051.6)"
          fill={fillColor}
        />
        <rect
          x="1149"
          y="1066.86"
          width="73.0235"
          height="7.62866"
          rx="2.5"
          transform="rotate(-0.0351165 1149 1066.86)"
          fill={fillColor}
        />
        <rect
          x="1154.51"
          y="1082.11"
          width="70.5665"
          height="7.62866"
          rx="2.5"
          transform="rotate(-0.0351165 1154.51 1082.11)"
          fill={fillColor}
        />
        <rect
          x="1160.48"
          y="1097.37"
          width="67.6454"
          height="7.62866"
          rx="2.5"
          transform="rotate(-0.0351165 1160.48 1097.37)"
          fill={fillColor}
        />
        <rect
          x="1167.35"
          y="1112.62"
          width="60.7765"
          height="7.62866"
          rx="2.5"
          transform="rotate(-0.0351165 1167.35 1112.62)"
          fill={fillColor}
        />
        <rect
          x="820.965"
          y="807.438"
          width="112.904"
          height="7.62866"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="825.542"
          y="822.695"
          width="85.4409"
          height="7.62866"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="831.645"
          y="837.952"
          width="51.8749"
          height="7.62866"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="689.752"
          y="548.063"
          width="430.256"
          height="7.62866"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="401.389"
          y="334.461"
          width="73.2351"
          height="7.62866"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="407.492"
          y="349.718"
          width="24.4117"
          height="7.62866"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="407.492"
          y="364.976"
          width="13.7316"
          height="7.62866"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="49"
          y="305"
          width="783"
          height="567"
          fill="url(#pattern0)"
          fillOpacity="0.25"
        />
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
            onMouseOver={() => {
              setSelectedProvicne(province);
            }}
            r={provinceCoords[province]?.size || 35}
            fill="transparent"
          />
        ))}
        <defs>
          <filter
            id="filter0_d_467_4701"
            x="-2783"
            y="-601"
            width="4277"
            height="4441.78"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset />
            <feGaussianBlur stdDeviation="39" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0.556863 0 0 0 0 0.866667 0 0 0 0.4 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_467_4701"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_467_4701"
              result="shape"
            />
          </filter>
          <pattern
            id="pattern0"
            patternContentUnits="objectBoundingBox"
            width="1"
            height="1"
          >
            <use
              xlinkHref="#image0_467_4701"
              transform="matrix(0.00129199 0 0 0.00178418 0 -0.00581395)"
            />
          </pattern>
        </defs>
        <g id="XMLID_00000105408151236523578030000016764436316977395331_">
          <g>
            <linearGradient
              id="SVGID_1_"
              gradientUnits="userSpaceOnUse"
              x1="193.2682"
              y1="466.957"
              x2="736.2739"
              y2="-76.0486"
            >
              <stop offset="0" stopColor="#53A2D9" stopOpacity=".7" />
              <stop offset="0.1217" stopColor="#4A91C3" stopOpacity=".6197" />
              <stop offset="1" stopColor="#07172B" stopOpacity="4.000000e-02" />
            </linearGradient>

            <radialGradient
              id="paint0_radial_681_3994"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(261.5 206.5) rotate(43.4986) scale(796.122 877.716)"
            >
              <stop stopColor="#293B43" />
              <stop offset="1" stopColor="#102D3B" stopOpacity="0.4" />
              <stop offset="1" stopColor="#162932" stopOpacity="0" />
            </radialGradient>
            <path
              transform="translate(49, 306)"
              pointerEvents="none"
              fill={
                theme.palette.mode === "dark"
                  ? "url(#paint0_radial_467_4701)"
                  : "url(#SVGID_1_)"
              }
              d="M639.2,549.8c-0.2,0.3-0.4,0.3-0.6,0l-2.4-2.8c-0.2-0.2-0.5-0.3-0.7-0.2l-7.1,1.8c-0.4,0.1-0.7,0-1-0.2
			c-1.3-0.8-2.6-0.8-4,0c-0.3,0.2-0.7,0.1-0.9-0.2c-1-1.7-2.1-3.3-3.1-4.9c-1.3-2-3.3-3-4.6-5.1c-1.3-2.2-0.2-4.4-2-6.4
			c-1.9-2.1-3.6-4.3-5.1-6.7c-0.9-1.4-2-3.9-3.2-7.4c-1.2-3.3-2.7-6.5-4.6-9.6c-1.6-2.6-4.3-5.1-6-8.4c-0.2-0.3-0.4-0.5-0.7-0.6
			l-1.2-0.3c-0.3-0.1-0.5-0.2-0.7-0.5c-3.8-5.5-7.8-3.7-13.1-3.9c-2.2-0.1-4.4-0.1-6.6-0.1c-0.4,0-0.7,0.1-1,0.3l-5.2,3.1
			c-0.2,0.1-0.3,0.3-0.4,0.4l-3.3,6c-0.2,0.4-0.5,0.7-0.9,0.8l-6.6,2.5c-0.3,0.1-0.6,0.3-0.8,0.6c-1.8,2.2-2,4.6-0.7,7.2
			c0.2,0.3,0.2,0.7,0.1,1c-0.8,2.5-2.3,3.5-4.5,3c-2.6-0.6-4.8-1.1-5.2,2.2c0,0.3-0.2,0.6-0.4,0.9c-3.7,3.5-5.4,8.4-8.5,12.4
			c-0.1,0.1-0.2,0.2-0.3,0.2l-4.6,1c-0.3,0.1-0.6,0-0.8-0.2l-2-2c-0.3-0.3-0.7-0.5-1.1-0.5c-1.4-0.2-2.7,0-3.9,0.7
			c-0.3,0.2-0.7,0.2-1,0c-2-1.2-2.5-3.2-5.1-4.7c-0.3-0.2-0.6-0.2-0.9,0c-2.9,1.4-5.8,1.6-8.9,0.5c-0.3-0.1-0.7,0-0.9,0.2
			c-1.8,1.9-3.9,3-6.2,3.2c-1.5,0.1-3.3-0.3-5.4-1.4c-2.5-1.2-6.2-2.2-7.2-5.1c-1-2.8-1.7-3.1-4.4-3.7c-4.9-1-10.2-1.2-14.7-3.4
			c-3.5-1.7-8.5-3.4-11.4-5.9c-0.2-0.2-0.4-0.5-0.3-0.8c0-0.2,0.1-0.3,0.2-0.5c-0.4-0.5-0.6-1-0.7-1.5c-0.5,0.4-0.9,0.8-1.4,1.5
			c-0.3,0.5-0.9,0.8-1.5,0.6c-0.8-0.1-1.3-0.9-1.1-1.6c0.1-0.6,0.6-0.9,1.4-0.9c0.3,0,0.7-0.2,0.9-0.5c0.3-0.5,0.2-1.1-0.3-1.5
			c-2.4-1.7-4.8-3.5-7.1-5.4c-3.4-2.8-5.9-3.1-10.1-2.9c-4.6,0.2-7.3-5.8-13.3-5.2c-5.1,0.5-8.4,3.2-13.6,1.3
			c-6.2-2.3-10.7-6.4-13.5-12.5c-1.7-3.8-5.4-6.5-8.3-9.4c-2.4-2.4-4.3-6-5.7-10.7c-0.9-3.3-2.6-5.6-5.9-6.1
			c-3.1-0.5-5.3-1.9-6.8-4.2c-0.2-0.3-0.2-0.5,0-0.8l0.1-0.2c0,0,0.1-0.1,0.1-0.1c0.3-0.2,0.7-0.2,0.9,0l1.3,1.3
			c0.4,0.4,0.6,0.3,0.8-0.2c1.7-5.1-1.1-7.8-5.3-9.4c-1.5-0.6-2.8-0.2-4,0.9c-0.4,0.4-1,0.6-1.6,0.4c-0.8-0.2-1.3-1.1-1.1-2l0.7-2.6
			c0.1-0.3,0.1-0.7-0.1-1c-1-2.4-2-4.8-3.2-7.1c-0.6-1.3-1.6-2.4-2.8-3.2c-3.3-2.3-6.6-4.6-9.9-6.9c-1.6-1.1-3.7-3.2-6.2-6.1
			c-1.5-1.7-3.4-2.4-5.2-3.9c-0.2-0.2-0.4-0.5-0.5-0.8c-0.9-3.8-2.7-7.1-5.3-10c0,0,0,0,0,0c-0.2-0.2-0.1-0.6,0.1-0.8
			c0.1,0,0.1-0.1,0.2-0.1c-0.1-0.1-0.3-0.1-0.4-0.1c-0.9-0.3-1.7-0.6-2.7-0.8l-0.1,0.1c-0.1,0.1-0.2,0.1-0.4,0.1
			c-1.8-0.3-3.1-0.1-3.8,0.6c-3.5,3.4-6.7,6.8-9.7,10.2c-0.2,0.3-0.6,0.4-0.9,0.5c-0.9,0.1-1.6-0.4-1.8-1.3
			c-0.3-1.9-1.2-3.3-2.7-4.3c-0.3-0.2-0.7-0.3-1-0.2c-1.2,0.2-2.3,0.3-3.5,0.4c-0.1,0-0.9,0.2-2.3,0.6c-2,0.6-2.8-3.1-3.6-4.4
			c-0.3-0.5-0.6-0.5-0.8,0.1l-0.5,1.3c-0.1,0.3-0.4,0.5-0.7,0.4c-1.9-0.4-7.5-2.2-7-5.1c-0.9-0.3-1.8-0.6-2.8-0.8
			c-0.6,0.3-1.4,0.6-2.1,0.6c-1.7,2.6-0.5,4.3,1.8,6.5c2.1,2,3.2,4.9,3.4,8.5c0,0.8-0.5,1.4-1.3,1.5l-5.9,0.8c-0.3,0-0.5,0-0.8-0.2
			l-1.5-0.9c-0.1-0.1-0.3-0.1-0.5-0.1c-0.3,0.1-0.4,0.4-0.3,0.7l1,2.9c0.1,0.1,0.1,0.3,0.1,0.5c0,0.7-0.6,1.2-1.2,1.1l-3.4-0.1
			c-0.4,0-0.8-0.2-1-0.6l-4.2-5.8c-0.2-0.3-0.3-0.6-0.2-1l0.3-1.5c0.1-0.4-0.1-0.8-0.4-1.1l-5.4-4.5c-0.3-0.2-0.7-0.4-1.1-0.3
			l-2.2,0.2c-0.4,0-0.7-0.1-0.9-0.5c-1.2-2.2-3-6-6.2-4.5c-0.1,0-0.2,0.1-0.2,0.1c-0.8,0.2-1.6-0.3-1.8-1l-5.9-22.3
			c-0.3-1.1-0.9-1.5-2-1.3l-9.8,1.5c-0.6,0.1-1.2-0.3-1.3-0.9c-1.2-4.6-2.3-9.2-3.6-13.8c-0.5-1.9-0.7-3.8-0.5-5.7
			c0.4-4.2,0.7-8.5,1.1-12.7c0.2-1.9,0-3.4-1.6-4.7c-3.3-2.7-5.3-4.7-6.1-5.8c-1-1.5-2.3-2.6-3.8-3.3c-0.1,0-0.2-0.1-0.2-0.1
			c-0.4-0.4-0.4-0.9-0.1-1.3l0.1-0.1c-0.8-0.2-1.5-0.7-2.1-1.3c-0.1,0-0.1,0.1-0.2,0.1c-0.1,0.1-0.3,0.1-0.5,0.2
			c-0.9,0.2-1.7-0.4-1.9-1.2l-0.5-2.2c-0.1-0.3-0.2-0.6-0.5-0.8l-4-3.6c-0.2-0.2-0.4-0.5-0.5-0.8c-0.9-4.3-6.6-8.8-10.7-5
			c-0.3,0.2-0.6,0.3-0.9,0.3c-1.3-0.2-2.5-0.6-3.4-1.2c-4.1-2.5-9.4-6-16-10.3c-4.9-3.3-11.4-5.9-19.2-7.7c-0.4-0.1-0.7-0.1-1,0.1
			l-3.5,1.4c-0.4,0.2-0.8,0.1-1.2,0c-0.7-0.4-1-1.2-0.7-2l0.8-1.7c0.1-0.3,0-0.7-0.3-0.9l-2-1.1c-0.1,0-0.1-0.1-0.1-0.1
			c-0.1-0.2-0.1-0.4,0.1-0.6c6.2-4.7-0.9-8.7-3.9-11.7c-0.4-0.4-1.1-1.5-2-3.1c-0.9-1.5-2.2-2.6-4-3.1c-0.3-0.1-0.5,0-0.6,0.3
			l-0.3,0.7c-0.2,0.5-0.4,0.5-0.7,0.1l-0.6-0.8c-0.1-0.1-0.1-0.1-0.1-0.2c0-0.3,0.1-0.5,0.4-0.5c0.7-0.1,1-0.5,1-1.1
			c0-0.3-0.1-0.6-0.3-0.9c-1.6-2.5-3.9-5.3-6.9-2.1c-0.1,0.1-0.2,0.1-0.3,0.2c-0.3,0-0.5-0.2-0.6-0.5l0-0.5c-0.7,0-1.3-0.1-1.9-0.4
			c0,0,0,0,0,0.1c-0.3,0.3-0.9,0.3-1.2-0.1l-10-11.3c-0.2-0.3-0.6-0.4-0.9-0.4l-1.9,0c0,0-0.1,0-0.1,0c-0.5-0.1-0.8-0.5-0.7-0.9
			c0.3-2.6,1.4-4.8,3.2-6.6c0.2-0.2,0.3-0.6,0.3-0.9c-0.4-1.9-0.7-3.1-0.6-5.3c0.5-6.5-7.6-3-6.7-8.1c0.1-0.3,0.2-0.5,0.5-0.7
			l1.3-0.9c0.2-0.1,0.3-0.4,0.2-0.6l-0.7-3.2c0-0.1,0-0.2,0-0.3c0.1-0.3,0.4-0.4,0.8-0.3c1.9,0.8,3.8,1,5.8,0.8c0.1,0,0.2,0,0.3-0.1
			c0.7-0.2,1-1,0.8-1.6c-0.9-2.4-2.2-4.6-4-6.6c-0.2-0.2-0.3-0.5-0.3-0.8c0-1.6,0.8-2.8,2.1-3.7c0.3-0.2,0.4-0.5,0.4-0.8
			c-0.2-1.8,0.6-2.5,2.4-2.2c0.3,0.1,0.5,0,0.6-0.3c0.9-1.9,0.9-3.8-0.2-5.6c-0.3-0.5-0.3-1.1-0.1-1.6c0.4-0.9,1.4-1.2,2.3-0.8
			c0.5,0.2,0.9,0.3,1.3,0.3c0.2,0,0.5,0,0.7-0.1l4.7-1.8c0.2-0.1,0.3-0.2,0.3-0.5l0-4.1c-0.2-0.5-0.3-0.9-0.4-1.4c0,0,0,0,0,0
			l-2-0.8c-0.2-0.1-0.2-0.3-0.2-0.5c0.1-0.2,0.4-0.3,0.6-0.2c0,0,0.1,0,0.1,0c-0.3-0.5-0.6-1-0.7-1.5c-0.2-0.6-0.2-1.3-0.1-2
			c-3.7-3.1-8.9-5.7-7.5-11.5c0.1-0.3,0-0.7-0.2-0.9l-0.7-0.8c-0.2-0.2-0.2-0.4-0.3-0.7c-0.1-0.7,0.4-1.2,1.1-1.3
			c2.8-0.3,10-2.1,9.6-6.1c0-0.3-0.1-0.6-0.3-0.9c-0.6-1.1-2-1.5-3.1-0.9l-2.3,1.2c-0.3,0.2-0.8,0.1-1-0.1c-1.7-1.6-3.1-2.3-5.6-1.7
			c-2.9,0.7-5.8,1.5-8.5,2.4c-0.8,0.3-1.8,0-2.2-0.8c-1.7-2.5-3.9-4.3-6.7-5.5c-0.6-0.2-0.8-0.8-0.8-1.4c-0.7,0.3-1.5,0.5-2.3,0.7
			c-0.8,0.2-1.6,0.1-2.3,0c-0.9,0.5-1.8,1-2.9,1.3c-0.2,0.1-0.4,0.1-0.6,0c-0.5-0.2-0.8-0.7-0.6-1.2c1-2.8-1.5-4.8-2.4-6.7
			c-1.4-3.1-3-6.3-4.7-9.7c0-0.1-0.1-0.2-0.2-0.3c-0.7-1.1-2.2-1.4-3.3-0.6c-0.8,0.6-1.7,0.6-2.5,0.2c-0.4-0.2-0.8-0.5-0.9-0.6
			l-3.1-3.6c-0.3-0.3-0.4-0.7-0.3-1.1c1-6.5-1.8-9.9-8.4-10.2c-0.2,0-0.4-0.1-0.6-0.2c-0.6-0.4-0.8-1.1-0.4-1.7l1.2-1.9
			c0.1-0.2,0.2-0.4,0.1-0.7l-1.6-5.6c-0.1-0.3-0.3-0.5-0.5-0.6l-4.8-2.2c-0.4-0.2-0.6-0.5-0.5-0.9c0.3-1.3,0.1-2.6-0.6-3.7
			c-0.2-0.3-0.2-0.7-0.1-1.1l0.8-2c0.3-0.8,0-1.6-0.7-2.1l-9.7-5.9c-0.2-0.1-0.2-0.2-0.3-0.4l-0.7-5.7c0-0.2-0.1-0.4-0.3-0.5
			c-1.6-1-1.8-2.2-0.5-3.6c0.2-0.2,0.3-0.5,0.1-0.8c-1.8-3.7-4.6-3.2-7.8-4.3c-0.3-0.1-0.5-0.3-0.7-0.5c-1.7-2.3-3.9-3.1-6.6-2.4
			c-0.3,0.1-0.6,0-0.8-0.3c-2.1-3.2,1.7-8.8,2.9-12c0.1-0.3,0.1-0.7-0.1-1c-1-1.7-0.8-3,0.8-4.1c0.3-0.2,0.5-0.5,0.6-0.8
			c0.8-2.5-2.3-5.6-4-3.7c-0.2,0.2-0.5,0.4-0.8,0.5c-0.8,0.2-1.7-0.4-1.8-1.2c-0.8-4.1-1.2-7-3.1-11c-1.1-2.3-1.8-4.8-2.1-7.4
			c0-0.4-0.2-0.7-0.5-0.9c-2.2-1.5-4-3.5-5.2-5.9c-0.2-0.3-0.2-0.6-0.1-0.9c1.2-4,0-6.7-3.7-8c-0.9-0.3-1.5-1.1-1.7-2
			c-0.5-2-1.4-3.7-2.8-5.2c-0.1-0.1-0.2-0.3-0.2-0.4c0-0.4,0.3-0.7,0.7-0.8l5-0.3c0.2,0,0.4,0,0.6,0.1c2.5,1.5,7.6,0.8,7.1-3
			c-0.1-0.9-0.3-1.9-0.4-2.8c-0.3-1.8,0.4-3.1,0.4-4.9c-0.1-2.4,0.5-3.5,2.4-4.7c0.3-0.2,0.6-0.2,0.9,0c3.5,2,7,3.8,10.6,5.6
			c3.7,1.9,3.2,6.5,6.8,8.3c3.7,1.8,6.4,4.6,8.2,8.5c0.1,0.3,0.4,0.5,0.8,0.5c2.3,0.2,4.2,0.2,6.1,1.7c2.5,2.1,4.5,4.5,6.3,7.2
			c0.2,0.2,0.2,0.5,0,0.7c0.3,0.2,0.7,0.4,0.9,0.6c0.4,0,0.8,0,1.2,0c0.2,0,0.3,0,0.5,0c0,0,0.1-0.1,0.1-0.1
			c0.2-0.2,0.5-0.3,0.8-0.3C71,35.8,77.2,36.7,81,38c2,0.7,3.8,1,5.5,0.8c3-0.2,4.4-3.4,7.9-2.3c1.4,0.5,2.9,0.9,4.3,1.4
			c0.3,0.1,0.6,0.1,0.9-0.1c3.1-1.8,2.2-4.7,5.2-6.4c0.3-0.2,0.5-0.4,0.7-0.7l2.4-4.3c0.2-0.3,0.4-0.5,0.8-0.6
			c0.7-0.2,1.3-0.3,1.9-0.3c0.7-0.4,1.6-0.6,2.3-0.6c1,0,1.8,0.3,2.6,0.8c0,0,0.1,0,0.1,0c0,0-0.1,0-0.1-0.1c0.1,0,0.1,0,0.2,0.1
			c0,0,0.1,0,0.1,0c-0.4-0.5-0.8-0.9-1.1-1.2c-0.3-0.3-0.3-0.7-0.2-1.1l1.7-3.6c0.2-0.4,0.5-0.6,0.9-0.7c3.2-0.7,5.4-2.5,6.7-5.4
			c0.1-0.3,0.4-0.5,0.6-0.7c3.9-1.9,7.5-4.2,10.7-7.1c2.8-2.5,6.1-3,8.9-0.5c3.5,3,7.1,6,10.9,8.9c0.2,0.1,0.3,0.3,0.4,0.5
			c0.2,0.6-0.1,1.2-0.7,1.4c-1.7,0.6-4,1.2-4.8,2.9c-2.4,4.7,7.1,7.2,8.9,10.2c0.1,0.1,0.1,0.3,0.2,0.4c0.2,0.9-0.3,1.8-1.2,2
			c-3.4,0.8-6.3,0.5-7.9,4.2c-0.1,0.3-0.1,0.6,0,0.9c1.6,3.3,4.8,4.2,8.9,5.8c0.3,0.1,0.6,0.4,0.8,0.7c1.2,2.2,2.9,3.7,5.2,4.7
			c0.3,0.2,0.7,0.2,1,0l0.7-0.2c0.3-0.1,0.6,0,0.8,0.1l10.3,9c0.1,0,0.2,0,0.4,0.1c0.6,0.1,1.2,0.1,1.8,0.2c0,0-0.1-0.1-0.1-0.1
			c-0.2-0.3-0.1-0.6,0.2-0.8l3.3-2.2c0.2-0.1,0.3-0.2,0.5-0.2c0.8-0.2,1.6,0.3,1.7,1.1c0.5,2.3,1.2,4.5,2.1,6.4
			c2.8,6.4,5.5,12.6,8.9,18.7c3.5,6.3,12.5,10.5,19.3,11.9c2.2,0.5,6.4,0.8,12.5,1.1c0.1,0,1.1-0.1,2.9-0.4c1.5-0.2,2.9,0.7,4.1,1
			c2.4,0.5,6.6,0.4,7.9,2.8c3.9,7.4,8.5,9.9,14.7,13.7c0,0,0.1,0.1,0.1,0.1c0.3,0.2,0.5,0.6,0.5,1c0.7,0.2,1.4,0.5,2,0.9
			c0.2-0.1,0.3,0,0.5,0.1c4.6,2.3,9.3,4.6,14,6.8c2.1,1,4.4,1.7,6.8,2c7.4,1.1,14.7,2.3,22,3.6c7.8,1.4,10.8-1.7,17.5-3.8
			c5.3-1.6,10.4-2.9,15.6-5c4.8-2,9.8-3.7,14.8-5.1c2.1-0.6,3.5-0.6,4.6-0.4c2.7-1.1,5.5-1.3,8.6-1.2c0.3,0,0.6,0,0.9,0.1
			c0.9-0.2,1.7-0.4,2.6-0.7c0,0,0.1,0,0.1,0c0.2-0.8,0.6-1.6,1.2-2.2c-2.4-4.7-5.2-9.2-8.2-13.7c-0.1-0.2-0.2-0.4-0.1-0.7
			c0.1-0.5,0.6-0.8,1.1-0.7c5.8,1.1,10.9-0.3,15.2-4.2c0.3-0.2,0.6-0.4,1-0.4c4.3,0,6.5-2.1,6.5-6.3c0-0.3-0.1-0.6-0.3-0.9
			c-1.3-1.6-1.6-3.4-1-5.3c0.1-0.4,0.4-0.7,0.7-0.9c2.1-1.5,3.6-3.4,4.6-5.7c0.1-0.3,0.4-0.6,0.7-0.8c2.2-1.4,4.2-2.8,6.2-4.5
			c2.3-1.9,8-3.3,10.9-2.6c3.3,0.8,6.3,1.8,9.5,0.5c0,0,0,0,0,0c0.2,0,0.3,0,0.5,0c1.4-0.4,2.9-0.6,4.3-0.7c0.5-0.2,0.8-0.7,0.9-1.3
			c0.2-1.1-0.4-1.7-1-2.6c-0.2-0.3-0.2-0.5-0.1-0.8c0.8-1.9,2.1-2.7,3.8-2.3c2.1,0.5,3.9,0.4,5.2-0.1c0.3-0.1,0.6-0.1,0.8-0.1
			l9.9,2.5c0.5,0.1,0.8,0,1-0.5l1.2-2.4c0.1-0.1,0.1-0.2,0.2-0.3c0.4-0.3,1-0.3,1.4,0.1l5.1,5.7c0.2,0.3,0.4,0.6,0.5,0.9
			c1.6,6.6,6.5,4.9,11.7,6c0.3,0.1,0.4,0.2,0.4,0.4c0.7,0.1,1.3,0.4,1.9,0.7c0,0,0.1-0.1,0.1-0.1c0.3-0.2,0.6-0.3,0.9-0.2l12.3,3.6
			c0.3,0.1,0.6,0.3,0.7,0.6c1.8,3.4,4.8,5,8.8,4.7c1.2-0.1,2-0.8,2.2-2.2c0-0.1,0-0.1,0.1-0.2c0.1-0.2,0.5-0.3,0.7-0.2l2.4,1.4
			c0.3,0.2,0.6,0.3,1,0.3c1.4,0,2.6-0.3,3.8-1.1c0.3-0.2,0.6-0.3,1-0.2c4.3,1.1,8.2,2.9,11.9,5.4c0,0,0,0,0,0c0.4,0.3,1,0.2,1.3-0.3
			c0.4-0.6,0.9-0.6,1.7-0.1c0.3,0.2,0.5,0.6,0.7,1.1c2.5,6.8,7.2,11,14,12.6c1.7,0.4,3.4,1,5,1.7c1.7,0.8,3.5,1.4,5.3,1.8
			c0.3,0.1,0.6,0.2,0.8,0.5c2.2,2.4,3.9,4.4,6.6,6.7c1.8,1.5,3.4,3.2,4.8,5.1c1.2,1.5,2.3,1.8,4.2,1.6c6-0.7,12-1.2,18-1.5
			c0.9,0,1.7,0.5,2,1.3s0.6,1.7,1,2.6c0.7,2.1,0.4,5,1.8,6.7c1.3,1.6,2.5,3.3,3.5,5.1c1.6,2.7,1.3,4.9,1.2,7.9
			c0,0.3,0.1,0.5,0.4,0.6c4,1.9,6,5.1,6,9.7c0,0.2,0.1,0.4,0.2,0.5l3.4,4.1c0.2,0.2,0.3,0.6,0.2,0.9c-0.6,2.8-0.5,5.5,0.2,8.3
			c0.1,0.4,0,0.7-0.4,0.9l-0.5,0.3c-0.3,0.2-0.4,0.4-0.4,0.8c0.4,2,1.3,3.7,2.7,5.1c0.2,0.2,0.4,0.5,0.4,0.9c0.3,3,0.8,5.9,1.5,8.8
			c0.7,2.6-0.7,4.1-0.5,6.6c0.2,2.8-1,4.8-3.5,5.8c-0.2,0.1-0.3,0.2-0.5,0.3c-0.4,0.5-0.4,1.2,0.1,1.7l6.1,5.4
			c0.1,0.1,0.2,0.3,0.2,0.5c0,0.4-0.3,0.7-0.7,0.7l-3,0c-0.4,0-0.7,0.2-1,0.5c-1.8,2.6-2.5,5.4-2.2,8.5c0,0,0,0,0,0
			c0,0.5-0.3,0.9-0.8,0.9c-0.4,0-0.9,0.1-1.3,0.1c0.2,0.5,0.3,1.1,0.5,1.6c0.5-0.1,0.9-0.1,1.4-0.2c0.3,0,0.6,0.1,0.8,0.3
			c2.4,3.1,3.9,6.5,4.5,10.2c0.3,2,0.9,3.4,1.5,4.3c2.6,3.4,6.3,4.6,11.2,3.5c0.3-0.1,0.7,0,1,0.3c0.4,0.4,0.4,1.1,0,1.5
			c-0.5,0.5-0.7,1.1-0.4,1.9c0,0.1,0,0.2,0,0.3l-2.8,11.3c-0.1,0.4-0.1,0.8,0.1,1.1c1.1,2.8,2.7,5.7,4.7,8.8
			c6.7,10,11.7,17.8,15,23.5c0.9,1.6,1.6,3.6,1.9,5.8c0.4,2.4,0.8,4.2,1.3,5.4c1.4,3.5,2.7,6.3,4.3,10.4c1,2.5,2.2,4.9,3.6,7.2
			c0.2,0.3,0.5,0.5,0.8,0.6c2.2,0.6,4.3,0.8,6.6,0.4c1-0.2,1.9,0.4,2.2,1.3c0,0.1,0,0.1,0.1,0.2c0.5,0.1,0.9,0.2,1.4,0.4
			c-0.1-0.3-0.2-0.5-0.3-0.8c0-0.1,0-0.1,0-0.2c0-0.3,0.3-0.5,0.6-0.5l12.7,0.5c1.3,0,2.5,0.8,3.2,2c2.1,4,5.5,7.8,6.7,12.1
			c0.7,2.6,1.5,4.7,0.8,7.5c-3.2,13-6.6,25.9-10.1,38.8c-0.1,0.5,0,1,0.4,1.4c6.3,5.5,12.8,10.9,19.5,16.2c2,1.6,1.2,3.1,2.7,4.8
			c4.2,4.6,8.3,9.3,12.2,14.2c3,3.8,6.9,6.1,10.6,9c4,3.1,8.4,3.2,14.2,4c2,0.3,3.6,0.8,4.9,1.7c2.5,1.6,5.8,6.6,9,3.6
			c0.2-0.2,0.5-0.4,0.8-0.4c0.8-0.1,1.5,0.5,1.6,1.3c0.4,4,1.8,7.7,3.9,11.1c2.1,3.2,4.5,8.2,7.4,14.9c0.5,1.2,0.9,2.9,1.2,5
			c0.3,2,0.8,3.9,1.6,5.7c0.1,0.3,0.3,0.5,0.6,0.7c5.8,3.8,10.8-6.4,14.9,0.3c0.2,0.3,0.2,0.6,0.1,0.9c-1.1,3.6,1,6.6,2.8,9.4
			c0.2,0.3,0.2,0.7,0,1l-0.6,1c-0.2,0.3-0.2,0.7-0.1,1l2,5.7c0,0.1,0,0.2,0.1,0.2c0.1,0.7-0.4,1.3-1,1.4l-8.6,1.4
			c-0.4,0.1-0.6,0.2-0.8,0.6c-2.5,4-7.8,3.7-9.6,7.7c-0.7,1.7-0.1,4.4,0.1,6.3c0,0.1,0,0.1,0,0.2c-0.1,0.2-0.3,0.4-0.5,0.3l-1.7-0.4
			c-0.3-0.1-0.5,0-0.5,0.3c-0.7,2.9-2.4,5-4.9,6.5c-0.2,0.1-0.4,0.4-0.5,0.6c-0.5,1.3-0.6,2.4-0.3,3.2c1.4,4.4,2.7,8.9,3.8,13.4
			c0.1,0.4,0,0.7-0.1,1.1l-0.9,1.6c-0.2,0.3-0.2,0.6-0.1,1l5.9,19.7c0.1,0.2,0,0.5,0,0.7l-1.5,3.2c-0.2,0.3-0.1,0.7,0,1
			c0.9,1.8,0.7,3.5-0.7,5c-0.3,0.3-0.6,0.4-0.9,0.3c-4.3-1-8.8-4-14-3.5c-2.5,0.3-4.9-0.5-7.5,0.2c-0.3,0.1-0.7,0-0.9-0.3
			c-2.2-2.3-2.6-5.1-5.6-6.4c-0.3-0.1-0.6-0.1-0.9,0c-2.3,1.1-3.1,2.8-2.1,5.2c0.1,0.2,0.1,0.4-0.1,0.6c-0.2,0.4-0.7,0.5-1,0.3
			l-2.8-1.6c0,0,0,0,0,0c-0.3-0.2-0.7,0-0.8,0.3l-1.3,2.4c-0.2,0.4-0.5,0.5-0.9,0.3c-2.5-1.1-4.6-0.6-6.3,1.5
			c-0.1,0.1-0.3,0.2-0.5,0.1l-3.8-1.6c-0.2-0.1-0.5-0.1-0.7,0c-1.6,0.9-3.3,1.4-5.1,1.3c-1.7-0.1-3-1.4-4.6-2
			c-0.4-0.1-0.8,0-1.1,0.2l-1.7,1.7c-0.3,0.3-0.6,0.3-0.9,0c-0.2-0.2-0.4-0.5-0.7-0.7c-0.5,0.4-1.1,0.6-1.7,0.8c0.2,0.7,0,1.5-0.5,2
			c-1.4,1.4-3.1,2-5,1.9c-0.4,0-0.7-0.2-1-0.5c-4.1-5-8.3-4.3-14.2-3.9c-1.9,0.1-3.6,1.2-6,0.1c-0.3-0.1-0.7-0.1-0.9,0.2
			c-3,3-5.7,7.1-9.9,2.5c-1.3-1.4-2.8-2.5-4.5-3.4c-0.4-0.2-0.7-0.1-0.9,0.2L639.2,549.8z"
            />
          </g>
        </g>
        <path
          className="st1"
          d="M344.7,442.2c-0.1-0.1,0-0.2,0-0.3l0.1-0.1c1-0.7,2.4-0.5,3.2,0.5c0,0,0,0,0,0l0.2,0.2c0.7,1,0.5,2.4-0.6,3.1
	l-0.1,0.1c-0.1,0.1-0.2,0-0.3,0L344.7,442.2z"
        />
        <ellipse
          transform="matrix(0.8846 -0.4664 0.4664 0.8846 -166.3045 327.0146)"
          className="st1"
          cx="577.5"
          cy="499.5"
          rx="1.5"
          ry="2"
        />
        <ellipse
          transform="matrix(0.2062 -0.9785 0.9785 0.2062 -40.0011 969.2908)"
          className="st1"
          cx="577.4"
          cy="509.3"
          rx="2.3"
          ry="1.6"
        />
        <path
          className="st1"
          d="M484.8,531.4C484.8,531.4,484.9,531.4,484.8,531.4L484.8,531.4L484.8,531.4c-0.1,1.9-2.2,3.3-4.8,3.2l-0.3,0
	c-2.5-0.1-4.6-1.7-4.5-3.6c0,0,0,0,0,0l0,0c0,0,0,0,0,0L484.8,531.4z"
        />
        <path
          className="st1"
          d="M494.5,538.3c-0.8-0.2-1.5-0.8-1.9-1.6c-0.3-0.6-0.1-1.4,0.6-1.7c0.6-0.3,1.2-0.1,1.6,0.4
	c0.5,0.7,0.7,1.5,0.6,2.4C495.3,538.2,495,538.4,494.5,538.3z"
        />
        <path
          className="st1"
          d="M510.8,541.8c-0.4,1.2-2.2,1.7-3.9,1.1c0,0,0,0,0,0c-1.8-0.6-2.9-2.1-2.5-3.3c0,0,0,0,0,0
	c0.4-1.2,2.2-1.7,3.9-1.1c0,0,0,0,0,0C510.1,539.1,511.2,540.6,510.8,541.8C510.8,541.8,510.8,541.8,510.8,541.8z M508.6,542
	c0.4-0.3,0.3-1.2-0.3-1.8c0,0,0,0,0,0c-0.6-0.7-1.4-0.9-1.8-0.6l0,0c-0.4,0.3-0.3,1.2,0.3,1.8l0,0
	C507.4,542.1,508.2,542.4,508.6,542z"
        />
        <ellipse
          transform="matrix(0.9272 -0.3746 0.3746 0.9272 -166.5995 237.6998)"
          className="st1"
          cx="528.1"
          cy="547.4"
          rx="1.4"
          ry="2.3"
        />
        <ellipse
          transform="matrix(0.8652 -0.5015 0.5015 0.8652 -207.5177 351.948)"
          className="st1"
          cx="550.7"
          cy="561.9"
          rx="1"
          ry="1.7"
        />
        <ellipse
          transform="matrix(0.8755 -0.4833 0.4833 0.8755 -206.0017 328.4532)"
          className="st1"
          cx="534.3"
          cy="563.9"
          rx="1.1"
          ry="1.6"
        />
        <path
          fill="#f6f7f7"
          id="iran_borders_svg"
          fillOpacity={theme.palette.mode === "dark" && ".5"}
          transform="translate(49, 306)"
          d="
  M 713.70 545.74
  L 713.50 548.01
  Q 713.45 548.47 712.99 548.50
  Q 711.70 548.59 710.67 547.85
  A 1.78 1.71 63.3 0 0 709.77 547.53
  Q 706.79 547.37 705.04 549.76
  A 0.71 0.71 0.0 0 1 704.17 549.99
  L 700.42 548.30
  A 0.95 0.94 41.3 0 0 699.57 548.35
  Q 694.84 551.07 690.52 548.03
  Q 690.07 547.71 689.58 547.95
  Q 686.41 549.52 681.97 552.93
  C 677.58 556.30 675.51 550.24 672.04 549.51
  Q 665.67 548.16 659.40 550.02
  Q 658.89 550.17 658.37 550.03
  L 657.09 549.70
  Q 656.61 549.57 656.29 549.95
  C 653.77 552.89 651.34 555.03 647.24 553.26
  C 645.32 552.43 644.15 550.16 642.40 548.73
  Q 641.87 548.29 641.48 548.85
  L 638.88 552.57
  A 0.67 0.67 0.0 0 1 637.67 552.32
  L 637.22 550.12
  A 2.04 2.04 0.0 0 0 634.39 548.65
  Q 630.02 550.57 625.45 549.43
  A 1.32 1.31 -52.5 0 0 624.48 549.56
  Q 623.28 550.24 621.99 549.73
  A 1.23 1.19 -0.9 0 1 621.34 549.12
  Q 618.81 543.57 617.37 542.64
  Q 612.68 539.59 612.47 534.06
  Q 612.45 533.56 612.13 533.17
  Q 608.78 529.13 605.96 524.71
  Q 604.63 522.64 603.64 519.19
  Q 600.68 508.88 592.72 501.54
  C 591.36 500.29 589.39 499.78 588.43 497.46
  A 1.40 1.38 3.1 0 0 587.78 496.74
  Q 586.16 495.90 584.44 495.54
  C 582.32 495.11 580.28 496.21 577.59 495.68
  Q 572.40 494.67 568.28 497.52
  C 565.60 499.38 564.07 503.12 561.96 505.94
  Q 561.58 506.45 560.96 506.58
  L 558.04 507.19
  A 0.43 0.43 0.0 0 0 557.78 507.86
  Q 559.54 510.38 562.77 509.27
  Q 563.27 509.10 563.54 508.65
  C 565.48 505.38 571.43 500.59 574.16 505.64
  Q 574.38 506.05 574.04 506.37
  C 572.55 507.75 571.75 508.73 571.37 510.87
  Q 570.43 516.05 567.14 520.19
  Q 566.83 520.59 566.94 521.08
  Q 567.24 522.41 566.95 523.32
  A 1.24 1.23 60.0 0 1 564.57 522.68
  L 565.18 519.81
  Q 565.35 519.04 564.56 519.04
  L 564.08 519.03
  A 0.67 0.66 8.1 0 0 563.44 519.50
  Q 562.72 521.84 560.30 521.88
  A 1.13 1.10 -72.5 0 0 559.41 522.36
  Q 555.59 527.88 549.45 530.82
  Q 548.96 531.06 548.62 530.64
  Q 546.80 528.44 546.44 525.52
  Q 546.36 524.92 546.97 524.87
  C 549.49 524.70 551.20 522.67 553.14 521.23
  C 555.06 519.81 556.26 517.46 558.37 516.34
  A 2.04 2.03 -30.9 0 0 559.11 513.41
  L 555.83 508.50
  Q 555.54 508.08 555.15 508.41
  C 550.54 512.25 557.59 516.73 550.74 520.81
  A 1.46 1.45 34.7 0 1 549.73 520.99
  L 545.76 520.20
  A 0.81 0.81 0.0 0 0 544.85 520.69
  L 543.65 523.59
  Q 543.45 524.06 543.02 524.30
  C 542.04 524.85 541.37 525.20 540.87 526.30
  Q 538.43 531.66 534.86 536.34
  Q 534.56 536.73 534.06 536.73
  C 531.23 536.72 528.16 538.60 526.24 535.28
  A 1.66 1.65 63.6 0 0 524.17 534.58
  Q 519.27 536.64 516.92 531.83
  A 2.05 2.04 64.7 0 0 514.23 530.86
  Q 510.36 532.62 506.37 531.27
  Q 505.84 531.09 505.42 531.47
  Q 502.51 534.10 498.71 534.69
  Q 496.58 535.02 494.02 533.83
  Q 488.74 531.37 487.22 530.48
  C 484.34 528.80 485.18 525.33 481.76 524.55
  C 476.76 523.41 470.68 523.24 466.13 520.98
  Q 457.84 516.87 449.12 512.99
  A 1.43 1.42 37.0 0 1 448.78 510.59
  L 450.29 509.34
  A 0.43 0.43 0.0 0 0 450.19 508.62
  L 448.21 507.73
  Q 447.82 507.56 447.58 507.22
  Q 442.92 500.70 434.75 501.83
  A 1.83 1.81 53.2 0 1 433.75 501.68
  C 429.84 499.86 426.60 496.03 422.01 496.57
  Q 419.97 496.81 415.58 498.08
  C 411.03 499.38 407.48 498.22 403.56 496.17
  C 400.14 494.39 397.82 491.11 395.32 488.09
  C 393.61 486.04 393.71 483.41 392.02 481.76
  Q 389.53 479.34 387.12 476.89
  Q 382.12 471.85 379.93 465.22
  C 378.54 461.01 377.21 458.37 372.48 459.00
  Q 371.97 459.07 371.58 458.74
  C 369.47 457.00 365.58 454.10 366.77 450.96
  Q 367.00 450.34 367.63 450.53
  L 369.13 450.98
  A 1.16 1.16 0.0 0 0 370.30 449.06
  Q 368.23 446.95 365.63 445.63
  Q 365.16 445.40 364.69 445.63
  L 361.23 447.34
  A 0.96 0.95 51.5 0 1 360.22 447.22
  C 356.94 444.53 358.64 441.91 357.85 438.82
  Q 357.31 436.69 356.42 434.70
  C 355.16 431.86 352.01 430.41 349.67 428.42
  Q 348.00 426.99 345.56 425.44
  Q 340.82 422.43 337.43 417.82
  C 335.46 415.14 331.50 415.44 330.32 410.59
  C 329.50 407.23 324.81 398.29 320.22 402.92
  Q 317.42 405.75 311.50 412.27
  Q 309.72 414.23 307.77 412.80
  C 306.22 411.66 305.99 409.92 305.33 408.05
  A 0.87 0.85 -8.3 0 0 304.54 407.47
  Q 300.53 407.34 296.99 408.99
  A 0.61 0.61 0.0 0 1 296.21 408.75
  L 294.90 406.60
  A 0.92 0.90 76.8 0 0 294.20 406.16
  Q 287.46 405.60 283.26 400.48
  A 1.12 1.12 0.0 0 0 281.28 401.18
  C 281.26 402.52 282.06 403.53 283.20 404.51
  C 285.67 406.65 288.31 412.91 286.49 416.39
  Q 286.20 416.94 285.58 417.00
  L 278.40 417.65
  Q 277.98 417.69 278.00 418.12
  L 278.10 420.12
  Q 278.13 420.73 277.59 421.01
  Q 274.60 422.56 271.79 421.64
  C 269.08 420.76 267.30 417.20 265.57 414.84
  C 264.72 413.69 264.71 412.88 264.78 411.52
  A 1.05 1.05 0.0 0 0 264.37 410.65
  L 260.05 407.31
  A 1.20 1.20 0.0 0 0 259.15 407.07
  L 256.81 407.43
  Q 256.21 407.52 255.94 406.99
  C 254.67 404.50 253.20 401.00 249.59 402.10
  A 2.09 2.08 73.9 0 1 246.96 400.64
  L 241.17 378.60
  A 1.02 1.02 0.0 0 0 240.02 377.86
  L 230.07 379.52
  A 1.80 1.80 0.0 0 1 228.02 378.17
  Q 226.16 370.57 224.31 363.34
  C 222.82 357.52 224.34 349.87 225.00 344.03
  A 3.35 3.35 0.0 0 0 224.03 341.28
  C 219.71 337.03 214.76 331.08 209.07 328.48
  A 1.10 1.07 9.7 0 1 208.45 327.63
  Q 207.92 323.25 203.77 321.45
  A 1.18 1.17 -84.5 0 1 203.10 320.63
  C 202.11 316.04 198.67 312.55 193.94 316.07
  Q 193.51 316.39 192.98 316.27
  Q 189.78 315.53 186.76 313.53
  C 178.46 308.01 167.39 300.13 154.88 297.08
  Q 154.41 296.96 153.95 297.14
  C 151.84 297.94 147.65 299.46 146.46 296.69
  C 145.99 295.58 146.47 294.50 146.57 293.25
  Q 146.61 292.67 146.04 292.53
  L 143.46 291.91
  A 1.00 1.00 0.0 0 1 143.51 289.96
  C 147.73 289.18 148.08 285.09 144.84 282.91
  Q 141.19 280.47 138.38 275.40
  Q 137.22 273.30 135.28 274.96
  A 1.22 1.20 -66.6 0 1 134.54 275.26
  Q 132.63 275.34 131.89 273.70
  A 0.68 0.68 0.0 0 1 132.04 272.94
  L 133.49 271.54
  Q 133.98 271.06 133.62 270.49
  C 131.92 267.80 129.69 268.59 128.01 270.67
  A 0.65 0.65 0.0 0 1 127.09 270.76
  C 124.84 268.89 122.70 267.60 120.82 265.30
  Q 117.94 261.80 114.86 258.50
  C 113.24 256.77 111.85 256.07 109.56 256.23
  A 0.89 0.89 0.0 0 1 108.63 255.13
  Q 109.67 250.82 112.17 246.94
  Q 112.43 246.53 112.27 246.07
  Q 111.33 243.44 112.22 240.76
  A 1.50 1.49 -77.8 0 0 110.96 238.80
  Q 105.91 238.29 105.06 233.21
  A 0.79 0.79 0.0 0 1 105.39 232.42
  C 108.08 230.60 106.24 228.30 106.50 225.86
  Q 106.55 225.38 107.02 225.49
  L 113.09 226.96
  A 0.79 0.79 0.0 0 0 114.01 225.91
  Q 112.79 222.78 110.23 220.63
  Q 109.86 220.32 109.85 219.85
  Q 109.73 216.05 112.45 213.61
  Q 112.86 213.25 112.76 212.71
  L 112.49 211.22
  A 0.58 0.58 0.0 0 1 113.03 210.54
  L 115.86 210.41
  A 0.62 0.62 0.0 0 0 116.41 209.58
  L 115.14 206.19
  A 0.57 0.55 -44.3 0 1 115.15 205.77
  L 116.80 202.08
  A 0.58 0.58 0.0 0 1 117.62 201.82
  C 120.25 203.34 124.12 202.81 124.55 199.32
  Q 124.88 196.64 122.00 196.03
  Q 121.15 195.85 121.53 195.07
  L 122.44 193.19
  A 0.48 0.45 -46.6 0 0 122.44 192.80
  Q 121.70 191.24 120.47 190.51
  Q 112.16 185.62 113.76 175.96
  A 1.68 1.68 0.0 0 1 115.25 174.56
  C 116.80 174.39 125.90 172.58 123.70 169.53
  A 0.67 0.67 0.0 0 0 122.73 169.41
  Q 119.19 172.37 116.05 169.01
  Q 115.66 168.59 115.10 168.73
  Q 112.99 169.26 110.95 169.68
  C 108.88 170.11 103.20 173.07 101.26 170.01
  Q 98.68 165.93 94.20 164.32
  C 90.59 163.02 87.61 168.30 84.97 164.30
  Q 84.70 163.89 84.80 163.42
  Q 85.36 160.82 83.91 158.77
  Q 81.98 156.02 81.96 155.98
  Q 79.96 152.09 78.41 147.68
  A 1.49 1.48 -31.2 0 0 75.99 147.09
  C 73.26 149.65 69.15 143.77 67.47 141.94
  Q 67.11 141.54 67.18 141.01
  L 67.83 136.29
  A 1.29 1.27 33.3 0 0 67.65 135.45
  C 64.82 130.88 60.65 133.17 57.99 130.29
  A 0.89 0.88 35.4 0 1 57.83 129.35
  L 59.19 126.20
  Q 59.35 125.83 59.23 125.45
  L 57.76 120.83
  A 0.68 0.68 0.0 0 0 57.24 120.36
  Q 54.19 119.75 52.27 117.32
  A 1.12 1.12 0.0 0 1 52.06 116.36
  Q 52.61 114.16 51.11 112.46
  A 0.64 0.63 39.1 0 1 51.03 111.73
  L 52.28 109.46
  Q 52.58 108.91 52.04 108.60
  L 42.09 102.86
  Q 41.78 102.68 41.72 102.32
  L 40.81 96.11
  A 0.89 0.82 20.8 0 0 40.58 95.65
  L 38.89 93.92
  A 0.75 0.75 0.0 0 1 38.78 93.04
  L 39.82 91.16
  Q 40.05 90.74 39.77 90.34
  Q 38.09 87.90 35.26 88.80
  A 0.98 0.97 54.8 0 1 34.36 88.64
  C 31.44 86.38 30.44 83.91 26.13 84.79
  A 2.16 2.16 0.0 0 1 23.55 82.81
  C 23.45 81.09 23.14 79.52 23.93 77.81
  Q 25.45 74.48 26.89 71.12
  A 1.36 1.33 -44.4 0 0 26.91 70.12
  Q 25.64 66.92 28.36 64.81
  A 1.31 1.31 0.0 0 0 27.03 62.57
  C 23.05 64.32 21.86 61.82 21.33 58.37
  C 20.42 52.48 17.27 49.02 16.69 43.54
  Q 16.54 42.09 13.93 40.33
  Q 12.08 39.08 10.91 35.18
  A 1.76 1.69 -49.8 0 1 10.86 34.38
  Q 11.32 31.88 10.68 29.46
  A 1.15 1.15 0.0 0 0 9.97 28.67
  C 5.12 26.80 5.11 23.01 2.31 19.33
  A 1.16 1.16 0.0 0 1 2.87 17.52
  Q 7.77 15.89 12.52 17.70
  A 2.36 2.36 0.0 0 0 15.69 15.09
  Q 14.91 10.62 15.54 5.24
  Q 15.83 2.73 19.32 1.05
  Q 19.65 0.89 19.98 1.06
  L 33.46 8.13
  A 0.56 0.48 82.8 0 1 33.66 8.31
  C 35.91 11.77 36.51 14.37 40.80 16.87
  C 45.47 19.60 45.76 25.33 52.00 24.77
  A 1.10 1.08 -25.8 0 1 52.86 25.06
  Q 56.77 28.75 60.11 32.89
  Q 60.59 33.49 62.01 33.61
  Q 73.58 34.65 84.76 37.81
  C 85.78 38.10 87.03 37.54 88.00 36.81
  Q 92.74 33.31 97.95 36.79
  A 1.34 1.33 29.3 0 0 99.90 36.25
  L 101.69 32.41
  Q 101.87 32.03 102.22 31.79
  C 104.94 29.99 105.75 27.09 107.55 24.52
  A 0.72 0.71 -65.8 0 1 108.30 24.23
  Q 110.72 24.77 112.84 23.59
  Q 113.36 23.30 113.46 22.73
  C 113.95 20.14 114.83 19.11 117.35 17.94
  Q 120.84 16.34 122.81 12.96
  Q 123.08 12.49 123.57 12.24
  Q 130.01 8.88 135.36 3.95
  Q 135.73 3.62 136.21 3.50
  L 140.96 2.34
  A 0.64 0.64 0.0 0 1 141.52 2.46
  L 156.77 14.59
  Q 158.50 15.97 156.50 16.93
  L 151.69 19.25
  A 1.68 1.67 -29.5 0 0 151.01 21.67
  C 153.56 25.55 157.87 25.26 160.25 29.80
  Q 160.48 30.24 160.37 30.72
  C 159.75 33.51 155.30 33.85 152.86 34.49
  A 2.08 2.07 66.1 0 0 151.65 37.63
  C 153.35 40.23 157.89 41.15 160.66 42.71
  A 1.22 1.19 -85.3 0 1 161.19 43.35
  Q 162.71 47.84 167.13 46.44
  Q 167.64 46.28 167.99 46.67
  C 169.82 48.68 174.85 54.50 177.84 55.43
  Q 178.35 55.59 178.79 55.29
  C 181.66 53.33 185.06 50.68 186.66 55.91
  Q 188.45 61.79 191.03 67.33
  Q 195.23 76.34 196.37 78.27
  Q 202.50 88.62 215.54 90.99
  Q 219.49 91.70 228.71 92.16
  Q 229.28 92.19 229.79 91.92
  Q 232.61 90.45 234.91 92.66
  A 0.46 0.38 -11.3 0 0 235.11 92.77
  L 242.76 94.43
  A 0.96 0.94 -6.7 0 1 243.40 94.93
  Q 246.56 101.57 249.75 103.99
  Q 259.15 111.16 274.27 117.86
  Q 278.05 119.54 282.47 120.26
  Q 293.95 122.13 305.40 124.00
  C 308.33 124.48 310.45 124.01 313.39 122.72
  C 320.71 119.50 328.42 118.29 335.62 115.14
  Q 349.86 108.92 365.48 107.88
  A 1.57 1.56 -5.7 0 0 366.93 106.12
  Q 366.68 104.24 365.36 102.10
  Q 362.88 98.05 359.63 92.55
  Q 358.37 90.41 360.85 90.55
  C 363.79 90.72 366.74 91.23 369.64 90.20
  Q 373.58 88.81 376.82 86.12
  Q 377.22 85.79 377.74 85.84
  Q 381.69 86.19 383.06 82.92
  C 384.53 79.39 378.95 76.69 383.30 72.71
  Q 386.20 70.05 387.99 66.51
  Q 388.22 66.05 388.67 65.81
  Q 391.82 64.15 394.49 61.89
  C 397.23 59.57 403.21 58.22 406.69 59.09
  C 410.62 60.07 413.15 60.75 416.54 59.07
  Q 417.06 58.82 417.60 59.01
  L 418.72 59.41
  A 1.28 1.28 0.0 0 0 420.14 57.40
  L 419.18 56.24
  Q 418.87 55.86 419.06 55.41
  Q 421.08 50.44 426.42 52.31
  Q 426.87 52.46 427.29 52.26
  L 429.49 51.20
  A 1.29 1.29 0.0 0 1 430.61 51.20
  Q 434.93 53.26 439.74 53.76
  Q 440.36 53.82 440.68 53.29
  L 442.22 50.81
  A 1.35 1.35 0.0 0 1 444.41 50.66
  Q 447.11 53.89 450.10 56.91
  C 451.79 58.62 451.44 62.76 454.74 62.89
  Q 463.50 63.20 471.61 66.38
  C 473.67 67.18 475.71 67.38 477.88 68.01
  A 1.21 1.18 -4.3 0 1 478.63 68.64
  Q 480.90 73.41 486.48 73.33
  Q 486.94 73.32 487.18 72.92
  L 488.21 71.20
  Q 488.74 70.30 489.65 70.82
  Q 494.26 73.48 496.09 71.21
  Q 496.44 70.78 496.98 70.91
  Q 503.01 72.31 508.25 75.51
  C 509.37 76.19 510.67 76.37 511.83 76.15
  A 2.11 2.10 -14.5 0 1 514.22 77.55
  Q 517.17 86.41 525.78 89.27
  C 530.70 90.91 532.71 91.69 536.24 93.02
  Q 538.63 93.93 540.41 95.63
  Q 546.14 101.15 551.72 106.83
  Q 552.07 107.19 552.57 107.16
  Q 563.25 106.51 570.49 105.80
  C 573.12 105.54 574.83 106.19 575.76 108.85
  C 576.84 111.95 576.87 115.16 578.75 117.85
  C 580.46 120.29 582.54 122.56 583.23 125.53
  C 583.67 127.43 582.46 129.33 584.45 130.99
  Q 588.91 134.71 589.44 140.54
  Q 589.48 140.95 589.73 141.27
  L 592.74 145.14
  A 1.23 1.22 -61.0 0 1 593.00 146.05
  Q 592.49 150.65 593.48 155.14
  A 0.76 0.75 70.9 0 1 593.07 156.00
  L 592.43 156.31
  Q 591.93 156.54 592.12 157.06
  Q 592.91 159.22 594.39 160.96
  Q 594.72 161.35 594.82 161.86
  L 597.08 173.62
  A 0.67 0.67 0.0 0 1 597.00 174.09
  Q 595.56 176.64 596.51 179.36
  Q 596.68 179.84 596.39 180.26
  L 594.30 183.25
  Q 594.04 183.62 593.65 183.85
  L 592.81 184.32
  A 0.67 0.67 0.0 0 0 592.69 185.40
  L 599.25 191.42
  A 0.85 0.84 -27.6 0 1 598.79 192.88
  L 594.80 193.40
  Q 594.16 193.49 593.76 194.00
  C 589.35 199.71 593.34 204.77 595.85 210.02
  Q 596.54 211.46 597.17 214.57
  Q 598.72 222.25 607.79 220.74
  Q 610.20 220.35 611.45 222.30
  A 0.67 0.66 -38.9 0 1 611.36 223.13
  Q 610.05 224.41 610.41 226.24
  A 1.69 1.67 -40.0 0 1 610.33 227.12
  Q 608.55 231.79 607.72 236.69
  C 607.40 238.55 608.17 240.20 609.11 241.65
  Q 617.48 254.55 625.75 267.51
  Q 628.23 271.40 629.14 275.81
  Q 630.04 280.22 630.71 281.98
  Q 633.53 289.30 635.93 294.75
  Q 636.73 296.58 638.11 298.52
  Q 638.41 298.94 638.93 298.96
  Q 650.02 299.28 660.99 299.77
  C 662.84 299.85 664.41 301.32 665.39 303.04
  Q 667.65 307.03 670.23 310.82
  C 672.14 313.63 672.20 316.52 673.51 319.52
  A 1.96 1.94 -49.7 0 1 673.61 320.82
  L 663.14 361.24
  A 1.58 1.56 27.3 0 0 663.66 362.84
  L 683.49 379.25
  Q 683.88 379.58 684.01 380.08
  Q 684.64 382.51 685.45 383.29
  Q 690.67 388.28 694.95 394.06
  Q 698.12 398.35 700.62 400.49
  C 704.38 403.72 709.86 408.36 714.91 408.94
  Q 718.70 409.39 722.46 410.04
  C 726.33 410.72 728.62 412.76 731.12 415.48
  A 2.04 2.04 0.0 0 0 733.64 415.86
  L 735.41 414.84
  A 2.16 2.16 0.0 0 1 738.61 416.32
  C 739.43 420.81 740.47 423.99 742.85 428.21
  Q 747.01 435.59 750.34 443.37
  C 751.59 446.29 751.34 449.46 752.99 452.76
  C 754.76 456.31 760.17 452.21 762.56 451.14
  Q 763.00 450.95 763.46 451.07
  Q 767.29 452.10 769.24 455.47
  Q 769.52 455.95 769.21 456.42
  Q 767.15 459.53 769.49 462.08
  Q 772.36 465.21 771.31 468.34
  Q 771.16 468.78 771.28 469.23
  L 773.09 475.62
  Q 773.39 476.67 772.31 476.84
  L 763.24 478.25
  Q 762.67 478.33 762.32 478.79
  Q 760.44 481.25 757.72 482.47
  Q 754.59 483.86 754.10 484.39
  C 751.88 486.80 753.17 490.10 753.54 492.96
  A 0.51 0.50 -84.6 0 1 752.88 493.51
  L 751.09 492.93
  A 0.95 0.95 0.0 0 0 750.04 493.25
  Q 749.58 493.85 749.77 494.75
  A 1.04 1.02 -26.9 0 1 749.44 495.73
  L 745.30 499.46
  A 2.49 2.48 -28.7 0 0 744.57 501.94
  L 748.54 516.53
  Q 748.70 517.11 748.33 517.60
  L 747.16 519.13
  Q 746.78 519.64 747.13 520.17
  L 748.37 522.06
  Q 748.62 522.44 748.71 522.89
  C 749.09 524.89 749.10 526.80 749.81 528.69
  C 751.37 532.85 754.34 540.08 753.03 544.43
  Q 752.16 547.30 751.23 550.09
  Q 751.06 550.59 750.54 550.53
  C 747.21 550.18 745.38 549.91 742.09 548.32
  C 738.52 546.59 734.89 547.38 731.49 547.17
  Q 729.03 547.02 726.55 547.33
  A 1.16 1.16 0.0 0 1 725.53 546.95
  Q 723.52 544.67 722.42 541.94
  A 1.88 1.88 0.0 0 0 718.99 541.79
  Q 718.39 542.96 718.76 544.10
  A 1.08 1.07 -86.0 0 0 719.30 544.73
  Q 720.69 545.41 721.50 546.74
  A 0.76 0.76 0.0 0 1 720.45 547.78
  Q 718.71 546.67 716.72 546.98
  Q 716.21 547.06 715.80 546.74
  L 714.26 545.51
  Q 713.76 545.11 713.70 545.74
  Z
  M 75.83 145.76
  A 2.41 2.40 -30.4 0 1 79.34 146.67
  Q 81.90 151.77 84.02 156.40
  C 84.88 158.29 87.38 160.22 86.41 163.05
  A 0.97 0.97 0.0 0 0 87.63 164.29
  Q 92.70 162.64 94.54 158.50
  C 96.15 154.89 95.22 151.87 99.77 150.10
  C 102.75 148.94 104.58 148.26 103.67 144.79
  A 0.98 0.97 -33.3 0 1 103.84 143.97
  C 106.46 140.48 110.69 141.70 114.26 142.01
  Q 117.23 142.27 120.23 141.78
  Q 127.59 140.57 135.02 139.79
  Q 136.06 139.69 136.90 140.37
  Q 142.22 144.76 149.17 143.38
  A 2.72 2.72 0.0 0 0 151.34 140.51
  Q 151.18 138.50 151.98 136.72
  A 1.08 1.08 0.0 0 0 151.86 135.63
  L 146.20 128.14
  Q 145.82 127.64 145.21 127.83
  C 141.51 129.01 135.66 130.43 132.49 127.15
  Q 131.73 126.36 130.53 122.97
  Q 128.55 117.38 122.46 115.89
  Q 121.95 115.76 121.55 116.11
  Q 119.72 117.75 117.27 118.20
  A 1.56 1.51 15.6 0 0 116.40 118.67
  Q 114.92 120.28 114.62 122.37
  A 2.15 2.14 16.0 0 1 111.64 124.02
  Q 104.87 121.08 98.81 116.67
  C 96.55 115.02 95.42 115.20 92.76 115.25
  C 87.34 115.35 81.08 111.56 76.35 109.12
  C 72.30 107.03 71.15 104.02 70.32 99.72
  C 69.34 94.66 64.01 94.05 64.21 88.98
  Q 64.22 88.48 64.00 88.03
  Q 60.48 81.00 58.39 73.41
  C 57.52 70.20 56.04 69.24 53.75 67.00
  C 48.98 62.33 58.18 55.72 59.50 51.14
  A 1.23 1.20 38.5 0 0 59.38 50.20
  C 56.38 44.96 54.51 40.28 59.01 35.21
  Q 59.37 34.80 59.09 34.34
  Q 56.53 30.26 52.83 27.16
  C 51.00 25.63 49.04 25.71 46.75 25.47
  A 0.92 0.91 -9.5 0 1 46.00 24.94
  Q 43.40 19.20 37.83 16.47
  C 34.21 14.69 34.73 10.07 31.01 8.21
  Q 25.69 5.56 20.44 2.64
  Q 19.97 2.38 19.51 2.65
  C 17.60 3.78 17.02 4.90 17.10 7.32
  C 17.15 9.11 16.46 10.42 16.75 12.20
  Q 16.97 13.60 17.18 15.03
  C 17.73 18.87 12.63 19.61 10.09 18.07
  A 0.96 0.94 58.3 0 0 9.53 17.93
  L 4.53 18.23
  A 0.72 0.72 0.0 0 0 4.04 19.43
  Q 6.07 21.66 6.79 24.60
  A 2.81 2.79 -86.6 0 0 8.53 26.57
  Q 13.95 28.61 12.18 34.60
  A 1.22 1.19 -51.4 0 0 12.27 35.53
  Q 14.20 39.13 17.52 41.45
  Q 17.99 41.77 18.05 42.33
  Q 18.51 46.24 20.17 49.72
  C 22.10 53.75 22.50 56.63 23.27 60.70
  A 1.57 1.56 61.4 0 0 25.94 61.49
  C 27.70 59.63 30.77 62.75 29.97 65.21
  A 1.74 1.70 82.2 0 1 29.34 66.06
  Q 27.04 67.69 28.59 70.19
  A 1.15 1.14 40.1 0 1 28.68 71.19
  C 27.45 74.45 23.69 80.03 25.79 83.22
  Q 26.07 83.65 26.57 83.53
  Q 30.67 82.50 33.16 85.89
  A 1.45 1.44 81.6 0 0 33.87 86.42
  C 36.98 87.50 39.77 87.05 41.62 90.72
  Q 41.85 91.17 41.51 91.54
  Q 39.61 93.57 42.01 95.11
  A 0.71 0.71 0.0 0 1 42.33 95.62
  L 43.06 101.35
  A 0.55 0.54 12.4 0 0 43.33 101.76
  L 53.02 107.65
  A 1.68 1.68 0.0 0 1 53.71 109.71
  L 52.92 111.67
  Q 52.69 112.24 53.01 112.76
  Q 54.08 114.49 53.62 116.48
  Q 53.46 117.13 54.07 117.41
  L 58.86 119.66
  A 0.98 0.97 4.9 0 1 59.39 120.28
  L 61.00 125.89
  A 0.86 0.85 -37.0 0 1 60.90 126.57
  L 59.66 128.51
  A 1.26 1.26 0.0 0 0 60.66 130.44
  Q 70.58 130.93 69.03 140.69
  Q 68.94 141.29 69.34 141.74
  L 72.43 145.32
  A 1.55 0.17 27.9 0 0 73.30 145.91
  Q 74.56 146.62 75.83 145.76
  Z
  M 107.79 39.15
  C 102.53 38.24 101.64 44.34 105.57 45.66
  Q 106.02 45.82 106.44 45.59
  L 111.25 43.08
  Q 111.69 42.84 112.18 42.98
  L 116.72 44.22
  Q 117.20 44.35 117.58 44.04
  Q 120.16 41.91 120.31 38.51
  Q 120.38 37.08 121.92 33.48
  C 123.36 30.13 125.76 30.88 128.05 28.93
  Q 129.08 28.06 129.83 27.45
  A 1.91 1.91 0.0 0 1 132.91 28.61
  Q 134.12 35.73 138.44 41.30
  Q 139.51 42.68 138.53 45.22
  Q 138.35 45.69 138.66 46.10
  L 141.29 49.44
  Q 141.62 49.86 141.48 50.38
  Q 140.94 52.31 138.99 51.92
  C 134.51 51.02 131.47 56.42 130.63 60.42
  A 1.15 1.15 0.0 0 0 132.06 61.77
  L 133.30 61.43
  Q 133.78 61.30 134.24 61.49
  Q 138.00 63.06 141.86 61.98
  C 150.01 59.71 149.69 67.37 153.18 71.81
  Q 155.85 75.20 159.43 77.69
  C 160.63 78.53 161.51 79.61 161.35 81.01
  Q 160.80 85.83 163.39 89.36
  C 165.08 91.66 169.30 92.32 171.93 93.61
  A 1.30 1.30 0.0 0 1 172.57 94.35
  Q 174.53 100.11 180.29 101.71
  Q 182.43 102.31 183.86 103.18
  Q 184.36 103.49 184.96 103.46
  Q 187.89 103.30 189.89 105.43
  A 0.50 0.50 0.0 0 0 190.70 105.31
  L 191.33 104.00
  Q 191.60 103.46 192.19 103.59
  Q 194.98 104.24 197.22 102.50
  Q 197.57 102.22 197.52 101.78
  Q 197.26 99.13 195.70 98.05
  Q 184.70 90.51 177.80 79.14
  C 176.17 76.47 176.09 74.41 176.46 71.46
  C 176.91 67.85 179.50 64.49 181.53 61.27
  Q 181.78 60.88 181.43 60.58
  L 167.17 48.17
  A 0.78 0.76 55.3 0 0 166.39 48.02
  L 165.69 48.27
  Q 165.16 48.47 164.65 48.25
  Q 161.18 46.80 159.41 43.54
  A 1.61 1.57 86.1 0 0 158.64 42.85
  C 154.59 41.19 151.41 40.33 149.78 37.02
  Q 149.57 36.58 149.76 36.13
  C 151.33 32.42 154.28 32.73 157.68 31.92
  A 1.63 1.62 68.4 0 0 158.71 29.53
  C 156.98 26.52 147.42 24.04 149.83 19.30
  C 150.67 17.66 152.93 17.04 154.63 16.43
  A 1.08 1.08 0.0 0 0 154.92 14.55
  Q 149.22 10.27 144.02 5.69
  C 141.19 3.20 137.91 3.70 135.12 6.16
  Q 130.31 10.40 124.44 13.22
  A 1.35 1.29 89.9 0 0 123.80 13.89
  Q 121.86 18.24 117.12 19.26
  A 1.25 1.22 -83.4 0 0 116.26 19.96
  L 114.59 23.60
  Q 114.33 24.18 114.74 24.66
  C 116.20 26.36 120.49 30.50 118.62 32.82
  Q 115.17 37.10 109.26 36.56
  Q 108.78 36.51 108.74 36.99
  L 108.62 38.51
  A 0.71 0.71 0.0 0 1 107.79 39.15
  Z
  M 107.43 33.69
  L 109.52 34.79
  Q 109.93 35.01 110.37 34.89
  Q 113.40 34.11 116.03 32.52
  A 2.18 2.17 62.4 0 0 116.88 29.78
  Q 114.48 24.37 108.73 25.87
  Q 108.21 26.01 107.95 26.47
  L 105.55 30.74
  Q 105.30 31.20 104.84 31.47
  C 101.86 33.25 102.71 36.06 99.63 37.90
  A 1.13 1.10 -49.9 0 1 98.72 37.99
  Q 96.58 37.27 94.42 36.58
  C 90.91 35.46 89.45 38.65 86.47 38.87
  Q 84.00 39.05 81.00 38.03
  Q 75.22 36.06 62.64 35.25
  A 1.15 1.13 -64.0 0 0 61.80 35.55
  C 58.33 38.70 57.47 43.16 59.76 47.35
  C 60.60 48.90 61.62 50.27 61.55 52.07
  C 61.37 56.44 50.53 63.05 56.07 67.43
  Q 60.28 70.75 60.90 75.35
  Q 61.45 79.47 66.36 88.47
  Q 66.61 88.93 66.55 89.44
  C 66.32 91.24 66.72 92.35 68.26 93.54
  Q 72.39 96.75 72.91 101.97
  C 73.07 103.66 73.73 105.75 75.05 106.45
  C 80.88 109.56 86.34 113.31 93.54 113.09
  C 98.25 112.95 101.89 117.16 105.60 119.08
  Q 108.17 120.41 110.57 121.82
  A 1.05 1.04 -64.0 0 0 112.07 121.30
  L 113.51 117.67
  A 0.79 0.76 -4.8 0 1 113.87 117.26
  L 120.82 113.73
  A 0.97 0.94 -47.2 0 1 121.61 113.69
  L 128.48 116.43
  A 3.11 3.10 -1.4 0 1 130.17 118.03
  L 133.88 126.07
  A 1.67 1.67 0.0 0 0 135.62 127.04
  L 143.77 126.00
  A 0.70 0.69 -18.3 0 0 144.29 124.97
  C 142.46 121.73 146.46 118.07 148.06 115.30
  C 149.82 112.27 152.14 110.66 154.42 108.11
  A 1.74 1.71 13.5 0 1 155.25 107.61
  C 163.80 105.42 172.84 105.24 181.63 105.80
  A 1.10 0.87 -31.0 0 0 182.33 103.94
  Q 181.44 103.77 180.72 103.86
  Q 180.20 103.93 179.76 103.63
  L 173.42 99.29
  A 0.88 0.87 -80.2 0 1 173.05 98.76
  C 172.19 95.10 170.80 94.50 167.16 93.30
  Q 158.95 90.61 159.89 81.07
  A 2.29 2.28 18.9 0 0 158.84 78.93
  Q 154.41 76.14 151.35 71.67
  C 150.00 69.70 149.34 67.02 148.00 64.83
  A 3.30 3.29 -20.1 0 0 144.71 63.30
  L 137.30 64.41
  A 1.00 0.98 57.9 0 1 136.55 64.23
  Q 134.14 62.52 131.65 63.86
  Q 131.14 64.13 130.71 63.75
  C 126.47 59.98 130.61 53.48 134.18 50.89
  C 135.75 49.75 137.21 49.85 138.99 50.31
  A 0.62 0.62 0.0 0 0 139.54 49.24
  L 136.77 46.87
  A 1.03 1.02 28.4 0 1 136.45 45.81
  L 137.29 42.81
  A 1.15 1.14 34.0 0 0 137.09 41.79
  Q 132.81 36.35 131.46 29.57
  A 0.50 0.49 -34.2 0 0 130.56 29.40
  C 129.57 30.89 128.80 31.41 126.90 31.96
  C 123.37 32.97 122.28 37.53 122.61 40.67
  Q 122.66 41.12 122.38 41.48
  L 119.45 45.33
  A 1.82 1.80 -64.7 0 1 117.61 46.00
  L 113.08 44.94
  Q 112.52 44.81 112.01 45.08
  L 107.20 47.60
  Q 106.74 47.85 106.24 47.70
  C 100.12 45.94 98.90 36.93 106.27 36.92
  Q 106.93 36.92 106.88 36.25
  L 106.72 34.16
  A 0.49 0.49 0.0 0 1 107.43 33.69
  Z
  M 482.47 96.27
  L 482.89 82.31
  A 2.71 2.71 0.0 0 0 481.54 79.88
  Q 478.62 78.17 476.33 75.21
  C 475.71 74.40 474.67 73.93 473.75 73.97
  Q 468.00 74.17 462.25 73.79
  Q 461.91 73.77 461.73 73.49
  Q 458.84 69.23 461.81 65.35
  Q 462.21 64.83 461.57 64.70
  C 456.40 63.69 451.42 65.38 449.87 58.74
  Q 449.75 58.23 449.40 57.83
  L 444.34 52.18
  A 0.96 0.96 0.0 0 0 442.77 52.38
  L 441.54 54.79
  Q 441.22 55.41 440.55 55.24
  L 430.61 52.73
  Q 430.18 52.62 429.77 52.79
  Q 427.73 53.64 424.54 52.93
  Q 421.98 52.36 420.70 55.27
  Q 420.51 55.71 420.78 56.10
  C 421.38 56.95 421.94 57.60 421.76 58.67
  Q 421.47 60.37 419.26 60.20
  A 0.51 0.51 0.0 0 0 418.72 60.83
  Q 419.34 63.31 420.38 65.63
  C 421.75 68.68 420.92 71.53 424.73 73.32
  C 426.84 74.31 428.30 75.61 427.69 77.90
  C 426.58 82.10 419.39 79.96 419.51 87.45
  Q 419.52 87.93 419.85 88.27
  C 422.65 91.22 425.06 93.72 429.27 94.31
  A 1.30 1.30 0.0 0 1 429.86 96.65
  L 429.05 97.25
  A 0.69 0.69 0.0 0 0 428.83 98.09
  Q 430.12 100.89 430.34 103.95
  Q 430.37 104.48 430.70 104.89
  Q 436.91 112.76 446.70 113.79
  Q 449.99 114.13 448.66 111.16
  Q 448.34 110.46 449.00 107.98
  Q 449.71 105.32 454.66 100.42
  Q 454.98 100.11 455.43 100.06
  Q 458.88 99.64 461.12 100.64
  Q 471.31 105.18 481.49 109.80
  Q 483.75 110.82 490.77 110.84
  Q 491.35 110.84 491.67 110.35
  Q 492.93 108.44 491.56 106.30
  A 0.82 0.76 86.8 0 0 491.31 106.06
  Q 488.57 104.48 490.16 101.57
  A 0.52 0.52 0.0 0 0 489.81 100.81
  Q 485.63 99.96 482.71 96.90
  A 0.89 0.86 -66.9 0 1 482.47 96.27
  Z
  M 236.38 128.12
  C 238.09 128.65 239.15 128.82 240.72 127.69
  C 244.85 124.71 247.72 121.86 253.62 123.28
  A 0.64 0.64 0.0 0 0 254.37 122.88
  Q 255.53 119.75 255.24 116.44
  A 1.51 1.49 -28.5 0 1 255.57 115.35
  L 257.93 112.48
  A 1.33 1.33 0.0 0 0 257.60 110.50
  C 251.43 106.74 246.83 104.20 242.88 96.84
  C 241.58 94.41 237.43 94.52 235.01 93.99
  C 233.84 93.73 232.43 92.80 230.93 93.00
  Q 228.14 93.38 228.02 93.38
  Q 218.79 92.98 215.50 92.31
  C 208.63 90.89 199.71 86.69 196.17 80.36
  C 192.76 74.25 190.06 68.05 187.24 61.67
  Q 185.91 58.69 185.13 55.22
  A 1.46 1.46 0.0 0 0 182.90 54.32
  L 179.63 56.48
  A 0.58 0.58 0.0 0 0 179.67 57.47
  L 182.88 59.24
  A 1.53 1.53 0.0 0 1 183.41 61.44
  Q 181.16 64.77 179.31 68.30
  C 177.88 71.03 177.16 75.23 178.48 77.74
  Q 184.39 88.99 197.05 97.45
  C 199.81 99.30 198.00 103.27 201.45 104.52
  Q 212.09 108.37 216.96 118.49
  Q 217.18 118.95 217.66 119.14
  C 221.52 120.69 222.87 123.84 225.44 125.66
  C 228.83 128.05 233.16 127.13 236.38 128.12
  Z
  M 370.20 110.90
  C 368.14 113.89 365.18 112.67 362.61 112.46
  A 0.98 0.98 0.0 0 0 362.19 114.35
  Q 370.40 117.45 377.06 123.22
  Q 377.45 123.56 377.96 123.46
  C 381.40 122.81 388.01 123.91 390.12 120.57
  C 392.32 117.07 397.36 110.26 401.83 109.87
  Q 407.27 109.41 412.68 110.79
  Q 413.18 110.92 413.59 110.58
  Q 414.60 109.74 414.24 107.98
  C 412.40 99.10 415.32 92.47 418.19 84.28
  C 419.44 80.69 421.64 80.28 424.81 78.59
  Q 426.78 77.55 425.92 75.81
  C 425.16 74.27 422.43 73.18 420.98 72.00
  Q 420.58 71.67 420.42 71.17
  L 417.30 61.33
  A 0.99 0.99 0.0 0 0 416.00 60.71
  C 412.72 61.97 409.73 60.93 406.46 60.16
  C 403.52 59.46 397.86 60.83 395.52 62.74
  Q 392.57 65.15 389.32 67.20
  A 1.79 1.77 86.0 0 0 388.64 67.99
  Q 387.11 71.51 384.00 73.73
  A 1.83 1.80 -9.5 0 0 383.34 74.64
  Q 382.38 77.57 384.34 79.95
  Q 384.66 80.33 384.65 80.82
  Q 384.57 87.17 378.13 87.12
  Q 377.57 87.12 377.16 87.49
  Q 370.69 93.32 361.98 91.65
  A 0.90 0.90 0.0 0 0 361.07 93.04
  Q 365.67 99.86 369.36 106.88
  Q 370.17 108.40 370.38 110.16
  A 1.09 1.04 59.8 0 1 370.20 110.90
  Z
  M 581.79 130.47
  C 581.91 127.46 582.22 125.21 580.61 122.53
  Q 579.02 119.86 577.06 117.43
  C 575.68 115.72 575.99 112.83 575.26 110.70
  Q 574.78 109.30 574.30 108.07
  A 2.02 2.01 77.8 0 0 572.31 106.78
  Q 563.27 107.24 554.28 108.28
  C 552.33 108.51 551.21 108.25 550.06 106.72
  Q 547.91 103.88 545.21 101.61
  C 542.49 99.32 540.74 97.36 538.57 94.94
  A 1.57 1.54 -14.0 0 0 537.75 94.46
  Q 534.95 93.82 532.42 92.65
  Q 530.07 91.58 527.47 90.95
  Q 517.30 88.50 513.49 78.33
  Q 513.22 77.61 512.77 77.26
  Q 511.69 76.45 511.10 77.34
  A 0.97 0.96 -55.4 0 1 509.75 77.59
  Q 504.29 73.83 497.90 72.22
  Q 497.38 72.09 496.94 72.40
  Q 495.22 73.58 493.14 73.53
  Q 492.63 73.51 492.19 73.25
  L 489.80 71.81
  A 0.54 0.54 0.0 0 0 488.98 72.18
  Q 488.63 74.29 486.78 74.39
  Q 480.69 74.74 477.96 69.66
  Q 477.73 69.22 477.25 69.08
  L 464.93 65.52
  Q 464.42 65.38 463.99 65.69
  C 461.88 67.24 461.71 69.35 462.34 71.68
  Q 462.66 72.84 464.26 72.81
  Q 469.93 72.71 475.72 72.96
  Q 476.23 72.98 476.53 73.40
  C 478.87 76.66 481.95 78.22 484.19 81.41
  Q 484.43 81.76 484.42 82.20
  L 484.04 95.31
  A 2.65 2.65 0.0 0 0 486.59 98.04
  Q 491.96 98.24 491.43 103.47
  Q 491.38 103.99 491.73 104.38
  C 493.52 106.43 494.86 109.88 492.41 111.65
  C 489.99 113.41 482.34 111.73 479.74 110.56
  Q 470.06 106.21 460.39 101.84
  C 458.21 100.86 455.81 101.06 454.06 103.00
  C 451.49 105.87 447.33 111.68 453.20 113.17
  Q 453.71 113.29 454.02 113.70
  C 457.36 118.01 455.33 120.79 456.67 125.25
  C 458.34 130.77 461.63 139.39 466.72 142.33
  C 470.76 144.67 477.11 147.31 476.11 152.64
  Q 474.78 159.73 474.31 164.70
  Q 474.26 165.22 473.87 165.55
  C 471.74 167.34 468.89 168.30 467.20 170.08
  Q 463.61 173.85 462.12 178.86
  A 0.66 0.66 0.0 0 0 462.99 179.67
  C 467.61 177.94 471.06 176.46 475.22 173.06
  Q 479.46 169.61 484.58 167.51
  C 489.64 165.45 496.37 170.65 500.87 173.65
  Q 506.41 177.36 502.59 182.81
  Q 500.89 185.23 494.84 192.36
  C 493.59 193.84 494.12 198.48 494.05 200.22
  C 493.67 210.01 496.57 215.45 500.90 224.09
  Q 502.39 227.07 504.25 227.94
  C 508.18 229.77 512.13 227.44 515.79 225.92
  Q 516.24 225.73 516.65 226.01
  C 521.79 229.54 524.16 236.49 527.83 244.25
  C 529.46 247.69 531.60 250.74 535.44 252.03
  Q 541.03 253.90 544.72 258.29
  A 0.72 0.72 0.0 0 0 545.97 257.67
  C 545.10 253.90 544.83 245.01 547.98 241.96
  C 551.23 238.82 555.15 234.52 553.71 230.17
  Q 553.55 229.70 553.12 229.46
  Q 548.38 226.79 545.59 223.42
  C 544.11 221.62 544.46 218.75 543.90 216.83
  Q 542.83 213.19 542.05 209.45
  A 1.46 1.45 -75.2 0 0 541.61 208.69
  Q 539.72 207.03 539.67 204.53
  A 1.42 1.42 0.0 0 1 540.88 203.10
  Q 544.48 202.55 547.89 203.62
  Q 548.42 203.78 548.85 203.43
  L 551.12 201.57
  A 0.15 0.10 -55.3 0 1 551.20 201.54
  Q 556.87 201.10 560.80 197.10
  A 1.86 1.86 0.0 0 1 563.37 197.01
  C 567.18 200.40 569.07 204.09 574.93 203.45
  Q 582.49 202.61 589.94 201.98
  A 0.87 0.86 83.9 0 0 590.72 201.01
  Q 590.15 196.42 592.88 192.54
  Q 593.23 192.04 593.83 192.04
  L 596.81 192.02
  A 0.66 0.66 0.0 0 0 597.24 190.87
  L 591.11 185.51
  A 1.19 1.19 0.0 0 1 591.44 183.51
  Q 595.25 181.95 594.99 177.70
  C 594.83 175.18 596.14 173.71 595.49 171.09
  Q 594.43 166.78 593.98 162.28
  A 1.48 1.45 19.5 0 0 593.56 161.42
  Q 591.40 159.32 590.83 156.35
  Q 590.74 155.84 591.19 155.58
  L 591.67 155.32
  Q 592.20 155.03 592.05 154.44
  Q 591.02 150.35 591.89 146.18
  A 1.02 1.01 31.1 0 0 591.67 145.32
  L 588.30 141.27
  A 0.81 0.77 -66.5 0 1 588.11 140.75
  Q 588.11 133.89 582.15 131.06
  Q 581.77 130.89 581.79 130.47
  Z
  M 380.88 124.38
  Q 369.18 126.17 371.76 137.67
  A 1.45 1.40 -38.9 0 1 371.64 138.62
  C 370.42 141.06 369.48 142.66 368.22 145.71
  Q 366.09 150.84 359.79 150.64
  A 1.51 1.50 -64.8 0 0 358.74 151.02
  Q 356.70 152.81 354.05 153.17
  Q 353.40 153.26 353.69 153.85
  C 355.35 157.22 357.96 161.96 356.05 165.72
  Q 350.84 175.97 340.60 173.26
  Q 338.12 172.61 335.82 172.53
  C 330.94 172.36 325.99 169.36 321.72 167.15
  Q 319.79 166.15 319.26 168.26
  Q 318.55 171.10 319.96 174.32
  C 322.22 179.51 330.15 181.34 327.83 188.29
  C 327.33 189.80 327.57 190.97 327.48 192.47
  Q 327.45 192.96 327.68 193.41
  Q 331.17 199.99 329.46 207.31
  Q 329.35 207.81 329.79 208.07
  Q 336.51 212.07 343.96 210.15
  C 352.44 207.97 360.68 214.08 369.41 212.98
  Q 404.34 208.58 439.25 204.03
  Q 440.42 203.88 442.57 204.88
  Q 443.04 205.10 443.54 204.92
  Q 447.00 203.71 450.67 203.88
  C 452.91 203.98 455.53 203.02 455.92 200.86
  Q 457.39 192.67 459.06 184.51
  C 460.60 176.96 463.82 168.63 471.48 165.60
  A 2.49 2.49 0.0 0 0 473.04 163.66
  L 474.88 151.95
  A 4.61 4.61 0.0 0 0 472.78 147.35
  C 468.96 144.95 464.15 142.73 461.55 138.95
  Q 455.15 129.61 454.55 117.25
  Q 454.46 115.33 452.34 114.09
  Q 451.91 113.84 451.47 114.06
  Q 446.63 116.42 441.97 114.77
  Q 435.06 112.33 429.42 105.89
  Q 429.07 105.49 429.07 104.95
  Q 429.09 101.50 427.27 98.58
  A 1.21 1.17 37.7 0 1 427.13 97.61
  L 427.46 96.50
  Q 427.61 95.96 427.11 95.72
  Q 422.32 93.37 418.96 89.19
  A 0.43 0.43 0.0 0 0 418.24 89.29
  Q 413.94 98.94 415.72 109.24
  A 2.34 2.34 0.0 0 1 413.06 111.95
  Q 408.65 111.27 403.48 111.13
  C 395.93 110.92 393.52 121.51 387.94 123.73
  C 385.45 124.72 383.18 124.02 380.88 124.38
  Z
  M 155.12 137.02
  C 160.70 137.98 166.35 138.37 171.92 139.23
  C 176.88 140.00 179.10 146.66 181.09 150.94
  Q 183.40 155.93 181.13 160.35
  A 0.93 0.92 26.2 0 0 181.57 161.62
  Q 186.65 163.94 191.56 166.16
  C 194.43 167.45 195.56 172.08 199.17 171.97
  Q 201.80 171.88 204.44 171.90
  C 207.25 171.93 209.52 173.52 212.47 173.64
  A 1.97 1.96 78.1 0 0 214.31 170.81
  C 213.07 168.28 208.70 166.04 206.43 164.33
  Q 204.59 162.94 205.67 161.28
  A 1.26 1.25 11.4 0 1 206.47 160.75
  C 210.87 159.97 213.96 155.47 218.60 157.99
  A 0.48 0.48 0.0 0 0 219.28 157.73
  Q 221.56 151.22 228.50 150.34
  A 1.79 1.79 0.0 0 0 229.75 147.54
  L 223.67 138.77
  A 0.58 0.54 -9.7 0 0 223.34 138.55
  Q 221.25 138.05 219.30 137.22
  C 216.53 136.04 214.21 132.32 212.20 130.06
  C 208.17 125.52 211.13 122.51 214.91 119.92
  Q 215.34 119.62 215.15 119.13
  C 212.15 111.63 205.45 107.52 198.15 104.65
  Q 197.72 104.48 197.28 104.61
  L 193.56 105.73
  A 1.29 1.26 -79.4 0 0 192.92 106.18
  L 191.84 107.57
  Q 191.37 108.17 190.74 107.75
  L 186.63 105.02
  A 0.78 0.77 44.5 0 0 185.78 105.02
  L 182.72 107.02
  Q 182.25 107.33 181.70 107.30
  C 172.24 106.90 165.04 106.94 156.39 109.15
  Q 155.89 109.28 155.57 109.66
  C 153.46 112.15 151.43 113.55 149.73 116.50
  C 148.46 118.70 144.09 123.00 146.19 125.57
  Q 150.44 130.78 154.31 136.50
  Q 154.60 136.94 155.12 137.02
  Z
  M 363.62 110.96
  Q 366.46 112.71 368.87 110.39
  A 0.86 0.86 0.0 0 0 368.01 108.95
  Q 364.29 110.15 360.34 110.15
  A 0.39 0.39 0.0 0 0 360.12 110.87
  L 360.71 111.27
  Q 361.13 111.56 361.59 111.36
  L 362.72 110.89
  A 0.98 0.97 -40.3 0 1 363.62 110.96
  Z
  M 359.28 148.66
  Q 366.33 149.00 367.42 142.33
  Q 367.50 141.81 367.84 141.40
  Q 370.58 138.14 370.05 134.03
  C 369.46 129.51 370.78 126.39 374.95 124.25
  Q 375.41 124.01 375.04 123.64
  C 371.22 119.79 366.57 118.36 362.58 115.86
  C 358.02 113.00 358.47 109.15 351.34 111.13
  Q 343.80 113.22 336.56 116.18
  C 331.29 118.33 326.21 119.56 320.92 121.19
  C 314.22 123.25 311.28 126.36 303.47 124.96
  Q 292.52 122.99 281.49 121.33
  Q 277.90 120.78 274.74 119.30
  Q 267.69 116.01 260.71 112.53
  Q 260.21 112.28 259.85 112.70
  L 257.25 115.81
  A 1.23 1.22 -29.8 0 0 256.98 116.79
  Q 257.52 120.29 255.89 123.39
  Q 255.64 123.86 256.08 124.16
  Q 263.34 129.17 267.71 131.26
  Q 272.85 133.72 276.02 137.16
  Q 276.36 137.53 276.87 137.57
  Q 281.03 137.86 284.54 139.93
  C 287.23 141.52 289.32 141.56 292.21 142.04
  A 1.82 1.82 0.0 0 1 293.05 142.42
  Q 296.89 145.55 301.68 145.91
  Q 305.95 146.24 306.75 146.46
  C 310.81 147.62 313.64 150.97 316.45 153.75
  C 318.86 156.14 321.12 157.22 324.22 155.82
  A 1.40 1.34 89.9 0 0 324.91 155.10
  C 325.73 153.15 328.24 147.06 330.73 147.24
  Q 335.12 147.55 342.03 150.19
  Q 344.59 151.17 347.08 149.84
  A 1.10 1.08 -46.9 0 1 348.01 149.80
  L 351.97 151.46
  A 1.39 1.38 50.0 0 0 352.75 151.53
  Q 355.76 150.90 358.16 149.01
  Q 358.65 148.63 359.28 148.66
  Z
  M 220.60 160.45
  Q 217.19 158.42 213.27 159.69
  A 0.85 0.80 -77.0 0 0 212.88 159.95
  Q 211.06 162.02 208.31 162.07
  A 0.89 0.88 58.2 0 0 207.92 163.74
  Q 212.06 165.92 215.37 169.24
  Q 215.80 169.67 216.38 169.48
  Q 221.67 167.77 225.78 171.59
  A 1.38 1.34 -73.2 0 1 226.19 172.38
  C 226.69 176.00 231.08 175.75 233.69 175.20
  A 1.80 1.80 0.0 0 1 234.69 175.27
  Q 239.31 176.90 244.14 176.25
  A 1.05 1.05 0.0 0 0 244.97 175.61
  L 245.84 173.40
  Q 246.06 172.86 246.59 172.61
  L 262.69 165.31
  A 0.69 0.69 0.0 0 0 262.92 164.24
  C 258.15 158.65 265.69 155.88 268.86 153.32
  A 1.29 1.28 -16.7 0 0 269.32 152.48
  L 270.11 145.79
  A 1.73 1.72 5.8 0 0 268.54 143.87
  C 266.48 143.70 260.91 141.19 261.91 138.19
  C 262.80 135.51 269.00 136.27 271.10 136.76
  A 0.67 0.67 0.0 0 0 271.54 135.50
  Q 263.21 131.56 255.22 126.14
  C 248.78 121.78 245.21 126.92 239.98 130.00
  A 1.41 1.40 34.2 0 1 239.08 130.17
  C 231.53 128.97 225.20 129.71 220.15 122.76
  C 216.78 118.12 210.02 124.74 212.49 128.03
  Q 213.78 129.74 217.67 134.22
  C 219.54 136.38 222.38 135.90 224.52 138.10
  Q 229.05 142.77 231.46 148.88
  A 2.05 2.05 0.0 0 1 230.20 151.58
  C 225.96 152.98 220.69 154.28 221.22 160.06
  Q 221.29 160.86 220.60 160.45
  Z
  M 167.11 198.84
  L 171.67 198.15
  A 0.84 0.84 0.0 0 0 172.32 197.01
  L 171.42 194.72
  A 1.04 1.04 0.0 0 1 172.65 193.34
  Q 179.87 195.25 185.33 200.22
  C 188.39 203.02 191.58 200.99 193.32 198.13
  A 0.76 0.76 0.0 0 1 194.70 198.31
  Q 195.16 199.83 196.67 200.10
  A 0.87 0.87 0.0 0 0 197.68 199.38
  C 199.16 190.78 191.63 190.58 187.83 185.16
  Q 184.93 181.03 180.45 176.26
  C 179.17 174.91 180.30 171.18 182.24 170.96
  Q 182.78 170.90 183.15 171.30
  L 185.75 174.13
  A 0.70 0.70 0.0 0 0 186.71 174.20
  L 188.99 172.31
  Q 189.45 171.93 189.11 171.44
  L 186.92 168.35
  Q 186.66 167.97 186.87 167.56
  Q 187.75 165.85 186.04 165.27
  Q 182.11 163.93 179.70 162.00
  A 1.29 1.27 18.5 0 1 179.23 161.08
  C 179.13 158.91 180.35 157.34 180.30 155.49
  C 180.19 151.39 178.07 149.87 176.92 146.43
  C 176.06 143.86 174.89 141.02 172.01 140.75
  Q 162.96 139.91 154.08 138.43
  A 0.50 0.49 88.3 0 0 153.52 139.03
  C 154.41 143.20 151.90 145.41 147.94 145.70
  Q 141.75 146.14 136.94 142.16
  A 2.30 2.30 0.0 0 0 135.14 141.66
  Q 128.48 142.69 121.70 143.73
  C 117.02 144.44 112.57 143.85 107.82 143.74
  A 2.11 2.10 85.9 0 0 105.69 146.20
  Q 106.08 148.43 104.88 150.24
  Q 104.59 150.68 104.10 150.88
  C 100.97 152.15 98.24 152.38 97.42 156.23
  C 96.90 158.66 96.01 159.89 95.17 161.94
  A 1.32 1.32 0.0 0 0 95.87 163.66
  Q 100.04 165.44 102.59 169.18
  A 1.98 1.96 63.7 0 0 104.84 169.95
  Q 108.91 168.60 113.31 167.57
  C 115.74 167.01 117.19 167.65 118.87 169.27
  A 0.90 0.89 52.3 0 0 119.90 169.41
  L 122.21 168.18
  A 2.27 2.26 73.2 0 1 125.53 169.96
  C 125.93 174.01 118.75 175.82 115.90 176.11
  A 1.21 1.21 0.0 0 0 115.09 178.09
  L 115.75 178.88
  Q 116.09 179.29 115.96 179.81
  C 114.54 185.69 119.79 188.22 123.45 191.34
  C 127.05 194.42 131.86 196.12 135.04 199.20
  Q 139.84 203.83 144.75 208.39
  Q 145.10 208.72 145.56 208.85
  Q 148.28 209.61 148.47 212.50
  A 1.67 1.67 0.0 0 0 150.32 214.06
  C 152.38 213.83 156.65 214.55 157.68 212.31
  Q 160.35 206.51 162.78 203.77
  A 1.44 1.40 -70.1 0 1 163.77 203.29
  L 166.02 203.18
  A 0.68 0.67 -3.4 0 0 166.66 202.47
  L 166.48 199.62
  A 0.74 0.73 -6.3 0 1 167.11 198.84
  Z
  M 286.19 157.82
  L 287.59 157.40
  A 0.71 0.70 76.4 0 0 288.08 156.59
  C 287.30 152.53 288.09 148.23 293.43 149.15
  A 1.59 1.59 0.0 0 0 295.13 146.89
  C 293.91 144.40 292.42 143.52 289.51 143.12
  C 285.26 142.53 282.62 140.01 278.80 139.31
  Q 271.72 138.02 264.97 138.33
  A 1.02 1.02 0.0 0 0 264.42 140.17
  Q 266.55 141.72 269.23 142.37
  A 3.11 3.11 0.0 0 1 271.59 145.72
  L 270.75 153.81
  A 0.68 0.67 -15.0 0 1 270.46 154.30
  L 264.49 158.42
  A 2.64 2.61 -17.3 0 0 263.35 160.56
  Q 263.34 162.73 265.30 164.30
  C 267.20 165.83 271.62 165.56 274.26 166.26
  Q 274.88 166.42 274.89 165.78
  Q 274.91 164.14 276.14 163.85
  C 278.06 163.40 280.15 166.14 281.04 167.57
  A 0.38 0.38 0.0 0 0 281.73 167.47
  L 282.44 164.93
  Q 282.59 164.39 282.99 164.00
  Q 285.22 161.75 285.59 158.53
  A 0.85 0.83 -5.4 0 1 286.19 157.82
  Z
  M 318.16 164.97
  C 319.72 165.52 321.28 165.62 322.75 166.32
  C 326.68 168.20 331.09 171.02 335.59 171.11
  Q 337.84 171.15 340.08 171.79
  Q 349.60 174.51 354.19 166.19
  Q 355.56 163.71 355.10 160.99
  C 354.53 157.61 351.49 151.02 347.15 151.94
  Q 344.31 152.55 343.81 152.50
  C 341.56 152.30 339.39 151.13 337.54 150.70
  Q 334.59 150.01 331.60 149.33
  Q 331.10 149.21 330.65 149.47
  C 327.33 151.32 327.21 157.81 323.72 158.31
  C 319.02 158.97 317.08 156.91 313.72 153.19
  Q 308.45 147.36 300.14 147.72
  Q 299.73 147.74 299.33 147.59
  L 297.03 146.76
  A 0.43 0.43 0.0 0 0 296.51 147.37
  C 298.38 150.75 294.93 150.90 292.82 151.06
  C 288.24 151.41 289.72 155.21 290.10 158.08
  A 0.67 0.67 0.0 0 1 289.68 158.79
  L 287.68 159.54
  Q 287.06 159.78 287.01 160.43
  Q 286.79 163.57 284.39 165.44
  A 1.29 1.29 0.0 0 0 284.54 167.58
  C 289.65 170.54 288.03 176.56 288.27 181.47
  Q 288.30 181.99 288.82 181.99
  C 294.25 181.96 297.98 181.22 304.09 183.17
  Q 307.00 184.09 311.02 185.99
  Q 318.33 189.43 325.87 192.55
  A 0.43 0.43 0.0 0 0 326.45 192.03
  Q 325.56 189.11 326.85 186.31
  A 1.55 1.52 50.4 0 0 326.94 185.25
  C 325.55 180.42 319.98 179.14 318.51 174.21
  Q 317.24 169.95 317.44 165.45
  A 0.54 0.54 0.0 0 1 318.16 164.97
  Z
  M 239.48 183.74
  A 0.45 0.45 0.0 0 0 238.89 184.36
  C 240.17 186.79 244.32 188.79 241.24 192.06
  C 240.67 192.67 239.83 193.03 239.09 193.59
  Q 238.45 194.06 239.19 194.33
  C 241.29 195.10 243.75 195.02 245.56 195.89
  C 248.57 197.33 254.94 203.94 252.04 207.62
  A 1.30 1.29 -62.0 0 1 250.62 208.06
  Q 245.93 206.53 244.90 201.77
  A 1.53 1.52 -8.5 0 0 243.27 200.57
  L 236.95 201.14
  A 0.99 0.98 73.5 0 0 236.17 202.58
  Q 237.47 205.03 236.62 207.72
  Q 236.45 208.25 236.65 208.78
  L 238.33 213.34
  A 1.15 1.15 0.0 0 1 236.96 214.85
  L 234.07 214.10
  Q 233.21 213.88 233.65 214.65
  C 235.37 217.69 235.95 220.98 238.15 223.73
  C 240.05 226.11 246.09 235.00 243.74 238.01
  Q 242.06 240.17 241.23 241.36
  A 1.04 1.03 -41.5 0 0 241.16 242.46
  Q 242.93 245.67 241.87 249.25
  A 1.34 1.32 -50.6 0 0 241.96 250.23
  C 243.25 252.87 247.92 252.61 251.09 252.73
  Q 251.68 252.75 252.05 252.29
  Q 253.95 249.93 253.66 246.80
  A 0.96 0.94 71.0 0 1 254.08 245.92
  L 258.40 243.07
  Q 258.89 242.74 259.45 242.91
  Q 265.59 244.68 265.60 251.03
  A 0.95 0.95 0.0 0 0 266.13 251.88
  L 271.44 254.45
  A 0.62 0.61 20.9 0 0 272.30 254.07
  L 273.05 251.36
  A 0.73 0.73 0.0 0 1 274.05 250.89
  Q 277.90 252.61 279.76 256.24
  A 1.50 1.49 50.2 0 0 282.28 256.47
  C 287.03 250.24 293.79 248.34 300.89 245.57
  A 1.47 1.41 -83.8 0 0 301.56 245.01
  Q 303.59 241.80 307.23 240.85
  A 0.92 0.91 -2.9 0 0 307.91 240.10
  C 308.36 237.17 308.43 234.25 308.77 231.32
  Q 308.99 229.47 307.25 229.18
  Q 302.13 228.34 298.97 227.32
  C 294.45 225.86 289.70 227.73 285.82 225.18
  Q 281.87 222.59 280.21 217.98
  A 2.05 2.04 82.3 0 0 278.46 216.64
  Q 274.70 216.32 271.60 213.39
  C 268.53 210.49 270.00 209.66 272.02 207.10
  Q 272.40 206.62 272.02 206.13
  Q 269.66 203.17 272.27 200.65
  Q 272.68 200.26 273.23 200.34
  Q 276.89 200.86 279.55 198.39
  A 0.68 0.60 9.7 0 1 279.79 198.24
  L 286.55 195.79
  A 0.80 0.79 -14.1 0 0 287.07 194.92
  C 286.53 191.02 285.62 187.83 286.00 183.73
  C 286.39 179.62 287.92 170.91 283.24 168.13
  A 0.62 0.62 0.0 0 0 282.34 168.44
  L 281.79 169.82
  A 1.09 1.09 0.0 0 1 279.69 169.46
  Q 279.61 166.82 277.29 165.62
  A 0.57 0.57 0.0 0 0 276.66 166.56
  L 277.96 167.67
  Q 278.52 168.14 278.11 168.75
  L 277.74 169.31
  A 0.70 0.69 -53.9 0 1 276.73 169.47
  C 272.82 166.34 268.94 167.07 264.36 166.40
  Q 263.86 166.33 263.42 166.55
  Q 258.87 168.83 248.52 173.30
  Q 246.43 174.20 246.40 176.88
  A 0.80 0.79 -0.0 0 1 245.60 177.67
  L 242.05 177.64
  A 0.79 0.79 0.0 0 0 241.38 178.85
  L 242.79 181.10
  A 0.89 0.87 36.9 0 1 242.90 181.80
  L 242.25 184.30
  Q 242.08 184.96 241.46 184.67
  L 239.48 183.74
  Z
  M 200.46 226.34
  C 198.14 226.70 192.78 225.54 191.90 227.93
  A 0.72 0.71 24.9 0 0 192.22 228.80
  Q 201.41 233.97 211.13 238.15
  C 214.43 239.57 218.23 238.86 221.89 239.51
  Q 222.40 239.60 222.70 239.18
  Q 225.65 235.20 230.39 236.42
  Q 235.10 237.62 238.33 238.71
  A 3.24 3.23 -0.1 0 0 242.43 234.60
  C 241.31 231.36 240.18 229.20 237.71 226.14
  Q 235.43 223.30 234.33 219.79
  C 233.61 217.47 232.73 216.30 230.65 215.39
  A 1.54 1.53 35.9 0 1 230.24 212.85
  Q 230.85 212.29 232.26 212.45
  Q 234.00 212.64 235.90 212.41
  Q 236.57 212.33 236.23 211.75
  Q 234.40 208.60 235.37 205.02
  A 1.12 1.12 0.0 0 0 235.22 204.11
  C 231.34 198.17 242.03 198.81 244.54 199.04
  A 1.37 1.36 71.8 0 1 245.44 199.50
  C 247.65 202.05 246.50 204.65 250.40 206.10
  A 0.50 0.50 0.0 0 0 251.06 205.52
  Q 249.21 197.35 240.26 196.35
  Q 237.74 196.07 236.54 193.29
  A 0.64 0.64 0.0 0 1 236.87 192.46
  L 239.83 191.15
  Q 240.38 190.91 240.60 190.35
  Q 241.05 189.21 239.87 188.09
  C 237.93 186.25 235.26 183.20 237.40 180.49
  A 0.99 0.98 52.0 0 1 239.07 180.70
  L 239.86 182.47
  A 0.73 0.72 23.8 0 0 241.21 181.95
  Q 239.40 176.52 234.53 176.76
  C 230.57 176.97 225.53 177.27 224.48 172.72
  Q 224.36 172.18 223.90 171.87
  Q 220.89 169.84 217.26 170.40
  Q 216.65 170.49 216.59 171.10
  C 216.20 175.06 213.46 176.14 209.88 174.88
  Q 205.30 173.28 200.44 173.74
  C 196.35 174.14 195.45 171.39 192.58 169.78
  Q 191.10 168.95 189.50 168.34
  A 0.45 0.44 -9.6 0 0 189.00 169.04
  L 191.43 171.92
  A 0.56 0.55 -39.6 0 1 191.35 172.71
  L 187.14 176.18
  A 0.90 0.89 46.5 0 1 185.96 176.14
  L 183.04 173.38
  A 0.78 0.78 0.0 0 0 182.13 173.26
  Q 181.26 173.74 181.54 174.78
  Q 181.65 175.21 181.96 175.54
  Q 185.61 179.49 188.68 183.90
  C 190.69 186.78 192.08 187.51 194.97 189.29
  C 198.92 191.71 201.41 198.40 197.40 202.21
  Q 196.92 202.66 196.44 202.20
  L 195.01 200.81
  A 0.83 0.82 52.2 0 0 194.02 200.68
  L 191.20 202.29
  Q 190.74 202.55 190.65 203.07
  Q 190.04 206.57 189.07 210.06
  C 188.48 212.15 187.34 213.70 185.01 213.15
  A 1.12 1.12 0.0 0 0 184.28 215.26
  C 187.14 216.60 190.70 217.07 192.40 219.55
  A 0.67 0.67 0.0 0 0 193.51 219.53
  L 195.06 217.17
  A 2.36 2.36 0.0 0 1 199.12 217.34
  Q 201.22 221.23 200.98 225.77
  Q 200.95 226.27 200.46 226.34
  Z
  M 511.95 292.23
  Q 514.66 292.41 517.27 293.22
  Q 534.11 298.46 551.06 303.71
  Q 551.59 303.88 551.63 303.32
  Q 552.20 293.34 553.91 283.49
  C 555.10 276.61 550.32 272.46 546.43 267.68
  A 1.15 1.15 0.0 0 1 546.18 266.77
  Q 546.82 262.80 545.42 260.83
  Q 541.71 255.63 534.31 253.15
  C 531.21 252.11 528.52 248.87 527.35 246.40
  Q 522.66 236.54 519.50 230.72
  Q 518.53 228.95 516.47 227.61
  Q 516.02 227.32 515.57 227.60
  C 512.38 229.58 505.49 231.70 502.44 228.54
  Q 501.25 227.31 500.08 225.18
  C 495.97 217.73 493.05 212.51 492.81 204.20
  C 492.72 201.07 491.81 193.62 493.81 191.31
  Q 497.54 187.02 500.97 182.45
  C 503.05 179.69 503.79 177.36 500.59 175.15
  Q 495.06 171.34 489.78 168.87
  C 484.66 166.47 475.38 175.36 471.76 177.45
  Q 467.44 179.96 462.78 181.15
  A 2.68 2.68 0.0 0 0 460.82 183.22
  Q 459.24 191.08 457.74 199.24
  C 456.30 207.08 450.38 204.89 444.58 205.82
  A 0.81 0.81 0.0 0 0 443.94 206.89
  Q 448.12 218.72 452.08 230.11
  C 453.63 234.55 453.37 237.96 451.73 242.08
  Q 451.53 242.56 451.06 242.78
  C 448.38 244.01 445.07 244.66 445.56 248.73
  C 446.20 254.10 447.44 260.45 443.32 264.61
  Q 442.36 265.59 436.01 269.22
  Q 424.72 275.68 413.38 282.13
  A 1.49 1.48 -55.7 0 1 412.44 282.31
  C 407.95 281.74 400.01 279.38 396.86 283.64
  Q 394.13 287.33 391.11 288.84
  Q 390.64 289.08 390.73 289.60
  C 391.44 293.55 393.44 297.20 394.79 300.95
  Q 395.86 303.90 396.23 307.96
  C 396.83 314.56 397.75 320.70 401.52 325.90
  A 1.27 1.26 78.0 0 0 402.30 326.41
  C 406.72 327.36 410.74 328.13 414.52 330.75
  C 419.07 333.91 422.96 336.89 426.27 341.60
  C 435.57 354.83 441.44 363.90 452.10 372.91
  C 456.31 376.47 458.17 379.69 459.93 384.55
  C 461.98 390.18 470.00 392.80 474.83 394.32
  Q 475.30 394.47 475.75 394.26
  L 479.24 392.64
  Q 479.74 392.40 479.51 391.89
  Q 475.92 383.92 473.99 375.36
  C 473.68 373.99 470.96 372.19 470.06 370.55
  Q 467.43 365.77 463.95 361.56
  C 459.97 356.75 459.59 351.38 462.89 346.00
  Q 463.15 345.57 463.62 345.39
  Q 470.65 342.73 477.70 340.13
  C 481.69 338.66 485.99 339.63 489.79 338.18
  C 491.65 337.47 495.81 335.49 495.21 332.99
  Q 494.56 330.23 491.51 320.53
  C 490.80 318.27 490.56 316.07 492.16 314.42
  C 495.84 310.63 501.61 306.43 505.16 300.98
  C 507.16 297.90 509.82 296.57 511.22 292.70
  Q 511.40 292.19 511.95 292.23
  Z
  M 288.26 196.97
  Q 285.00 198.68 281.41 199.54
  A 1.18 1.11 -71.9 0 0 280.88 199.83
  Q 278.02 202.58 274.08 202.23
  A 1.44 1.44 0.0 0 0 272.69 204.37
  L 274.24 207.15
  A 0.64 0.64 0.0 0 1 274.11 207.94
  L 271.90 209.91
  A 1.10 1.09 -39.3 0 0 271.75 211.38
  Q 274.23 214.68 278.39 214.82
  Q 278.89 214.83 279.27 215.16
  C 283.79 218.98 283.21 224.96 291.02 224.80
  C 293.92 224.74 295.96 224.72 298.88 225.76
  Q 301.89 226.84 305.52 227.37
  A 0.73 0.73 0.0 0 0 306.33 226.44
  C 305.47 223.48 303.63 218.15 305.41 215.42
  Q 306.99 212.99 310.28 212.55
  Q 319.55 211.34 327.11 207.63
  Q 327.57 207.41 327.70 206.90
  C 328.53 203.66 328.94 195.81 325.23 194.01
  Q 317.65 190.35 309.97 186.88
  C 302.33 183.43 296.45 182.33 288.58 183.44
  Q 288.09 183.51 287.90 183.97
  C 286.69 186.95 288.58 192.93 288.79 196.03
  Q 288.83 196.67 288.26 196.97
  Z
  M 116.45 212.29
  Q 113.70 211.78 114.00 214.46
  A 0.88 0.86 -20.3 0 1 113.60 215.30
  Q 111.54 216.59 111.47 218.96
  A 1.16 1.11 -66.5 0 0 111.76 219.75
  Q 114.35 222.64 115.72 226.30
  A 1.28 1.27 76.5 0 1 114.68 228.01
  Q 111.73 228.36 108.93 227.23
  A 0.58 0.58 0.0 0 0 108.15 227.89
  L 108.88 231.14
  A 0.56 0.55 67.0 0 1 108.65 231.72
  L 107.35 232.60
  Q 106.97 232.85 106.89 233.30
  C 106.00 238.42 114.09 234.99 113.61 241.45
  C 113.45 243.60 113.74 244.81 114.17 246.71
  A 1.06 1.04 61.0 0 1 113.91 247.66
  Q 111.28 250.46 110.75 254.28
  A 0.82 0.82 0.0 0 0 111.53 255.22
  L 113.42 255.26
  Q 113.98 255.28 114.35 255.70
  L 124.30 266.97
  A 0.82 0.82 0.0 0 0 125.72 266.28
  C 124.79 261.28 125.77 256.71 124.37 251.65
  A 1.61 1.60 77.0 0 1 125.62 249.64
  C 128.96 249.00 132.32 247.93 135.82 248.88
  Q 139.61 249.91 143.56 250.02
  C 148.19 250.15 151.34 253.52 156.01 254.45
  C 160.95 255.44 165.20 256.60 170.20 254.21
  C 172.63 253.05 174.40 253.21 176.89 253.00
  A 1.36 1.36 0.0 0 0 177.90 250.87
  L 175.30 247.11
  A 1.88 1.87 -25.0 0 1 176.35 244.23
  L 182.44 242.58
  A 0.65 0.65 0.0 0 0 182.84 241.65
  L 181.70 239.53
  Q 181.43 239.04 181.75 238.58
  C 183.55 235.97 186.85 237.81 187.55 235.05
  A 1.20 1.20 0.0 0 0 187.31 233.99
  Q 185.81 232.11 186.26 229.86
  A 0.99 0.98 4.4 0 1 187.19 229.07
  Q 190.61 228.94 190.85 225.49
  A 0.83 0.81 -4.9 0 1 191.49 224.75
  Q 194.96 223.97 198.38 224.57
  A 0.99 0.98 88.6 0 0 199.51 223.38
  L 198.61 219.37
  A 1.36 1.36 0.0 0 0 196.10 218.99
  L 194.19 222.30
  A 0.81 0.81 0.0 0 1 192.83 222.36
  Q 190.73 219.41 187.21 218.38
  Q 184.83 217.69 184.13 217.19
  C 182.72 216.20 180.89 213.49 182.65 212.12
  C 183.54 211.43 185.12 211.40 186.33 211.02
  A 1.06 1.05 -0.6 0 0 187.02 210.32
  L 188.59 205.03
  Q 188.75 204.47 188.26 204.16
  Q 184.37 201.71 180.69 198.94
  C 178.78 197.50 176.59 196.74 174.47 195.72
  A 0.41 0.41 0.0 0 0 173.90 196.20
  C 175.25 200.85 171.55 199.94 168.86 200.49
  Q 168.23 200.62 168.28 201.26
  L 168.47 203.92
  A 0.75 0.75 0.0 0 1 168.04 204.66
  C 165.28 205.95 163.79 204.53 162.15 207.90
  C 160.83 210.62 159.20 216.02 155.49 216.00
  C 153.39 215.99 148.22 216.99 147.37 214.30
  C 146.27 210.80 144.88 211.05 142.80 209.09
  C 136.16 202.84 131.55 197.51 124.21 194.79
  A 0.45 0.37 -18.9 0 0 123.78 195.49
  L 125.76 196.25
  A 0.56 0.56 0.0 0 1 126.12 196.77
  L 126.15 201.83
  Q 126.15 202.20 125.81 202.33
  L 121.15 204.14
  Q 120.82 204.27 120.47 204.27
  Q 119.86 204.26 119.17 203.94
  A 1.74 1.74 0.0 0 0 116.92 206.37
  Q 118.45 209.08 117.09 211.97
  Q 116.90 212.37 116.45 212.29
  Z
  M 611.12 246.88
  Q 608.03 242.26 606.39 238.10
  Q 606.17 237.54 606.31 236.96
  L 609.11 225.69
  A 0.41 0.39 43.9 0 0 609.10 225.43
  Q 608.68 224.31 609.48 223.54
  A 1.03 1.03 0.0 0 0 608.54 221.80
  Q 601.24 223.45 597.38 218.34
  Q 596.37 217.01 595.86 214.04
  Q 594.91 208.46 591.36 203.85
  A 0.85 0.84 -22.8 0 0 590.57 203.53
  Q 582.47 204.67 574.31 205.22
  C 568.65 205.59 566.80 202.31 563.28 198.90
  A 1.46 1.46 0.0 0 0 561.18 198.97
  Q 557.74 202.80 552.49 203.15
  A 1.51 1.47 -67.2 0 0 551.64 203.51
  L 549.80 205.12
  A 1.07 1.06 27.0 0 1 548.98 205.38
  L 541.55 204.59
  A 0.58 0.58 0.0 0 0 540.99 205.47
  C 542.15 207.38 543.15 208.35 543.73 210.49
  Q 544.88 214.73 545.73 219.04
  Q 546.25 221.66 547.63 223.23
  Q 550.50 226.49 554.58 228.33
  A 1.06 1.03 5.5 0 1 555.18 229.04
  C 557.40 238.10 549.71 240.01 547.46 247.04
  C 546.11 251.25 547.30 254.36 547.04 258.24
  Q 546.91 260.21 547.42 262.41
  Q 547.89 264.47 547.78 266.66
  A 1.48 1.47 28.6 0 0 548.05 267.57
  Q 550.23 270.56 552.57 273.44
  C 557.66 279.71 554.52 286.36 553.99 293.28
  Q 553.61 298.22 552.96 302.79
  A 1.84 1.84 0.0 0 0 554.21 304.81
  Q 570.88 310.25 587.71 315.87
  C 593.48 317.79 596.80 319.86 600.76 323.99
  Q 605.08 328.51 614.53 337.28
  Q 614.90 337.62 615.34 337.37
  L 632.72 327.47
  A 1.93 1.93 0.0 0 1 634.32 327.34
  Q 638.21 328.73 641.69 330.39
  Q 644.52 331.75 647.52 334.53
  C 649.91 336.74 653.85 341.94 657.56 340.13
  A 1.53 1.53 0.0 0 0 658.19 337.93
  Q 649.69 324.56 648.51 309.08
  C 648.29 306.17 647.77 303.99 646.79 301.52
  A 2.08 2.07 74.8 0 0 644.55 300.23
  Q 641.21 300.73 637.98 299.81
  Q 637.46 299.66 637.17 299.21
  Q 634.99 295.77 633.54 292.01
  C 631.97 287.93 630.66 285.11 629.27 281.62
  Q 628.54 279.80 628.00 276.17
  Q 627.51 272.87 626.09 270.41
  Q 621.16 261.82 611.12 246.88
  Z
  M 308.48 242.39
  C 306.65 242.70 305.82 243.08 304.48 244.53
  C 300.95 248.40 293.76 250.32 288.99 252.42
  Q 286.57 253.48 282.64 259.20
  A 0.82 0.80 56.4 0 0 282.52 259.84
  L 283.52 264.21
  Q 283.62 264.65 283.49 265.08
  Q 282.29 269.37 282.30 273.80
  Q 282.30 274.32 281.87 274.62
  C 279.60 276.20 275.93 276.31 276.10 279.99
  Q 276.20 282.20 276.34 284.46
  A 1.44 1.41 64.0 0 1 276.00 285.49
  Q 274.90 286.82 273.22 287.32
  A 1.42 1.41 -84.4 0 0 272.35 288.04
  Q 271.55 289.67 273.27 291.46
  C 275.03 293.29 275.25 293.75 278.09 293.40
  Q 282.46 292.87 285.49 296.33
  Q 285.74 296.62 285.76 297.00
  L 285.88 299.58
  A 0.41 0.40 66.2 0 0 286.57 299.85
  L 289.32 297.05
  A 1.33 1.32 22.1 0 1 290.27 296.65
  Q 293.08 296.63 295.42 295.14
  Q 295.88 294.85 296.39 295.02
  C 298.76 295.79 301.45 297.63 303.91 297.36
  Q 305.59 297.17 307.34 296.70
  Q 307.87 296.56 308.18 296.11
  Q 310.81 292.32 315.52 292.70
  A 1.13 1.09 -60.4 0 0 316.30 292.47
  L 319.09 290.31
  A 0.82 0.81 -44.6 0 1 320.10 290.31
  Q 324.29 293.60 327.08 298.09
  C 328.44 300.26 328.06 303.28 330.79 304.93
  Q 339.27 310.07 341.62 311.82
  Q 348.02 316.59 345.97 324.11
  Q 345.83 324.64 346.19 325.06
  L 348.31 327.48
  A 1.47 1.47 0.0 0 1 347.92 329.73
  Q 346.41 330.56 346.96 332.54
  Q 348.01 336.37 354.75 346.75
  C 356.39 349.28 356.19 352.67 357.54 355.05
  Q 362.72 364.22 373.02 367.17
  A 0.76 0.75 -4.4 0 0 373.92 366.13
  C 372.33 362.68 371.73 359.98 371.94 355.87
  Q 372.26 349.67 371.12 343.54
  Q 370.69 341.25 369.53 340.88
  C 366.03 339.75 362.88 339.42 361.38 335.57
  A 1.31 1.30 81.5 0 1 362.69 333.79
  L 366.66 334.09
  A 0.82 0.82 0.0 0 0 367.34 333.81
  Q 370.62 329.98 373.93 326.18
  C 377.13 322.52 379.24 326.39 379.83 329.21
  A 2.01 2.01 0.0 0 0 381.44 330.77
  C 385.50 331.48 389.37 332.23 393.26 330.40
  Q 396.51 328.88 399.65 327.04
  Q 400.10 326.78 399.86 326.32
  Q 395.26 317.70 394.93 307.93
  C 394.73 302.27 391.39 295.81 389.23 290.57
  A 2.42 2.41 64.0 0 1 390.27 287.54
  Q 393.02 285.97 395.36 283.19
  C 399.93 277.75 405.32 279.92 410.95 280.76
  A 4.17 4.15 34.1 0 0 413.63 280.25
  Q 425.94 273.23 438.52 266.07
  Q 441.91 264.15 442.96 262.78
  C 447.47 256.92 440.45 245.56 447.37 242.83
  C 451.38 241.24 451.10 239.94 451.53 236.10
  Q 451.77 233.97 451.46 233.04
  Q 447.14 220.18 442.56 207.41
  Q 441.77 205.22 439.47 205.52
  Q 404.83 209.90 369.94 214.41
  C 363.03 215.31 355.61 212.03 348.69 211.10
  Q 347.56 210.95 346.20 211.33
  Q 337.35 213.80 329.30 209.34
  Q 328.85 209.09 328.38 209.31
  Q 320.62 212.85 310.01 214.48
  Q 307.84 214.81 306.09 217.20
  A 1.07 1.03 -33.2 0 0 305.90 218.03
  L 307.66 226.49
  Q 307.77 227.02 308.20 227.33
  C 311.44 229.65 310.28 232.12 310.19 235.26
  Q 310.10 238.55 309.23 241.71
  Q 309.07 242.29 308.48 242.39
  Z
  M 189.08 236.64
  Q 187.47 238.36 185.29 238.18
  A 1.31 1.31 0.0 0 0 183.89 239.71
  Q 184.72 244.40 187.17 248.42
  A 1.45 1.43 33.1 0 1 187.36 249.30
  C 186.60 256.27 179.84 257.48 174.64 259.69
  C 171.32 261.09 170.19 263.31 169.51 266.60
  Q 169.40 267.13 169.81 267.47
  C 172.59 269.81 176.45 270.34 178.03 273.69
  A 1.11 1.10 84.8 0 0 178.76 274.30
  C 182.89 275.33 185.72 277.78 189.63 278.97
  C 200.31 282.23 210.01 292.23 215.83 301.79
  Q 216.05 302.16 216.38 302.43
  Q 216.66 302.66 216.82 302.79
  Q 218.47 304.19 218.67 302.04
  C 219.05 298.05 219.57 294.07 219.73 290.15
  C 219.86 287.14 221.07 285.49 224.23 284.98
  Q 228.82 284.23 233.24 282.81
  C 237.44 281.47 240.50 282.25 243.97 284.48
  A 1.50 1.46 -28.5 0 0 244.86 284.73
  C 248.80 284.63 252.86 284.13 256.52 286.00
  C 260.90 288.24 264.00 291.05 269.64 289.00
  Q 270.10 288.84 270.26 288.37
  Q 271.09 285.86 273.67 285.22
  A 1.52 1.52 0.0 0 0 274.82 283.56
  C 274.58 281.52 273.89 278.05 275.41 276.22
  C 276.50 274.91 278.64 274.60 280.18 273.61
  Q 280.62 273.33 280.65 272.82
  Q 280.88 269.62 281.48 266.48
  C 281.97 263.89 281.56 261.93 281.05 259.48
  A 1.37 1.35 -77.0 0 0 280.55 258.67
  Q 277.76 256.51 276.02 253.42
  A 1.09 1.09 0.0 0 0 274.03 253.66
  L 273.23 256.50
  A 0.58 0.57 25.6 0 1 272.34 256.81
  Q 269.44 254.75 266.18 253.31
  C 264.15 252.41 263.55 251.13 263.79 249.03
  Q 263.85 248.50 263.60 248.03
  Q 262.47 245.82 260.28 244.64
  Q 259.87 244.42 259.42 244.55
  Q 255.91 245.56 255.22 248.73
  Q 254.58 251.66 254.36 252.02
  C 252.15 255.63 244.51 253.76 241.51 252.39
  A 2.38 2.37 -70.7 0 1 240.20 249.65
  Q 241.27 245.47 239.24 241.71
  Q 238.99 241.24 238.49 241.05
  Q 234.69 239.63 230.72 238.71
  C 229.15 238.35 227.57 238.77 225.96 238.94
  Q 225.49 238.99 225.23 239.37
  L 223.68 241.54
  A 0.94 0.94 0.0 0 1 222.69 241.91
  Q 218.42 240.87 214.01 241.37
  A 1.87 1.85 -35.9 0 1 212.98 241.21
  Q 200.70 235.59 191.49 230.50
  Q 189.55 229.43 188.13 230.56
  A 0.61 0.60 -28.2 0 0 187.93 231.21
  L 189.32 235.60
  Q 189.50 236.19 189.08 236.64
  Z
  M 179.55 251.88
  L 178.83 254.66
  A 0.51 0.51 0.0 0 0 179.50 255.27
  C 183.27 253.90 189.04 248.41 182.87 245.04
  Q 182.36 244.76 181.80 244.93
  L 177.86 246.14
  A 0.50 0.50 0.0 0 0 177.61 246.92
  Q 179.06 248.84 179.57 251.20
  Q 179.64 251.54 179.55 251.88
  Z
  M 136.46 272.77
  Q 139.12 273.52 140.43 275.84
  Q 141.81 278.28 142.47 278.93
  C 145.50 281.96 152.59 285.97 146.35 290.63
  A 0.41 0.40 41.7 0 0 146.39 291.31
  L 148.41 292.43
  A 0.68 0.68 0.0 0 1 148.69 293.31
  L 147.88 294.99
  A 1.49 1.49 0.0 0 0 149.77 297.03
  L 153.31 295.64
  Q 153.82 295.44 154.35 295.57
  Q 166.10 298.30 173.53 303.25
  Q 183.33 309.76 189.49 313.58
  Q 190.93 314.47 192.91 314.75
  Q 193.43 314.82 193.82 314.47
  C 197.97 310.75 203.64 315.22 204.56 319.51
  Q 204.67 320.00 205.04 320.33
  L 209.02 323.96
  A 1.52 1.51 -74.8 0 1 209.48 324.77
  L 209.96 326.99
  A 1.59 1.58 -20.9 0 0 212.30 328.03
  Q 215.64 326.10 216.09 323.03
  C 216.30 321.58 215.18 319.84 214.74 318.34
  Q 214.59 317.84 214.78 317.35
  Q 216.84 312.10 217.33 306.47
  Q 217.37 306.01 217.10 305.63
  C 209.28 294.83 202.02 285.05 189.26 280.93
  C 186.53 280.04 184.38 278.31 181.87 277.39
  C 180.28 276.82 178.13 276.48 176.95 275.18
  C 175.70 273.79 175.06 272.88 173.28 271.95
  C 170.07 270.28 166.23 268.37 168.05 264.01
  C 169.24 261.14 169.55 259.34 172.69 258.11
  Q 175.42 257.03 178.37 256.02
  A 0.35 0.35 0.0 0 0 178.29 255.34
  Q 176.12 255.13 173.81 255.42
  C 170.54 255.85 167.86 257.95 164.02 257.87
  Q 154.69 257.69 146.53 252.73
  Q 145.14 251.88 141.24 251.93
  Q 139.31 251.95 136.83 251.31
  Q 131.99 250.06 127.21 251.98
  Q 126.80 252.14 126.82 252.57
  L 127.43 267.86
  A 0.53 0.53 0.0 0 0 128.34 268.20
  C 131.31 265.05 133.64 267.88 135.25 270.34
  Q 135.54 270.77 135.53 271.28
  Q 135.51 272.22 134.54 272.37
  A 0.47 0.47 0.0 0 0 134.24 273.12
  L 134.84 273.88
  Q 135.30 274.47 135.57 273.77
  L 135.83 273.08
  Q 136.00 272.64 136.46 272.77
  Z
  M 294.40 402.56
  C 295.26 403.81 296.07 407.48 298.04 406.92
  Q 300.23 406.29 300.36 406.28
  Q 302.07 406.11 303.84 405.87
  A 1.49 1.48 -32.2 0 1 304.87 406.10
  Q 307.16 407.60 307.60 410.37
  A 1.55 1.55 0.0 0 0 310.29 411.15
  Q 314.77 406.01 319.95 400.90
  Q 321.04 399.82 323.76 400.30
  A 0.61 0.59 -54.6 0 0 324.14 400.23
  L 328.56 397.71
  Q 329.04 397.44 329.54 397.64
  Q 332.61 398.85 335.77 398.00
  Q 336.40 397.83 336.17 397.22
  C 335.04 394.25 333.89 391.25 331.78 388.83
  C 329.90 386.67 330.39 382.84 330.51 380.32
  A 2.07 2.07 0.0 0 0 329.04 378.22
  Q 323.10 376.42 318.54 372.26
  A 0.98 0.97 55.3 0 0 317.53 372.07
  L 313.26 373.67
  A 1.21 1.21 0.0 0 1 311.64 372.73
  C 311.13 369.61 310.67 367.17 308.96 364.32
  Q 306.48 360.20 306.28 358.44
  Q 305.87 354.91 307.42 353.69
  C 313.07 349.28 314.38 344.19 315.90 338.17
  A 3.04 3.03 27.0 0 0 314.90 335.11
  C 309.87 330.89 305.65 327.85 302.00 321.35
  A 1.70 1.65 -0.8 0 0 301.29 320.68
  C 296.29 318.23 293.96 314.21 290.69 310.83
  C 286.92 306.92 282.91 303.52 283.99 297.35
  A 0.80 0.79 -67.4 0 0 283.67 296.56
  C 279.95 293.91 276.76 297.18 273.54 293.87
  Q 272.45 292.76 271.38 291.61
  A 0.91 0.91 0.0 0 0 270.51 291.35
  C 265.37 292.58 262.95 291.67 258.29 289.03
  C 253.93 286.56 250.65 286.45 245.94 287.13
  A 1.32 1.31 57.4 0 1 245.00 286.92
  C 241.76 284.80 238.57 283.56 234.62 284.93
  Q 229.29 286.79 223.98 287.30
  A 2.18 2.18 0.0 0 0 222.02 289.26
  Q 221.56 294.14 221.04 299.24
  C 220.61 303.56 218.83 307.96 218.28 312.60
  C 218.05 314.59 217.29 316.13 216.70 318.03
  A 1.13 1.12 -44.6 0 0 216.69 318.67
  L 218.40 324.26
  A 0.79 0.79 0.0 0 1 218.24 325.03
  L 214.54 329.27
  A 0.94 0.94 0.0 0 0 214.85 330.74
  Q 217.10 331.81 218.66 334.08
  Q 219.86 335.83 224.75 339.92
  C 226.36 341.26 226.49 342.70 226.34 344.62
  Q 225.85 350.99 225.28 357.35
  Q 225.02 360.26 225.77 363.08
  Q 227.60 369.98 229.34 376.87
  A 1.17 1.17 0.0 0 0 230.65 377.74
  L 240.46 376.22
  Q 242.06 375.97 242.48 377.54
  L 248.33 399.82
  A 1.44 1.43 70.1 0 0 250.32 400.76
  C 253.61 399.24 255.39 403.05 256.57 405.25
  A 0.91 0.90 -17.4 0 0 257.47 405.72
  L 259.69 405.47
  A 1.47 1.47 0.0 0 1 260.76 405.79
  L 266.17 410.25
  A 1.15 1.12 25.4 0 1 266.57 411.33
  L 266.30 412.80
  Q 266.20 413.35 266.53 413.80
  L 270.74 419.60
  A 1.35 1.34 73.5 0 0 271.77 420.16
  L 275.18 420.30
  A 1.19 1.19 0.0 0 0 276.36 418.71
  L 275.31 415.78
  A 0.54 0.54 0.0 0 1 276.10 415.14
  L 277.62 416.06
  Q 277.99 416.28 278.41 416.23
  L 284.36 415.48
  A 1.44 1.44 0.0 0 0 285.62 414.00
  Q 285.43 408.60 282.26 405.53
  C 279.83 403.18 278.64 401.36 280.86 398.48
  C 281.77 397.31 283.02 397.25 283.99 395.92
  Q 284.28 395.52 284.74 395.72
  C 287.01 396.71 289.12 398.36 291.69 397.91
  A 1.26 1.26 0.0 0 0 292.16 395.61
  Q 288.94 393.54 285.02 393.80
  A 0.99 0.98 -75.7 0 0 284.24 394.27
  Q 283.37 395.66 282.20 395.76
  A 1.38 1.38 0.0 0 1 281.63 393.08
  Q 285.67 391.69 289.96 391.91
  Q 290.55 391.94 291.00 392.32
  L 294.03 394.87
  A 0.96 0.95 28.3 0 1 294.33 395.86
  L 293.25 399.63
  Q 293.07 400.23 292.47 400.06
  L 286.60 398.35
  A 0.98 0.98 0.0 0 0 285.39 399.02
  C 284.54 402.00 290.34 403.90 292.34 404.31
  Q 292.87 404.42 293.07 403.91
  L 293.57 402.65
  Q 293.90 401.84 294.40 402.56
  Z
  M 354.75 351.50
  C 353.29 344.10 346.57 338.35 344.87 330.65
  Q 344.76 330.14 345.07 329.71
  L 346.27 328.07
  A 0.79 0.79 0.0 0 0 346.23 327.10
  L 343.86 324.32
  Q 343.52 323.91 343.73 323.42
  Q 346.44 317.18 341.21 313.20
  Q 338.69 311.28 329.80 305.89
  C 326.05 303.62 326.91 299.56 324.08 296.47
  Q 322.22 294.45 320.35 292.39
  Q 319.98 291.97 319.58 292.37
  C 316.57 295.43 312.93 293.32 309.62 297.45
  Q 309.29 297.86 308.81 298.08
  Q 302.87 300.71 298.02 296.86
  A 1.23 1.22 48.4 0 0 296.65 296.77
  Q 294.28 298.14 291.56 298.14
  A 0.98 0.95 -63.7 0 0 290.95 298.36
  L 287.23 301.45
  A 2.36 2.35 48.7 0 0 287.01 304.87
  Q 291.86 310.07 296.28 315.05
  Q 297.39 316.29 299.58 317.53
  C 303.82 319.94 304.33 323.41 307.24 326.37
  Q 310.88 330.07 314.99 333.23
  Q 319.96 337.06 317.09 342.26
  A 1.16 1.16 0.0 0 0 317.68 343.89
  Q 322.38 345.74 327.49 345.82
  Q 328.51 345.83 329.37 346.38
  Q 335.14 350.05 340.80 353.90
  Q 345.25 356.94 349.60 356.09
  A 1.37 1.36 -80.0 0 0 350.49 355.46
  Q 351.96 352.98 354.57 351.85
  A 0.32 0.31 72.7 0 0 354.75 351.50
  Z
  M 659.77 524.21
  L 663.00 525.28
  Q 663.82 525.55 663.49 524.75
  Q 661.82 520.81 661.99 516.51
  A 1.40 1.39 -63.1 0 0 661.70 515.60
  C 659.65 512.93 657.65 511.22 658.42 507.18
  A 1.03 1.02 -65.5 0 0 658.06 506.20
  Q 655.17 503.83 656.11 500.04
  A 1.16 1.14 35.9 0 0 655.96 499.14
  C 653.94 496.05 650.53 494.23 648.90 491.19
  Q 644.37 482.72 643.57 480.04
  C 641.62 473.59 641.35 462.85 638.31 454.64
  C 636.99 451.08 632.92 442.98 633.95 439.42
  Q 634.84 436.33 634.53 433.00
  A 1.32 1.31 -72.0 0 0 634.10 432.15
  C 632.39 430.56 628.62 428.82 627.80 426.53
  Q 627.62 426.02 627.96 425.61
  C 629.46 423.76 631.52 422.83 632.90 421.06
  C 634.42 419.12 638.64 415.42 636.87 412.85
  Q 633.80 408.41 632.07 403.29
  C 631.30 401.02 631.81 399.22 631.99 396.91
  C 632.44 391.39 627.33 379.22 622.00 376.27
  A 1.23 1.23 0.0 0 1 621.38 375.47
  C 618.49 363.99 616.51 352.16 614.48 340.25
  Q 614.28 339.06 613.42 338.23
  Q 605.54 330.55 597.36 322.62
  C 595.52 320.84 592.51 319.10 590.09 318.27
  Q 553.27 305.57 515.97 294.37
  Q 514.71 293.99 513.39 293.71
  Q 512.84 293.59 512.59 294.10
  Q 511.06 297.30 508.47 299.71
  C 506.50 301.54 505.72 303.75 504.14 305.39
  Q 501.60 308.04 494.60 314.41
  C 492.72 316.12 492.17 317.96 492.93 320.29
  Q 495.60 328.44 496.96 334.24
  Q 497.07 334.71 496.78 335.09
  C 491.25 342.20 485.10 339.31 478.10 341.78
  Q 472.14 343.89 466.21 346.08
  C 462.82 347.33 462.30 352.65 462.65 355.58
  Q 462.89 357.62 464.98 360.29
  Q 468.59 364.89 471.44 370.01
  C 472.91 372.64 474.94 372.88 475.78 376.33
  Q 477.81 384.62 481.41 392.43
  A 0.88 0.86 65.3 0 1 480.99 393.59
  L 477.12 395.39
  A 0.75 0.74 59.3 0 0 476.84 396.51
  Q 480.49 401.44 484.40 406.45
  C 489.03 412.38 494.73 405.06 498.85 411.15
  Q 501.66 415.30 509.77 426.13
  Q 510.08 426.54 510.60 426.51
  Q 518.85 426.10 525.00 431.70
  Q 526.10 432.70 527.86 432.52
  A 0.81 0.81 0.0 0 0 528.51 432.05
  Q 530.99 426.52 535.51 422.57
  Q 535.86 422.26 536.32 422.35
  Q 538.26 422.77 538.93 424.34
  C 540.84 428.81 543.30 435.43 545.22 442.12
  Q 546.86 447.83 551.66 450.99
  C 560.21 456.62 565.06 455.79 568.52 445.63
  C 570.17 440.79 575.90 443.44 576.98 446.99
  C 577.98 450.28 579.50 455.06 582.99 456.82
  Q 585.65 458.16 586.46 458.86
  C 589.41 461.42 594.23 464.49 593.61 468.90
  Q 593.54 469.41 593.91 469.76
  C 599.93 475.41 601.64 482.68 604.62 490.07
  Q 605.85 493.13 607.96 493.80
  Q 614.25 495.81 620.31 498.59
  Q 620.89 498.85 621.09 498.25
  L 622.18 495.03
  A 1.99 1.99 0.0 0 1 624.68 493.78
  Q 631.40 495.96 635.57 501.67
  Q 635.91 502.15 635.63 502.66
  L 634.64 504.45
  A 0.69 0.66 57.8 0 0 634.56 504.84
  Q 635.73 514.00 638.98 522.68
  Q 639.13 523.08 639.56 522.99
  Q 643.06 522.24 646.49 521.24
  C 648.34 520.71 649.74 521.33 651.60 521.52
  Q 652.14 521.57 652.34 522.07
  Q 652.96 523.58 653.64 525.07
  C 655.07 528.18 657.58 527.27 658.76 524.65
  Q 659.07 523.98 659.77 524.21
  Z
  M 749.61 491.54
  L 751.31 491.97
  A 0.44 0.44 0.0 0 0 751.86 491.49
  C 751.63 489.59 750.99 486.87 751.73 485.20
  C 753.52 481.19 758.84 481.47 761.32 477.52
  Q 761.62 477.04 762.17 476.96
  L 770.75 475.61
  A 1.22 1.22 0.0 0 0 771.71 473.99
  L 769.68 468.31
  A 1.22 1.18 51.4 0 1 769.78 467.29
  L 770.36 466.34
  Q 770.67 465.84 770.35 465.34
  C 768.52 462.49 766.43 459.48 767.50 455.90
  Q 767.65 455.41 767.38 454.97
  C 763.30 448.25 758.27 458.45 752.46 454.65
  Q 752.08 454.40 751.90 453.97
  Q 750.71 451.19 750.32 448.23
  Q 749.91 445.06 749.12 443.22
  Q 744.82 433.11 741.73 428.29
  Q 738.46 423.19 737.80 417.24
  A 1.46 1.46 0.0 0 0 735.35 416.34
  C 732.14 419.35 728.83 414.36 726.31 412.73
  Q 724.33 411.44 721.41 411.04
  C 715.64 410.24 711.23 410.13 707.23 407.03
  C 703.50 404.13 699.60 401.78 696.58 398.01
  Q 690.71 390.69 684.34 383.79
  C 682.83 382.16 683.62 380.64 681.60 379.03
  Q 671.53 371.01 662.08 362.78
  A 1.37 1.36 28.1 0 1 661.66 361.40
  Q 666.87 342.18 671.72 322.64
  C 672.42 319.84 671.67 317.78 670.95 315.17
  C 669.76 310.88 666.36 307.05 664.29 303.07
  A 3.72 3.72 0.0 0 0 661.13 301.07
  L 648.47 300.56
  A 0.54 0.54 0.0 0 0 647.95 301.30
  C 650.42 307.40 649.49 313.73 651.49 319.97
  C 653.07 324.87 654.52 329.52 657.26 334.03
  Q 658.68 336.38 659.79 338.88
  A 1.53 1.53 0.0 0 1 659.21 340.80
  C 655.50 343.15 652.81 341.18 649.93 338.33
  C 644.26 332.73 641.80 331.20 634.11 328.73
  Q 633.65 328.59 633.22 328.83
  L 615.94 338.71
  Q 615.47 338.98 615.57 339.51
  Q 618.40 354.08 621.11 368.67
  C 621.62 371.40 621.66 373.66 623.80 375.63
  Q 626.09 377.74 626.56 378.44
  Q 630.80 384.78 632.86 392.13
  C 633.85 395.66 632.49 399.46 633.06 402.25
  Q 633.78 405.77 637.31 410.83
  C 640.08 414.81 638.59 416.50 635.92 420.17
  Q 633.43 423.58 630.11 425.84
  A 0.92 0.92 0.0 0 0 630.17 427.40
  Q 632.32 428.64 634.41 430.35
  C 637.10 432.56 635.78 437.05 635.37 440.15
  Q 635.09 442.27 635.84 444.26
  Q 637.83 449.56 639.73 454.89
  C 642.09 461.50 642.63 468.40 643.82 475.35
  C 644.64 480.10 646.95 483.91 648.96 488.24
  C 651.32 493.35 658.29 495.88 657.24 502.07
  A 0.99 0.97 -57.7 0 0 657.40 502.80
  L 659.79 506.13
  A 0.83 0.81 34.5 0 1 659.92 506.78
  Q 659.25 509.51 660.48 511.92
  A 1.53 1.52 5.0 0 0 660.92 512.44
  Q 662.97 513.98 663.37 516.50
  Q 664.49 523.63 665.22 530.06
  A 2.55 2.53 8.3 0 0 666.75 532.10
  C 672.01 534.34 675.42 538.14 679.09 541.35
  Q 682.70 544.51 685.91 548.17
  Q 686.35 548.67 686.83 548.20
  L 688.57 546.49
  A 1.07 1.04 -57.4 0 1 689.65 546.24
  C 691.32 546.82 692.60 548.12 694.30 548.19
  Q 696.94 548.28 699.41 546.88
  A 0.85 0.85 0.0 0 1 700.15 546.84
  L 703.92 548.43
  A 0.43 0.43 0.0 0 0 704.40 548.31
  Q 707.04 545.10 710.73 546.76
  Q 711.31 547.02 711.61 546.46
  L 712.90 544.07
  A 0.63 0.62 -60.7 0 1 713.77 543.82
  L 716.57 545.44
  A 0.76 0.76 0.0 0 0 717.65 544.51
  Q 716.29 540.96 719.80 539.30
  Q 720.27 539.08 720.74 539.29
  C 723.74 540.60 724.14 543.37 726.30 545.71
  A 0.92 0.92 0.0 0 0 727.22 545.97
  C 729.81 545.26 732.20 545.99 734.71 545.73
  C 739.95 545.18 744.40 548.18 748.74 549.23
  Q 749.28 549.37 749.67 548.95
  Q 751.76 546.67 750.37 543.95
  Q 750.12 543.48 750.34 542.99
  L 751.82 539.74
  A 1.07 1.03 50.1 0 0 751.87 539.01
  L 745.99 519.35
  Q 745.84 518.84 746.09 518.37
  L 746.96 516.77
  Q 747.23 516.26 747.09 515.70
  Q 745.42 508.92 743.31 502.27
  Q 742.89 500.93 743.61 499.02
  A 1.26 1.22 86.3 0 1 744.16 498.37
  Q 748.01 496.13 749.09 491.85
  Q 749.20 491.43 749.61 491.54
  Z
  M 532.70 466.41
  C 526.63 462.44 531.79 451.45 525.47 447.07
  Q 519.87 443.18 514.39 439.10
  C 512.48 437.68 512.33 435.84 512.56 433.65
  A 0.83 0.82 -60.5 0 0 512.41 433.09
  L 497.28 411.26
  A 2.77 2.76 69.1 0 0 494.68 410.09
  C 491.14 410.53 486.51 411.56 483.80 408.18
  Q 479.27 402.52 475.12 396.43
  Q 474.83 396.00 474.34 395.84
  Q 465.47 392.92 462.31 390.70
  C 458.91 388.30 457.60 383.74 455.92 380.40
  C 452.92 374.44 446.59 371.07 442.32 366.00
  Q 433.40 355.43 425.67 343.94
  C 420.09 335.63 411.90 329.36 401.71 328.10
  Q 401.22 328.04 400.79 328.27
  C 397.16 330.25 392.95 333.14 388.71 333.21
  Q 383.15 333.30 381.22 332.50
  Q 377.56 330.97 377.12 327.22
  A 0.84 0.84 0.0 0 0 375.62 326.82
  C 373.16 330.09 369.41 336.30 364.63 335.33
  A 0.45 0.45 0.0 0 0 364.09 335.78
  Q 364.11 337.73 365.83 337.98
  C 371.32 338.77 373.28 340.98 373.80 346.61
  Q 374.33 352.28 374.02 357.98
  C 373.84 361.22 375.15 363.69 375.99 366.73
  A 0.65 0.65 0.0 0 1 375.63 367.50
  L 374.07 368.21
  A 0.59 0.59 0.0 0 0 373.76 368.97
  L 376.30 375.48
  Q 376.47 375.90 376.29 376.33
  C 373.97 381.65 370.28 380.50 365.68 378.63
  Q 362.28 377.24 358.85 376.28
  A 0.64 0.64 0.0 0 0 358.10 377.18
  L 363.49 387.90
  A 4.32 4.31 54.6 0 1 362.65 392.92
  Q 359.70 395.80 356.06 399.31
  C 354.15 401.16 349.28 400.69 346.58 401.31
  Q 346.05 401.43 346.21 401.95
  C 347.27 405.39 351.19 408.41 353.33 411.11
  A 2.69 2.69 0.0 0 0 355.69 412.11
  C 361.62 411.52 368.11 410.30 372.34 415.63
  C 375.81 420.02 378.74 424.07 383.43 425.98
  C 388.12 427.90 389.31 429.21 392.38 432.86
  Q 401.53 443.76 410.58 454.73
  C 416.09 461.41 420.21 469.54 425.25 476.81
  Q 426.40 478.46 428.32 479.49
  C 433.26 482.13 435.39 485.18 439.25 490.44
  C 445.14 498.47 451.64 502.31 460.19 506.89
  C 462.59 508.17 464.52 510.42 467.07 511.89
  A 1.62 1.59 -32.5 0 0 468.02 512.09
  C 473.02 511.58 475.28 510.46 479.66 513.86
  Q 480.10 514.21 480.60 513.95
  L 483.01 512.71
  Q 483.36 512.53 483.75 512.53
  Q 488.34 512.51 492.89 512.60
  C 495.55 512.66 497.01 510.83 496.34 508.15
  C 495.51 504.79 494.54 498.60 497.29 496.79
  Q 502.66 493.26 510.25 492.72
  C 512.82 492.53 513.92 490.54 516.74 490.42
  C 519.83 490.29 525.72 490.98 527.39 487.77
  Q 527.91 486.76 527.97 483.63
  Q 528.12 475.43 536.60 473.30
  Q 537.14 473.16 537.29 472.64
  C 538.09 469.90 534.69 467.72 532.70 466.41
  Z
  M 357.11 374.32
  Q 362.26 374.87 367.21 377.17
  C 370.06 378.48 373.06 379.22 374.43 375.84
  Q 374.63 375.34 374.47 374.83
  C 373.64 372.29 373.10 369.99 370.75 368.39
  C 368.67 366.98 365.87 365.79 364.20 364.70
  Q 358.33 360.89 355.41 354.70
  A 1.02 1.01 51.2 0 0 353.69 354.51
  L 351.41 357.50
  Q 351.09 357.92 350.58 358.04
  Q 346.03 359.15 342.36 356.91
  Q 339.66 355.26 331.39 349.60
  C 328.26 347.46 325.71 348.26 323.05 347.60
  Q 319.51 346.73 316.08 345.17
  Q 315.61 344.95 315.42 345.43
  Q 313.32 350.71 309.11 354.48
  C 306.35 356.95 309.33 361.55 310.88 364.26
  C 312.10 366.40 312.53 368.24 312.82 370.54
  A 1.05 1.04 74.7 0 0 314.26 371.37
  L 317.61 369.93
  A 0.85 0.84 -36.0 0 1 318.50 370.07
  Q 323.03 374.09 328.62 376.32
  C 333.32 378.18 332.12 381.85 331.98 385.69
  Q 331.96 386.26 332.32 386.72
  Q 336.10 391.47 337.45 397.48
  A 0.96 0.95 -89.0 0 0 338.13 398.19
  L 344.25 399.91
  A 1.64 1.64 0.0 0 0 345.36 399.83
  Q 349.43 398.02 353.92 398.19
  A 1.37 1.36 -66.4 0 0 354.93 397.79
  L 361.89 390.75
  A 1.46 1.45 -38.4 0 0 362.10 388.97
  Q 360.66 386.58 359.55 383.84
  C 358.52 381.31 356.60 378.84 355.86 375.74
  A 1.16 1.16 0.0 0 1 357.11 374.32
  Z
  M 370.62 453.70
  L 369.30 452.37
  A 0.66 0.65 -48.9 0 0 368.30 452.44
  L 368.15 452.65
  Q 367.87 453.04 368.12 453.44
  Q 370.32 456.93 374.92 457.62
  C 378.18 458.12 379.88 460.47 380.83 463.74
  Q 382.90 470.81 386.52 474.46
  C 389.40 477.37 393.10 480.06 394.82 483.85
  Q 398.95 492.92 408.31 496.32
  C 413.52 498.21 416.90 495.56 421.95 495.05
  C 427.91 494.45 430.63 500.43 435.25 500.25
  C 439.41 500.08 441.95 500.39 445.33 503.19
  Q 448.80 506.06 452.46 508.61
  A 1.06 1.06 0.0 0 1 451.86 510.54
  Q 450.61 510.54 450.44 511.39
  A 1.42 1.41 -23.9 0 0 453.04 512.39
  C 454.99 509.16 457.68 510.24 460.70 510.70
  Q 461.37 510.80 461.09 510.18
  Q 460.49 508.89 459.30 508.35
  Q 443.51 501.26 434.63 486.90
  Q 432.35 483.21 426.33 480.74
  A 1.65 1.59 -5.7 0 1 425.62 480.18
  C 419.94 472.10 415.15 463.13 409.12 455.65
  Q 394.20 437.11 388.20 430.55
  C 385.87 427.99 381.64 427.82 378.89 425.42
  Q 375.59 422.55 372.96 419.04
  Q 370.49 415.73 369.07 414.90
  C 365.35 412.74 359.20 413.82 355.08 414.10
  A 2.29 2.26 67.5 0 1 353.19 413.30
  Q 350.48 410.09 347.31 406.96
  C 346.10 405.75 345.71 404.07 344.58 402.79
  C 342.92 400.92 337.94 399.91 335.50 400.21
  C 332.20 400.62 329.99 398.89 327.11 401.24
  A 0.54 0.54 0.0 0 0 327.05 402.02
  Q 330.98 406.33 332.38 412.03
  A 1.42 1.39 -77.6 0 0 332.86 412.80
  C 334.63 414.26 336.55 414.94 338.03 416.66
  Q 341.81 421.06 344.24 422.76
  Q 349.13 426.19 354.09 429.63
  Q 355.96 430.91 356.92 432.84
  Q 358.66 436.30 360.11 439.94
  A 1.50 1.50 0.0 0 1 360.17 440.92
  L 359.46 443.48
  A 1.60 1.60 0.0 0 0 362.13 445.04
  Q 363.90 443.28 366.10 444.10
  C 370.36 445.69 373.15 448.40 371.41 453.52
  Q 371.16 454.26 370.62 453.70
  Z
  M 637.43 525.36
  C 637.15 523.21 637.05 521.50 636.24 519.45
  Q 634.02 513.84 633.44 507.82
  C 633.24 505.81 632.41 504.84 631.46 503.17
  Q 631.18 502.66 631.43 502.13
  L 631.91 501.10
  A 0.93 0.92 32.5 0 0 631.66 499.99
  Q 628.37 497.27 624.30 495.92
  Q 623.61 495.69 623.35 496.36
  L 621.71 500.59
  A 0.79 0.78 -67.4 0 1 620.67 501.02
  Q 614.50 498.30 607.88 495.95
  C 606.08 495.31 604.50 493.89 603.87 492.28
  C 601.29 485.63 598.47 475.69 592.72 471.21
  A 2.23 2.22 32.5 0 1 592.10 468.45
  Q 592.45 467.75 592.04 466.80
  C 591.31 465.14 587.16 461.93 585.67 460.43
  C 583.50 458.25 581.02 459.03 579.22 455.88
  Q 577.05 452.08 575.59 447.95
  C 574.73 445.52 573.14 444.60 570.70 444.87
  A 0.85 0.83 5.1 0 0 569.98 445.46
  C 568.46 450.39 565.87 456.69 560.06 456.50
  C 555.71 456.35 550.77 452.64 547.51 449.46
  C 543.36 445.41 543.92 441.65 542.14 436.99
  Q 539.83 430.96 537.74 425.09
  A 1.54 1.54 0.0 0 0 535.03 424.73
  L 529.37 432.86
  Q 527.75 435.19 525.37 433.66
  Q 522.73 431.96 520.02 430.13
  C 517.78 428.60 515.59 428.67 513.27 428.24
  Q 510.09 427.65 512.22 430.08
  Q 514.38 432.53 514.29 435.92
  A 1.90 1.90 0.0 0 0 515.08 437.52
  Q 519.81 440.93 524.46 444.13
  Q 527.56 446.26 528.72 448.21
  C 531.16 452.31 530.03 462.57 533.51 464.55
  C 536.67 466.35 540.93 470.75 538.32 474.28
  Q 537.62 475.22 535.26 476.04
  Q 531.48 477.34 529.57 481.14
  Q 529.34 481.60 529.39 482.11
  C 529.79 485.83 529.54 489.51 526.31 491.51
  C 521.87 494.26 517.22 490.77 512.64 494.64
  Q 512.26 494.97 511.75 494.98
  Q 504.75 495.17 498.63 498.70
  C 494.74 500.94 498.84 507.64 498.02 510.94
  C 497.39 513.49 495.51 514.89 492.75 514.93
  C 488.90 515.00 484.60 514.27 481.13 516.23
  A 0.92 0.90 43.1 0 1 480.27 516.25
  L 475.58 513.91
  Q 475.14 513.69 474.66 513.78
  Q 471.81 514.28 468.90 514.24
  C 466.09 514.20 464.41 512.46 462.24 510.91
  A 0.57 0.56 -54.6 0 0 461.45 511.05
  L 460.88 511.87
  Q 460.52 512.38 459.90 512.32
  L 456.00 511.93
  A 0.98 0.98 0.0 0 0 455.26 513.64
  C 458.19 516.20 463.11 517.82 466.65 519.56
  C 471.12 521.75 476.51 521.93 481.37 522.93
  C 484.07 523.49 484.83 523.81 485.80 526.63
  C 486.79 529.49 490.49 530.52 492.95 531.69
  Q 496.22 533.24 498.39 533.05
  Q 501.96 532.74 504.64 529.88
  A 0.84 0.83 30.8 0 1 505.53 529.66
  Q 510.10 531.27 514.41 529.14
  Q 514.86 528.92 515.30 529.16
  C 517.93 530.59 518.44 532.56 520.44 533.81
  Q 520.93 534.11 521.43 533.84
  Q 523.29 532.85 525.32 533.16
  Q 525.94 533.26 526.39 533.70
  L 528.38 535.67
  Q 528.70 535.99 529.15 535.89
  L 533.75 534.92
  A 0.50 0.49 -77.9 0 0 534.04 534.73
  C 537.19 530.67 538.85 525.78 542.58 522.30
  A 1.40 1.38 -18.2 0 0 543.02 521.44
  C 543.37 518.20 545.62 518.70 548.21 519.26
  Q 551.51 519.97 552.70 516.22
  Q 552.87 515.69 552.62 515.20
  Q 550.67 511.30 553.36 507.95
  Q 553.70 507.52 554.20 507.33
  L 560.79 504.82
  Q 561.40 504.59 561.72 504.01
  L 564.98 497.97
  A 1.13 1.10 -1.5 0 1 565.41 497.53
  L 570.57 494.45
  Q 571.04 494.17 571.59 494.17
  Q 574.92 494.16 578.23 494.28
  C 583.56 494.49 587.59 492.66 591.34 498.21
  A 1.24 1.20 -8.7 0 0 592.03 498.70
  L 593.26 499.02
  Q 593.73 499.15 593.95 499.59
  C 595.58 502.87 598.32 505.40 599.92 508.02
  Q 602.71 512.59 604.48 517.62
  Q 606.33 522.88 607.67 525.02
  Q 609.92 528.62 612.81 531.76
  C 614.60 533.71 613.43 535.98 614.77 538.16
  C 616.08 540.27 618.11 541.30 619.38 543.26
  Q 620.93 545.64 622.50 548.17
  A 0.71 0.71 0.0 0 0 623.44 548.42
  Q 625.48 547.31 627.41 548.47
  Q 627.89 548.77 628.45 548.63
  L 635.54 546.78
  A 0.73 0.71 -27.0 0 1 636.28 547.01
  L 638.65 549.81
  Q 638.97 550.18 639.23 549.76
  L 640.72 547.36
  Q 641.04 546.85 641.58 547.12
  Q 644.17 548.40 646.12 550.51
  C 650.34 555.10 652.95 551.05 656.00 548.04
  A 0.82 0.81 34.1 0 1 656.90 547.87
  C 659.27 548.92 660.98 547.89 662.87 547.76
  C 668.72 547.34 673.00 546.62 677.06 551.67
  A 1.32 1.32 0.0 0 0 678.01 552.15
  Q 680.90 552.30 683.00 550.23
  A 2.02 2.02 0.0 0 0 682.88 547.24
  Q 679.16 544.11 675.67 540.56
  Q 673.20 538.05 670.88 536.55
  C 667.79 534.56 663.30 533.35 663.27 529.06
  A 1.64 1.64 0.0 0 0 662.96 528.10
  Q 661.97 526.72 660.24 526.90
  Q 659.66 526.96 659.38 527.48
  Q 657.96 530.13 654.61 529.33
  Q 654.05 529.20 653.74 528.72
  L 651.00 524.39
  Q 650.79 524.06 650.44 523.90
  Q 648.91 523.18 647.75 523.53
  Q 642.96 524.95 638.03 525.80
  Q 637.50 525.89 637.43 525.36
  Z
  M 564.35 516.90
  L 565.70 518.51
  A 0.50 0.50 0.0 0 0 566.48 518.49
  Q 569.86 514.04 570.45 508.89
  C 570.55 507.98 571.03 507.28 571.59 506.69
  A 1.11 1.10 -78.9 0 0 570.39 504.90
  Q 566.16 506.53 564.08 510.51
  A 1.03 1.03 0.0 0 1 563.11 511.05
  L 559.68 510.83
  A 0.38 0.38 0.0 0 0 559.36 511.46
  Q 561.15 513.64 560.76 516.35
  A 0.57 0.57 0.0 0 1 560.57 516.70
  L 548.51 527.06
  A 0.98 0.98 0.0 0 0 549.54 528.71
  Q 555.00 526.37 558.04 521.35
  A 1.44 1.43 10.9 0 1 559.02 520.69
  Q 562.16 520.13 563.35 517.06
  A 0.59 0.59 0.0 0 1 564.35 516.90
  Z"
        />
        <path
          fill="#f6f7f7"
          fillOpacity={theme.palette.mode === "dark" && ".5"}
          transform="translate(45, 304)"
          d="
  M 344.72 442.21
  A 0.21 0.21 0.0 0 1 344.76 441.92
  L 344.85 441.85
  A 2.28 2.24 -35.5 0 1 348.01 442.35
  L 348.19 442.60
  A 2.28 2.24 -35.5 0 1 347.63 445.74
  L 347.54 445.81
  A 0.21 0.21 0.0 0 1 347.25 445.76
  L 344.72 442.21
  Z"
        />
        <ellipse
          fillOpacity={theme.palette.mode === "dark" && ".5"}
          fill="#f6f7f7"
          cx="0.00"
          cy="0.00"
          transform="translate(622.55,803.51) rotate(62.2)"
          rx="2.00"
          ry="1.54"
        />
        <ellipse
          fill="#f6f7f7"
          fillOpacity={theme.palette.mode === "dark" && ".5"}
          cx="0.00"
          cy="0.00"
          transform="translate(622.42,813.30) rotate(101.9)"
          rx="2.31"
          ry="1.58"
        />
        <path
          fillOpacity={theme.palette.mode === "dark" && ".5"}
          transform="translate(45, 304)"
          fill="#f6f7f7"
          d="
  M 484.84 531.41
  A 0.01 0.01 0.0 0 1 484.85 531.42
  L 484.85 531.46
  A 4.62 3.39 2.4 0 1 480.09 534.65
  L 479.79 534.64
  A 4.62 3.39 2.4 0 1 475.31 531.06
  L 475.32 531.02
  A 0.01 0.01 0.0 0 1 475.33 531.01
  L 484.84 531.41
  Z"
        />
        <path
          fillOpacity={theme.palette.mode === "dark" && ".5"}
          transform="translate(45, 304)"
          fill="#f6f7f7"
          d="
  M 494.53 538.26
  Q 493.26 537.92 492.64 536.69
  A 1.28 1.28 0.0 0 1 494.81 535.35
  Q 495.59 536.40 495.39 537.70
  Q 495.28 538.46 494.53 538.26
  Z"
        />
        <path
          fill="#f6f7f7"
          fillOpacity={theme.palette.mode === "dark" && ".5"}
          transform="translate(45, 304)"
          d="
  M 510.7821 541.8205
  A 3.37 2.31 18.7 0 1 506.8494 542.9281
  A 3.37 2.31 18.7 0 1 504.3979 539.6595
  A 3.37 2.31 18.7 0 1 508.3306 538.5519
  A 3.37 2.31 18.7 0 1 510.7821 541.8205
  Z
  M 508.6327 542.0221
  A 1.60 0.97 49.8 0 0 508.3409 540.1739
  A 1.60 0.97 49.8 0 0 506.5673 539.5779
  A 1.60 0.97 49.8 0 0 506.8591 541.4261
  A 1.60 0.97 49.8 0 0 508.6327 542.0221
  Z"
        />
        <ellipse
          fillOpacity={theme.palette.mode === "dark" && ".5"}
          fill="#f6f7f7"
          cx="0.00"
          cy="0.00"
          transform="translate(573.13,851.39) rotate(68.0)"
          rx="2.32"
          ry="1.42"
        />
        <ellipse
          fillOpacity={theme.palette.mode === "dark" && ".5"}
          fill="#f6f7f7"
          cx="0.00"
          cy="0.00"
          transform="translate(595.70,865.86) rotate(59.9)"
          rx="1.72"
          ry="1.01"
        />
        <ellipse
          fillOpacity={theme.palette.mode === "dark" && ".5"}
          fill="#f6f7f7"
          cx="0.00"
          cy="0.00"
          transform="translate(579.31,867.94) rotate(61.1)"
          rx="1.57"
          ry="1.13"
        />
        {provinceData && selectedProvince && (
          <g>
            <rect
              x={provinceCoords[selectedProvince].x - 130}
              y={provinceCoords[selectedProvince].y - 120}
              width={230}
              height={100}
              fill="url(#tooltip_gradient)"
              rx={15}
            />
            <text
              x={provinceCoords[selectedProvince].x + 90}
              y={provinceCoords[selectedProvince].y - 90}
              // fontFamily="Arial"
              fontSize="28"
              fill="white"
            >
              {convertToPersian(selectedProvince)}
            </text>
            <text
              x={provinceCoords[selectedProvince].x + 90}
              y={provinceCoords[selectedProvince].y - 40}
              // fontFamily="Arial"
              fontSize="38"
              fill="red"
            >
              {loading ? "-" : provinceData.issues.length}
            </text>
            <text
              x={provinceCoords[selectedProvince].x + 60}
              y={provinceCoords[selectedProvince].y - 45}
              // fontFamily="Arial"
              fontSize="20"
              fill="white"
            >
              مورد اختلاف
            </text>
          </g>
        )}
        <defs>
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
      </svg>
    </SvgIcon>
  );
};

export default BackgroundSvg;
