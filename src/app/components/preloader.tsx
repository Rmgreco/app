"use client";

import { useRef } from "react";
import { store } from "../redux/store";
import { WeatherProps, setInicialCity } from "../redux/weatherSlice";

import { WeatherCardProps } from "./weatherCard";

function Preloader({ weather }: { weather: WeatherProps }) {
  const loaded = useRef(false);
  if (!loaded.current) {
    store.dispatch(setInicialCity(weather));
    loaded.current = true;
  }

  return null;
}

export default Preloader;