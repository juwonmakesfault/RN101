import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { Constants } from 'expo';

export default class CityList extends React.Component {
  static navigationOptions = {
    title: 'Cities',
  };

  constructor(props) {
    super(props);

    this.state = {
      cities: [],
    };
  }

  componentDidMount() {
    fetch('http://demo6468405.mockable.io/weather-crawlers/cities')
      .then(response => response.json())
      .then(cities => {
        console.log('cities =', cities.length);
        this.setState({
          cities
        });
      });
  }

  onPressCity(item) {
    this.props.navigation.navigate(
      'Detail',
      {
        city: item
      }
    );
  }

  renderItem(city) {
    return (
      <TouchableOpacity style={styles.item} onPress={() => this.onPressCity(city)}>
        <ImageBackground source={require('./assets/weather.jpg')} style={{width: '100%', height: '100%', }}>
        <Text style={styles.text}>{city}</Text>
        </ImageBackground>
      </TouchableOpacity>
    );
  }

  render() {
    return (

      <FlatList style={styles.container}
                renderItem={({ item }) => this.renderItem(item)}
                keyExtractor={item => item}
                data={this.state.cities}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },

  item: {
    flex: 1,
    height: 50,
    justifyContent: 'center',

    borderWidth: 1,
    borderColor: 'navy',
  },
  text: {
    fontSize: 30,
    color: "white",
    textAlign: 'center',
  }
});
