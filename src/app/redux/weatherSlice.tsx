import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WeatherCardProps } from "../components/weatherCard";

export interface WeatherProps {
  weatherApi: {
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
  };
  favoriteCities: string[];
  searchHistory: string[];
}

const initialState: WeatherProps = {
  weatherApi: {
    name: "",
    main: {
      temp: 0,
      feels_like: 0,
      temp_min: 0,
      temp_max: 0,
      pressure: 0,
      humidity: 0,
    },
    weather: [
      {
        main: "",
        description: "",
        icon: "",
      },
    ],
  },
  favoriteCities: [],
  searchHistory: [],
};

export const weather = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setInicialCity: (state, action: PayloadAction<WeatherCardProps>) => {
      state.weatherApi = action.payload;
    },

    toggleFavorite: (state, action: PayloadAction<string>) => {
      const cityName = action.payload;
      const index = state.favoriteCities.indexOf(cityName);
      if (index === -1) {
        // Se a cidade não estiver na lista de favoritos, adicionar
        state.favoriteCities.push(cityName);
      } else {
        // Se a cidade estiver na lista de favoritos, remover
        state.favoriteCities.splice(index, 1);
      }
    },

    addToSearchHistory: (state, action: PayloadAction<string>) => {
      const cityName = action.payload;
      state.searchHistory.push(cityName);
    },

    clearSearchHistory: (state) => {
      state.searchHistory = [];
    },
  },
});

export const { setInicialCity, toggleFavorite, addToSearchHistory, clearSearchHistory } = weather.actions;
export default weather.reducer;
