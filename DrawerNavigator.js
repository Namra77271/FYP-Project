
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import UserMenu from './UserMenu'; // Make sure this exists

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: true }}>
      <Drawer.Screen name="User Menu" component={UserMenu} />
    </Drawer.Navigator>
  );
}
