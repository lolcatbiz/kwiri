import React, { Component } from 'react';
import {StyleSheet, Text, View, TouchableHighlight, Image} from 'react-native';

export default class ProduceDetails extends Component {
  render() {
    let produce = this.props.produce
    return <View style={styles.container}>
        <Text style={styles.text}>{produce.displayName}</Text>
        <Image
          style={{width: 50, height: 50}}
          source={{uri: produce.image_url}}
        />
    </View>
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#8ABF6B',
    margin: 16
  },

  text: {
    fontFamily: 'Cochin',
  }
});

ProduceDetails.contextTypes = {
  navigator: React.PropTypes.object,
  getNavigator: React.PropTypes.func
};
