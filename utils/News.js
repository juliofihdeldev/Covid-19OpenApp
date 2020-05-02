import axios from 'axios';

export default axios.create({
	baseURL: 'https://newsapi.org/v2/'
});

//https://newsapi.org/v2/top-headlines?country=us&apiKey=650562ae616b4291a7ed6325d4cf0898
