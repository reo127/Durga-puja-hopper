import React, { useState, useEffect } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';



function Map() {

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }
 
     console.log(typeof(text))

    return (
      <>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={{
            latitude: 12.971284,
            longitude: 77.748679,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        >
          <Marker
            style={styles.mapMarker}
            coordinate={{
              latitude: 12.971284,
              longitude: 77.748679,
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
