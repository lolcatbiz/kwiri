import React, { Component } from 'react';
import {StyleSheet, Text, View, TouchableHighlight, Image} from 'react-native';
import Markdown from 'react-native-simple-markdown'
import RecipeDetails from './recipe_details'

export default class ProduceDetails extends Component {
  onSelect(recipe) {
    this.context.getNavigator().push({
      component: RecipeDetails,
      passProps: { recipe: recipe },
      title: recipe.name,
    })
  }

  render() {
    let produce = this.props.produce
    let recipes = this.context.getRecipes().filter( recipe => {
      return (recipe.ingredients || []).indexOf(produce.id) != -1
    })

    return <View style={this.styles().container}>
        <Text style={this.styles().headline}>Grundsätzliches</Text>
        <Markdown style={this.styles().description}>
          {produce.description}
        </Markdown>
        <Text style={this.styles().headline}>Rezepte mit {produce.displayName}</Text>

        { recipes.map( recipe => {
          return <TouchableHighlight onPress={this.onSelect.bind(this, recipe)} key={recipe.id}>
            <Text style={this.styles().text}>{recipe.name}</Text>
          </TouchableHighlight>
        })}

    </View>
  }

  styles() {
    let produce = this.props.produce

    return StyleSheet.create({
      container: {
        backgroundColor: produce.color || "#f06",
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

ProduceDetails.contextTypes = {
  getNavigator: React.PropTypes.func,
  getRecipes:   React.PropTypes.func,
  getProduces:  React.PropTypes.func

};
