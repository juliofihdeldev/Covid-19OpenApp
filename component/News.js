import React, { useState, useEffect } from 'react';
import { View, Stylesheet, Text, Button, FlatList } from 'react-native';
import NewsCard from './NewsCard';
import NewsAPI from '../utils/News';
import {ActivityIndicator, Colors} from 'react-native-paper'

const News = ({ navigation }) => {
	const [loading, setLoading] = useState(false)
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
				setLoading(true)
				setNews(response.data);
				setLoading(false)
			})
			.catch(function(error) {
				setLoading(true)
				alert('Please check your internet connection',error)
				console.log(error);
				// setLoading(false)
			});
	}

	if (!news) {
		return null;
	}

	return (
		<View>
		<ActivityIndicator animating={loading} color={Colors.black} style={{alignItems:'center'}} />
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
