import React, { Component } from 'react';
import { StyleSheet, Text, View,Dimensions,Image,TouchableOpacity,ScrollView,Linking} from 'react-native';
import {f,firestore} from "../config";
import {FlatList} from 'react-navigation';
const width = Dimensions.get('window').width;

export default class Notice extends Component {

	constructor() {
		super();
		this.state = {
			userNotice:[],
			refreshing: false,
			userNoticeImage:'',
		};
	}
	componentDidMount(): void {
		this.getNotice()
	}

	getNotice() {
		let that = this;
		let allTokens = [];

		firestore.collection("userNotice").orderBy("time", 'desc').limit(1).onSnapshot(function(snap) {
			snap.forEach(function(doc) {
				allTokens.push(doc.data());
			});
			let last = snap.docs[snap.docs.length - 1];
			that.setState({
				userNotice:allTokens,
				last,
				refreshing:false,
			});

		})
	}

	loadMore = () => {
		let self = this;
		let allTokens = [];

		try {
			firestore.collection("userNotice").orderBy("time", 'desc').startAfter(this.state.last).limit(1).onSnapshot(function(snap) {
				snap.forEach(function(doc) {
					allTokens.push(doc.data());
				});
				let last = snap.docs[snap.docs.length - 1];
				self.setState({
					userNotice: [...self.state.userNotice, ...allTokens],
					last,
				})

			})
		}
		catch(e){
		}
	}

	onRefresh = () => {
		this.setState({
			refreshing: true,
		}, () => {
			this.getNews();

		});
	};

	renderNotice = ({item}) => {

		return (
			<View style={styles.card}>
				{item.imageLink==='' ? null : <TouchableOpacity
				onPress={()=>{ Linking.openURL(item.imageLink); }}
				>
					<Image
						style={styles.image}
						source={{uri: item.imageLink}}
					/>
				</TouchableOpacity>}
				<Text style={styles.detailText}>{item.noticeDetail}</Text>
			</View>
		);
	};

	render() {
		return (
			<ScrollView>
				<View style={styles.container}>
					<FlatList
						renderItem={this.renderNotice}
						data={this.state.userNotice}
						onEndReached={this.loadMore}
						onEndReachedThreshold={0.9}
						refreshing={this.state.refreshing}
						onRefresh={this.onRefresh}
					/>


				</View>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container:{
		flex:1,
		justifyContent:'center',
		alignItems:'center',
		backgroundColor: '#fff'
	},
	card:{
		width:width-20,
		backgroundColor:'#ecedee',
		borderRadius:10,
		marginVertical: 10,
	},
	image:{
		borderTopRightRadius:10,
		borderTopLeftRadius:10,
		height:250,
		width:width-20,
		alignSelf:'center'
	},
	header:{
		marginHorizontal:10,
		marginTop:5,
		fontWeight:'bold',
		fontSize:20,
	},
	detailText:{
		margin:10,
		fontSize:16,
	},
});
