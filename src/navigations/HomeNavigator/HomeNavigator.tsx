import Routes from '../routes';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeParamList } from './types';
import { HomeScreen } from '../../screens';
import { useHeader } from '../../hooks';

const Stack = createStackNavigator<HomeParamList>();

const HomeNavigator = () => {
  return (
    <Stack.Navigator screenOptions={useHeader('Catalogue')}>
      <Stack.Screen name={Routes.HOME} component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
