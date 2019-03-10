import React from "react";
import { View } from "react-native";
import {
  createStackNavigator,
  createMaterialTopTabNavigator
} from "react-navigation";
import { MaterialTopTabBar } from "react-navigation-tabs";
import { Constants } from "expo";

import AboutScreen from "../screens/AboutScreen";
import ListScreen from "../screens/ListScreen";
import DetailsScreen from "../screens/DetailsScreen";
import MapScreen from "../screens/MapScreen";

const ActivitiesStack = createStackNavigator(
  {
    ListScreen: props => <ListScreen {...props} type="activity" />,
    DetailsScreen,
    MapScreen
  },
  {
    headerMode: "none",
    navigationOptions: {
      tabBarLabel: "Activities"
    }
  }
);

const PlacesStack = createStackNavigator(
  {
    ListScreen: props => <ListScreen {...props} type="place" />,
    DetailsScreen,
    MapScreen
  },
  {
    headerMode: "none",
    navigationOptions: {
      tabBarLabel: "Places"
    }
  }
);

const EventListStack = createStackNavigator(
  {
    ListScreen: props => <ListScreen {...props} type="event" />,
    DetailsScreen,
    MapScreen
  },
  {
    headerMode: "none",
    navigationOptions: {
      tabBarLabel: "Events"
    }
  }
);

const AboutStack = createStackNavigator(
  {
    About: AboutScreen
  },
  {
    headerMode: "none",
    navigationOptions: {
      tabBarLabel: "About"
    }
  }
);

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
          fontFamily: "ibm-plex-sans-condensed-bold",
          color: "#3f3f3f"
        }}
        indicatorStyle={{ backgroundColor: "#aaa", height: 3 }}
        jumpToIndex={() => {}}
      />
    </View>
  );
}
