import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';

import Ingredient from './ingredient'

export default class List extends Component {
  constructor() {
    super(...arguments)
    this.state = {
      loading: false,
      ingredients: null
    }
  }

  componentDidMount() {
    this.loadData()
  }

  loadData() {
    var dataUrl = "https://spreadsheets.google.com/feeds/list/1vvwgg3KVj0LGL86dqyW1Ey-G7bcXheGIVIDMzA8LMus/od6/public/values?alt=json"
    this.setState({loading: true})
    fetch(dataUrl).then( (res) => {
        res.json().then( (data) => {
            console.log(data)

            window.ingredients = data.feed.entry.map( (entry) => {
              var displayName = entry["gsx$displayname"]["$t"]
              return {
                id: entry["gsx$id"]["$t"],
                name: entry["gsx$name"]["$t"],
                displayName: displayName && displayName.length > 0 ? displayName : entry["gsx$name"]["$t"],
                availabilityFresh: entry["gsx$defresh"]["$t"],
                availabilityStored: entry["gsx$destored"]["$t"],

                //months: entry["gsx$months"]["$t"],
                //image_url: entry["gsx$imageurl"]["$t"]
              }
            })
            this.setState({
              ingredients: window.ingredients,
              loading: false
            })
        })
    })
  }

  render() {
    let currentMonth = (new Date()).getMonth() + 1
    currentMonth = currentMonth >= 10 ? currentMonth.toString() : "0" + currentMonth
    var ingredients = this.state.ingredients || []
    ingredients = ingredients.filter( ingredient => {
      return ingredient.availabilityFresh.indexOf(currentMonth) != -1 || ingredient.availabilityStored.indexOf(currentMonth) != -1
    }).sort( (a, b) => {
        return a.availabilityFresh.indexOf(currentMonth)
    })

    return (
      <View style={styles.container}>
        <Text>{ this.state.loading ? "..." : "" }</Text>
        <View style={styles.list}>
          { ingredients.map( ingredient => {
            return <Ingredient ingredient={ingredient} key={ingredient.id} />
          })}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  },
  list: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
