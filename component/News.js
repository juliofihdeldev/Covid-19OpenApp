import React, { useState, useEffect } from 'react';
import { View, Stylesheet, Text, Button, FlatList } from 'react-native';
import NewsCard from './NewsCard';
import NewsAPI from '../utils/News';

const News = ({ navigation }) => {
	const [ news, setNews ] = useState([]);
	useEffect(() => {
		getNewsFromAPI();
	}, []);

	// const newsResponse = async () => {
	// 	const response = await NewsAPI.get('top-headlines?country=us&apiKey=650562ae616b4291a7ed6325d4cf0898');
	// 	console.log(response.data);
	// };

	function getNewsFromAPI() {
		NewsAPI.get('top-headlines?country=us&apiKey=650562ae616b4291a7ed6325d4cf0898')
			.then(function(response) {
				setNews(response.data);
			})
			.catch(function(error) {
				console.log(error);
			});
	}

	if (!news) {
		return null;
	}

	return (
		<View>
			<FlatList
				data={news.articles}
				keyExtractor={(item, index) => 'key' + index}
				renderItem={({ item }) => {
					return <NewsCard item={item} />;
				}}
			/>
		</View>
	);
};

export default News;
