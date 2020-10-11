import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import TabOneScreen from '../screens/LoginScreen';
import ProjectsScreen from '../screens/ProjectsScreen';
import ProjectScreen from '../screens/TaskListScreen';
import { Appbar } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import { Text } from '../components/Themed';
import useColorScheme from '../hooks/useColorScheme';

const Header = () => {
  const logout = async () => {
    await AsyncStorage.removeItem('auth')
    location.reload();
  }

  return (
    <Text>
      <Appbar.Action color={useColorScheme() === 'light' ? 'black' : 'white' } icon="logout" onPress={logout} />
    </Text>
  );
};

const Nav = createStackNavigator();

export default function Root() {

  return (
    <Nav.Navigator
      initialRouteName="TabOne"
      screenOptions={{ headerShown: false }}
    >
      <Nav.Screen
        name="TabOne"
        component={TabOneScreen}
        options={{
          headerShown: false,
          title: 'Todo Manager'
        }}
      />
      <Nav.Screen
        name="logged"
        component={LoggedNavigator}
        options={{
           headerStyle:{backgroundColor: 'grey'},
          title: 'Todo Manager',
          headerShown: false,
          headerLeft: null,
          headerRight: Header

        }}
      />
    </Nav.Navigator>
  );
}

const LoggedStack = createStackNavigator();

function LoggedNavigator() {
  return (
    <LoggedStack.Navigator>
      <LoggedStack.Screen
        name="projects"
        component={ProjectsScreen}
        options={{title: 'Todo manager - Projects', headerTitle: 'Projects', headerRight: Header, headerStyle:{backgroundColor: 'grey'}  }}
      />
      <LoggedStack.Screen
        name="project"
        component={ProjectScreen}
        options={{ title: 'Todo manager - Tasks', headerTitle: 'Tasks', headerRight: Header, headerStyle:{backgroundColor: 'grey'} }}
      />
    </LoggedStack.Navigator>
  );
}
