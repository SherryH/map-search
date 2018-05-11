import React from 'react';
import { StyleSheet, Text } from 'react-native';
import Swipeout from 'react-native-swipeout';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  listItem: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginBottom: StyleSheet.hairlineWidth,
    backgroundColor: 'white'
  },
  swipeout: {
    borderBottomColor: 'black',
    borderBottomWidth: 1
  }
});

export default class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.swipeoutBtns = [
      {
        text: '-',
        type: 'delete',
        onPress: () => {
          this.props._deleteItem(this.props.location.place_id);
        }
      }
    ];
  }
  render() {
    return (
      <Swipeout style={styles.swipeout} left={this.swipeoutBtns}>
        <Text style={styles.listItem}>{this.props.location.formatted_address}</Text>
      </Swipeout>
    );
  }
}

ListItem.propTypes = {
  _deleteItem: PropTypes.func,
  location: PropTypes.shape({
    place_id: PropTypes.string,
    formatted_address: PropTypes.string
  })
};

ListItem.defaultProps = {
  _deleteItem: () => {},
  location: { place_id: '', formatted_address: '' }
};
