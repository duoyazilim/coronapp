import React, {Component} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Dimensions,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import {firestore} from '../config';


const width = Dimensions.get('window').width;
export default class CheckDetail extends React.PureComponent {

  constructor() {
    super();

    this.state = {
      detail: [],
      loading: true,
    };
  }

  getDetail() {
    const {navigation} = this.props;
    const docId = navigation.getParam('itemId');

    let that = this;
    let allTokens = [];
    let docRef = firestore.collection('check').doc(docId);

    docRef.get().then(function(doc) {
      if (doc.exists) {
        that.setState({detail: doc.data()});
      } else {
        // doc.data() will be undefined in this case
      }
    }).catch(function(error) {
    });
    this.setState({loading: false});
  }


  componentDidMount() {
    this.getDetail();
  }


  render() {
    return (
      <SafeAreaView style={styles.safeArea} >
        <ScrollView>
          {this.state.loading ? <ActivityIndicator color={'#235647'} size={'large'}/>
            :
            <View style={styles.container}>
              <Image style={styles.image}
                     source={{uri: this.state.detail.imageLink}}
              />
              <Text style={styles.title}>
                {this.state.detail.title}
              </Text>
              <Text style={styles.detail}>
                {this.state.detail.detail}
              </Text>
            </View>
          }
        </ScrollView>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#235647',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container:{
    justifyContent: 'center',
    alignItems:'center'
  },
  image: {
    marginTop:10,
    borderRadius: 10,
    width: width - 10,
    height: 400,
  },
  title: {
    marginVertical:3,
    marginHorizontal: 5,
    fontWeight:'bold',
    fontSize:20,
    color:'#fff'
  },
  detail: {
    marginHorizontal:5,
    color:'#c4c4c4',
    marginVertical: 3,
  },
});
