import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Constants } from 'expo';

export default class WeatherDetailScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: `Weather Info: ${navigation.getParam('city', 'Unknown')}`,
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const city = navigation.getParam('city', null);

    fetch(`http://192.168.1.114:8080/weather-crawler/current-weathers/by-city-name/${city}`)
      .then(response => response.json())
      .then(info => {
        this.setState({
          ...info,
          isLoading: false,
        });
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <Text>데이터를 불러오는 중입니다.</Text>
        </View>
      )
    }

    let description = this.state.weather[0].description;

    let celsius_current = this.state.main.temp - 273.15;
    let celsius_min = this.state.main.temp_min - 273.15;
    let celsius_max = this.state.main.temp_max - 273.15;
    let pressure = this.state.main.pressure;
    let humidity = this.state.main.humidity;

    let wind_speed = this.state.wind.speed;
    let wind_deg = this.state.wind.deg;

    return (
      <View style={styles.container}>
        <Text>하늘: {description}</Text>
        <Text>현재온도: {celsius_current.toFixed(1)}</Text>
        <Text>최고온도: {celsius_max.toFixed(1)}</Text>
        <Text>최저온도: {celsius_min.toFixed(1)}</Text>
        <Text>기압: {pressure.toFixed(1)}</Text>
        <Text>습도: {humidity.toFixed(1)}</Text>
        <Text>풍속: {wind_speed.toFixed(1)}</Text>
        <Text>풍향: {wind_deg.toFixed(1)}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: Constants.statusBarHeight,
  },
});
