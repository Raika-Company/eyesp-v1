import React, { useState, useEffect } from "react";
import iranProvinces from "../../../../public/data/IranProvinces.js";
import iranBorder, {
  caspianD,
  persianGulfD,
} from "../../../../public/data/IranMapData.js";
import styles from "./IranMap.module.css";

import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { useTheme } from "@mui/material";

const StyledSpan = styled("span")({
  position: "absolute",
  left: (props) => `${props.x + 5}px`,
  top: (props) => `${props.y + 5}px`,
  zIndex: 999,
});

const useMouse = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    function handle(e) {
      setMousePosition({
        x: e.pageX,
        y: e.pageY,
      });
    }
    const mapEffect = document.querySelector("svg");
    mapEffect.addEventListener("mousemove", handle);
    return () => mapEffect.removeEventListener("mousemove", handle);
  }, [setMousePosition]);

  return mousePosition;
};

const getProvinceColor = (provinceName) => {
  const province = iranProvinces.find((p) => p.name === provinceName);

  return province ? province.color : "";
};

const IranMap = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { x, y } = useMouse();
  const [provinces] = useState(() => iranProvinces);
  const [provinceName, setProvinceName] = useState("");
  const [provinceNameOnClick, setProvinceNameOnClick] = useState("");
  const [mapZoom, setMapZoom] = useState(false);
  const [provinceSelected, setProvinceSelected] = useState(false);
  const [cities, setCities] = useState(["تمام ایران"]);
  const [hoveredProvinceText, setHoveredProvinceText] = useState("");
  const [hoveredProvinceLine, setHoveredProvinceLine] = useState("");

  const [additionalText, setAdditionalText] = useState("");

  useEffect(() => {
    const color = getProvinceColor(provinceName);
    if (color) {
      switch (color) {
        case "#EE0B0B":
          setAdditionalText("اختلال یافت شد");
          break;
        case "#14A784":
          setAdditionalText("اختلالی یافت نشد");
          break;
        case "#FF8F3F":
          setAdditionalText("وجود اختلالات جزيی");
          break;
      }
    } else {
      setAdditionalText("");
    }
  }, [provinceName]);

  const borderColor = theme.palette.mode === "dark" ? "#181D23" : "#FFF";

  return (
    <>
      <span className={styles.show_title}>
        {provinceName}
        {hoveredProvinceText && (
          <StyledSpan x={x} y={y}>
            {hoveredProvinceText}
            <div className={styles.show_title_Line}></div>
          </StyledSpan>
        )}
        <div className={styles.show_title_Line}></div>
      </span>
      {provinceName && (
        <div className={styles.additional_text_Wrapper}>
          <div
            className={styles.additional_text}
            style={{ color: getProvinceColor(provinceName) }}
          >
            {/* Step 1: Use the additionalText state variable */}
            {additionalText}
          </div>
        </div>
      )}
      {provinceSelected && (
        <div>
          <div
            className={styles.backdrop}
            onClick={() => setProvinceSelected(false)}
          ></div>
          <div className={styles.cities}>
            <p>
              <span className={styles.selected_province}>انتخاب شهر در </span>
              <span>{provinceNameOnClick}</span>
            </p>
            <form>
              {cities.map((city) => {
                return (
                  <>
                    <input type="checkbox" value={city} name={city} />
                    <label htmlFor={city} className={styles.city_label}>
                      {city}
                    </label>
                    <br />
                  </>
                );
              })}
              <div className={styles.select_cities_btns}>
                <button
                  type="button"
                  onClick={() => setProvinceSelected(false)}
                >
                  بازگشت
                </button>
                <input type="submit" value="تایید" />
              </div>
            </form>
          </div>
        </div>
      )}
      <div className={styles.container}>
        <div className={styles.map}>
          <div className={styles.line}></div>
          <svg
            className={styles.svg}
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="20 0 970 960"
            enableBackground="new 20 0 970 960"
            xmlSpace="preserve"
          >
            <defs>
                <linearGradient id="blueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#008EDD' }} />
                    <stop offset="100%" style={{ stopColor: '#45ABE4' }} />
                </linearGradient>
                <linearGradient id="yellowGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#EAE084' }} />
                    <stop offset="100%" style={{ stopColor: '#F2EAA1' }} />
                </linearGradient>
                <linearGradient id="redGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#D04747' }} />
                    <stop offset="100%" style={{ stopColor: '#DA8E8E' }} />
                </linearGradient>
            </defs>
            <g className={styles.province}>
              {provinces.map((province) => (
                <path
                  key={province.id}
                  className={province.className}
                  d={province.d}
                  fill={province.color == "#14A784" ? "url(#blueGradient)" : province.color == "#FF8F3F" ? "url(#yellowGradient)" : "url(#redGradient)"}
                  onMouseOver={() => {
                    setProvinceName(province.name);
                    setHoveredProvinceText("استان");
                    setHoveredProvinceLine("");
                  }}
                  onMouseLeave={() => {
                    setProvinceName("");
                    setHoveredProvinceText("");
                    setHoveredProvinceLine("");
                  }}
                  onClick={() => {
                    navigate(`/admin/${province.name}`, {
                      state: {
                        provinceName: province.name,
                        pathD: province.d,
                        color: province.color,
                        x: province.X,
                        y: province.Y,
                        width: province.WIDTH,
                        height: province.HEIGHT,
                      },
                    });
                  }}
                />
              ))}
            </g>
          </svg>
        </div>
      </div>
    </>
  );
};

export default IranMap;
