import React, { useEffect } from "react";
import { Image, useColorScheme } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from "./src/screens/Login";
import Welcome from "./src/screens/Welocome";
import SchoolName from "./src/screens/schoolName";
import SignUp from "./src/screens/SignUp";
import Verification from "./src/screens/Verification";
import Menu from "./src/screens/Menu"
import Messages from './src/screens/Messages'
import SelectTopics from "./src/screens/SelectTopics";
import Profile from "./src/screens/Profile";
import ForgetPassword from "./src/screens/ForgetPassword";
import { initThemeListener } from './components/redux/themeListener';
import youtube from './src/screens/Youtube'
import Users from "./src/screens/Users";
import Testingpage from "./src/screens/Testingpage";
import Search from "./src/screens/Search";
import EditProfile from "./src/screens/EditProfile";
import ChatScreen from "./src/screens/Messages";
import PhoneVerify from "./src/screens/PhoneVerify";
import FriendsReq from "./src/screens/FriendsReq";
import AllEmployes from "./src/screens/AllEmployes";
import VerifyPhone from "./src/screens/VerifyPhone";
import Youtube from "./src/screens/Youtube";
import SuccessPage from "./src/screens/SuccessPage";
import UserFriendly from "./src/screens/UserFriendly";
import EasyTask from "./src/screens/EasyTask";
import { Provider, useDispatch, useSelector } from 'react-redux';
import MixAuth from "./src/screens/MixAuth";
import FoodHome from "./src/screens/FoodHome";
import AddItem from "./src/screens/AddItem";
import Cart from "./src/screens/Cart";
import store from './components/redux/store'
import { setTheme } from "./components/redux/action";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();



function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarHideOnKeyboard: true,
        tabBarIcon: ({ focused, color, size }) => {
          let iconSource;

          if (route.name === 'Profile') {
            iconSource = require('./assets/profile..png');
          } else if (route.name === 'Search') {
            iconSource = require('./assets/search.png');
          } else if (route.name === 'Messages') {
            iconSource = require('./assets/chat.png');
          } else if (route.name === 'Requests') {
            iconSource = require('./assets/requests.png')
          } else if (route.name === 'AllEmployes') {
            iconSource = require('./assets/requests.png')
          }
          
          return (
            <Image
              source={iconSource}
              style={{
                width: size,
                height: size,
                tintColor: focused ? '#145343' : 'gray',
              }}
            />
          );
        },
        tabBarActiveTintColor: '#145343',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen 
        name="Search" 
        component={Search} 
        options={{ headerShown: false }} 
      />
      <Tab.Screen 
        name="Profile" 
        component={Profile} 
        options={{ headerShown: false }} 
      />
      <Tab.Screen 
        name="Testingpage" 
        component={Testingpage} 
        options={{ headerShown: false }} 
      />
      <Tab.Screen 
      name="AllEmployes" 
      component={AllEmployes} 
      options={{ headerShown: false }} 
      />
      <Tab.Screen 
      name="Requests" 
      component={FriendsReq} 
      options={{ headerShown: false }} 
      />
    </Tab.Navigator>
  );
}
const App = () => {
  
  useEffect(() => {
    initThemeListener();
  }, []);
  
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SchoolName">
          <Stack.Screen 
            name="Login" 
            component={Login} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="SchoolName" 
            component={SchoolName} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="Welcome" 
            component={Welcome} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="SignUp" 
            component={SignUp} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="Verification" 
            component={Verification} 
            options={{ headerShown: false }} 
          />
          {/* <Tab.Screen 
        name="Chats" 
        component={Chats} 
        options={({route}) => ({title: route.params.userName})} 
      /> */}
          <Stack.Screen 
            name="SelectTopics" 
            component={SelectTopics} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="ForgetPassword" 
            component={ForgetPassword} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="BottomTabs" 
            component={BottomTabs} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="EditProfile" 
            component={EditProfile} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="PhoneVerify" 
            component={PhoneVerify} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="VerifyPhone" 
            component={VerifyPhone} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="SuccessPage" 
            component={SuccessPage} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="UserFriendly" 
            component={UserFriendly} 
            options={{ headerShown: false }} 
          />
           <Stack.Screen 
            name="EasyTask" 
            component={EasyTask} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
          name="Youtube" 
          component={Youtube} 
          options={{ headerShown: false }} 
          />
          <Stack.Screen 
          name="MixAuth" 
          component={MixAuth} 
          options={{ headerShown: false }} 
          />
          <Stack.Screen 
          name="FoodHome" 
          component={FoodHome} 
          options={{ headerShown: false }} 
          />
          <Stack.Screen 
          name="Menu" 
          component={Menu} 
          options={{ headerShown: false }} 
          />
          <Stack.Screen 
          name="AddItem" 
          component={AddItem} 
          options={{ headerShown: false }} 
          />
          <Stack.Screen 
          name="Cart" 
          component={Cart} 
          options={{ headerShown: false }} 
          />
          
        </Stack.Navigator>
        
      </NavigationContainer>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;
