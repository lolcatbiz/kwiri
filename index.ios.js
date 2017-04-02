import React, { Component } from 'react';
import {AppRegistry, StyleSheet, Text, View, ScrollView, NavigatorIOS } from 'react-native'
import List from './app/list'
import months from './app/months'
import Overview from './app/overview'

export default class kwiri extends Component {
  getChildContext() {
    return {navigator: this};
  }

  render() {
    var currentMonth = months[(new Date()).getMonth()]

    return <NavigatorIOS
        initialRoute={{
          component: Overview,
          title: 'kwiri im ' + currentMonth,
        }}
        style={{flex: 1}}
    />

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

kwiri.childContextTypes = {
  navigator: React.PropTypes.object
};

AppRegistry.registerComponent('kwiri', () => kwiri);
