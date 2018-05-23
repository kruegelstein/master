// @flow

// Images
import Skull from "../assets/Skull.svg";
import Dynamite from "../assets/Dynamite.svg";
import Bomb from "../assets/Bomb.svg";
import Biohazard from "../assets/Biohazard.svg";

import Tennis from "../assets/Tennis.svg";
import Soccer from "../assets/Soccer.svg";
import Football from "../assets/Football.svg";
import Basketball from "../assets/Basketball.svg";
import Volleyball from "../assets/Volleyball.svg";

import Heart from "../assets/Heart.svg";

export const theme = {
  baseColors: {
    red: "#FF1C1C",
    green: "#24FF1C",
    yellow: "#ECFF1C",
    blue: "#1C37FF",
    orange: "#FFA81C",
    pink: "#FF1CEC"
  },
  highlightColor: "#ffffff",
  sizes: {
    s: "2rem",
    m: "4rem",
    l: "6rem",
    xl: "8rem"
  },
  margin: {
    small: ".5rem",
    medium: "1rem",
    large: "2rem"
  },
  borderRadius: "100%",
  borderSpacing: "0.5rem",
  darkShadowColor: "rgba(93, 93, 93, 0.6)",
  shadows: {
    singleButton: "0px 2px 6px"
  },
  images: {
    skull: Skull,
    dynamite: Dynamite,
    bomb: Bomb,
    biohazard: Biohazard,
    tennis: Tennis,
    soccer: Soccer,
    football: Football,
    basketball: Basketball,
    volleyball: Volleyball,
    heart: Heart
  }
};
