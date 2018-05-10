import React from "react";
import { StyleSheet, Text } from "react-native";
import Swipeout from "react-native-swipeout";

export default class ListItem extends React.Component {
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

const styles = StyleSheet.create({
  listItem: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginBottom: StyleSheet.hairlineWidth,
    backgroundColor: "white"
  },
  swipeout: {
    borderBottomColor: "black",
    borderBottomWidth: 1
  }
});
