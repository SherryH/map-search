import React from "react";
import { StyleSheet, FlatList, View, Text } from "react-native";
import MapView from "react-native-maps";
import Swipeout from "react-native-swipeout";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import DEV_API from "../config";

class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.swipeoutBtns = [
      {
        text: "-",
        type: "delete",
        onPress: () => {
          this.props._deleteItem(this.props.location.id);
        }
      }
    ];
  }
  render() {
    return (
      <Swipeout style={styles.swipeout} left={this.swipeoutBtns}>
        <Text style={styles.listItem}>
          {this.props.location.formatted_address}
        </Text>
      </Swipeout>
    );
  }
}

const GooglePlaceSearchBar = props => (
  <GooglePlacesAutocomplete
    placeholder="Enter Location"
    minLength={2}
    autoFocus={false}
    listViewDisplayed="auto"
    returnKeyType={"default"}
    fetchDetails={true}
    renderDescription={row => row.description}
    onPress={(data, details = null) => {
      props.onPress(details);
    }}
    query={{
      key: DEV_API,
      language: "en",
      components: "country:nz"
    }}
    currentLocation={true}
    currentLocationLabel="Current location"
    debounce={200}
    styles={{
      textInputContainer: styles.textInputContainer,
      textInput: styles.textInput,
      predefinedPlacesDescription: styles.predefinedPlacesDescription,
      listView: styles.listView
    }}
  />
);

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
  },
  listItem: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginBottom: StyleSheet.hairlineWidth,
    backgroundColor: "white"
  },
  swipeout: {
    borderBottomColor: "black",
    borderBottomWidth: 1
  },

  textInputContainer: {
    backgroundColor: "rgba(0,0,0,0)",
    borderTopWidth: 0,
    borderBottomWidth: 0,
    flex: 1
  },
  textInput: {
    marginLeft: 0,
    marginRight: 0,
    height: 38,
    color: "#5d5d5d",
    fontSize: 16
  },
  predefinedPlacesDescription: {
    color: "#1faadb"
  },
  listView: {
    top: 39,
    position: "absolute",
    backgroundColor: "white",
    zIndex: 5
  }
});
