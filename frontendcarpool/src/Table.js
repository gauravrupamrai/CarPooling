import React from "react";

function Table(props) {
    const { data, onBookClick } = props;

  return (
    <div class="max-w-2xl mx-auto">
      <div class="flex flex-col">
        <div class="inline-block min-w-full align-middle">
          <div class="overflow-hidden ">
    <table class="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
      <thead class="bg-gray-100 dark:bg-gray-700">
        <tr>
          
          <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">Drive From</th>
          <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">Drive To</th>
          <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">Drive Start Time</th>
          <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">No of Seats</th>
          <th scope="col" class="p-4">
            <span class="sr-only">Book</span>
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
        {data && data.map((row) => (
          <tr class="hover:bg-gray-100 dark:hover:bg-gray-700" key={row.driver_car_id}>
            <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{row.driveFrom}</td>
            <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{row.driveTo}</td>
            <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{row.driveStartTime}</td>
            <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{row.noSeats}</td>
            <td class="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
              {row.bookStatus === false && ( // Show the button only if the status is "Available"
                <button 
                className="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" 
                onClick={() => onBookClick(row)}>Book</button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
    </div>
    </div>
    </div>
  );
}

export default Table;