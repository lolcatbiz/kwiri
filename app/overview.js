import React, { Component } from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import months from './months'
import List from './list'

export default class Overview extends Component {
  render() {
      var currentMonthId = (new Date()).getMonth()
      var currentMonth = months[currentMonthId]
      return <View style={styles.container}>
          <ScrollView style={{width: '100%'}}>
            <List />
          </ScrollView>
      </View>
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
