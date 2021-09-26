import React, { useState, useEffect } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';



function Map() {

  const [location, setLocation] = useState({
    "timestamp": 1632666372592,
    "mocked": false,
    "coords": {
        "altitude": 795.3695790194122,
        "heading": 0,
        "altitudeAccuracy": null,
        "latitude": 12.9534745,
        "speed": 0,
        "longitude": 77.7324429,
        "accuracy": 964
    }
});

  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getLastKnownPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = 'Waiting.............';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

    //  console.log(typeof(text))
    //  console.log(text)
     console.log(typeof(location))
     console.log(location)

    return (
      <>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        >
          <Marker
            style={styles.mapMarker}
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            image={require('./assets/images/location.png')}
            title='This First'
            description='description of 1st'
          />

        </MapView>
      </>
    )
  }

  const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      height: 400,
      width: 400,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    mapMarker: {
      width: 20,
      height: 20,
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
  });


  export default Map
