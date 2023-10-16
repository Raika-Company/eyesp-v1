import {Fragment} from "react";
import {SvgIcon, styled, useTheme} from "@mui/material";
import {useLocation} from "react-router-dom";

const BackgroundSvg = ({provinces = [], ...props}) => {
  const {pathname} = useLocation();
  const theme = useTheme();
  const fillColor = theme.palette.mode === "dark" ? "#4E4E4E" : "#DADADA";

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

  return (
    <SvgIcon
      {...props}
      sx={{
        height: "943px",
        width: "817px",
        top: "0",
        left: "0",
        position: "fixed",
        zIndex: "-1",
        opacity: pathname === "/dashboard" ? "1" : ".2",
        transition: "opacity .25s linear",
      }}
    >
      <svg
        id="iran_map_svg"
        width="1143"
        height="1117"
        viewBox="0 0 1143 1117"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_d_14_38)">
          <ellipse
            cx="-285.5"
            cy="1267.5"
            rx="1350.5"
            ry="1404.5"
            fill={theme.palette.mode === "dark" ? "#313131" : "white"}
          />
        </g>
        <rect y="165" width="549" height="5" rx="2.5" fill={fillColor} />
        <rect y="205" width="601" height="5" rx="2.5" fill={fillColor} />
        <rect y="175" width="562" height="5" rx="2.5" fill={fillColor} />
        <rect y="215" width="612" height="5" rx="2.5" fill={fillColor} />
        <rect y="185" width="575" height="5" rx="2.5" fill={fillColor} />
        <rect y="225" width="623" height="5" rx="2.5" fill={fillColor} />
        <rect y="195" width="587" height="5" rx="2.5" fill={fillColor} />
        <rect y="235" width="634" height="5" rx="2.5" fill={fillColor} />
        <rect y="245" width="644" height="5" rx="2.5" fill={fillColor} />
        <rect y="255" width="216" height="5" rx="2.5" fill={fillColor} />
        <rect y="265" width="202" height="5" rx="2.5" fill={fillColor} />
        <rect y="275" width="211" height="5" rx="2.5" fill={fillColor} />
        <rect x="21" y="285" width="195" height="5" rx="2.5" fill={fillColor} />
        <rect x="29" y="295" width="193" height="5" rx="2.5" fill={fillColor} />
        <rect x="46" y="305" width="176" height="5" rx="2.5" fill={fillColor} />
        <rect x="71" y="315" width="156" height="5" rx="2.5" fill={fillColor} />
        <rect x="85" y="325" width="149" height="5" rx="2.5" fill={fillColor} />
        <rect x="92" y="335" width="156" height="5" rx="2.5" fill={fillColor} />
        <rect x="92" y="345" width="168" height="5" rx="2.5" fill={fillColor} />
        <rect x="92" y="355" width="182" height="5" rx="2.5" fill={fillColor} />
        <rect x="75" y="365" width="209" height="5" rx="2.5" fill={fillColor} />
        <rect y="375" width="305" height="5" rx="2.5" fill={fillColor} />
        <rect y="385" width="305" height="5" rx="2.5" fill={fillColor} />
        <rect
          width="164"
          height="5"
          rx="2.5"
          transform="matrix(1 0 0 -1 0 400)"
          fill={fillColor}
        />
        <rect
          width="160"
          height="5"
          rx="2.5"
          transform="matrix(1 0 0 -1 0 410)"
          fill={fillColor}
        />
        <rect
          width="163"
          height="5"
          rx="2.5"
          transform="matrix(1 0 0 -1 0 420)"
          fill={fillColor}
        />
        <rect
          width="163"
          height="5"
          rx="2.5"
          transform="matrix(1 0 0 -1 0 430)"
          fill={fillColor}
        />
        <rect
          width="172"
          height="5"
          rx="2.5"
          transform="matrix(1 0 0 -1 0 440)"
          fill={fillColor}
        />
        <rect
          width="174"
          height="5"
          rx="2.5"
          transform="matrix(1 0 0 -1 0 450)"
          fill={fillColor}
        />
        <rect
          width="176"
          height="5"
          rx="2.5"
          transform="matrix(1 0 0 -1 0 460)"
          fill={fillColor}
        />
        <rect
          width="176"
          height="5"
          rx="2.5"
          transform="matrix(1 0 0 -1 0 470)"
          fill={fillColor}
        />
        <rect
          width="188"
          height="5"
          rx="2.5"
          transform="matrix(1 0 0 -1 0 480)"
          fill={fillColor}
        />
        <rect
          width="196"
          height="5"
          rx="2.5"
          transform="matrix(1 0 0 -1 0 490)"
          fill={fillColor}
        />
        <rect
          width="201"
          height="5"
          rx="2.5"
          transform="matrix(1 0 0 -1 0 500)"
          fill={fillColor}
        />
        <rect
          width="210"
          height="5"
          rx="2.5"
          transform="matrix(1 0 0 -1 0 510)"
          fill={fillColor}
        />
        <rect
          width="221"
          height="5"
          rx="2.5"
          transform="matrix(1 0 0 -1 0 520)"
          fill={fillColor}
        />
        <rect
          width="235"
          height="5"
          rx="2.5"
          transform="matrix(1 0 0 -1 0 530)"
          fill={fillColor}
        />
        <rect
          width="239"
          height="5"
          rx="2.5"
          transform="matrix(1 0 0 -1 0 540)"
          fill={fillColor}
        />
        <rect
          width="234"
          height="5"
          rx="2.5"
          transform="matrix(1 0 0 -1 0 550)"
          fill={fillColor}
        />
        <rect
          width="233"
          height="5"
          rx="2.5"
          transform="matrix(1 0 0 -1 0 560)"
          fill={fillColor}
        />
        <rect
          width="235"
          height="5"
          rx="2.5"
          transform="matrix(1 0 0 -1 0 570)"
          fill={fillColor}
        />
        <rect
          width="235"
          height="5"
          rx="2.5"
          transform="matrix(1 0 0 -1 0 580)"
          fill={fillColor}
        />
        <rect
          width="245"
          height="5"
          rx="2.5"
          transform="matrix(1 0 0 -1 0 590)"
          fill={fillColor}
        />
        <rect
          width="255"
          height="5"
          rx="2.5"
          transform="matrix(1 0 0 -1 0 600)"
          fill={fillColor}
        />
        <rect
          width="262"
          height="5"
          rx="2.5"
          transform="matrix(1 0 0 -1 0 610)"
          fill={fillColor}
        />
        <rect
          width="288"
          height="5"
          rx="2.5"
          transform="matrix(1 0 0 -1 0 620)"
          fill={fillColor}
        />
        <rect
          width="302"
          height="5"
          rx="2.5"
          transform="matrix(1 0 0 -1 0 630)"
          fill={fillColor}
        />
        <rect
          width="309"
          height="5"
          rx="2.5"
          transform="matrix(1 0 0 -1 0 640)"
          fill={fillColor}
        />
        <rect
          width="310"
          height="5"
          rx="2.5"
          transform="matrix(1 0 0 -1 0 650)"
          fill={fillColor}
        />
        <rect
          width="310"
          height="5"
          rx="2.5"
          transform="matrix(1 0 0 -1 0 660)"
          fill={fillColor}
        />
        <rect
          width="321"
          height="5"
          rx="2.5"
          transform="matrix(1 0 0 -1 0 670)"
          fill={fillColor}
        />
        <rect
          width="327"
          height="5"
          rx="2.5"
          transform="matrix(1 0 0 -1 0 680)"
          fill={fillColor}
        />
        <rect
          width="340"
          height="5"
          rx="2.5"
          transform="matrix(1 0 0 -1 0 690)"
          fill={fillColor}
        />
        <rect
          width="347"
          height="5"
          rx="2.5"
          transform="matrix(1 0 0 -1 0 700)"
          fill={fillColor}
        />
        <rect
          width="347"
          height="5"
          rx="2.5"
          transform="matrix(1 0 0 -1 0 710)"
          fill={fillColor}
        />
        <rect
          width="343"
          height="5"
          rx="2.5"
          transform="matrix(1 0 0 -1 0 720)"
          fill={fillColor}
        />
        <rect
          width="345"
          height="5"
          rx="2.5"
          transform="matrix(1 0 0 -1 0 730)"
          fill={fillColor}
        />
        <rect
          width="351"
          height="5"
          rx="2.5"
          transform="matrix(1 0 0 -1 0 740)"
          fill={fillColor}
        />
        <rect
          width="358"
          height="5"
          rx="2.5"
          transform="matrix(1 0 0 -1 0 750)"
          fill={fillColor}
        />
        <rect
          width="365"
          height="5"
          rx="2.5"
          transform="matrix(1 0 0 -1 0 760)"
          fill={fillColor}
        />
        <rect
          width="371"
          height="5"
          rx="2.5"
          transform="matrix(1 0 0 -1 0 770)"
          fill={fillColor}
        />
        <rect
          width="383"
          height="5"
          rx="2.5"
          transform="matrix(1 0 0 -1 0 780)"
          fill={fillColor}
        />
        <rect
          width="400"
          height="5"
          rx="2.5"
          transform="matrix(1 0 0 -1 0 790)"
          fill={fillColor}
        />
        <rect
          width="410"
          height="5"
          rx="2.5"
          transform="matrix(1 0 0 -1 0 800)"
          fill={fillColor}
        />
        <rect
          width="421"
          height="5"
          rx="2.5"
          transform="matrix(1 0 0 -1 0 810)"
          fill={fillColor}
        />
        <rect
          width="428"
          height="5"
          rx="2.5"
          transform="matrix(1 0 0 -1 0 820)"
          fill={fillColor}
        />
        <rect
          width="421"
          height="5"
          rx="2.5"
          transform="matrix(1 0 0 -1 0 830)"
          fill={fillColor}
        />
        <rect
          width="21"
          height="5"
          rx="2.5"
          transform="matrix(1 0 0 -1 447 830)"
          fill={fillColor}
        />
        <rect
          width="39"
          height="5"
          rx="2.5"
          transform="matrix(1 0 0 -1 555 830)"
          fill={fillColor}
        />
        <rect
          width="56"
          height="5"
          rx="2.5"
          transform="matrix(1 0 0 -1 548 840)"
          fill={fillColor}
        />
        <rect
          width="107"
          height="5"
          rx="2.5"
          transform="matrix(1 0 0 -1 544 850)"
          fill={fillColor}
        />
        <rect
          width="123"
          height="5"
          rx="2.5"
          transform="matrix(1 0 0 -1 536 860)"
          fill={fillColor}
        />
        <rect
          width="148"
          height="5"
          rx="2.5"
          transform="matrix(1 0 0 -1 522 870)"
          fill={fillColor}
        />
        <rect
          width="183"
          height="5"
          rx="2.5"
          transform="matrix(1 0 0 -1 497 880)"
          fill={fillColor}
        />
        <rect
          width="28"
          height="5"
          rx="2.5"
          transform="matrix(1 0 0 -1 559 820)"
          fill={fillColor}
        />
        <rect
          width="22"
          height="5"
          rx="2.5"
          transform="matrix(1 0 0 -1 562 810)"
          fill={fillColor}
        />
        <rect
          width="14"
          height="5"
          rx="2.5"
          transform="matrix(1 0 0 -1 566 800)"
          fill={fillColor}
        />
        <rect
          width="8"
          height="5"
          rx="2.5"
          transform="matrix(1 0 0 -1 571 790)"
          fill={fillColor}
        />
        <rect
          width="21"
          height="5"
          rx="2.5"
          transform="matrix(1 0 0 -1 447 840)"
          fill={fillColor}
        />
        <rect
          width="24"
          height="5"
          rx="2.5"
          transform="matrix(1 0 0 -1 447 850)"
          fill={fillColor}
        />
        <rect
          width="21"
          height="5"
          rx="2.5"
          transform="matrix(1 0 0 -1 450 860)"
          fill={fillColor}
        />
        <rect
          width="428"
          height="5"
          rx="2.5"
          transform="matrix(1 0 0 -1 0 840)"
          fill={fillColor}
        />
        <rect
          width="440"
          height="5"
          rx="2.5"
          transform="matrix(1 0 0 -1 0 850)"
          fill={fillColor}
        />
        <rect
          width="446"
          height="5"
          rx="2.5"
          transform="matrix(1 0 0 -1 0 860)"
          fill={fillColor}
        />
        <rect
          width="471"
          height="5"
          rx="2.5"
          transform="matrix(1 0 0 -1 0 870)"
          fill={fillColor}
        />
        <rect
          width="482"
          height="5"
          rx="2.5"
          transform="matrix(1 0 0 -1 0 880)"
          fill={fillColor}
        />
        <rect
          width="680"
          height="5"
          rx="2.5"
          transform="matrix(1 0 0 -1 0 890)"
          fill={fillColor}
        />
        <rect
          width="678"
          height="5"
          rx="2.5"
          transform="matrix(1 0 0 -1 0 900)"
          fill={fillColor}
        />
        <rect
          width="676"
          height="5"
          rx="2.5"
          transform="matrix(1 0 0 -1 0 910)"
          fill={fillColor}
        />
        <rect
          width="672"
          height="5"
          rx="2.5"
          transform="matrix(1 0 0 -1 0 920)"
          fill={fillColor}
        />
        <rect
          width="670"
          height="5"
          rx="2.5"
          transform="matrix(1 0 0 -1 0 930)"
          fill={fillColor}
        />
        <rect
          width="668"
          height="5"
          rx="2.5"
          transform="matrix(1 0 0 -1 0 940)"
          fill={fillColor}
        />
        <rect
          width="673"
          height="5"
          rx="2.5"
          transform="matrix(1 0 0 -1 0 950)"
          fill={fillColor}
        />
        <rect
          width="658"
          height="5"
          rx="2.5"
          transform="matrix(1 0 0 -1 0 960)"
          fill={fillColor}
        />
        <rect
          width="651"
          height="5"
          rx="2.5"
          transform="matrix(1 0 0 -1 6 970)"
          fill={fillColor}
        />
        <rect
          width="626"
          height="5"
          rx="2.5"
          transform="matrix(1 0 0 -1 30 980)"
          fill={fillColor}
        />
        <rect
          width="617"
          height="5"
          rx="2.5"
          transform="matrix(1 0 0 -1 43 990)"
          fill={fillColor}
        />
        <rect
          width="615"
          height="5"
          rx="2.5"
          transform="matrix(1 0 0 -1 49 1000)"
          fill={fillColor}
        />
        <rect
          width="597"
          height="5"
          rx="2.5"
          transform="matrix(1 0 0 -1 55 1010)"
          fill={fillColor}
        />
        <rect x="179" y="395" width="73" height="5" rx="2.5" fill={fillColor} />
        <rect x="201" y="405" width="41" height="5" rx="2.5" fill={fillColor} />
        <rect x="264" y="395" width="30" height="5" rx="2.5" fill={fillColor} />
        <rect x="279" y="405" width="22" height="5" rx="2.5" fill={fillColor} />
        <rect x="283" y="415" width="22" height="5" rx="2.5" fill={fillColor} />
        <rect
          x="244"
          y="255"
          width="412"
          height="5"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="260"
          y="265"
          width="404"
          height="5"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="266"
          y="275"
          width="410"
          height="5"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="327"
          y="325"
          width="392"
          height="5"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="274"
          y="285"
          width="411"
          height="5"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="335"
          y="335"
          width="393"
          height="5"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="356"
          y="375"
          width="404"
          height="5"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="290"
          y="295"
          width="404"
          height="5"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="342"
          y="345"
          width="395"
          height="5"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="365"
          y="385"
          width="403"
          height="5"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="300"
          y="305"
          width="403"
          height="5"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="351"
          y="355"
          width="395"
          height="5"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="372"
          y="395"
          width="403"
          height="5"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="315"
          y="315"
          width="396"
          height="5"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="356"
          y="365"
          width="397"
          height="5"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="374"
          y="405"
          width="407"
          height="5"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="398"
          y="415"
          width="389"
          height="5"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="466"
          y="425"
          width="328"
          height="5"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="487"
          y="435"
          width="314"
          height="5"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="513"
          y="445"
          width="295"
          height="5"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="525"
          y="455"
          width="289"
          height="5"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="554"
          y="465"
          width="265"
          height="5"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="559"
          y="475"
          width="265"
          height="5"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="566"
          y="485"
          width="264"
          height="5"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="570"
          y="495"
          width="265"
          height="5"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="573"
          y="505"
          width="267"
          height="5"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="569"
          y="515"
          width="277"
          height="5"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="573"
          y="525"
          width="279"
          height="5"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="573"
          y="535"
          width="284"
          height="5"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="582"
          y="545"
          width="279"
          height="5"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="581"
          y="555"
          width="285"
          height="5"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="595"
          y="575"
          width="280"
          height="5"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="601"
          y="585"
          width="278"
          height="5"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="619"
          y="595"
          width="265"
          height="5"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="624"
          y="605"
          width="264"
          height="5"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="625"
          y="615"
          width="267"
          height="5"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="621"
          y="625"
          width="275"
          height="5"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="620"
          y="635"
          width="280"
          height="5"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="630"
          y="645"
          width="272"
          height="5"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="639"
          y="655"
          width="266"
          height="5"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="657"
          y="665"
          width="251"
          height="5"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="668"
          y="675"
          width="243"
          height="5"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="676"
          y="685"
          width="235"
          height="5"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="684"
          y="695"
          width="227"
          height="5"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="691"
          y="705"
          width="222"
          height="5"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="690"
          y="715"
          width="226"
          height="5"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="680"
          y="725"
          width="238"
          height="5"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="760"
          y="735"
          width="159"
          height="5"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="765"
          y="745"
          width="156"
          height="5"
          rx="2.5"
          fill={fillColor}
        />
        <rect
          x="776.565"
          y="755.045"
          width="146.805"
          height="5"
          rx="2.5"
          transform="rotate(-0.0351165 776.565 755.045)"
          fill={fillColor}
        />
        <rect
          x="783"
          y="765.097"
          width="141.535"
          height="5"
          rx="2.5"
          transform="rotate(-0.0351165 783 765.097)"
          fill={fillColor}
        />
        <rect
          x="801.175"
          y="775.076"
          width="125.51"
          height="5"
          rx="2.5"
          transform="rotate(-0.0351165 801.175 775.076)"
          fill={fillColor}
        />
        <rect
          x="821.933"
          y="785.064"
          width="104.753"
          height="5"
          rx="2.5"
          transform="rotate(-0.0351165 821.933 785.064)"
          fill={fillColor}
        />
        <rect
          x="809.941"
          y="795.071"
          width="116.744"
          height="5"
          rx="2.5"
          transform="rotate(-0.0351165 809.941 795.071)"
          fill={fillColor}
        />
        <rect
          x="819.856"
          y="805.065"
          width="109.086"
          height="5"
          rx="2.5"
          transform="rotate(-0.0351165 819.856 805.065)"
          fill={fillColor}
        />
        <rect
          x="829.082"
          y="815.061"
          width="100.783"
          height="5"
          rx="2.5"
          transform="rotate(-0.0351165 829.082 815.061)"
          fill={fillColor}
        />
        <rect
          x="863.906"
          y="825.041"
          width="68.0345"
          height="5"
          rx="2.5"
          transform="rotate(-0.0351165 863.906 825.041)"
          fill={fillColor}
        />
        <rect
          x="865.752"
          y="835.041"
          width="66.1883"
          height="5"
          rx="2.5"
          transform="rotate(-0.0351165 865.752 835.041)"
          fill={fillColor}
        />
        <rect
          x="869.902"
          y="845.038"
          width="62.0379"
          height="5"
          rx="2.5"
          transform="rotate(-0.0351165 869.902 845.038)"
          fill={fillColor}
        />
        <rect
          x="873.362"
          y="855.036"
          width="58.5784"
          height="5"
          rx="2.5"
          transform="rotate(-0.0351165 873.362 855.036)"
          fill={fillColor}
        />
        <rect
          x="876.36"
          y="865.034"
          width="55.5799"
          height="5"
          rx="2.5"
          transform="rotate(-0.0351165 876.36 865.034)"
          fill={fillColor}
        />
        <rect
          x="880.512"
          y="875.032"
          width="51.4282"
          height="5"
          rx="2.5"
          transform="rotate(-0.0351165 880.512 875.032)"
          fill={fillColor}
        />
        <rect
          x="885.354"
          y="885.029"
          width="49.3535"
          height="5"
          rx="2.5"
          transform="rotate(-0.0351165 885.354 885.029)"
          fill={fillColor}
        />
        <rect
          x="888"
          y="895.027"
          width="47.8613"
          height="5"
          rx="2.5"
          transform="rotate(-0.0351165 888 895.027)"
          fill={fillColor}
        />
        <rect
          x="890"
          y="905.029"
          width="47.8613"
          height="5"
          rx="2.5"
          transform="rotate(-0.0351165 890 905.029)"
          fill={fillColor}
        />
        <rect
          x="893.61"
          y="915.028"
          width="46.251"
          height="5"
          rx="2.5"
          transform="rotate(-0.0351165 893.61 915.028)"
          fill={fillColor}
        />
        <rect
          x="897.525"
          y="925.027"
          width="44.3364"
          height="5"
          rx="2.5"
          transform="rotate(-0.0351165 897.525 925.027)"
          fill={fillColor}
        />
        <rect
          x="902.027"
          y="935.024"
          width="39.8343"
          height="5"
          rx="2.5"
          transform="rotate(-0.0351165 902.027 935.024)"
          fill={fillColor}
        />
        <rect
          x="905.354"
          y="945.022"
          width="37.776"
          height="5"
          rx="2.5"
          transform="rotate(-0.0351165 905.354 945.022)"
          fill={fillColor}
        />
        <rect
          x="908.681"
          y="955.021"
          width="34.4488"
          height="5"
          rx="2.5"
          transform="rotate(-0.0351165 908.681 955.021)"
          fill={fillColor}
        />
        <rect
          x="912"
          y="965.021"
          width="34.4488"
          height="5"
          rx="2.5"
          transform="rotate(-0.0351165 912 965.021)"
          fill={fillColor}
        />
        <rect
          x="914"
          y="975.021"
          width="32.1809"
          height="5"
          rx="2.5"
          transform="rotate(-0.0351165 914 975.021)"
          fill={fillColor}
        />
        <rect
          x="917.969"
          y="985.017"
          width="28.8302"
          height="5"
          rx="2.5"
          transform="rotate(-0.0351165 917.969 985.017)"
          fill={fillColor}
        />
        <rect
          x="922"
          y="995.018"
          width="28.8302"
          height="5"
          rx="2.5"
          transform="rotate(-0.0351165 922 995.018)"
          fill={fillColor}
        />
        <rect
          x="925"
          y="1005.02"
          width="28.8302"
          height="5"
          rx="2.5"
          transform="rotate(-0.0351165 925 1005.02)"
          fill={fillColor}
        />
        <rect x="675" y="735" width="74" height="5" rx="2.5" fill={fillColor} />
        <rect x="678" y="745" width="56" height="5" rx="2.5" fill={fillColor} />
        <rect x="682" y="755" width="34" height="5" rx="2.5" fill={fillColor} />
        <rect
          x="589"
          y="565"
          width="282"
          height="5"
          rx="2.5"
          fill={fillColor}
        />
        <rect x="400" y="425" width="48" height="5" rx="2.5" fill={fillColor} />
        <rect x="404" y="435" width="16" height="5" rx="2.5" fill={fillColor} />
        <rect x="404" y="445" width="9" height="5" rx="2.5" fill={fillColor} />
        <path
          d="M238.484 428.633C239.652 426.617 240.674 424.673 241.039 423.953C241.769 423.234 243.595 423.234 244.69 421.794C245.785 420.353 245.055 420.354 246.15 418.914C247.245 417.474 251.99 414.594 252.72 413.874C253.45 413.154 256.006 411.714 257.466 410.274C258.926 408.833 261.116 408.834 262.576 408.114C264.036 407.394 266.591 410.274 268.417 411.714C270.242 413.154 270.242 412.794 271.702 413.874C273.162 414.954 273.892 415.674 274.257 417.114C274.622 418.554 271.337 417.834 270.242 418.914C269.147 419.994 268.782 421.794 273.162 423.234C277.542 424.674 275.717 425.394 276.447 427.194C277.177 428.994 272.797 428.274 270.607 430.794C268.417 433.314 274.987 434.394 277.177 436.194C279.367 437.994 280.098 436.554 281.923 436.914C283.748 437.274 284.478 440.874 286.668 441.954C288.858 443.034 288.858 442.674 290.683 441.234C292.143 440.082 292.995 440.754 293.239 441.234C293.36 441.594 294.261 444.186 296.889 451.674C300.174 461.033 309.3 464.993 310.395 465.713C311.49 466.433 321.711 466.073 323.536 465.713C325.361 465.353 330.837 467.873 331.567 469.313C332.297 470.753 335.947 473.633 338.867 475.793C341.788 477.953 342.518 477.953 350.548 481.553C358.579 485.153 368.8 485.513 369.895 485.873C370.99 486.233 373.91 486.233 377.195 484.433C380.481 482.633 387.781 481.193 389.972 480.473C392.162 479.753 400.192 475.433 404.573 475.433C408.953 475.433 410.048 474.713 410.778 474.353C411.508 473.993 410.413 471.833 407.858 469.313C405.303 466.793 406.763 465.353 406.763 464.273C406.763 463.193 409.683 463.553 412.238 464.273C414.794 464.993 415.524 462.113 419.539 461.393C423.554 460.673 418.809 459.953 421.364 458.873C423.919 457.793 420.634 459.233 420.269 455.634C419.904 452.034 421.729 452.754 422.094 451.314C422.459 449.874 428.3 445.194 431.22 443.394C434.14 441.594 442.901 443.394 444.361 443.754C445.821 444.114 445.091 441.594 445.091 439.434C445.091 437.274 448.741 438.354 451.297 437.994C453.852 437.634 453.122 438.354 456.042 439.794C458.378 440.946 459.449 438.354 459.692 436.914C460.909 437.994 463.708 440.658 465.168 442.674C466.993 445.194 465.533 443.754 467.358 445.194C469.183 446.634 469.183 445.194 472.468 445.914C475.754 446.634 486.704 450.594 489.625 451.314C492.545 452.034 493.64 450.234 495.83 450.594C498.02 450.954 496.925 450.954 502.036 453.114C503.866 453.887 504.619 454.106 504.883 454.119C504.336 453.549 505.337 454.141 504.883 454.119C504.904 454.142 504.929 454.167 504.956 454.194C506.051 455.274 507.511 456.354 507.876 457.073C508.241 457.793 507.876 457.793 509.336 459.953C510.796 462.113 517.732 462.473 522.477 465.353C526.274 467.657 528.926 470.873 529.778 472.193L545.839 471.473C545.718 471.833 545.693 473.417 546.569 476.873C547.664 481.193 550.585 482.633 550.95 487.673C551.315 492.713 553.87 489.833 555.695 493.793C557.52 497.753 558.25 497.033 557.885 500.633C557.52 504.233 556.425 505.313 558.25 507.473C560.075 509.633 560.806 512.873 560.806 518.273C560.806 523.673 559.71 521.153 558.615 523.673C557.52 526.193 560.44 525.833 561.901 527.273C563.361 528.713 563.361 528.713 561.536 529.433C559.71 530.153 557.52 531.233 557.52 534.113C557.52 536.993 558.25 536.633 560.806 540.593C563.361 544.553 562.631 545.993 564.091 547.073C565.551 548.153 571.391 547.433 570.296 547.793C569.201 548.153 568.106 557.873 568.106 558.233C568.106 558.593 576.867 571.913 578.692 574.433C580.517 576.953 581.977 578.753 583.437 581.993C584.897 585.233 588.548 598.193 589.278 598.193C590.008 598.193 604.974 597.833 606.069 598.913C607.164 599.993 611.18 605.753 612.275 606.833C613.37 607.913 612.275 616.913 610.085 624.833C607.894 632.753 606.799 638.873 607.164 639.953C607.529 641.033 618.845 650.033 620.67 651.833C622.496 653.633 630.891 665.153 631.986 665.873C633.081 666.593 638.557 670.913 643.667 670.553C648.778 670.193 647.683 671.273 649.508 671.993C651.333 672.713 652.428 675.233 653.523 675.233C654.618 675.233 655.348 674.153 656.078 674.153C656.808 674.153 657.173 674.873 657.538 677.753C657.903 680.633 657.538 679.913 658.999 680.993C660.459 682.073 664.474 691.433 665.569 695.033C666.664 698.633 666.664 699.353 668.124 700.073C669.584 700.793 669.219 698.993 672.505 697.913C675.79 696.833 675.79 698.273 676.52 700.073C677.25 701.873 679.44 703.313 678.71 704.753C677.98 706.193 681.265 714.833 679.44 714.833C677.615 714.833 675.79 715.553 672.505 716.993C669.219 718.433 668.489 722.753 668.489 725.273C668.489 727.793 662.284 728.873 662.284 730.673C662.284 732.473 664.109 736.793 664.474 738.953C664.839 741.113 664.474 743.993 665.204 744.713C665.934 745.433 667.029 752.993 667.759 754.793C668.489 756.593 668.489 758.753 668.854 760.913C669.219 763.073 668.489 763.793 666.664 764.152C664.839 764.513 664.109 764.152 659.729 764.152C655.348 764.152 649.508 760.913 648.413 760.193C647.318 759.473 646.223 760.553 645.492 762.353C644.762 764.152 642.937 763.432 639.287 764.152C635.637 764.872 625.781 764.513 625.051 765.232C624.321 765.952 622.496 767.033 621.4 767.392C620.305 767.753 618.48 765.232 613.735 764.513C608.989 763.793 607.529 764.513 606.434 766.312C605.339 768.112 603.879 768.472 600.959 767.392C598.039 766.312 594.023 766.312 592.198 765.232C590.373 764.152 587.088 766.672 584.167 765.232C581.247 763.793 582.342 763.793 579.422 760.553C576.502 757.313 577.962 758.753 577.962 756.593C577.962 754.433 575.407 754.073 574.677 752.273C573.947 750.473 572.121 749.033 571.391 745.793C570.661 742.553 566.281 737.873 565.551 736.073C564.821 734.273 561.901 731.033 560.806 730.313C559.71 729.593 552.775 730.313 548.76 730.313C544.744 730.313 548.029 730.673 547.299 732.833C546.569 734.993 541.459 737.873 539.634 739.313C537.809 740.753 537.809 739.673 538.174 741.833C538.539 743.993 537.809 744.353 536.714 746.153C535.618 747.953 533.428 747.233 531.603 747.953C529.778 748.673 530.143 752.273 529.413 754.793C528.683 757.313 522.112 759.473 521.017 758.393C519.922 757.313 518.462 757.673 517.002 756.593C515.542 755.513 513.352 756.233 511.161 755.513C508.971 754.793 507.876 754.793 506.781 756.233C505.686 757.673 502.036 757.673 498.02 756.593C494.005 755.513 493.64 754.433 493.64 752.633C493.64 750.833 480.499 749.753 479.769 748.673C479.039 747.593 471.008 745.793 470.278 745.433C469.548 745.073 469.913 744.353 470.278 742.553C470.643 740.753 464.438 738.233 463.343 736.793C462.247 735.353 462.247 736.793 458.962 736.793C455.677 736.793 455.312 734.273 453.487 733.193C451.662 732.113 452.392 733.553 446.916 734.993C441.441 736.433 434.87 730.313 432.68 728.873C430.49 727.433 432.315 727.793 431.95 725.633C431.585 723.473 427.935 722.393 425.379 717.713C422.824 713.033 424.284 715.193 424.284 713.033C424.284 710.873 421.364 709.433 419.174 709.073C416.984 708.713 415.524 707.273 414.063 706.193C412.603 705.113 414.429 703.673 416.254 702.953C418.079 702.233 415.524 699.713 413.333 698.993C411.143 698.273 409.683 701.153 408.953 701.153C408.223 701.153 408.223 699.353 408.588 696.833C408.953 694.313 403.113 688.913 401.287 686.753C399.462 684.593 396.907 684.593 394.717 683.153C392.527 681.713 387.781 673.073 385.956 670.913C384.131 668.753 384.496 670.913 381.211 672.713C377.926 674.513 379.021 675.593 375.735 678.113C372.45 680.633 375.005 677.033 373.18 674.513C371.355 671.993 370.99 674.513 368.8 675.233C366.61 675.953 365.515 675.953 363.324 674.513C361.134 673.073 361.499 671.273 360.404 669.833C359.309 668.393 358.214 670.193 357.484 670.913C356.754 671.633 357.484 673.073 358.944 673.073C360.404 673.073 361.499 678.833 361.499 680.273C361.499 681.713 360.039 681.713 356.754 682.073C353.469 682.433 356.754 683.153 354.929 684.593C353.103 686.033 353.103 686.033 349.818 684.593C346.533 683.153 346.168 676.313 343.248 675.953C340.327 675.593 341.058 674.873 339.597 672.713C338.137 670.553 338.867 672.353 335.947 671.993C333.027 671.633 331.567 657.593 330.837 656.153C330.107 654.713 325.361 657.233 322.441 657.593C319.521 657.953 320.981 653.273 319.521 651.113C318.061 648.953 319.886 633.113 319.521 631.313C319.156 629.513 318.426 630.593 316.966 629.153C315.505 627.713 309.665 623.033 308.57 621.593C307.475 620.153 304.92 616.193 303.824 614.753C302.729 613.313 301.634 614.033 300.539 614.033C299.444 614.033 297.254 614.753 295.429 613.673C293.604 612.593 282.288 605.753 280.463 603.953C278.637 602.153 272.067 603.953 268.417 602.873C264.766 601.793 266.956 601.793 265.861 599.993C264.766 598.193 266.226 598.913 266.956 598.193C267.686 597.473 267.686 597.473 266.956 594.953C266.226 592.433 259.656 588.113 259.656 586.673C259.656 585.233 259.291 585.953 258.196 584.873C257.101 583.793 254.91 587.393 253.815 584.513C252.72 581.633 247.975 578.393 247.61 576.953C247.245 575.513 243.595 576.593 242.499 575.153C241.404 573.713 242.499 573.353 243.595 571.553C244.69 569.753 245.785 567.593 245.055 564.713C244.325 561.833 242.499 563.993 240.309 562.193C238.119 560.393 239.214 561.113 239.944 560.393C240.674 559.673 241.039 559.673 241.039 558.233C241.039 556.793 240.309 556.433 242.864 556.433C245.42 556.433 244.69 556.073 245.785 554.633C246.88 553.193 243.96 552.833 242.864 550.313C241.769 547.793 244.69 547.793 246.515 545.633C248.34 543.473 246.15 542.753 246.88 541.673C247.61 540.593 247.61 541.313 249.8 540.593C251.99 539.873 253.085 538.793 253.815 537.353C254.545 535.913 251.625 532.673 249.07 531.233C246.515 529.793 245.785 526.913 246.15 524.393C246.515 521.873 245.785 522.593 249.07 522.233C252.355 521.873 252.72 520.433 253.085 519.353C253.45 518.273 252.72 517.913 251.26 517.913C249.8 517.913 250.165 519.353 248.34 517.913C246.515 516.473 245.785 518.633 241.769 519.353C237.754 520.073 237.389 518.633 236.294 516.833C235.199 515.033 233.739 515.393 230.818 514.313C227.898 513.233 228.263 513.953 228.263 513.233C228.263 513.225 228.263 513.217 228.264 513.21C228.089 513.263 227.388 512.875 224.978 509.633C223.153 506.393 223.883 506.393 223.518 504.593C223.153 502.793 221.693 502.793 219.503 503.513C217.312 504.233 216.582 502.433 215.487 500.633C214.392 498.833 215.487 498.833 215.852 496.313C216.217 493.793 214.027 494.513 213.297 493.433C212.567 492.353 210.377 493.793 209.282 492.353C208.187 490.913 209.647 488.393 209.282 486.233C208.917 484.073 208.187 485.873 207.092 485.153C205.996 484.433 205.266 482.993 205.266 481.913C205.266 480.833 205.631 478.673 204.901 477.593C204.171 476.513 201.251 476.153 199.791 475.073C198.331 473.993 198.331 474.353 198.331 471.833V468.233C198.331 466.793 198.331 464.633 196.141 464.633C193.95 464.633 194.315 465.713 192.855 464.633C191.395 463.553 191.03 463.193 187.745 463.553C184.46 463.913 184.825 462.113 187.745 458.153C188.475 454.194 188.84 455.994 188.84 454.194C188.84 452.394 190.665 452.034 191.03 450.234C191.395 448.434 189.935 448.074 188.84 448.074C187.745 448.074 184.825 448.794 184.825 448.074V442.674C184.825 439.794 183 439.074 183 435.834C183 432.594 181.904 435.114 180.444 433.314C178.984 431.514 177.889 431.153 177.889 428.633V426.113C177.159 426.113 175.261 425.681 173.509 423.953C171.319 421.794 171.684 420.354 173.509 418.914C175.334 417.473 178.254 419.994 180.444 418.914C182.634 417.833 180.809 416.754 180.444 414.234C180.079 411.714 180.444 409.554 183 408.474C185.555 407.394 187.745 409.914 192.855 413.154C197.966 416.394 194.315 416.394 198.331 418.914C202.346 421.434 199.426 421.434 203.441 422.513C207.457 423.593 205.266 423.953 207.822 426.113C210.377 428.273 208.917 428.633 211.837 430.073C214.757 431.513 217.677 430.073 223.518 431.153C229.358 432.233 226.803 431.153 228.993 430.073C231.184 428.993 231.184 431.153 234.834 431.153C238.484 431.153 237.024 431.153 238.484 428.633Z"
          fill={
            theme.palette.mode === "dark"
              ? "url(#paint0_radial_14_38)"
              : "url(#paint0_radial_202_4189)"
          }
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
                radial
                fill="#FE4543"
              />
              <AnimatedCircle
                cx={province.x}
                cy={province.y}
                r="25"
                fill={"url(#animatedGradient)"}
              />
            </Fragment>
          ))}
        <defs>
          <filter
            id="filter0_d_14_38"
            x="-1714"
            y="-215"
            width="2857"
            height="2965"
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
              result="effect1_dropShadow_14_38"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_14_38"
              result="shape"
            />
          </filter>
          <radialGradient
            id="paint0_radial_14_38"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(342.5 681) rotate(-37.5178) scale(309.52 436.767)"
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
            gradientTransform="translate(313.5 712.5) rotate(-33.4512) scale(399.11 563.189)"
          >
            <stop stopColor="#4B788B" />
            <stop offset="1" stopColor="#1D576F" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    </SvgIcon>
  );
};

export default BackgroundSvg;