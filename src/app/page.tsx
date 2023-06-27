'use client'

import { styled } from "@mui/system";
import { Button, Typography, List, ListItem } from "@mui/material";
import { setInicialCity, addToSearchHistory } from "./redux/weatherSlice";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { useGetWeatherQuery } from "./redux/services/weatherApi";
import WeatherCard from "./components/weatherCard";
import { useEffect, useState } from "react";
import Form from "./components/form";
import FavoriteWeatherCard from "./components/favoriteCard";

const MainContainer = styled("main")`
  max-width: 1200px;
  margin-inline: auto;
  padding: 20px;
`;

const LoadingText = styled(Typography)`
  margin-top: 20px;
  margin-bottom: 20px;
  color: gray;
`;

const ContentContainer = styled("div")`
  margin-bottom: 4rem;
  text-align: center;
`;

const FavoritesContainer = styled("div")`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
`;

const HistoryContainer = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HistoryTitle = styled(Typography)`
  margin-top: 20px;
  margin-bottom: 20px;
  color: gray;
`;

const StyledButton = styled(Button)`
  && {
    display: block;
    margin-bottom: 10px;
  }
`;

export default function Home() {
  const dispatch = useAppDispatch();
  const name = useAppSelector((state) => state.weatherReducer.weatherApi.name);
  const main = useAppSelector((state) => state.weatherReducer.weatherApi.main);
  const weather = useAppSelector((state) => state.weatherReducer.weatherApi.weather);
  const fav = useAppSelector((state) => state.weatherReducer.favoriteCities);
  const searchHistory = useAppSelector((state) => state.weatherReducer.searchHistory);
  const [currentCity, setCurrentCity] = useState('belo horizonte');

  const handleSubmit = (city: string) => {
    setCurrentCity(city);
  };

  const { isLoading, isFetching, data, error } = useGetWeatherQuery(currentCity);

  useEffect(() => {
    if (data) {
      dispatch(setInicialCity(data));
      if (!searchHistory.includes(currentCity)) {
        dispatch(addToSearchHistory(currentCity));
      }
    }
  }, [data, dispatch, currentCity, searchHistory]);

  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <MainContainer>
      {isLoading || isFetching ? (
        <LoadingText variant="h3">Loading...</LoadingText>
      ) : data ? (
        <ContentContainer>
          <Form onSubmit={handleSubmit} />
          <WeatherCard name={name} main={main} weather={weather} />
          <Typography mt={"20px"} mb={"20px"} color={"gray"} variant="h3">
            Favorites
          </Typography>
          <FavoritesContainer>
            {fav.length > 1 ? fav.map((city) => (
              <FavoriteWeatherCard key={city} currentCity={city} />
            )):
            <Typography mt={"20px"} mb={"20px"} color={"gray"} variant="subtitle2">
            No favorite cities
          </Typography>
            }
          </FavoritesContainer>
          <HistoryContainer>
            <HistoryTitle variant="h3">History</HistoryTitle>
            <List>
              {searchHistory.map((city) => (
                <StyledButton
                  key={city}
                  onClick={() => setCurrentCity(city)}
                >
                  <Typography>{capitalize(city)}</Typography>
                </StyledButton>
              ))}
            </List>
          </HistoryContainer>
        </ContentContainer>
      ) : null}
    </MainContainer>
  );
}
