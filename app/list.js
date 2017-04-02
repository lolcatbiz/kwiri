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
    var dataUrl = "https://api.airtable.com/v0/app863P5eKD1VjAPh/Produces?api_key=keycA6O6ZQHG2DLdb&1"
    this.setState({loading: true})

    fetch(dataUrl).then( (res) => {
        res.json().then( (data) => {
            let produces = data.records.map( (record) => {
              record.fields.availabilityFresh = record.fields.availabilityFresh || []
              record.fields.availabilityStored = record.fields.availabilityStored || []
              record.fields.displayName = record.fields.displayName && record.fields.displayName.length > 0 ? record.fields.displayName  : record.fields.name
              return record.fields
            })

            this.setState({
              produces: produces,
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  }
})
