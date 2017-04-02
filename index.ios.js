import React, { Component } from 'react';
import {AppRegistry, StyleSheet, Text, View, ScrollView, NavigatorIOS } from 'react-native'
import List from './app/list'
import months from './app/months'
import Overview from './app/overview'

export default class kwiri extends Component {
  constructor() {
    super(...arguments)
    this.state = {}
  }

  componentDidMount() {
    this.loadData()
  }

  getChildContext() {
    return {
      getNavigator: () => this.refs.navigator,
      getRecipes:   () => this.state.recipes,
      getProduces:  () => this.state.produces
    };
  }

  loadData() {
    fetch("https://api.airtable.com/v0/app863P5eKD1VjAPh/Produces?api_key=keycA6O6ZQHG2DLdb").then( (res) => {
        res.json().then( (data) => {
            let produces = data.records.map( (record) => {
              record.fields.id = record.id
              record.fields.availabilityFresh = record.fields.availabilityFresh || []
              record.fields.availabilityStored = record.fields.availabilityStored || []
              record.fields.displayName = record.fields.displayName && record.fields.displayName.length > 0 ? record.fields.displayName  : record.fields.name
              return record.fields
            })

            this.setState({ produces: produces })
        })
    })

    fetch("https://api.airtable.com/v0/app863P5eKD1VjAPh/Recipes?api_key=keycA6O6ZQHG2DLdb").then( (res) => {
        res.json().then( (data) => {
            this.setState({ recipes: data.records.map( (record) => {
              record.fields.id = record.id
              return record.fields
            })
          })
        })
    })
  }

  render() {
    var currentMonth = months[(new Date()).getMonth()]
    return <NavigatorIOS
        ref="navigator"
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
  getNavigator: React.PropTypes.func,
  getRecipes: React.PropTypes.func,
  getProduces: React.PropTypes.func
};

AppRegistry.registerComponent('kwiri', () => kwiri);
