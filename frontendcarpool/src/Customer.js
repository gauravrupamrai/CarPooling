import React, {useState} from "react";
import axios from 'axios';
import Table from "./Table";

const customerUrl = "https://np9i32r1u6.execute-api.eu-west-1.amazonaws.com/dev/customer_update"

const Customer = () => {

    const [driveFrom, setDriveFrom] = useState('');
    const [driveTo, setDriveTo] = useState('');
    const [driveStartTime, setDriveStartTime] = useState('');
    const [noSeats, setNoSeats] = useState('');
    const [message, setMessage] = useState(null);
    const [carData, setCarData] = useState([]);
    const [bookedCar, setBookedCar] = useState([]);
    const [showBookedCarDetails, setShowBookedCarDetails] = useState(false);
  


    const submitHandler = (event) => {
        event.preventDefault();
        if(driveFrom.trim() === '' || driveTo.trim() === '' || driveStartTime.trim() === '' || noSeats.trim() === ''){
            setMessage('All fields are required');
            return;
        }
        
        const requestConfig = {
            headers: {
                'x-api-key': 'Ci5Sn4VS9D1aSjWCH5D5a8Bdre0VHigd2UHo9xvw'
            }
        }

        const requestBody = {
            driveFrom : driveFrom,
            driveTo : driveTo,
            driveTime : driveStartTime,
            seatReq : noSeats
        }

        axios.post(customerUrl, requestBody, requestConfig).then(response => {
            const carData = response.data;
            setCarData(carData);
        }).catch(error => {
            if (error.response.status === 401){
                setMessage('error.response.data.message');
            } else {
                setMessage(error.response.data.message);
            }
        });

        setBookedCar(null);
        setShowBookedCarDetails(false);
    };

    const bookHandler = (row) => {
        const requestConfig = {
          headers: {
            "x-api-key": "Ci5Sn4VS9D1aSjWCH5D5a8Bdre0VHigd2UHo9xvw",
          },
        };
    
        const requestBody = {
          driver_car_id: row.driver_car_id,
        };
    
        axios.patch(customerUrl, requestBody, requestConfig).then((response) => {
          console.log("Response Data: ", response.data);
          let updatedValue = {};
          updatedValue = response.data;
          setBookedCar(bookedCar => ({
            ...bookedCar,
            ...updatedValue
          }));          
          console.log("Booked Car Data:", bookedCar);
          setShowBookedCarDetails(true);
          setCarData([]);
          setDriveFrom("");
          setDriveTo("");
          setDriveStartTime("");
          setNoSeats("");
          })
          .catch((error) => {
            setMessage(error.response.data.message);
          });
      };

      const resetForm = () => {
        setBookedCar(null);
        setShowBookedCarDetails(false);
        setCarData([]);
      };

      return (
        <div className="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-8">
          <div>
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                        Book a car
                    </h2>
                </div>
          <form className="mt-8 space-y-6" onSubmit={submitHandler}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="-space-y-px rounded-md shadow-sm">
          <div>
                <label htmlFor="driveFrom"className="sr-only">Drive From</label>
                    <input 
                    id="driveFrom" 
                    type="text" 
                    className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                    value={driveFrom} 
                    onChange={(event) => setDriveFrom(event.target.value)}
                    placeholder=" Enter Starting Point"
                    required
                    />
                </div>
                <div>
                <label htmlFor="driveTo"className="sr-only">Drive To</label>
                    <input 
                    id="driveTo" 
                    type="text" 
                    className="relative block w-full border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                    value={driveTo} 
                    onChange={event => setDriveTo(event.target.value)}
                    placeholder=" Enter Ending Point"
                    required
                    />
                </div>
                <div>
                <label htmlFor="driveStartTime"className="sr-only">Drive Start Time</label>
                    <input 
                    id="driveStartTime" 
                    type="text" 
                    className="relative block w-full border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                    value={driveStartTime} 
                    onChange={event => setDriveStartTime(event.target.value)}
                    placeholder=" Enter trip Start Time"
                    required
                    />
                </div>
                <div>
                <label htmlFor="noSeats"className="sr-only">Number of seats</label>
                    <input 
                    id="noSeats" 
                    type="text" 
                    className="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                    value={noSeats} 
                    onChange={event => setNoSeats(event.target.value)}
                    placeholder=" Enter Number of seats required"
                    required
                    />
                </div>
          
          </div>
          <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Book your car
              </button>
              </div>
          </form>
          {message && <p className="message">{message}</p>}
          {Array.isArray(carData) && carData.length > 0 && (
            <Table data={carData} onBookClick={bookHandler} />
          )}
          {showBookedCarDetails && bookedCar && (
            <div className="overflow-hidden bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-base font-semibold leading-6 text-gray-900">Booked Car Details</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">Below car is booked for you and following are the details</p>
              </div>
              <div className="border-t border-gray-200">
              <dl>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Drivers Name</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{bookedCar.Attributes.driverName}</dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Car Number</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{bookedCar.Attributes.driver_car_id}</dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">PickUp Location</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{bookedCar.Attributes.driveFrom}</dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Drop Location</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{bookedCar.Attributes.driveTo}</dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Pickup Time</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{bookedCar.Attributes.driveStartTime}</dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Seats Available</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{bookedCar.Attributes.noSeats}</dd>
                </div>
              </dl>
              </div>
              <button 
              className="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={resetForm}>Book Another Car</button>
            </div>
      )}
          </div> 
        </div>
      );
    
}

export default Customer;