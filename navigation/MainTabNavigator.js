import React from "react";
import { Platform, View } from "react-native";
import {
  createStackNavigator,
  createMaterialTopTabNavigator
} from "react-navigation";
import { MaterialTopTabBar } from "react-navigation-tabs";
import { Constants } from "expo";

import HomeScreen from "../screens/HomeScreen";
import ActivitiesListScreen from "../screens/ActivitiesListScreen";
import PlacesListScreen from "../screens/PlacesListScreen";
import EventListScreen from "../screens/EventListScreen";
import EventScreen from "../screens/EventScreen";
import MapScreen from "../screens/MapScreen";

const HomeStack = createStackNavigator({
  Home: HomeScreen
});

HomeStack.navigationOptions = {
  tabBarLabel: "Home"
};

const ActivitiesStack = createStackNavigator({
  Activities: ActivitiesListScreen
});

ActivitiesStack.navigationOptions = {
  tabBarLabel: "Activities"
};

const PlacesStack = createStackNavigator({
  Places: PlacesListScreen
});

PlacesStack.navigationOptions = {
  tabBarLabel: "Places"
};

const EventListStack = createStackNavigator({
  EventList: EventListScreen,
  EventScreen: EventScreen,
  MapScreen: MapScreen
});

EventListStack.navigationOptions = {
  tabBarLabel: "Events"
};

export default createMaterialTopTabNavigator(
  {
    HomeStack,
    ActivitiesStack,
    PlacesStack,
    EventListStack
  },
  { tabBarComponent: MaterialTopTabBarWithStatusBar }
);

function MaterialTopTabBarWithStatusBar(props) {
  return (
    <View
      style={{
        paddingTop: Constants.statusBarHeight,
        backgroundColor: "#51BD9D"
      }}
    >
      <MaterialTopTabBar
        {...props}
        style={{ backgroundColor: "#51BD9D" }}
        indicatorStyle={{ backgroundColor: "#ffffff" }}
        jumpToIndex={() => {}}
      />
    </View>
  );
}
