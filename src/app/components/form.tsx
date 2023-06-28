import React, { useState } from "react";
import { TextField, Button, Grid } from "@mui/material";

interface FormProps {
  onSubmit: (city: string) => void;
}

const Form: React.FC<FormProps> = ({ onSubmit }) => {
  const [inputCity, setInputCity] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(inputCity);
    setInputCity("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={9}>
          <TextField
            label="Enter a city"
            value={inputCity}
            onChange={(e) => setInputCity(e.target.value)}
            fullWidth
            data-testid="form"
          />
        </Grid>
        <Grid item xs={3}>
          <Button variant="contained" type="submit" fullWidth>
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default Form;
