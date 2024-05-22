import { Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import colors from '../utilities/colors'
export default function LocationInformation() {
    const route:any=useRoute()

  const viewOnGoogleMap=()=>{
    const url = `https://www.google.com/maps/search/?api=1&query=${route.params.coordinate.latitude},${route.params.coordinate.longitude}`;
  Linking.openURL(url);
  }

  return (
    <View style={styles.container}>
    <Text style={styles.title}>{route.params.title}</Text>
    <Text style={styles.coordinate}>Latitude: {route.params.coordinate.latitude}</Text>
    <Text style={styles.coordinate}>Longitude: {route.params.coordinate.longitude}</Text>
    <Text>{route.params.description}</Text>
    <TouchableOpacity style={styles.closeButton} onPress={viewOnGoogleMap}>
        <Text style={styles.buttonText}>View on Google Map</Text>
      </TouchableOpacity>
  </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
      padding: 20,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    coordinate: {
      marginBottom: 5,
    },
    closeButton: {
        backgroundColor: colors.blue,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginVertical:10
      },
      buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
      },
  });