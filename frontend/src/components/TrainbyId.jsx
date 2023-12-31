import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Typography, Paper, Grid, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';

function TrainbyId() {
  const { trainId } = useParams();
  const [train, setTrain] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/singleTrain/train/trains/${trainId}`)
      .then((response) => {
        setTrain(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching train data:', error);
      });
  }, [trainId]);

  return (
    <Container maxWidth="md" style={{ marginTop: '20px' }}>
    {train ? (
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Typography variant="h4" component="h1" gutterBottom style={{ color: '#FFFTTT' }}>
          Single Train Schedule
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" component="h2">
              Train Name: {train.trainName}
            </Typography>
            <Typography variant="body1">Train Number: {train.trainNumber}</Typography>
            <Typography variant="body1">Departure Time: {`${train.departureTime.Hours}:${train.departureTime.Minutes} AM`}</Typography>
            <Typography variant="body1">Delay: {train.delayedBy} minutes</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" component="h2">
              Price Details
            </Typography>
            <Typography variant="body1">Price (Sleeper): Rs. {train.price.sleeper}</Typography>
            <Typography variant="body1">Price (AC): Rs. {train.price.AC}</Typography>
            <Typography variant="body1">Seats Available (Sleeper): {train.seatsAvailable.sleeper}</Typography>
            <Typography variant="body1">Seats Available (AC): {train.seatsAvailable.AC}</Typography>
          </Grid>
        </Grid>
        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
          <Button component={Link} to="/all-trains" variant="contained" color="primary" style={{ marginRight: '10px' }}>
            Back to All Trains
          </Button>
          <Button variant="contained" color="secondary">
            Book Now
          </Button>
        </div>
      </Paper>
    ) : (
      <Typography variant="h5" component="h2" style={{ textAlign: 'center', marginTop: '50px' }}>
        Loading...
      </Typography>
    )}
  </Container>
  );
}

export default TrainbyId;
