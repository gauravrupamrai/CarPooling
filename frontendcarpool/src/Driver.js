import React, {useState} from "react";
import axios from 'axios';


const driverUrl = "https://np9i32r1u6.execute-api.eu-west-1.amazonaws.com/dev/driver_details"

const Driver = () => {
    
    const [driver_car_id, setDriverCarId] = useState('');
    const [licenseNo, setLicenseNo] = useState('');
    const [driverName, setDriverName] = useState('');
    const [driveFrom, setDriveFrom] = useState('');
    const [driveTo, setDriveTo] = useState('');
    const [driveStartTime, setDriveStartTime] = useState('');
    const [noSeats, setNoSeats] = useState('');
    const [message, setMessage] = useState(null);

    const submitHandler = (event) => {
        event.preventDefault();
        if(driver_car_id.trim() === '' || licenseNo.trim() === '' || driverName.trim() === '' || driveFrom.trim() === '' || driveTo.trim() === '' || driveStartTime.trim() === '' || noSeats.trim() === ''){
            setMessage('All fields are required');
            return;
        }
        
        const requestConfig = {
            headers: {
                'x-api-key': 'Ci5Sn4VS9D1aSjWCH5D5a8Bdre0VHigd2UHo9xvw'
            }
        }

        const requestBody = {
            driver_car_id : driver_car_id,
            licenseNo : licenseNo,
            driverName : driverName,
            driveFrom : driveFrom,
            driveTo : driveTo,
            driveStartTime : driveStartTime,
            noSeats : noSeats
        }

        axios.post(driverUrl, requestBody, requestConfig).then(response => {
            setMessage('Registration Successful');
        }).catch(error => {
            if (error.response.status === 401){
                setMessage(error.response.data.message);
            } else {
                setMessage('sorry.... The backend server is down');
            }
        })
    }

    return (
        <div className="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                        Register Your Car
                    </h2>
                </div>
            <form className="mt-8 space-y-6" onSubmit={submitHandler}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
                <div>
                    <label htmlFor="carNo"className="sr-only">Car No.</label>
                    <input 
                    id="carNo" 
                    type="text" 
                    className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                    value={driver_car_id} 
                    onChange={event => setDriverCarId(event.target.value)}
                    placeholder=" Enter Car Number"
                    required
                    />
                </div>
                <div>
                <label htmlFor="driverLicenseNo"className="sr-only">Driver License No.</label>
                    <input 
                    id="driverLicenseNo" 
                    type="text" 
                    className="relative block w-full border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                    value={licenseNo} 
                    onChange={event => setLicenseNo(event.target.value)}
                    placeholder=" Enter Driver License Number"
                    required
                    />
                </div>
                <div>
                <label htmlFor="driverName"className="sr-only">Driver Name</label>
                    <input 
                    id="driverName" 
                    type="text" 
                    className="relative block w-full border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                    value={driverName} 
                    onChange={event => setDriverName(event.target.value)}
                    placeholder=" Enter Driver Name"
                    required
                    />
                </div>
                <div>
                <label htmlFor="driveFrom"className="sr-only">Drive From</label>
                    <input 
                    id="driveFrom" 
                    type="text" 
                    className="relative block w-full border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                    value={driveFrom} 
                    onChange={event => setDriveFrom(event.target.value)}
                    placeholder=" Enter Starting Point"
                    required
                    />
                </div>
                <div>
                <label htmlFor="driveTo"className="sr-only">Drive To</label>
                    <input 
                    id="driveTo" 
                    type="text" 
                    className="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
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
                    placeholder=" Enter Number of seats available"
                    required
                    />
                </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add Your Car
              </button>
              </div>
            </form>
            {message && <p className="message">{message}</p>}
            </div>
        </div>
    )
}

export default Driver;