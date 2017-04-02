import React, { Component } from 'react';
import {StyleSheet, Text, View, TouchableHighlight, Image} from 'react-native';
import Markdown from 'react-native-simple-markdown'
import ProduceDetails from './produce_details'

export default class RecipeDetails extends Component {
  onSelect(produce) {
    this.context.getNavigator().push({
      component: ProduceDetails,
      passProps: { produce: produce },
      title: produce.displayName,
    })
  }

  render() {
    let recipe = this.props.recipe
    let produces = this.context.getProduces().filter( produce => {
      return (produce.recipes || []).indexOf(recipe.id) != -1
    })

    return <View style={this.styles().container}>
        <Markdown style={this.styles().description}>{recipe.description}</Markdown>
        <Text style={this.styles().headline}>Zutaten</Text>

        { produces.map( produce => {
          return <TouchableHighlight onPress={this.onSelect.bind(this, produce)} key={produce.id}>
            <Text style={this.styles().text}>{produce.displayName}</Text>
          </TouchableHighlight>
        })}

    </View>
  }

  styles() {
    let recipe = this.props.recipe

    return StyleSheet.create({
      container: {
        backgroundColor: "#f06",
        padding: 16,
        paddingTop: 70
      },

      text: {
        fontFamily: 'Cochin',
        padding: 16,
        fontSize: 18
      },

      headline: {
        fontFamily: 'Cochin',
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 8,
        marginBottom: 8
      },

      description: {
        fontFamily: 'Cochin',
        fontSize: 18
      }
    });
  }
}

RecipeDetails.contextTypes = {
  getNavigator: React.PropTypes.func,
  getRecipes:   React.PropTypes.func,
  getProduces:  React.PropTypes.func
};
