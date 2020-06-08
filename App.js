import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from './Screens/Home';
import CreateEmployee from './Screens/CreateEmployee';
import Profile from './Screens/Profile';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const myOptions={
    title:'Home Page',
    headerStyle:{
      backgroundColor:'#181824',
    },
    headerTintColor:'white'
}

 function App() {
  return (
    <View style={styles.container}>
      <Stack.Navigator>
          <Stack.Screen 
          name="Home" 
          component={Home} 
          options={myOptions}
          
          />
          <Stack.Screen name="Create" component={CreateEmployee} 
          options={{...myOptions,tittle:'comemployee details'}}
          />
          <Stack.Screen name="Profile" component={Profile} 
            options={{...myOptions,tittle:'Profile'}}
          />
      </Stack.Navigator>
      
    </View>
  );
}

export default ()=>{
  return (
    <NavigationContainer>
        <App /> 
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c5c7d1'
  }
})
