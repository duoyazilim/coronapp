import React, { Component } from 'react';
import { StyleSheet, Text, View,TouchableOpacity,Linking,Image,SafeAreaView} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
export default class Drawer extends Component {

	render() {
		return (
			<SafeAreaView style={styles.container}>
				<View style={styles.header}>
					<Image source={require('../assets/coronaGreen.png')} style={{width:200,height:50}} />
				</View>
				<View style={styles.center}>
					<View style={{marginBottom:100}}>
						<View style={{flexDirection:'row',marginTop:10}}>
							<FontAwesome name="instagram" color={'#C23B7D'} size={35} style={{marginLeft:5}} onPress={() => { Linking.openURL('instagram://user?username=coronapptr'); }}/>
							<TouchableOpacity style={{justifyContent:'center'}} onPress={() => { Linking.openURL('instagram://user?username=coronapptr'); }}>
								<Text style={{fontSize:16, color:'#C23B7D'}}> coronapptr</Text>
							</TouchableOpacity>
						</View>
						<View style={{flexDirection:'row', marginTop:10,}}>
							<FontAwesome name="twitter" color={'#1DA0F2'} size={35} style={{marginLeft:5}}  onPress={() => { Linking.openURL('https://twitter.com/coronapptr'); }} />
							<TouchableOpacity style={{justifyContent:'center'}} onPress={() => { Linking.openURL('https://twitter.com/coronapptr'); }}>
								<Text style={{fontSize:16,color:'#1DA0F2'}}> coronapptr</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
				<View style={styles.footer}>
					<View style={{marginTop:10, justifyContent:'center',alignItems:'center'}}>
						<TouchableOpacity style={{justifyContent:'center'}} onPress={() => { Linking.openURL('https://duoyazilim.com'); }}>
							<Image source={require('../assets/duosiyah2.png')} style={{width:200,height: 70,}} />

						</TouchableOpacity>
						<Text style={{fontSize:13,color:'black',marginBottom:20}}> tarafından geliştirilmiştir...</Text>

						<TouchableOpacity
							onPress={()=> this.props.navigation.navigate('Login')}
						>
							<Text style={{color:'#0058ff'}}>Yönetici Girişi</Text>
						</TouchableOpacity>
					</View>
				</View>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	container:{
		backgroundColor:'#ecedee',
		flex:1,
	},
	header:{
		justifyContent:'center',
		alignItems:'center',
		marginTop:10,
		height:50,
	},
	center:{
		flex:1,
		alignItems:'center',
		justifyContent: 'center'
	},
	text:{
		marginLeft:5,
		color:'#4f4f4f',
		fontSize:20
	},
	footer:{
		position:'absolute',
		bottom:5,
		width:'100%',
		alignItems:'center'
	},
});
