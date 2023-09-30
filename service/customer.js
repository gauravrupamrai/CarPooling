const AWS = require('aws-sdk');
AWS.config.update({
    region: 'eu-west-1'
});

const util = require('../utils/util')

const dynamodb = new AWS.DynamoDB.DocumentClient();
const dynamodbTableName = 'drivers_table';
const bookStatus = false;

async function carAvailable(routeInfo){
    const driveFrom = routeInfo.driveFrom;
    const driveTo = routeInfo.driveTo;
    const driveTime = routeInfo.driveTime;
    const seatReq = routeInfo.seatReq;
    if(!driveFrom || !driveTo || !driveTime || !seatReq) {
        return util.buildResponse(401, {
            message : 'All fields are mandatory to search available cars'
        });
    }

    const params = {
        TableName: dynamodbTableName,
        FilterExpression: 'driveFrom = :driveFrom AND driveTo = :driveTo AND driveStartTime = :driveTime AND noSeats >= :seatReq AND bookStatus = :bookStatus',
        ExpressionAttributeValues: {
          ':driveFrom': driveFrom,
          ':driveTo': driveTo,
          ':driveTime': driveTime,
          ':seatReq': seatReq,
          ':bookStatus': bookStatus
        }
    };
      
    try {
        const data = await dynamodb.scan(params).promise();
        if (data.Count === 0) {
          return util.buildResponse(404, {
            message: 'No available cars found for the given search criteria'
          });
        }
        return util.buildResponse(200, data.Items);
    } catch (err) {
        return util.buildResponse(500, {
          message: 'Error fetching available cars: ' + err.message
        });
    }
}

async function modifyCarStatus(driver_car_id, updateKey, updateValue){
    const params = {
      TableName: dynamodbTableName,
      Key: {
          'driver_car_id': driver_car_id
      },
      UpdateExpression: `set ${updateKey} = :value`,
      ExpressionAttributeValues: {
          ':value': updateValue
      },
      ReturnValues: 'UPDATED_NEW'
  };

  try {
    const updatedData = await dynamodb.update(params).promise();
    return util.buildResponse(200, updatedData);
  } catch (err) {
    return util.buildResponse(500, {
      message: 'Error updating car status: ' + err.message
    });
  }



}

module.exports.carAvailable = carAvailable;
module.exports.modifyCarStatus = modifyCarStatus;