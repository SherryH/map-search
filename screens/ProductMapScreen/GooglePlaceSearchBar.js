import React from "react";
import { StyleSheet, Text } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import DEV_API from "../../config";

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

const styles = StyleSheet.create({
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

export default GooglePlaceSearchBar;
