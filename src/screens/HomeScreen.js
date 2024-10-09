import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StatusBar,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
  Button,
} from 'react-native';
import {MEAL_FILTERS} from '../constants/apis';
import {COLORS, SIZE} from '../constants/theme';
import imagePath from '../navStrings/imagePath';
import axios from 'axios';
import NavStrings from '../navStrings/NavStrings';

const bannerImages = [imagePath.cook, imagePath.cook1, imagePath.cook2]; // Add your image paths here

const HomeScreen = ({navigation}) => {
  const [categories, setCategories] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentBanner, setCurrentBanner] = useState(0); // Start with index 0

  useEffect(() => {
    getTrendyRecipes();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % bannerImages.length);
    }, 5000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, []);
  const getTrendyRecipes = async () => {
    const options = {
      method: 'GET',
      url: 'https://tasty.p.rapidapi.com/recipes/list',
      // params: {
      //   prefix: 'chicken soup',
      // },
      headers: {
        'X-RapidAPI-Key': 'e8ad9eb1bcmsh9b339c197fa2dd4p190533jsn5c3ce926b5d4',
        'X-RapidAPI-Host': 'tasty.p.rapidapi.com',
      },
    };

    try {
      const response = await axios.request(options);
      setRecipes(response.data.results);
      setLoading(false);
      console.log(response.data.results);
    } catch (error) {
      console.error(error);
      setLoading(false);
      Alert.alert('','Opps something went wrong!',[
        {text:'OK', onPress:() => console.log('Ok')}
      ])
    }
  };

  // useEffect(() => {
  //   const getCategories = async () => {
  //     try {
  //       const data = await MEAL_FILTERS();
  //       setCategories(Object.keys(data));
  //       console.log('Fetched categories:', Object.keys(data));
  //     } catch (error) {
  //       console.error('Error fetching meal filters:', error);
  //     }
  //   };

  //   getCategories();
  // }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'light-content'} />

      <View style={styles.topView}>
        <Image style={styles.banner} source={bannerImages[currentBanner]} />
      </View>
      <View style={styles.transparentView}>
        <Text style={styles.logo}>Recipe Book</Text>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.searchBox}
          onPress={() => navigation.navigate('Search')}>
          <Image source={imagePath.search} style={styles.search} />
          <Text style={styles.placeHolder}>Please search food here..</Text>
        </TouchableOpacity>
        <Text style={styles.note}>Search 1000+ recipes with one click</Text>
      </View>
      <Text style={styles.heading}>Categories</Text>
      <View>
        <FlatList
          horizontal
          data={MEAL_FILTERS}
          // keyExtractor={item => item}
          renderItem={({item}) => (
            <TouchableOpacity style={styles.categoryItem} activeOpacity={0.8}>
              <View style={styles.card}>
                <Image source={imagePath.logo} style={styles.categoryIcon} />
              </View>
              <Text style={styles.iconText}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
      <Text style={[styles.heading, {marginTop: 5}]}>Trending Recipies</Text>
      {loading ? (
        <View>
          <FlatList
            horizontal
            data={MEAL_FILTERS}
            // keyExtractor={item => item}
            renderItem={({item}) => (
              <TouchableOpacity style={styles.categoryItem} activeOpacity={0.8}>
                <View style={styles.card}>
                  <Image source={imagePath.logo} style={styles.categoryIcon} />
                </View>
                <Text style={styles.iconText}>Loading...</Text>
              </TouchableOpacity>
            )}
          />
          <Button title='Go to audio' onPress={() => navigation.navigate(NavStrings.LOGIN)} />
          <Button title='Go to forget' onPress={() => navigation.navigate(NavStrings.FORGET)} />

        </View>
      ) : (
        <FlatList
          horizontal
          data={recipes}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => {
            return (
              <View>
                <TouchableOpacity
                  style={styles.recipeItem}
                  activeOpacity={0.8}
                  onPress={() =>
                    navigation.navigate('RecipeDetails', {data: item})
                  }>
                  {item.thumbnail_url ? (
                    <View style={{borderRadius: 10}}>
                      <Image
                        resizeMode="contain"
                        source={{uri: item.thumbnail_url}}
                        style={styles.recipeImage}
                      />
                    </View>
                    
                  ) : (
                    <View>
                      <Text style={{color: 'black'}}>no image</Text>
                    </View>
                  )}
                  <Text
                    style={{
                      color: 'black',
                      bottom: 20,
                      textAlign: 'center',
                      fontWeight: '500',
                    }}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      )}
      <Button title='Go to forget' onPress={() => navigation.navigate(NavStrings.FORGET)} />

      <Button title='Go to audio' onPress={() => navigation.navigate(NavStrings.LOGIN)} />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topView: {
    width: '100%',
    height: '40%',
  },
  banner: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
  },
  transparentView: {
    height: '40%',
    width: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'rgba(0,0,0,.4)',
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
  },
  searchBox: {
    height: 60,
    width: '90%',
    borderColor: 'white',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    paddingLeft: 10,
  },
  search: {
    width: 25,
    height: 25,
  },
  placeHolder: {
    fontSize: 16,
    color:'white',
    marginLeft: 15,
  },
  logo: {
    fontSize: 30,
    color: 'white',
    fontWeight: '900',
    position: 'relative',
    // top:SIZE.height=10,
    bottom: 60,
    right: 85,
  },
  note: {
    color: 'white',
    fontWeight: 'bold',
    // right: 50,
    alignSelf: 'center',
    marginTop: 5,
    fontSize: 16,
  },
  heading: {
    fontSize: 24,
    marginLeft: 20,
    marginTop: 20,
    fontWeight: '600',
    color: 'black',
  },
  categoryContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  categoryItem: {
    width: (SIZE.width = 150),
    height: (SIZE.height = 150),
    height: 150,
    backgroundColor: 'white',
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    shadowOpacity: 6,
    shadowColor: 'rgba(0,0,0,.7)',
  },
  categoryText: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
  card: {
    width: (SIZE.width = '80%'),
    height: (SIZE.height = '70%'),
    resizeMode: 'cover',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryIcon: {
    width: (SIZE.width = 250),
    height: (SIZE.height = 250),
    alignSelf: 'center',
  },
  iconText: {
    fontWeight: '600',
    fontSize: SIZE.h4,
    alignSelf: 'center',
    color: 'black',
    marginTop: 10,
  },
  recipeItem: {
    width: (SIZE.width = 150),
    height: (SIZE.height = 200),
    borderRadius: 15,
    resizeMode: 'contain',
    marginLeft: 20,
  },
  recipeImage: {
    width: '100%',
    height: '80%',
    margin: 10,
    resizeMode: 'stretch',
    borderRadius: 15,
  },
  love:{
    color:'black',
    alignSelf:'center',
    // top:SIZE.height='96%',
    fontWeight:'500',
    fontSize:SIZE.h4,
    // position:'absolute'
  }
});

export default HomeScreen;
