'use client'
import { setInicialCity } from "../redux/weatherSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useGetWeatherQuery } from "../redux/services/weatherApi";
import WeatherCard from "../components/weatherCard";
import { useEffect } from "react";
import Link from "next/link";
import { store } from "../redux/store";


export default function Home() {
    const dispatch = useAppDispatch();
    const name = useAppSelector((state) => state.weatherReducer.weatherApi.name);
    const main = useAppSelector((state) => state.weatherReducer.weatherApi.main);
    const weather = useAppSelector((state) => state.weatherReducer.weatherApi.weather);
    


    let { isLoading, isFetching, data, error } = useGetWeatherQuery("são joão");
    
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
                    <WeatherCard name={name} main={main} weather={weather} />
                    <Link href="/">home</Link>
                </div>
            ) : null}
        </main>
    );
}
