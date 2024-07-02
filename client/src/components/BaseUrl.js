// This file is used to set the base url for the API calls.
export const BaseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:5050' : 'https://spiffy.azurewebsites.net/';

// This file is used to set the base url for the frontend.
export const FrontendUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:5173' : 'https://spiffy.azurewebsites.net/';



