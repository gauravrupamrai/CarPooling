const AWS = require('aws-sdk');
AWS.config.update({
    region: 'eu-west-1'
});

const util = require('../utils/util')

const dynamodb = new AWS.DynamoDB.DocumentClient();
const dynamodbTableName = 'drivers_table';
const bookStatus = false;

async function driveDetails(routeInfo){
    const driver_car_id = routeInfo.driver_car_id;
    const licenseNo = routeInfo.licenseNo;
    const driverName = routeInfo.driverName;
    const driveFrom = routeInfo.driveFrom;
    const driveTo = routeInfo.driveTo;
    const driveStartTime = routeInfo.driveStartTime;
    const noSeats = routeInfo.noSeats;

    if(!driver_car_id || !licenseNo || !driverName || !driveFrom || !driveTo || !driveStartTime || !noSeats){
        return util.buildResponse(401,{
            message: 'All fields are required'
        })
    }

    const dynamoCarNo = await getCarNo(driver_car_id);
    if(dynamoCarNo && dynamoCarNo.driver_car_id){
        return util.buildResponse(401,{
            message: 'This car already exists in our database. Please verify'
        })
    }

    const drive = {
        driver_car_id : driver_car_id,
        licenseNo : licenseNo,
        driverName : driverName,
        driveFrom : driveFrom,
        driveTo : driveTo,
        driveStartTime : driveStartTime,
        noSeats : noSeats,
        bookStatus : bookStatus
    }

    const driveUpdateResponse = await driveUpdate(drive);

    if(!driveUpdateResponse){
        return util.buildResponse(503, {message: 'Server Error. Please try again later'});
    }

    return util.buildResponse(200, { driver_car_id : driver_car_id});

}

async function getCarNo(driver_car_id){
    const params = {
        TableName: dynamodbTableName,
        Key: {
            driver_car_id: driver_car_id
        }
    }

    return await dynamodb.get(params).promise().then(response => {
        return response.Item;
    }, error => {
        console.error('There is an error in getting drive details:', error);
    })
}

async function driveUpdate(drive){
    const params = {
        TableName: dynamodbTableName,
        Item: drive
    }
    return await dynamodb.put(params).promise().then(() => {
        return true;
    }).catch(error => {
        console.error('There is an error saving drive details: ', error);
        return false;
    });
}

module.exports.driveDetails = driveDetails;