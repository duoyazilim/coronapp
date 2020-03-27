import React from 'react';
import {StyleSheet,Button ,Text, View, Dimensions, Image, TouchableOpacity, ScrollView, ActivityIndicator} from 'react-native';
import {f,firestore} from "../config";
import {FlatList} from 'react-navigation';
const width = Dimensions.get('window').width;

export default class Number extends React.Component {

  constructor() {
    super();
    this.state = {
      array:[],
      refreshing: false,
      loading:true,
    };
  }
  componentDidMount(): void {
    this.getNumber()
  }

  getNumber = async () => {
    const response = await fetch(
      'https://corona.lmao.ninja/countries?sort=deaths',
    );
    const data = await response.json();
    this.setState({
      array: [...this.state.array, ...data],
      refreshing:false,
      loading:false
    })
  }


  onRefresh = () => {
    this.setState({
      refreshing: true,
    }, () => {
      this.getNumber();

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

  renderItem = (item) =>{
    return(
    <View>
      {this.state.loading ? <ActivityIndicator/> :
        <View style={styles.card}>
          <Text style={styles.country}>{item.item.country}</Text>
          <View style={{flexDirection: 'row'}}>
            <View style={{marginTop: 10, flex: 1}}>
              <Text style={styles.numberC}>{item.item.cases}</Text>
              <Text style={styles.textC}>Vaka</Text>
            </View>

            <View style={styles.today}>
              <Image style={styles.flag} source={{uri: item.item.countryInfo.flag}}/>

              <View style={{flexDirection: 'row'}}>
                <Text style={styles.textTC}>{item.item.todayCases}        </Text>
                <Text style={styles.textTD}>{item.item.todayDeaths}</Text>
              </View>
              <Text>Bugün</Text>
            </View>
            <View style={{marginTop: 10, flex: 1}}>
              <Text style={styles.numberD}>{item.item.deaths}</Text>
              <Text style={styles.textD}>Ölüm</Text>
            </View>
          </View>
        </View>
      }
    </View>
    )
  }


  render() {
    return (
      <View style={styles.container}>
        <FlatList
          renderItem={this.renderItem}
          data={this.state.array}
          ListFooterComponent={this.renderFooter}
          keyExtractor={(item) => item.key}
          refreshing={this.state.refreshing}
          onRefresh={this.onRefresh}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberC: {
    fontWeight: 'bold',
    fontSize: 30,
    alignSelf: 'center',
    color: '#ff8600',
  },
  numberD: {
    fontWeight: 'bold',
    fontSize: 30,
    alignSelf: 'center',
    color: 'red',
  },
  textC: {
    fontSize: 28,
    alignSelf: 'center',
    color: '#ff8600',
  },
  textD: {
    fontSize: 28,
    alignSelf: 'center',
    color: 'red',
  },
  country: {
    fontWeight: 'bold',
    fontSize: 28,
    alignSelf: 'center',
    color: '#343A40',
  },
  flag:{
    width:50,
    height:30,
    marginBottom:5
  },
  today: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  textTC: {
    fontWeight: 'bold',
    color: '#ff8600',
  },
  textTD: {
    color: 'red',
  },
  card: {
    width: width - 20,
    backgroundColor: '#d9dadb',
    borderRadius: 10,
    marginVertical: 10,
  },
});
