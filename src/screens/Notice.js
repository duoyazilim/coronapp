import React, { Component } from 'react';
import {StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, ScrollView, ActivityIndicator} from 'react-native';
import {f,firestore} from "../config";
import {FlatList} from 'react-navigation';
const width = Dimensions.get('window').width;

export default class Notice extends Component {

	constructor() {
		super();
		this.state = {
			notice:[],
			refreshing: false,
			noticeImage:'',
			loading:true,
		};
	}
	componentDidMount(): void {
		this.getNotice()
	}

	getNotice() {
		let that = this;
		let allTokens = [];

		firestore.collection("notice").orderBy("time", 'desc').limit(5).get().then(function(snap) {
			snap.forEach(function(doc) {
				allTokens.push(doc.data());
			});
			let last = snap.docs[snap.docs.length - 1];
			that.setState({
				notice:allTokens,
				last,
				refreshing:false,
				loading:false
			});

		});
		this.setState({refreshing:false,loading:false})

	}

	loadMore = () => {
		let self = this;
		let allTokens = [];

		try {
			firestore.collection("notice").orderBy("time", 'desc').startAfter(this.state.last).limit(5).get().then(function(snap) {
				snap.forEach(function(doc) {
					allTokens.push(doc.data());
				});
				let last = snap.docs[snap.docs.length - 1];
				self.setState({
					notice: [...self.state.notice, ...allTokens],
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
				<ActivityIndicator color={'#235647'} size={'large'}/>
			</View>
		);
	};


	renderNotice = ({item}) => {

		return (
			<View style={styles.card}>
				{item.imageLink==='' ? null : <Image
					style={styles.image}
					source={{uri: item.imageLink}}
				/>}
				<Text style={styles.detailText}>{item.noticeDetail}</Text>
				<Text style={{marginLeft:10,marginBottom:5, fontSize:12,color:'#434343'}}>
					{item.time2}
				</Text>
			</View>
		);
	};

	render() {
		return (
				<View style={styles.container}>
					<View style={styles.info}>
						<Text style={styles.infoText}>
							Bu sayfadaki bilgiler coronapp kullanıcıları tarafından gelmektedir, kesin değildir!
						</Text>
					</View>
					<FlatList
						renderItem={this.renderNotice}
						data={this.state.notice}
						ListFooterComponent={this.renderFooter}
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
	info:{
		backgroundColor:'#dc301d',
		width:width-7,
		marginVertical:5,
		alignItems:'center',
		justifyContent: 'center',
		borderRadius:10,
	},
	infoText:{
		color:'#fff',
		marginHorizontal: 10,
		marginVertical: 5,
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
