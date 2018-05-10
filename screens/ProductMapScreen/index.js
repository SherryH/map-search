import React from "react";
import { StyleSheet, FlatList, View, Text } from "react-native";
import MapView from "react-native-maps";
import Swipeout from "react-native-swipeout";
import GooglePlaceSearchBar from "./GooglePlaceSearchBar";
import ListItem from "./ListItem";

export default class ProductMapScreen extends React.Component {
  constructor(props) {
    super(props);
    this._deleteItem = this._deleteItem.bind(this);
    this._selectLocation = this._selectLocation.bind(this);
    this.state = {
      region: {
        latitude: -36.8800718,
        longitude: 174.77537,
        latitudeDelta: 0.0122,
        longitudeDelta: 0.0221
      },
      locations: []
    };
  }

  _deleteItem(selectedItemId) {
    this.setState(prevState => {
      return {
        locations: prevState.locations.filter(
          location => location.id !== selectedItemId
        )
      };
    });
  }

  _selectLocation(details) {
    this.setState(prevState => {
      const length = prevState.locations.length;
      const newId = length > 0 ? prevState.locations[length - 1].id + 1 : 0;
      const formatted_address = details.formatted_address;
      const latlng = {
        latitude: details.geometry.location.lat,
        longitude: details.geometry.location.lng
      };
      return {
        locations: [
          ...prevState.locations,
          { id: newId, formatted_address, latlng }
        ]
      };
    });
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <MapView style={styles.map} region={this.state.region} />
        <GooglePlaceSearchBar onPress={this._selectLocation} />
        {this.state.locations.length > 0 && (
          <FlatList
            style={styles.list}
            data={this.state.locations}
            renderItem={({ item }) => {
              return (
                <ListItem location={item} _deleteItem={this._deleteItem} />
              );
            }}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: { position: "relative", flex: 1, flexDirection: "column" },
  map: {
    ...StyleSheet.absoluteFillObject,
    flex: 1
  },
  list: {
    flex: 1,
    bottom: 0,
    position: "absolute",
    height: "50%",
    width: "100%",
    backgroundColor: "white"
  }
});
