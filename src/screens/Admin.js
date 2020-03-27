import React, { Component } from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {f} from '../config'

export default class Admin extends Component {
  render() {
    return (
      <View style={styles.container}>
				<TouchableOpacity
					style={styles.admin}
					onPress={()=> this.props.navigation.navigate('NoticeAdd')}
				>
					<Text style={styles.adminText}>  Notice Add  </Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.admin}
					onPress={()=> this.props.navigation.navigate('Add')}
				>
					<Text style={styles.adminText}>  Add  </Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.admin}
					onPress={()=> this.props.navigation.navigate('UserNoticeView')}
				>
					<Text style={styles.adminText}>  UserNoticeView  </Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.admin}
					onPress={()=> this.props.navigation.navigate('CheckAdd')}
				>
					<Text style={styles.adminText}>  CheckAdd  </Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.signOut}
					onPress={()=> f.auth().signOut()}
				>
					<Text style={styles.adminText}>  Çıkış Yap  </Text>
				</TouchableOpacity>
			</View>
    );
  }
}

const styles = StyleSheet.create({
	container:{
		flex:1,
		justifyContent:'center',
		alignItems:'center'
	},
	admin:{
		width:200,
		backgroundColor:'#235647',
		height:30,
		borderRadius:5,
		alignItems: 'center',
		justifyContent:'center',
		marginTop:10,
	},
	signOut:{
		backgroundColor:'red',
		height:30,
		borderRadius:5,
		alignItems: 'center',
		justifyContent:'center',
		marginTop:10,
	},
	adminText:{
		color:'white',
		fontSize:20
	}
});
