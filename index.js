const driverService = require('./service/driver');
const customerService = require('./service/customer');
const util = require('./utils/util');

const healthPath = '/health';
const driverPath = '/driver_details';
const customerPath = '/customer_update';

exports.handler = async (event) => {
    console.log('Request Event: ', event);
    
    let response;
    
    switch (true) {
        
        case event.httpMethod === 'GET' && event.path === healthPath:
            response = util.buildResponse(200);
            break;
        case event.httpMethod === 'POST' && event.path === driverPath:
            const driverBody = JSON.parse(event.body);
            response = await driverService.driveDetails(driverBody);
            break;
        case event.httpMethod === 'POST' && event.path === customerPath:
            const customerBody = JSON.parse(event.body);
            response = await customerService.carAvailable(customerBody);
            break;
        case event.httpMethod === 'PATCH' && event.path === customerPath:
            const requestBody = JSON.parse(event.body);
            console.log(requestBody);
            response = await customerService.modifyCarStatus(requestBody.driver_car_id, requestBody.updateKey, requestBody.updateValue);
            break;
        default:
            response = util.buildResponse(404, '404 Not Found');
    }
    return response;
};