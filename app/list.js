import React, { Component } from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
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

  newProducesForCurrentMonth() {
    let currentMonth = (new Date()).getMonth() + 1
    currentMonth = currentMonth >= 10 ? currentMonth.toString() : "0" + currentMonth
    return (this.state.produces || []).filter( produce => {
      return produce.availabilityFresh.indexOf(currentMonth) == 0
    })
  }

  freshProducesForCurrentMonth() {
    let currentMonth = (new Date()).getMonth() + 1
    currentMonth = currentMonth >= 10 ? currentMonth.toString() : "0" + currentMonth
    return (this.state.produces || []).filter( produce => {
      return produce.availabilityFresh.indexOf(currentMonth) > 0
    })
  }

  storedProducesForCurrentMonth() {
    let currentMonth = (new Date()).getMonth() + 1
    currentMonth = currentMonth >= 10 ? currentMonth.toString() : "0" + currentMonth
    return (this.state.produces || []).filter( produce => {
      return produce.availabilityStored.indexOf(currentMonth) != -1
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{ this.state.loading ? "..." : "" }</Text>

        <Text>Die neue Ernte</Text>
        <View style={styles.list}>
          { this.newProducesForCurrentMonth().map( produce => {
            return <Produce produce={produce} key={produce.id} />
          })}
        </View>

        <Text>Frischer wirds nicht</Text>
        <View style={styles.list}>
          { this.freshProducesForCurrentMonth().map( produce => {
            return <Produce produce={produce} key={produce.id} />
          })}
        </View>

        <Text>Gut Gelagertes Gemüse</Text>
        <View style={styles.list}>
          { this.storedProducesForCurrentMonth().map( produce => {
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
