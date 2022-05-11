import React from "react";
import { StyleSheet, View } from "react-native";
import MapboxGL, { Camera, PointAnnotation } from "@react-native-mapbox-gl/maps";

// access token for Mapbox from environment variables
const token = process.env.MAPBOX_ACCESS_TOKEN;
MapboxGL.setAccessToken('pk.eyJ1IjoiYmVuYmQiLCJhIjoiY2t6emtrNmVtMGI2OTNicDZjc3NpazVxMSJ9.4kcetBipo--n5-ofd9MkJQ');

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  container: {
    height: 300,
    width: '100%',
    backgroundColor: "tomato"
  },
  map: {
    flex: 1
  }
});

function Map({ coordinate }) {

  const longitude = Number(coordinate.longitude);
  const latitude = Number(coordinate.latitude)
  const coordinates = [longitude, latitude];
  console.log('coordinates', coordinates);

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <MapboxGL.MapView
          style={styles.map}
          zoomEnabled={true}
        >
          <Camera
            zoomLevel={15}
            centerCoordinate={coordinates}
            animationMode="flyTo"
            animationDuration={2000}
          />
          <PointAnnotation
            key="1"
            id="1"
            coordinate={coordinates}
            onPress={() => {
              console.log("Marker pressed");
            }}
          />
        </MapboxGL.MapView>
      </View>
    </View>
  );
}
export default Map;