import React from "react";
import { StyleSheet, FlatList, View, Text } from "react-native";
import MapView from "react-native-maps";
import Swipeout from "react-native-swipeout";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

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

const GooglePlaceSearchBar = () => (
  <GooglePlacesAutocomplete
    placeholder="Enter Location"
    minLength={2}
    autoFocus={false}
    returnKeyType={"default"}
    fetchDetails={true}
    styles={{
      textInputContainer: styles.textInputContainer,
      textInput: styles.textInput,
      predefinedPlacesDescription: styles.predefinedPlacesDescription
    }}
    currentLocation={false}
  />
);

export default class ProductMapScreen extends React.Component {
  constructor(props) {
    super(props);
    this._deleteItem = this._deleteItem.bind(this);
    this.state = {
      region: {
        latitude: -36.8800718,
        longitude: 174.77537,
        latitudeDelta: 0.0122,
        longitudeDelta: 0.0221
      },
      locations: [
        {
          id: 1,
          formatted_address: "10 Park Rd",
          latlng: { latitude: -36.93420141970849, longitude: 174.6643594802915 }
        },
        {
          id: 2,
          formatted_address: "154 Queen St",
          latlng: { latitude: -36.8464272197085, longitude: 174.7673765802915 }
        }
      ]
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

  render() {
    return (
      <View style={styles.wrapper}>
        <MapView style={styles.map} region={this.state.region} />
        <GooglePlaceSearchBar />
        <FlatList
          style={styles.list}
          data={this.state.locations}
          renderItem={({ item }) => {
            return <ListItem location={item} _deleteItem={this._deleteItem} />;
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: { position: "relative", flex: 1, flexDirection: "column" },
  map: {
    ...StyleSheet.absoluteFillObject,
    height: "50%",
    flex: 1
  },
  list: {
    flex: 1,
    bottom: 0,
    position: "absolute",
    height: "50%",
    width: "100%"
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
  }
});
