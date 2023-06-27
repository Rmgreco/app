import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, IconButton } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { setInicialCity, toggleFavorite } from '../redux/weatherSlice';
import { RootState } from '../redux/store';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { useGetWeatherQuery } from '../redux/services/weatherApi';

export interface FavoriteWeatherCardProps {
    currentCity: string
}

const FavoriteWeatherCard: React.FC<FavoriteWeatherCardProps> = ({ currentCity }) => {
    const dispatch = useAppDispatch();
    const fav = useAppSelector((state) => state.weatherReducer.favoriteCities);


    const { isLoading, isFetching, data, error } = useGetWeatherQuery(currentCity);
    let name = "";
    let temp = 0;
    if (data) name = data?.name
    if (data) temp = data?.main.temp

    const favoriteCities = useSelector((state: RootState) => state.weatherReducer.favoriteCities);
    const isFavorite = favoriteCities.includes(name);

    const handleToggleFavorite = () => {
        dispatch(toggleFavorite(name));
    };

    return (
        <Card id="weather-card">
            <CardContent>
                {/* <img src={`http://openweathermap.org/img/w/${icon}.png`} alt="Weather Icon" /> */}
                <Typography variant="h6">{name}</Typography>
                {temp && <Typography variant="h4">{(temp / 10).toFixed(1)}°C</Typography>}
                <IconButton onClick={handleToggleFavorite}>
                    {isFavorite ? <Favorite /> : <FavoriteBorder />}
                </IconButton>
            </CardContent>
        </Card>
    );
};

export default FavoriteWeatherCard;
