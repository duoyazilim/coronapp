import React, { Component } from 'react';
import {StyleSheet,Button ,Text, View, Dimensions, Image, TouchableOpacity, ScrollView, ActivityIndicator} from 'react-native';
import {f,firestore} from "../config";
import {FlatList} from 'react-navigation';
const width = Dimensions.get('window').width;

export default class Notice extends Component {

	constructor() {
		super();
		this.state = {
			check:[],
			refreshing: false,
			checkImage:'',
			loading:true
		};
	}
	componentDidMount(): void {
		this.getNotice()
	}

	getNotice() {
		let that = this;
		let allTokens = [];

		firestore.collection("check").orderBy("time", 'desc').limit(5).get().then(function(snap) {
			snap.forEach(function(doc) {
				allTokens.push(doc.data());
			});
			let last = snap.docs[snap.docs.length - 1];
			that.setState({
				check:allTokens,
				last,
				refreshing:false,
				loading:false
			});

		})
		this.setState({refreshing:false,loading:false})
	}

	loadMore = () => {
		let self = this;
		let allTokens = [];

		try {
			firestore.collection("check").orderBy("time", 'desc').startAfter(this.state.last).limit(5).get().then(function(snap) {
				snap.forEach(function(doc) {
					allTokens.push(doc.data());
				});
				let last = snap.docs[snap.docs.length - 1];
				self.setState({
					check: [...self.state.check, ...allTokens],
					last,
					loading:false
				})

			})
		}
		catch(e){
			this.setState({refreshing:false,loading:false})
		}
		this.setState({refreshing:false,loading:false})

	};

	onRefresh = () => {
		this.setState({
			refreshing: true,
		}, () => {
			this.getNotice();

		});
	};

	renderFooter = () => {
		if (!this.state.loading) {
			return null;
		}
		return (
			<View style={{marginBottom: 30}}>
				<ActivityIndicator color={'#235647'} size={"large"}/>
			</View>
		);
	};


	renderNotice = ({item}) => {
const itemId = item.docId
		return (
			<TouchableOpacity
				onPress={() => {
					this.props.navigation.navigate('CheckDetail', {itemId
					});
				}}
			>
				<View style={styles.card}>
					{item.imageLink==='' ? null : <Image
						style={styles.image}
						source={{uri: item.imageLink}}
					/>}
					<Text style={styles.detailText}>{item.title}</Text>
				</View>
			</TouchableOpacity>
		);
	};

	render() {
		return (
				<View style={styles.container}>
					<FlatList
						renderItem={this.renderNotice}
						numColumns={2}
						contentContainerStyle={styles.flatList}
						data={this.state.check}
						ListFooterComponent={this.renderFooter}
						onEndReached={this.loadMore}
						keyExtractor={(item, index) => item.key}
						onEndReachedThreshold={0.9}
						refreshing={this.state.refreshing}
						onRefresh={this.onRefresh}
					/>
				</View>
		);
	}
}

const styles = StyleSheet.create({
	container:{
		flex:1,
	},
	card:{
		width:(width/2)-10,
		backgroundColor:'#388a72',
		borderRadius:10,
		margin:5,
	},
	flatList:{
		justifyContent: 'center',
		alignItems:'center',
	},
	image:{
		borderTopRightRadius:10,
		borderTopLeftRadius:10,
		height:200,
		width:(width/2)-10,
		alignSelf:'center'
	},
	header:{
		marginHorizontal:10,
		marginTop:5,
		fontWeight:'bold',
		fontSize:20,
	},
	detailText:{
		textAlign:'center',
		margin:7,
		color:'#fff',
		fontSize:14,
	},
});
