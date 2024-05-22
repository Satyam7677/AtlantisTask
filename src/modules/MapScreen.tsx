// MapScreen.js
import React, { useState, useRef, useMemo } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import BottomSheet from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import markersData from '../utilities/dummyData'
import colors from '../utilities/colors';


const MapScreen = () => {
  const [selectedMarker, setSelectedMarker]:any = useState({title:'',description:''});
  const bottomSheetRef:any = useRef(null);
  const navigation:any=useNavigation()
  const snapPoints = useMemo(() => ['30%', '50%'], []);

  const handleMarkerPress = (marker:any) => {
    setSelectedMarker(marker);
    bottomSheetRef.current.snapToIndex(0);
  };

  const handleClosePress = () => {
    setSelectedMarker({title:'',description:''});
    bottomSheetRef.current.close();
  };

  const getMoreInfo=(lat:any, long:any)=>{
    navigation.navigate('LocationInformation',selectedMarker)
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <MapView
          provider={'google'}
          style={styles.map}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {markersData.map(marker => (
            <Marker
              key={marker.id}
              coordinate={marker.coordinate}
              title={marker.title}
              description={marker.description}
              onPress={() => handleMarkerPress(marker)}
            />
          ))}
        </MapView>
      </View>
      <BottomSheet
  ref={bottomSheetRef}
  index={-1}
  snapPoints={snapPoints}
  onChange={(index) => {
    if (index === -1) setSelectedMarker({ title: '', description: '' });
  }}
>
  {selectedMarker && (
    <View style={styles.bottomSheetContent}>
      <Text style={styles.title}>{selectedMarker.title}</Text>
      <Text style={styles.description}>{selectedMarker.description}</Text>
      <TouchableOpacity style={styles.moreInfoButton} onPress={() => getMoreInfo(selectedMarker.coordinate.latitude, selectedMarker.coordinate.longitude)}>
        <Text style={styles.buttonText}>Get more Info</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.closeButton} onPress={handleClosePress}>
        <Text style={styles.buttonText}>Close</Text>
      </TouchableOpacity>
    </View>
  )}
</BottomSheet>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  bottomSheetContent: {
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    marginBottom: 10,
  },
  moreInfoButton: {
    backgroundColor: colors.blue,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: colors.red,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default MapScreen;
