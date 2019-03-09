import React from "react";
import { View, StyleSheet } from "react-native";
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

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen
  },
  { headerMode: "none" }
);

HomeStack.navigationOptions = {
  tabBarLabel: "Home"
};

const ActivitiesStack = createStackNavigator(
  {
    Activities: ActivitiesListScreen
  },
  { headerMode: "none" }
);

ActivitiesStack.navigationOptions = {
  tabBarLabel: "Activities"
};

const PlacesStack = createStackNavigator(
  {
    Places: PlacesListScreen
  },
  { headerMode: "none" }
);

PlacesStack.navigationOptions = {
  tabBarLabel: "Places"
};

const EventListStack = createStackNavigator(
  {
    EventList: EventListScreen,
    EventScreen: EventScreen,
    MapScreen: MapScreen
  },
  { headerMode: "none" }
);

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
  {
    tabBarComponent: MaterialTopTabBarWithStatusBar,
    tabBarOptions: { scrollEnabled: true }
  }
);

function MaterialTopTabBarWithStatusBar(props) {
  return (
    <View
      style={{
        paddingTop: Constants.statusBarHeight,
        backgroundColor: "#eee"
      }}
    >
      <MaterialTopTabBar
        {...props}
        style={{
          backgroundColor: "#eee"
        }}
        labelStyle={{
          fontFamily: "open-sans-extrabold",
          color: "#3f3f3f"
        }}
        indicatorStyle={{ backgroundColor: "#aaa", height: 3 }}
        jumpToIndex={() => {}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  navTitle: { fontFamily: "open-sans-bold" }
});
