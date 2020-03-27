import React from 'react';
import {Image, StyleSheet, Dimensions} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator, HeaderBackButton, Header} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {createDrawerNavigator} from 'react-navigation-drawer';
import Home from './screens/Home';
import Notice from './screens/Notice';
import Add from './screens/Add';
import Number from './screens/Number';
import NoticeAdd from './screens/NoticeAdd';
import UserAddNotice from './screens/UserAddNotice';
import Check from './screens/Check';
import UserNoticeView from './screens/UserNoticeView';
import CheckAdd from './screens/CheckAdd';
import Drawer from './screens/Drawer';
import Login from './screens/Login';
import Admin from './screens/Admin';
import CheckDetail from './screens/CheckDetail';

const width = Dimensions.get('window').width;

const HomeStack = createStackNavigator({
    Home: {
      screen: Home,
      navigationOptions: ({navigation}) => ({

        headerStyle: {backgroundColor: '#235647'},
        headerTitleAlign: 'center',
        headerTitle: (
          <Image source={require('./assets/coronaWhite1.png')}
                 style={{width: width / 2, height: Platform.OS === 'ios' ? 80 : 50}}/>
        ),
      }),
    },
  },
);

const NumberStack = createStackNavigator({
    Number: {
      screen: Number,
      navigationOptions: ({navigation}) => ({
        headerStyle: {backgroundColor: '#235647'},
        headerTitleAlign: 'center',
        headerTitle: (
          <Image source={require('./assets/coronaWhite1.png')}
                 style={{width: width / 2, height: Platform.OS === 'ios' ? 80 : 50}}/>
        ),
      }),
    },
  },
);

const NoticeStack = createStackNavigator({
    Notice: {
      screen: Notice,
      navigationOptions: ({navigation}) => ({

        headerStyle: {backgroundColor: '#235647'},
        headerTitleAlign: 'center',
        headerTitle: (
          <Image source={require('./assets/coronaWhite1.png')}
                 style={{width: width / 2, height: Platform.OS === 'ios' ? 80 : 50}}/>
        ),
      }),
    },
  },
);

const CheckStack = createStackNavigator({
    Check: {
      screen: Check,
      navigationOptions: ({navigation}) => ({

        headerStyle: {backgroundColor: '#235647'},
        headerTitle: (
          <Image source={require('./assets/coronaWhite1.png')}
                 style={{width: width / 2, height: Platform.OS === 'ios' ? 80 : 50}}/>
        ),
        headerTitleAlign: 'center',
        headerRight: () => <FontAwesome name="bars" color={'white'} size={30} style={{margin: 10}}
                                        onPress={() => navigation.openDrawer()}/>,
      }),
    },
    CheckDetail: {
      screen: CheckDetail,
      navigationOptions: {
        headerStyle: {backgroundColor: '#235647'},
        headerTitle: (
          <Image source={require('./assets/coronaWhite1.png')}
                 style={{width: width / 2, height: Platform.OS === 'ios' ? 80 : 50}}/>
        ),
        headerTitleAlign: 'center',
        headerTintColor: '#fff',
        titleStyle: {color: 'white'},
        headerBackTitleVisible: false,
      },
    },
    Login: {
      screen: Login,
      navigationOptions: ({navigation}) => ({

        headerStyle: {backgroundColor: '#235647'},
        headerTitle: (
          <Image source={require('./assets/coronaWhite1.png')}
                 style={{width: width / 2, height: Platform.OS === 'ios' ? 80 : 50}}/>
        ), headerBackTitle: 'Geri',
        headerTitleAlign: 'center',
      }),
    },
    Admin,
    CheckAdd,
    UserNoticeView,
    NoticeAdd,
    Add,
  },
);

const drawerScreen = createDrawerNavigator({
  Check: CheckStack,
  Drawer: Drawer,
}, {
  contentComponent: Drawer,
  drawerPosition: 'right',
  drawerWidth: 250,
});


CheckStack.navigationOptions = ({navigation}) => {
  let tabBarVisible = true;
  tabBarVisible = false;
  return {
    tabBarVisible,
  };
};


const UserAddNoticeStack = createStackNavigator({
    UserAddNotice: {
      screen: UserAddNotice,
      navigationOptions: ({navigation}) => ({

        headerStyle: {backgroundColor: '#235647'},
        headerTitle: (
          <Image source={require('./assets/coronaWhite1.png')}
                 style={{width: width / 2, height: Platform.OS === 'ios' ? 80 : 50}}/>
        ),

        headerLeft: () => <HeaderBackButton labelVisible={false} tintColor={'#fff'}
                                            onPress={() => navigation.navigate('Home')}/>,
      }),
    },
  },
);

UserAddNoticeStack.navigationOptions = ({navigation}) => {
  let tabBarVisible = true;
  tabBarVisible = false;
  return {
    tabBarVisible,
  };
};

const tabNavigator = createBottomTabNavigator(
  {

    Home: HomeStack,
    Number: NumberStack,
    UserAddNotice: UserAddNoticeStack,
    Notice: NoticeStack,
    Check: drawerScreen,
  },

  {

    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        const {routeName} = navigation.state;
        let IconComponent = FontAwesome;
        let iconName;
        if (routeName === 'Home') {
          iconName = 'home';
        } else if (routeName === 'Notice') {
          iconName = 'comments-o';
        } else if (routeName === 'Number') {
          iconName = 'bar-chart';
        } else if (routeName === 'UserAddNotice') {
          iconName = 'plus-square';
        } else if (routeName === 'Check') {
          iconName = 'stethoscope';
        }
        return <IconComponent name={iconName} size={25} color={tintColor}/>;
      },
    }),

    tabBarOptions: {
      tabStyle: {backgroundColor: '#235647'},
      showLabel: false,
      activeTintColor: '#fff',
      inactiveTintColor: '#bbbbbb',
    },
  },
);

export default createAppContainer(tabNavigator);

