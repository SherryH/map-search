import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  Button
} from "react-native";
import Touchable from "react-native-platform-touchable";
import Swipeout from "react-native-swipeout";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import PropTypes from "prop-types";

class MyListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { colorOn: true };
    // Buttons
    this.swipeoutBtns = [
      {
        text: "-",
        type: "delete",
        onPress: () => {
          this.props._deleteItem(this.props.id);
        }
      }
    ];
    this._onPress = this._onPress.bind(this);
  }
  _onPress() {
    this.setState(prevState => ({ colorOn: !prevState.colorOn }));
  }

  render() {
    const color = this.state.colorOn ? "blue" : "red";
    console.log("text", this.props.text);

    return (
      <View>
        <Swipeout left={this.swipeoutBtns}>
          <Touchable
            background={Touchable.Ripple("yellow", false)}
            style={styles.listWrapper}
          >
            <Text style={{ color, fontSize: 15 }}>{this.props.text}</Text>
          </Touchable>
        </Swipeout>
      </View>
    );
  }
}

MyListItem.propTypes = {
  deleteItem: PropTypes.func,
  id: PropTypes.number,
  text: PropTypes.string
};

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: "Todo List"
  };

  constructor(props) {
    super(props);
    this.state = {
      list: [{ id: 1, text: "List 1" }, { id: 2, text: "List 2" }],
      text: ""
    };
    this._deleteItem = this._deleteItem.bind(this);
  }

  _deleteItem(id) {
    this.setState(prevState => {
      const newList = prevState.list.filter(item => item.id !== id);
      return { list: newList };
    });
  }

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
      <View>
        <Text>A To-Do List</Text>
        <View>
          <TextInput
            style={{ height: 40 }}
            placeholder="Enter your To-Do list!"
            onChangeText={text => this.setState({ text })}
            value={this.state.text}
          />
          <Button
            title="+"
            onPress={() => {
              this.setState(prevState => {
                const list = prevState.list;
                const newId = list[list.length - 1].id + 1;
                return {
                  list: [...list, { id: newId, text: prevState.text }],
                  text: ""
                };
              });
            }}
          />
        </View>
        <FlatList
          data={this.state.list}
          renderItem={({ item }) => (
            <MyListItem
              _deleteItem={this._deleteItem}
              id={item.id}
              text={item.text}
            />
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listWrapper: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 15,
    flexDirection: "row",
    borderBottomColor: "black",
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: StyleSheet.hairlineWidth
  }
});
