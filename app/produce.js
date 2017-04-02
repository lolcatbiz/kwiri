import React, { Component } from 'react';
import {StyleSheet, Text, View, TouchableHighlight, Image} from 'react-native';


export default class Produce extends Component {
  onSelect() {
    alert('hey')
    console.log('ok')
  }
  render() {
    let produce = this.props.produce
    return <TouchableHighlight onPress={this.onSelect.bind(this)}>
      <View style={styles.container}>
        <Text style={styles.text}>{produce.displayName}</Text>
        <Image
          style={{width: 50, height: 50}}
          source={{uri: produce.image_url}}
        />
      </View>
    </TouchableHighlight>
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#8ABF6B',
    width: 120,
    height: 120,
    margin: 16
  },

  text: {
    fontFamily: 'Cochin',
  }
});

Produce.contextTypes = {
  navigator: React.PropTypes.object
};
