import React, { Component } from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity,Alert} from 'react-native';
import {f} from "../config";

export default class Login extends Component {
	constructor(props){
		super(props);
		this.state={
			email:'',
			pass:'',
		};

	}
	componentDidMount(): void {
		f.auth().onAuthStateChanged(user => {
			if(user){
				this.props.navigation.navigate('Admin');
			}
			else{
				this.props.navigation.navigate('Login')
			}

		});
	}

	login = (email,pass)=>{
		{
			f
				.auth()
				.signInWithEmailAndPassword(email, pass)
				.then(user => {
						this.props.navigation.navigate('Admin')
				})
				.catch(error=>{
					Alert.alert(
						'Hata',
						'E-posta adresi veya parola yanlış', [{text: 'Tamam', onPress: () => this.setState({email:'',pass:''})}],
					);
				})
		}
	}

  render() {
    return (
      <View style={styles.container}>
				<Text>Yönetici Girişi</Text>
				<TextInput
					keyboardType={"email-address"}
					autoCapitalize={"none"}
					style={styles.input}
					onChangeText={(email) => this.setState({email})}
					placeholder={'E-posta'}
					value={this.state.email}
				/>
				<TextInput
					style={styles.input}
					placeholder={'Parola'}
					onChangeText={(pass) => this.setState({pass})}
					value={this.state.pass}
				/>
				<TouchableOpacity
					style={styles.login}
					onPress={()=> {this.login(this.state.email,this.state.pass)}}
				>
						<Text style={{color: 'white', fontSize: 20}}>Giriş Yap</Text>
				</TouchableOpacity>
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
	input:{
		borderColor:'#235647',
		borderWidth:1,
		height:40,
		width:200,
		marginTop:15,
		borderRadius:5,
	},
	login:{
		backgroundColor:'#235647',
		height:40,
		width:100,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius:5,
		marginTop:15,
	}
});
