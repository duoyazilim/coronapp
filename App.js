import React, {Component} from 'react';
import Router from './src/Router';
import store from './src/store';
import {Provider} from 'mobx-react';
import NavigationService from './src/NavigationService';


/*
This application gives information about Covid-19 for Turkey and all around the world. There are last news about Covid-19 and Cases,Deaths,Daily Cases and Daily Deaths. And also it makes a social network between Coronapp users.
 */
console.disableYellowBox = true;
export default class App extends Component {
  render() {
    return (
      <Provider {...store}>
        <Router
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
      </Provider>
    );
  }
}
