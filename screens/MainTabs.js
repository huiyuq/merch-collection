import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AddItemScreen from './AddItemScreen';
import ArchiveScreen from "./ArchiveScreen";
import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
import StatisticsScreen from './StatisticsScreen';

const Tab = createBottomTabNavigator();


export default function MainTabs() {
  return (
    <Tab.Navigator
  screenOptions={{
    headerShown: false,
    tabBarStyle: {
      display: "none",
    },
  }}
>
      <Tab.Screen
        name="首頁"
        component={HomeScreen}
      />

      <Tab.Screen
        name="收藏庫"
        component={ArchiveScreen}
      />

      <Tab.Screen
        name="新增收藏"
        component={AddItemScreen}
      />
    
    
      <Tab.Screen
        name="統計"
        component={StatisticsScreen}
      />

      <Tab.Screen
        name="帳號"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
}