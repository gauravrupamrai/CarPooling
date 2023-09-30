import React from 'react';

const BookedCar = ({ bookedCarData }) => {
  return (
    <div>
      {bookedCarData && (
        <>
          <h5>Booked Car Details</h5>
          <p>Driver Name: {bookedCarData.driverName}</p>
          <p>Car Number: {bookedCarData.driver_car_id}</p>
          <p>Drive From: {bookedCarData.driveFrom}</p>
          <p>Drive To: {bookedCarData.driveTo}</p>
          <p>Drive Time: {bookedCarData.driveStartTime}</p>
          <p>Number of Seats: {bookedCarData.noSeats}</p>
        </>
      )}
    </div>
  );
};

export default BookedCar;