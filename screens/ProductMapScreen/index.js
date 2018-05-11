import React from 'react';
import { StyleSheet, FlatList, View, Text } from 'react-native';
import MapView from 'react-native-maps';
import Swipeout from 'react-native-swipeout';
import GooglePlaceSearchBar from './GooglePlaceSearchBar';
import ListItem from './ListItem';
import DestinationHeader from './DestinationHeader';

export default class ProductMapScreen extends React.Component {
  constructor(props) {
    super(props);
    this._deleteItem = this._deleteItem.bind(this);
    this._selectLocation = this._selectLocation.bind(this);
    this.onRegionChangeComplete = this.onRegionChangeComplete.bind(this);
    this._search = this._search.bind(this);
    this.state = {
      region: {
        latitude: -36.864019,
        longitude: 174.7640687,
        latitudeDelta: 0.0122,
        longitudeDelta: 0.0221
      },
      locations: []
    };
  }

  _deleteItem(selectedItemId) {
    this.setState(prevState => ({
      locations: prevState.locations.filter(location => location.place_id !== selectedItemId)
    }));
  }

  _selectLocation(details) {
    this.setState((prevState) => {
      const formatted_address = details.formatted_address;
      const place_id = details.place_id;
      const latlng = {
        latitude: details.geometry.location.lat,
        longitude: details.geometry.location.lng
      };
      return {
        locations: [...prevState.locations, { place_id, formatted_address, latlng }]
      };
    });
  }

  _search() {
    const places = locations.reduce(
      (pre, cur) => (pre ? `${pre}|place_id:${cur.place_id}` : `place_id:${cur.place_id}`),
      ''
    );
    console.log('places', places);
    // put the places_id as the origins and destinations to Google Distance Matrix
    // get the matrix for relative time/ distance between each point
    // Use the nearest neighbour heuristics to solve Travelling Salesman
    // https://web.tuke.sk/fei-cit/butka/hop/htsp.pdf
  }

  onRegionChangeComplete(region) {
    this.setState({ region });
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <MapView
          style={styles.map}
          region={this.state.region}
          onRegionChangeComplete={this.onRegionChangeComplete}
        />
        <GooglePlaceSearchBar onPress={this._selectLocation} />
        {this.state.locations.length > 0 && (
          <FlatList
            style={styles.list}
            data={this.state.locations}
            ListHeaderComponent={<DestinationHeader search={this._search} />}
            renderItem={({ item }) => <ListItem location={item} _deleteItem={this._deleteItem} />}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: { position: 'relative', flex: 1, flexDirection: 'column' },
  map: {
    ...StyleSheet.absoluteFillObject,
    flex: 1
  },
  list: {
    flex: 1,
    bottom: 0,
    position: 'absolute',
    height: '50%',
    width: '100%',
    backgroundColor: 'white'
  }
});
