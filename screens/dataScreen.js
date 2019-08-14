import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView
} from 'react-native';
import API_KEY from '../config.js';

export default class DataScreen extends React.Component {
  constructor() {
    super();

    this.state = {
      'city': '',
      'country': '',
      'temp': null,
      'humidity': null,
      'desc': '',
      'API_KEY': API_KEY,
    }
  }

  componentDidMount() {
    let location = this.props.navigation.getParam('location', null).replace('/\s/g', "");

    const URL = `http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${this.state.API_KEY}&units=imperial`;

    fetch(URL)
      .then(response => response.json())
      .then(info => {
        this.setState({
          'city': info.name,
          'country': info.sys.country,
          'temp': info.main.temp.toFixed(0),
          'humidity': info.main.humidity,
          'desc': info.weather[0].description,
        });
      })
  }

  static navigationOptions = {
    title: 'Weather Info',
  }

  render() {
    console.log(this.state);
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
      <ImageBackground
        source={require('../assets/bg.jpg')}
        style={{ width: '100%', height: '100%' }}
      >
        <ScrollView>
          <View style={styles.infoContainer}>
            <View style={styles.infoHeader}>
              <Text style={styles.infoHeaderText}>City</Text>
            </View>
            <Text style={styles.infoText}>
              {this.state.city}
            </Text>
            {/* end of first header for weather info */}

            <View style={styles.infoHeader}>
              <Text style={styles.infoHeaderText}>Country</Text>
            </View>
            <Text style={styles.infoText}>
              {this.state.country}
            </Text>
            {/* end of second header for weather info */}

            <View style={styles.infoHeader}>
              <Text style={styles.infoHeaderText}>Current Temperature</Text>
            </View>
            <Text style={styles.infoText}>
              {this.state.temp}&#8457;
            </Text>
            {/* end of third header for weather info */}

            <View style={styles.infoHeader}>
              <Text style={styles.infoHeaderText}>Humidity</Text>
            </View>
            <Text style={styles.infoText}>
              {this.state.humidity}%
            </Text>
            {/* end of fourth header for weather info */}

            <View style={styles.infoHeader}>
              <Text style={styles.infoHeaderText}>Description</Text>
            </View>
            <Text style={styles.infoText}>
              {this.state.desc}
            </Text>
            {/* end of fifth header for weather info */}

          </View>
        </ScrollView>
      </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoHeader: {
    backgroundColor: 'white',
    alignSelf: 'stretch',
    alignItems: 'center',
    padding: 10,
  },
  infoHeaderText: {
    fontSize: 32,
    color: 'black',
    fontWeight: 'bold',
  },
  infoText: {
    fontSize: 26,
    color: 'white',
    fontWeight: 'bold',
    padding: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    alignSelf: 'stretch',
    textAlign: 'center',
  }
});
