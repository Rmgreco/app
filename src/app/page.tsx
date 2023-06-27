'use client'

import { setInicialCity } from "./redux/weatherSlice";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { useGetWeatherQuery } from "./redux/services/weatherApi";
import WeatherCard from "./components/weatherCard";
import { useEffect, useState } from "react";
import { TextField, Button, Grid } from "@mui/material";
import Form from "./components/form";
import Link from "next/link";
import FavoriteWeatherCard from "./components/favoriteCard";

export default function Home() {

    // useEffect(() => {
  //   if ('geolocation' in navigator) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         const latitude = position.coords.latitude;
  //         const longitude = position.coords.longitude;

  //         fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=23d23199932041c5a9f9ce2abef4678c`)
  //           .then((response) => response.json())
  //           .then((data) => {
  //             const city = data.results[0].components.city;
  //             setCurrentCity(city); // Atualiza a cidade atual
  //           })
  //           .catch((error) => {
  //             console.error("Erro ao obter a cidade atual:", error);
  //           });
  //       },
  //       (error) => {
  //         console.error('Erro ao obter a localização:', error);
  //       }
  //     );
  //   } else {
  //     console.error('Geolocalização não é suportada no navegador.');
  //   }
  // }, []);
  const dispatch = useAppDispatch();
  const name = useAppSelector((state) => state.weatherReducer.weatherApi.name);
  const main = useAppSelector((state) => state.weatherReducer.weatherApi.main);
  const weather = useAppSelector((state) => state.weatherReducer.weatherApi.weather);
  const fav = useAppSelector((state) => state.weatherReducer.favoriteCities);
  console.log(fav);

  
  const [currentCity, setCurrentCity] = useState('belo horizonte');

  const handleSubmit = (city: string) => {
    setCurrentCity(city);
  };

  const { isLoading, isFetching, data, error } = useGetWeatherQuery(currentCity);

  useEffect(() => {
    if (data) {
      dispatch(setInicialCity(data));
    }
  }, [data, dispatch]);

  return (
    <main style={{ maxWidth: 1200, marginInline: "auto", padding: 20 }}>
      {isLoading || isFetching ? (
        <p>Loading...</p>
      ) : data ? (
        <div style={{ marginBottom: "4rem", textAlign: "center" }}>
          <Form onSubmit={handleSubmit} />
          <WeatherCard name={name} main={main} weather={weather} />
          {fav.map((city) => (
            <FavoriteWeatherCard key={city} currentCity={city} />
          ))}
          <Link href="/favorites">Favorites</Link>
        </div>
      ) : null}
    </main>
  );
}
