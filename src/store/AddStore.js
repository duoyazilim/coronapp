import {action, observable} from 'mobx';
import {f,firestore} from "../config";
import RNFetchBlob from 'rn-fetch-blob';
import uuid  from 'react-native-uuid';
import {Alert} from 'react-native';
import NavigationService from '../NavigationService';


class AddStore{
	@observable newsImage='';
	@observable noticeImage='';
	@observable userNoticeImage='';
	@observable checkImage='';
	@observable loading=false;


	@action getDat(str) {
		const obj = [
			{name: 'Ocak', val: '01'},
			{name: 'Şubat', val: '02'},
			{name: 'Mart', val: '03'},
			{name: 'Nisan', val: '04'},
			{name: 'Mayıs', val: '05'},
			{name: 'Haziran', val: '06'},
			{name: 'Temmuz', val: '07'},
			{name: 'Ağustos', val: '08'},
			{name: 'Eylül', val: '09'},
			{name: 'Ekim', val: '10'},
			{name: 'Kasım', val: '11'},
			{name: 'Aralık', val: '12'},
		];
		return (obj.find(i => i.val === str));
	}

	@action uploadNewsImage = ({uri,detail}) => {
		this.loading=true;
		console.log("URİ",uri)
		const mime = 'image/jpg';
		const Blob = RNFetchBlob.polyfill.Blob
		const fs = RNFetchBlob.fs
		const originalXMLHttpRequest = window.XMLHttpRequest;
		window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
		window.Blob = Blob
		return new Promise((resolve, reject) => {
			const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
			let uploadBlob = null
			const imageRef = f.storage().ref('news/').child(uuid.v4())
			fs.readFile(uploadUri, 'base64')
				.then((data) => {
					return Blob.build(data, { type: `${mime};BASE64` })
				})
				.then((blob) => {
					uploadBlob = blob
					return imageRef.put(blob, { contentType: mime })
				})
				.then(() => {
					uploadBlob.close()
					window.XMLHttpRequest = originalXMLHttpRequest ;
					imageRef.getDownloadURL().then((url)=>{
						this.addNews({url,detail})
					})
				})
				.catch((error) => {
					console.log(error);
					reject(error)
				});
		})
	};

	@action addNews = ({url,detail}) =>{

		const data={
			time: new Date(),
			detail:detail,
			imageLink:url,
			time2:'',
		};
		let time = (new Date()).toLocaleTimeString();
		time = time.split(':');
		time = [time[0], time[1]];
		time = time.join(':');
		let date = new Date();
		let month = date.getMonth();
		month += 1;
		month = '' + month;
		if (month.length === 1) {
			month = '0' + month;
		}

		month = this.getDat(month);
		month = month.name;
		data.time2 = `${date.getDate()} ${month} ${time}`;


		firestore.collection("news").add(data)
			.then((doc)=> {
			})
			.catch((error) => {
				console.log(error)
			})
		this.loading=false
		Alert.alert(
			'Başarılı',
			'Haber Gönderildi',
			[{text: 'Tamam',onPress: () => NavigationService.navigate('Check')}]
		)
	}


	@action uploadUserNoticeImage = ({uri,detail}) => {
		this.loading=true;
		const mime = 'image/jpg';
		const Blob = RNFetchBlob.polyfill.Blob
		const fs = RNFetchBlob.fs
		const originalXMLHttpRequest = window.XMLHttpRequest;
		window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
		window.Blob = Blob
		return new Promise((resolve, reject) => {
			const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
			let uploadBlob = null
			const imageRef = f.storage().ref('userNotice/').child(uuid.v4())
			fs.readFile(uploadUri, 'base64')
				.then((data) => {
					return Blob.build(data, { type: `${mime};BASE64` })
				})
				.then((blob) => {
					uploadBlob = blob
					return imageRef.put(blob, { contentType: mime })
				})
				.then(() => {
					uploadBlob.close()
					window.XMLHttpRequest = originalXMLHttpRequest ;
					imageRef.getDownloadURL().then((url)=>{
						this.addUserNotice({url,detail})
					})
				})
				.catch((error) => {
					console.log(error);
					reject(error)
				});
		})
	};


