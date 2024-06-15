// if (process.env.NODE_ENV === 'development') {
//     BaseUrl = 'http://localhost:5050';
//   } 
//   else {
//     BaseUrl = 'https://spiffy.azurewebsites.net/';
//   }

const BaseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:5050' : 'https://spiffy.azurewebsites.net/';

export default BaseUrl;

