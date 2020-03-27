import React, { Component } from 'react';
import { StyleSheet, Text, View,Dimensions,Image,TouchableOpacity,StatusBar,ActivityIndicator} from 'react-native';
import {f,firestore} from "../config";
import {FlatList} from 'react-navigation';
import firebase from 'react-native-firebase'
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from "@react-native-community/push-notification-ios";

const width = Dimensions.get('window').width;
export default class Home extends Component {


	constructor() {
		super();
		this.state = {
			news:[],
			refreshing: false,
			loading:true,
			newsImage:'',
		};
	}
componentDidMount(): void {
		this.getNews();
}
	getImage=(doc)=>{
		const imageRef = f.storage().ref('news').child(doc);
		const imageUrl = imageRef.getDownloadURL().then(result => this.setState({newsImage:result}));
		console.log(this.state.newsImage)
	}
	getNews() {
		this.setState({loading:true})
		let that = this;
		let allTokens = [];

		firestore.collection("news").orderBy("time", 'desc').limit(5).get().then(function(snap) {
			snap.forEach(function(doc) {
				allTokens.push(doc.data());
			});
			let last = snap.docs[snap.docs.length - 1];
			that.setState({
				news:allTokens,
				last,
				refreshing:false,
				loading:false,
			});

		})

		this.setState({refreshing:false,loading:false})
	}

	loadMore = () => {
		let self = this;
		let allTokens = [];

		try {
			firestore.collection("news").orderBy("time", 'desc').startAfter(this.state.last).limit(5).get().then(function(snap) {
				snap.forEach(function(doc) {
					allTokens.push(doc.data());
				});
				let last = snap.docs[snap.docs.length - 1];
				self.setState({
					news: [...self.state.news, ...allTokens],
					last,
					loading:false
				})

			})
		}
		catch(e){
			this.setState({refreshing:false,loading:false})
		}
		this.setState({refreshing:false,loading:false})
	}

	onRefresh = () => {
		this.setState({
			refreshing: true,
		}, () => {
			this.getNews();

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

	renderNews = ({item}) => {

		return (
			<View style={styles.card}>
				{item.imageLink==='' ? null : <Image
					style={styles.image}
					source={{uri: item.imageLink}}
				/>}
				<Text style={styles.detailText}>{item.detail}</Text>
				<Text style={{marginLeft:10,marginBottom:5, fontSize:12,color:'#1d473a'}}>
					{item.time2}
				</Text>
			</View>
		);
	};

	/*
	<Image
						style={styles.image}
						source={{uri: 'https://media.graytvinc.com/images/810*455/MGN_1280x720_00124C00-OPFBH4.jpg'}}
					/>
	 */
	render() {
		return (
			<View style={styles.container}>
				<StatusBar barStyle="light-content" backgroundColor={'#1a4238'} hidden={false}/>
				<FlatList
					ListFooterComponent={this.renderFooter}
					renderItem={this.renderNews}
					data={this.state.news}
					keyExtractor={(item, index) => item.key}
					onEndReached={this.loadMore}
					onEndReachedThreshold={0.9}
					refreshing={this.state.refreshing}
					onRefresh={this.onRefresh}
				/>
			</View>
		);
	}
}
const messaging = firebase.messaging();

messaging.hasPermission()
	.then((enabled) => {
		if (enabled) {
			messaging.getToken()
				.then(token => { console.log(token) })
				.catch(error => { /* handle error */ });
		} else {
			messaging.requestPermission()
				.then(() => { /* got permission */ })
				.catch(error => { /* handle error */ });
		}
	})
	.catch(error => { /* handle error */ });

firebase.notifications().onNotification((notification) => {
	const { title, body } = notification;
	PushNotification.localNotification({
		title: title,
		message: body, // (required)
	});
});
PushNotification.configure({
	// (optional) Called when Token is generated (iOS and Android)
	onRegister: function(token) {
		console.log("TOKEN:", token);
	},

	// (required) Called when a remote or local notification is opened or received
	onNotification: function(notification) {
		console.log("NOTIFICATION:", notification);

		// process the notification

		// required on iOS only (see fetchCompletionHandler docs: https://github.com/react-native-community/react-native-push-notification-ios)
		notification.finish(PushNotificationIOS.FetchResult.NoData);
	},

	// ANDROID ONLY: GCM or FCM Sender ID (product_number) (optional - not required for local notifications, but is need to receive remote push notifications)
	senderID: "474291399461",

	// IOS ONLY (optional): default: all - Permissions to register.
	permissions: {
		alert: true,
		badge: true,
		sound: true
	},

	// Should the initial notification be popped automatically
	// default: true
	popInitialNotification: true,
	requestPermissions: true
});



const styles = StyleSheet.create({
	container:{
		flex:1,
		justifyContent:'center',
		alignItems:'center',
	},
	card:{
		width:width-20,
		backgroundColor:'#d9dadb',
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