	@action addUserNotice = ({url,detail}) =>{

		const data={
			time: new Date(),
			detail:detail,
			imageLink:url,
			time2:'',
		};
		let time = (new Date()).toLocaleTimeString();
		time = time.split(':');
		time = [time[0], time[1]];
		time = time.join(':');
		let date = new Date();
		let month = date.getMonth();
		month += 1;
		month = '' + month;
		if (month.length === 1) {
			month = '0' + month;
		}

		month = this.getDat(month);
		month = month.name;
		data.time2 = `${date.getDate()} ${month} ${time}`;


		firestore.collection("userNotice").add(data)
			.then((doc)=> {
			})
			.catch((error) => {
				console.log(error)
			})
		this.loading=false
		Alert.alert(
			'Başarılı',
			'Bildiriminiz Gönderildi',
			[{text: 'Tamam',onPress: () => NavigationService.navigate('Home')}]
		)
	}


	@action uploadNoticeImage = ({uri,detail}) => {
		this.loading=true;
		const mime = 'image/jpg';
		const Blob = RNFetchBlob.polyfill.Blob
		const fs = RNFetchBlob.fs
		const originalXMLHttpRequest = window.XMLHttpRequest;
		window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
		window.Blob = Blob
		return new Promise((resolve, reject) => {
			const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
			let uploadBlob = null
			const imageRef = f.storage().ref('notice/').child(uuid.v4())
			fs.readFile(uploadUri, 'base64')
				.then((data) => {
					return Blob.build(data, { type: `${mime};BASE64` })
				})
				.then((blob) => {
					uploadBlob = blob
					return imageRef.put(blob, { contentType: mime })
				})
				.then(() => {
					uploadBlob.close()
					window.XMLHttpRequest = originalXMLHttpRequest ;
					imageRef.getDownloadURL().then((url)=>{
						this.addNotice({url,detail})
					})
				})
				.catch((error) => {
					console.log(error);
					reject(error)
				});
		})
	};


	@action addNotice = ({url,detail}) =>{

		const data={
			time: new Date(),
			detail:detail,
			imageLink:url,
			time2:'',
		};
		let time = (new Date()).toLocaleTimeString();
		time = time.split(':');
		time = [time[0], time[1]];
		time = time.join(':');
		let date = new Date();
		let month = date.getMonth();
		month += 1;
		month = '' + month;
		if (month.length === 1) {
			month = '0' + month;
		}

		month = this.getDat(month);
		month = month.name;
		data.time2 = `${date.getDate()} ${month} ${time}`;


		firestore.collection("notice").add(data)
			.then((doc)=> {
			})
			.catch((error) => {
				console.log(error)
			})
		this.loading=false;
		Alert.alert(
			'Başarılı',
			'Bildiriminiz Gönderildi',
			[{text: 'Tamam',onPress: () => NavigationService.navigate('Notice')}]
		)
	}


	@action uploadCheckImage = ({uri,detail,title}) => {
		this.loading=true;
		const mime = 'image/jpg';
		const Blob = RNFetchBlob.polyfill.Blob
		const fs = RNFetchBlob.fs
		const originalXMLHttpRequest = window.XMLHttpRequest;
		window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
		window.Blob = Blob
		return new Promise((resolve, reject) => {
			const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
			let uploadBlob = null
			const imageRef = f.storage().ref('check/').child(uuid.v4())
			fs.readFile(uploadUri, 'base64')
				.then((data) => {
					return Blob.build(data, { type: `${mime};BASE64` })
				})
				.then((blob) => {
					uploadBlob = blob
					return imageRef.put(blob, { contentType: mime })
				})
				.then(() => {
					uploadBlob.close()
					window.XMLHttpRequest = originalXMLHttpRequest ;
					imageRef.getDownloadURL().then((url)=>{
						this.addCheck({url,detail,title})
					})
				})
				.catch((error) => {
					console.log(error);
					reject(error)
				});
		})
	};


	@action addCheck = ({url,detail,title}) =>{

		const data={
			time: new Date(),
			title:title,
			detail:detail,
			imageLink:url,
			time2:'',
		};
		let time = (new Date()).toLocaleTimeString();
		time = time.split(':');
		time = [time[0], time[1]];
		time = time.join(':');
		let date = new Date();
		let month = date.getMonth();
		month += 1;
		month = '' + month;
		if (month.length === 1) {
			month = '0' + month;
		}

		month = this.getDat(month);
		month = month.name;
		data.time2 = `${date.getDate()} ${month} ${time}`;


		firestore.collection("check").add(data)
			.then((doc)=> {
				firestore.collection("check").doc(doc.id).update(
					{docId:doc.id}
				)
			})
			.catch((error) => {
				console.log(error)
			})
		this.loading=false
		Alert.alert(
			'Başarılı',
			'Bildiriminiz Gönderildi',
			[{text: 'Tamam',onPress: () => NavigationService.navigate('Check')}]
		)
	}

}

export default new AddStore();
