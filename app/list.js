import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';

import Produce from './produce'

export default class List extends Component {
  constructor() {
    super(...arguments)
    this.state = {
      loading: false,
      produces: null
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

            window.produces = data.feed.entry.map( (entry) => {
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
              produces: window.produces,
              loading: false
            })
        })
    })
  }

  render() {
    let currentMonth = (new Date()).getMonth() + 1
    currentMonth = currentMonth >= 10 ? currentMonth.toString() : "0" + currentMonth
    var produces = this.state.produces || []
    produces = produces.filter( produce => {
      return produce.availabilityFresh.indexOf(currentMonth) != -1 || produce.availabilityStored.indexOf(currentMonth) != -1
    }).sort( (a, b) => {
      return a.availabilityStored.indexOf(currentMonth)
    })

    return (
      <View style={styles.container}>
        <Text>{ this.state.loading ? "..." : "" }</Text>
        <View style={styles.list}>
          { produces.map( produce => {
            return <Produce produce={produce} key={produce.id} />
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
})
