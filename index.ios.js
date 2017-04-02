import React, { Component } from 'react';
import {AppRegistry, StyleSheet, Text, View, ScrollView } from 'react-native';
import List from './app/list'
import months from './app/months'

export default class kwiri extends Component {
  render() {
    var currentMonthId = (new Date()).getMonth()
    var currentMonth = months[currentMonthId]
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Kwiri im { currentMonth }
        </Text>
        <ScrollView style={{width: '100%'}}>
          <List />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0C9A3',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 20,
    fontFamily: 'Cochin',
    fontWeight: 'bold'
  }
});

AppRegistry.registerComponent('kwiri', () => kwiri);
