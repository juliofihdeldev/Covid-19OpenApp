import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Button, FlatList } from 'react-native';
import NewsCard from './NewsCard';
import NewsAPI from '../utils/News';
import {ActivityIndicator, Colors} from 'react-native-paper';
import { Searchbar } from 'react-native-paper';

const News = ({ navigation }) => {
	// searchQuery: ''
	const [loading, setLoading] = useState(false)
	const [ news, setNews ] = useState([]);
	const [query, setQuery] = useState('');
	useEffect(() => {
		getNewsFromAPI();
	}, []);

	// const newsResponse = async () => {
	// 	const response = await NewsAPI.get('top-headlines?country=us&apiKey=650562ae616b4291a7ed6325d4cf0898');
	// 	console.log(response.data);
	// };

	_onChangeSearch = query => this.setState({ searchQuery: query });

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
		<Searchbar style={styles.searchBar}
                            theme=""
                            placeholder="Search"
                            onChangeText={this._onChangeSearch}
                            value={query}
                        />
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

const styles = StyleSheet.create({
	
    searchBar: {
        marginLeft: 10,
        marginRight: 10,
    }
});


export default News;
