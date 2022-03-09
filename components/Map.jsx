import React, { useState, useEffect } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Image } from 'react-native';
import * as Location from 'expo-location';
import Data from './Puja_locations.json'



function Map() {

  // Set a defult location to avoid a useEffect render error
  const [location, setLocation] = useState({
    "timestamp": 1632666372592,
    "mocked": false,
    "coords": {
      "altitude": 795.3695790194122,
      "heading": 0,
      "altitudeAccuracy": null,
      "latitude": 22.974918,
      "speed": 0,
      "longitude": 88.434626,
      "accuracy": 964
    }
  });

  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      // This check and ask for permission
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      // It's take the location cordenats to the location variable and set the location state
      let location = await Location.getLastKnownPositionAsync({});
      setLocation(location);
    });
  }, []);

  let text = 'Waiting.............';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

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
          image={require('./assets/images/location3.png')}
          title='Me 😊'
        // description='description of 1st'
        />


        {Data.map((cords, index) => {
          return (
            <>
              <Marker
              key= {cords.id}
                style={styles.pandalLocation}
                coordinate={{
                  latitude: cords.latitude,
                  longitude: cords.longitude,
                }}
                
                image={require('./assets/images/pin3.png')}
                title={cords.name}
              // description='description of 1st'
              />
            </>
          )
        })}

      </MapView>
    </>
  )
}

const styles = StyleSheet.create({
  mapMarker: {
    width: 2,
    height: 2,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  pandalLocation:{

  }
});


export default Map
