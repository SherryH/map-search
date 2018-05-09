import React from "react";
import { Platform, View, Text, StyleSheet } from "react-native";
import { Constants, Location, Permissions } from "expo";
import MapView, { Marker } from "react-native-maps";

export default class MapScreen extends React.Component {
  constructor(props) {
    super(props);
    this.onRegionChangeComplete = this.onRegionChangeComplete.bind(this);
    this._getLocationAsync = this._getLocationAsync.bind(this);
    this.state = {
      region: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.0122,
        longitudeDelta: 0.0221
      },
      marker: {
        latlng: { latitude: -36.8800718, longitude: 174.77537 },
        title: "Your Place",
        description: "2 Kipling Ave"
      },
      currentLocation: "",
      errorMessage: ""
    };
  }

  componentDidMount() {
    // getLocation doesnot work on Android simulator
    if (Platform.OS === "android" && !Constants.isDevice) {
      this.setState({
        errorMessage:
          "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      });
    }
    this._getLocationAsync();
  }
  async _getLocationAsync() {
    // Permissions.askAsync to ask for permission to access location
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    // if not granted, error message
    if (status !== "granted") {
      this.setState({ errorMessage: "No permission" });
    }

    // check why device doesnt return correct currentPosition
    const locObj = await Location.getProviderStatusAsync();
    console.log("device:", locObj);

    let location = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true
    });

    const newMarker = {
      latlng: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      },
      description: "Orion Health"
    };
    this.setState({
      location,
      marker: newMarker
    });
  }
  onRegionChangeComplete(region) {
    console.log(region);
    this.setState({ region });
  }
  render() {
    const { marker, errorMessage, location } = this.state;
    console.log("OH coord?", this.state.marker.latlng);
    let text = errorMessage || JSON.stringify(location);
    return (
      <View style={styles.wrapper}>
        <MapView
          style={styles.mapStyle}
          region={this.state.region}
          onRegionChangeComplete={this.onRegionChangeComplete}
          showsUserLocation={true}
        >
          <Marker
            coordinate={marker.latlng}
            title={marker.title}
            description={marker.description}
          />
        </MapView>
        <Text style={styles.textStyle}>{text}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    position: "relative"
  },
  mapStyle: {
    ...StyleSheet.absoluteFillObject
  },
  textStyle: {
    backgroundColor: "white",
    position: "absolute",
    bottom: 0,
    width: "100%"
  }
});
