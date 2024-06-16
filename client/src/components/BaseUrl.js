// This file is used to set the base url for the API calls.
const BaseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:5050' : 'https://spiffy.azurewebsites.net/';

export default BaseUrl;

