import React, { Component } from 'react';
import {StyleSheet, Text, View, TouchableHighlight, Image} from 'react-native';
import ProduceDetails from './produce_details'

export default class Produce extends Component {
  onSelect() {
    this.context.getNavigator().push({
      component: ProduceDetails,
      passProps: { produce: this.props.produce },
      title: this.props.produce.displayName,
    })
  }
  render() {
    let produce = this.props.produce
    let style = StyleSheet.create({
      container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: produce.color ||  "#fff",
        width: 120,
        height: 120,
        margin: 16
      }})
    return <TouchableHighlight onPress={this.onSelect.bind(this)}>
      <View style={style.container}>
        <Text style={styles.text}>{produce.displayName}</Text>
      </View>
    </TouchableHighlight>
  }
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Cochin',
    color: 'black',
  }
});

Produce.contextTypes = {
  getNavigator: React.PropTypes.func,
  getRecipes: React.PropTypes.func,
  getProduces: React.PropTypes.func
};
