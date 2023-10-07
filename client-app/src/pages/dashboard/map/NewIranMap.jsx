import React, { useState, useEffect } from "react";
import iranProvinces from "../../../../public/data/IranProvinces.js";
import styles from "./NewIranMap.module.css";

import iranBorder from "../../../../public/data/IranMapData.js";

import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material";

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

const NewIranMap = ({ isProvince, currentProvince }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { x, y } = useMouse();
  const [provinces] = useState(() => iranProvinces);
  const [provinceName, setProvinceName] = useState("");
  const [provinceNameOnClick, setProvinceNameOnClick] = useState("");
  const [mapZoom, setMapZoom] = useState(false);
  const [provinceSelected, setProvinceSelected] = useState(false);
  const [cities, setCities] = useState(["تمام ایران"]);

  const borderColor = "#FFF";

  return (
    <>
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
            {/* <g className={styles.border}>
              <path className={styles.iran} d={iranBorder} />
            </g> */}
            <defs>
              <defs>
                <linearGradient
                  id="grayGradient"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="0%" style={{ stopColor: "#BABABA" }} />
                  <stop offset="100%" style={{ stopColor: "#C8C8C8" }} />
                </linearGradient>
              </defs>
              <linearGradient
                id="blueGradient"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" style={{ stopColor: "#008EDD" }} />
                <stop offset="100%" style={{ stopColor: "#45ABE4" }} />
              </linearGradient>
              <linearGradient
                id="yellowGradient"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" style={{ stopColor: "#EAE084" }} />
                <stop offset="100%" style={{ stopColor: "#F2EAA1" }} />
              </linearGradient>
              <linearGradient
                id="redGradient"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" style={{ stopColor: "#D04747" }} />
                <stop offset="100%" style={{ stopColor: "#DA8E8E" }} />
              </linearGradient>
              <linearGradient
                id="darkModeGradient"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#3D3D3D" />
                <stop offset="100%" stopColor="#2A2A2A" />
              </linearGradient>
            </defs>
            <g className={styles.province}>
              {provinces.map((province) => (
                <path
                  key={province.id}
                  className={province.className}
                  d={province.d}
                  fill={
                    isProvince
                      ? currentProvince == province.name
                        ? "url(#blueGradient)"
                        : theme.palette.mode === "light"
                        ? "url(#grayGradient)"
                        : "url(#darkModeGradient)"
                      : province.color == "#14A784"
                      ? "url(#blueGradient)"
                      : province.color == "#FF8F3F"
                      ? "url(#yellowGradient)"
                      : "url(#redGradient)"
                  }
                  onMouseOver={() => {
                    setProvinceName(province.name);
                  }}
                  onClick={() => {
                    navigate(`/dashboard/${province.name}`, {
                      state: {
                        provinceName: province.name,
                        provinceQuality: province.quality,
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

export default NewIranMap;
