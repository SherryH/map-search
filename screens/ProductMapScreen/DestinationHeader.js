import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Touchable from 'react-native-platform-touchable';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    flex: 1,
    justifyContent: 'space-between'
  },
  text: {
    fontSize: 20
  },
  buttonContainer: {
    backgroundColor: 'blue',
    paddingHorizontal: 10,
    paddingVertical: 4
  },
  button: {
    color: 'white',
    fontWeight: '600'
  }
});

// export default class DestinationHeader extends React.Component {
//   constructor(props) {
//     super(props);
//   }
//   render() {
//     return <Text style={styles.header}>Destination</Text>;
//   }
// }

const DestinationHeader = props => (
  <View style={styles.header}>
    <Text style={styles.text}>Destinations</Text>
    <Touchable
      style={styles.buttonContainer}
      background={Touchable.Ripple('blue')}
      onPress={props.search}
    >
      <Text style={styles.button}>Direction</Text>
    </Touchable>
  </View>
);

DestinationHeader.propTypes = {
  search: PropTypes.func
};

DestinationHeader.defaultProps = {
  search: () => {}
};

export default DestinationHeader;
