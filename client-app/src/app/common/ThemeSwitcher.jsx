import React from "react";
import styled from "@emotion/styled";
import sun from "../assets/image/sun.svg";
import moon from "../assets/image/moon.svg";

const StyledSwitchContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const Icon = styled.img`
  width: 32px;
  height: 32px;
`;

const Circle = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: blue;
  position: absolute;
  transition: transform 0.3s ease;
  transform: translateX(${(props) => (props.moveRight ? "35px" : "0px")});
`;

const ThemeSwitcher = ({ themeMode, toggleTheme }) => {
  const isDarkMode = themeMode === "dark";

  return (
    <StyledSwitchContainer onClick={toggleTheme}>
      <Icon src={sun} alt="Sun Icon" />
      <Circle moveRight={isDarkMode} />
      <Icon src={moon} alt="Moon Icon" />
    </StyledSwitchContainer>
  );
};

export default ThemeSwitcher;