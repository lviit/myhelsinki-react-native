import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import ActivitiesScreen from "../screens/ActivitiesScreen";
import PlacesScreen from "../screens/PlacesScreen";
import EventListScreen from "../screens/EventListScreen";
import EventScreen from "../screens/EventScreen";

const HomeStack = createStackNavigator({
  Home: HomeScreen
});

HomeStack.navigationOptions = {
  tabBarLabel: "Home",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-information-circle${focused ? "" : "-outline"}`
          : "md-information-circle"
      }
    />
  )
};

const ActivitiesStack = createStackNavigator({
  Activities: ActivitiesScreen
});

ActivitiesStack.navigationOptions = {
  tabBarLabel: "Activities",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-link" : "md-link"}
    />
  )
};

const PlacesStack = createStackNavigator({
  Places: PlacesScreen
});

PlacesStack.navigationOptions = {
  tabBarLabel: "Places",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-map" : "md-map"}
    />
  )
};

const EventListStack = createStackNavigator({
  EventList: EventListScreen,
  EventScreen: EventScreen
});

EventListStack.navigationOptions = {
  tabBarLabel: "Events",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-calendar" : "md-calendar"}
    />
  )
};

export default createBottomTabNavigator({
  HomeStack,
  ActivitiesStack,
  PlacesStack,
  EventListStack
});
