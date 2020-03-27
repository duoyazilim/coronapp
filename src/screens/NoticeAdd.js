import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	TextInput,
	Dimensions,
	ScrollView,
	Alert,
	Image,
	ActivityIndicator,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
const width = Dimensions.get('window').width;
import AddStore from '../store/AddStore';
import {inject, observer} from 'mobx-react';
import {firestore} from "../config";

@inject('AddStore')
@observer
export default class NoticeAdd extends Component {
	constructor() {
		super();
		this.state = {
			noticeDetail:'',
			showImage:false,
			loading: false,
			image:null,
			imageUri:'',
		};
	}
	control= async()=>{
		{this.state.imageUri==='' ? await AddStore.addNotice({url:this.state.imageUri,detail:this.state.noticeDetail})
			:
			await AddStore.uploadNoticeImage({uri:this.state.imageUri,detail:this.state.noticeDetail})
		}
		await this.onRefresh()
	}

	uploadPhoto = () => {
		this.setState({loading: true});
	};


	pickSingle() {
		this.uploadPhoto();
		ImagePicker.openPicker({
			width:width-20,
			height: 250,
			sortOrder: 'none',
			mediaType:'photo',
			compressImageMaxWidth: 1000,
			compressImageMaxHeight: 1000,
			compressImageQuality: 1,
			includeExif: true,
		}).then(image => {
			console.log('received image', image);
			this.setState({
				image: {uri: image.path, width: image.width, height: image.height, mime: image.mime},
				imageUri: image.path,
				loading:false,
				showImage:true
			});
		}).catch(e => {
			e.message!=='Görsel seçmediniz.'
				?
				Alert.alert(e.message ? e.message : e)
				: null
		});
		this.setState({loading:false})

	}

	renderImage(image) {

		return (
			<View>
				{this.state.showImage?
					<Image style={{flex: 1, width:width-20, height: 250,borderRadius:10}} source={image}/>
					: null }
			</View>
		);
	};

	renderAsset(image) {
		return this.renderImage(image);
	}
	cleanupSingleImage() {
		let image = this.state.image || (this.state.images && this.state.images.length ? this.state.images[0] : null);

		ImagePicker.cleanSingle(image ? image.uri : null).then(() => {
		}).catch(e => {
			alert(e);
		})
	}

	onRefresh (image)  {
		this.setState({
			refreshing: true,
			showImage:false,
		}, () => {
			this.cleanupSingleImage()
			this.renderImage(image);

		});
	};
	render() {
		return (
			<ScrollView>
				<View style={styles.container}>
					<Text style={styles.header}>İhbar Paylaşımı</Text>
					<TextInput
						multiline
						style={styles.detailInput}
						onChangeText={(noticeDetail) => this.setState({noticeDetail})}
						value={this.state.noticeDetail}
					/>
					<TouchableOpacity
						onPress={()=>{this.pickSingle(true)}}
						style={styles.imageUpload}>
						<Text style={styles.imageUploadText}>Resim Yükle</Text>
					</TouchableOpacity>
					{this.state.showImage?
						<TouchableOpacity style={{marginTop:5}} onPress={()=> {this.onRefresh()}}>
							<Text style={{color:'red',fontSize:20}}>Resmi Kaldır</Text>
						</TouchableOpacity>
						:null}
					<View style={{flex: 1, justifyContent: 'center', flexDirection: 'row', flexWrap: 'wrap'}}>
						{
							this.state.loading && <ActivityIndicator size={'large'}/>
						}
						{this.state.image ? this.renderAsset(this.state.image) : null}
						{this.state.images ? this.state.images.map(i =>
							<View style={styles.imageView} key={i.uri}>
								{this.renderAsset(i)}

							</View>,
						) : null}
					</View>
					{AddStore.loading ? <ActivityIndicator size={"large"}/> :
					<TouchableOpacity
						onPress={() => this.control()}
						style={styles.share}>
						<Text style={styles.imageUploadText}>Gönder</Text>
					</TouchableOpacity>
				}
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
		marginBottom:250,
	},
	header:{
		fontWeight:'bold',
		fontSize:24,
	},
	hr:{
		width:width,
		height:1,
		backgroundColor: '#12741f'
	},
	text:{
		fontWeight:'bold',
		fontSize:18,
		marginVertical: 5,
	},
	headerInput: {
		width:width-20,
		height: 40,
		marginTop: 3, borderRadius: 5,
		borderColor: '#12741f', borderWidth: 1.5,
	},
	detailInput:{
		width:width-20,
		height: 100,
		marginTop: 10, borderRadius: 5,
		borderColor: '#12741f', borderWidth: 1.5,
	},
	imageUpload:{
		marginVertical:10,
		backgroundColor:'#12741f',
		height:30,
		width:150,
		borderRadius:5,
		alignSelf:'center',
		alignItems: 'center'
	},
	imageUploadText:{
		color:'white',
		fontSize:20,
	},
	share:{
		marginVertical:10,
		backgroundColor:'#b61110',
		height:30,
		width:150,
		borderRadius:5,
		alignSelf:'center',
		alignItems: 'center'
	},
	numberInput:{
		width:100,
		height: 40,
		marginTop: 3, borderRadius: 5,
		borderColor: '#12741f', borderWidth: 1.5,
	},
	text2:{
		fontWeight:'bold',
		fontSize:16,
		marginRight: 5,
	},
	numberCard:{
		flexDirection:'row',
		alignItems:'center',
		marginTop:5
	},
	imageView: {

		marginHorizontal: 7,
		marginVertical: 4,
	},
});
