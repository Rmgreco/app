import React from 'react';
import { Card, CardContent, Typography, IconButton } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../redux/weatherSlice';
import { RootState } from '../redux/store';

export interface WeatherCardProps {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  weather: {
    main: string;
    description: string;
    icon: string;
  }[];
}

const WeatherCard: React.FC<WeatherCardProps> = ({ name, main, weather }) => {

  
  const { temp } = main;
  const { main: weatherMain, description, icon } = weather[0];

  const dispatch = useDispatch();
  const favoriteCities = useSelector((state: RootState) => state.weatherReducer.favoriteCities);
  const isFavorite = favoriteCities.includes(name);

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(name));
  };

  return (
    <Card id="weather-card">
      <CardContent>
        <img src={`http://openweathermap.org/img/w/${icon}.png`} alt="Weather Icon" />
        <Typography variant="h6">{name}</Typography>
        <Typography variant="h4">{(temp / 10).toFixed(1)}°C</Typography>
        <Typography variant="subtitle1">{description}</Typography>
        <IconButton onClick={handleToggleFavorite}>
          {isFavorite ? <Favorite /> : <FavoriteBorder />}
        </IconButton>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
