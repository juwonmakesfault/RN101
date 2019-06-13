import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Image} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Constants } from 'expo';

export default class WeatherDetailScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: `${navigation.getParam('city', 'Unknown')}`,
      headerTitleStyle: {
          fontSize : 30,
          fontFamily: 'Roboto'
      }
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
     var status = description.split(" ");
     if (status.length == 1) {status = status[0];}
     else if (status.length > 1 ){
         status = status[status.length-1];
     }
     console.log(status, status.length);

     switch (status) {
            case "sky":
                description = "md-sunny";
                mdcolor ="yellow";
                break;
            case "rain"://same
            case "drizzle":
                description = "md-rainy";
                mdcolor = "lightblue";
                break;
            case "snow"://same
            case "sleet":
                description = "md-snow";
                mdcolor = "white"
                break;
            case "haze":
                mdcolor = "lightgray";
                description = "md-cloudy";
                break;
            case "clouds":
            case "cloud":
                mdcolor = "white";
                description = "md-cloud";
                break;
            default:
                break;
        }

    let celsius_current = this.state.main.temp - 273.15;
    let celsius_min = this.state.main.temp_min - 273.15;
    let celsius_max = this.state.main.temp_max - 273.15;
    let pressure = this.state.main.pressure;
    let humidity = this.state.main.humidity;

    let wind_speed = this.state.wind.speed;
    let wind_deg = this.state.wind.deg;

    return (
      <ImageBackground source={require('./assets/weather.jpg')} style={{width: '100%', height: '100%', }}>
        <View style={styles.container}>
          <Text style={styles.celsius}><Ionicons name={description} size={50} color={mdcolor} /> {celsius_current.toFixed(1)}°C </Text>
          <Text style={styles.text}>{celsius_min.toFixed(1)}/{celsius_max.toFixed(1)}</Text>
          <Text style={styles.texts}>기압: {pressure.toFixed(1)}</Text>
          <Text style={styles.texts}>습도: {humidity.toFixed(1)}</Text>
          <Text style={styles.texts}>풍속: {wind_speed.toFixed(1)}</Text>
          <Text style={styles.texts}>풍향: {wind_deg.toFixed(1)}</Text>

          <View style={{alignItems: 'flex-end'}}  >
            <Image
            style={{width: 263, height: 252, marginTop: 20,}}
            source={require('./assets/janna.png')}
            />
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    margin: 20,
  },
  texts: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
  },
  celsius: {
    textAlign: 'center',
    fontSize: 50,
    margin: 20,
    color: 'white',
  },
});
