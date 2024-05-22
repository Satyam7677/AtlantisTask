

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Linking, Image } from 'react-native';
import { GET_API_CALL } from '../services/service';
import string from '../utilities/AppString'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import localeImage from '../assets/localeImage';
import colors from '../utilities/colors';
import { normalize } from '../utilities/dimensions';

const MovieListScreen = () => {
      const [movieData,setMovieData]=useState([])
      const navigation:any =useNavigation()

    useEffect(()=>{
        GET_API_CALL(string.movieEndpoint,apiCallback)
    },[])
    const apiCallback=(dataObj:{isSuccess:boolean,data:any})=>{
        setMovieData(dataObj.data)
    }

   const onLogoutPress=()=>{
    AsyncStorage.removeItem('isSignedIn')
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
    }

    const renderItem = ({ item }:any) => (
      <TouchableOpacity style={styles.itemContainer} onPress={() => Linking.openURL(item.imdb_url)}>
        <Image
          source={{ uri: item.image }}
          style={styles.image}
          onError={(e:any) => e.target.style.display = 'none'}
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.movie}</Text>
          <View style={styles.ratingContainer}>
            <View style={styles.starBox}>
              <Text style={styles.star}>★</Text>
            </View>
            <Text style={styles.rating}>{item.rating}</Text>
          </View>
        </View>
        <Text style={styles.chevron}>›</Text>
      </TouchableOpacity>
    );
  
    return (
      <View style={styles.container}>
        <FlatList
          data={movieData}
          keyExtractor={(item:any) => item.id.toString()}
          renderItem={renderItem}
          initialNumToRender={10}
          windowSize={21}
          maxToRenderPerBatch={10}
        />
        <TouchableOpacity style={styles.logout} onPress={onLogoutPress}>
          <Image source={localeImage.logout} style={styles.logOutImage} resizeMode='contain'/>
          <Text style={styles.logOutText}>{'Log Out'}</Text>

        </TouchableOpacity>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      backgroundColor: '#f8f9fa',
    },
    itemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 15,
      marginBottom: 10,
      backgroundColor: '#ffffff',
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.3,
      shadowRadius: 1,
      elevation: 2,
    },
    image: {
      width: 50,
      height: 75,
      marginRight: 10,
      borderRadius: 5,
      backgroundColor: '#ddd',
    },
    textContainer: {
      flex: 1,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333',
    },
    ratingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 5,
    },
    starBox: {
      width: 24,
      height: 24,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'gold',
      borderRadius: 12,
      marginRight: 5,
    },
    star: {
      color: '#fff',
      fontWeight: 'bold',
    },
    rating: {
      fontSize: 16,
      color: '#888',
    },
    chevron: {
      fontSize: 24,
      color: 'gray',
    },
    logout:{
      position:'absolute',
      borderRadius:50,
      backgroundColor:colors.grey,
      height:normalize(80),
      width:normalize(80),
      justifyContent:'center',
      alignItems:'center',
      bottom:0,
      right:5
    },
    logOutImage:{
      height:normalize(40),
      width:normalize(40)
    },
    logOutText:{
      fontSize:normalize(10)
    }
  });
  export default MovieListScreen
  
  
