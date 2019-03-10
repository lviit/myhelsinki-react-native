import React from "react";
import { View } from "react-native";
import {
  createStackNavigator,
  createMaterialTopTabNavigator
} from "react-navigation";
import { MaterialTopTabBar } from "react-navigation-tabs";
import { Constants } from "expo";

import AboutScreen from "../screens/AboutScreen";
import ActivitiesListScreen from "../screens/ActivitiesListScreen";
import PlacesListScreen from "../screens/PlacesListScreen";
import EventListScreen from "../screens/EventListScreen";
import DetailsScreen from "../screens/DetailsScreen";
import MapScreen from "../screens/MapScreen";

const ActivitiesStack = createStackNavigator(
  {
    ActivitiesList: ActivitiesListScreen,
    DetailsScreen: DetailsScreen,
    MapScreen: MapScreen
  },
  { headerMode: "none" }
);

ActivitiesStack.navigationOptions = {
  tabBarLabel: "Activities"
};

const PlacesStack = createStackNavigator(
  {
    PlacesList: PlacesListScreen,
    DetailsScreen: DetailsScreen,
    MapScreen: MapScreen
  },
  { headerMode: "none" }
);

PlacesStack.navigationOptions = {
  tabBarLabel: "Places"
};

const EventListStack = createStackNavigator(
  {
    EventList: EventListScreen,
    DetailsScreen: DetailsScreen,
    MapScreen: MapScreen
  },
  { headerMode: "none" }
);

EventListStack.navigationOptions = {
  tabBarLabel: "Events"
};

const AboutStack = createStackNavigator(
  {
    About: AboutScreen
  },
  { headerMode: "none" }
);

AboutStack.navigationOptions = {
  tabBarLabel: "About"
};

export default createMaterialTopTabNavigator(
  {
    ActivitiesStack,
    PlacesStack,
    EventListStack,
    AboutStack
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
