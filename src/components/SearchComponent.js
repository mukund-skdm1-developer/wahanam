import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  Dimensions,
} from 'react-native';
import axios from 'axios';
import {SIZE} from '../constants/theme';
import imagePath from '../navStrings/imagePath';
import showAlert from '../constants/showAlert';
import globalStyle from './customContainer';


export default function SearchComponent({navigation}) {
  const {width: SCREEN_WIDTH} = Dimensions.get('window');
  const scale = SCREEN_WIDTH / 375;

  function normalize(size) {
    return Math.round(size * scale);
  }

  const [search, setSearch] = useState('');
  const [recipes, setRecipes] = useState([]);

  const searchRecipe = async () => {
    if (search.trim() === '') {
      return;
    }

    try {
      const response = await axios.get(
        `https://tasty.p.rapidapi.com/recipes/list`,
        {
          params: {name: search},
          headers: {
            'X-RapidAPI-Key':
              'e8ad9eb1bcmsh9b339c197fa2dd4p190533jsn5c3ce926b5d4',
            'X-RapidAPI-Host': 'tasty.p.rapidapi.com',
          },
        },
      );

      setRecipes(response.data.results);
    } catch (error) {
      console.error('Error fetching recipes:', error);
      showAlert();
    }
  };

  const renderRecipeItem = ({item}) => (
    <TouchableOpacity
      style={styles.recipeItem}
      onPress={() => navigation.navigate('RecipeDetails', {data: item})}>
      <Text style={styles.recipeTitle}>{item.name}</Text>
      <Image source={{uri: item.thumbnail_url}} style={styles.recipeImage} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <View style={styles.searchBox}>
          <Image source={imagePath.searc_black} style={styles.searchIcon} />
          <TextInput
            autoCorrect={true}
            value={search}
            onChangeText={setSearch}
            placeholderTextColor={'black'}
            style={styles.input}
            placeholder="Search here..."
          />

          {search !== '' && (
            <TouchableOpacity onPress={() => setSearch('')}>
              <Image source={imagePath.close} style={styles.close} />
            </TouchableOpacity>
          )}
        </View>

        {/* Bell Icon outside the TextInput, in the same row */}

      </View>

      {search !== '' && (
        <TouchableOpacity onPress={searchRecipe} style={styles.searchBtn}>
          <Text style={styles.searchTitle}>Search</Text>
        </TouchableOpacity>
      )}
      <FlatList
        data={recipes}
        renderItem={renderRecipeItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.recipeList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    
    // paddingHorizontal: 10,
  },
  searchBox: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: 'black',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    
  },
  searchIcon: {
    width: 25,
    height: 25,
  },
  input: {
    flex: 1,
    fontWeight: '600',
    marginLeft: 10,
    fontSize: SIZE.h4,
    color: 'black',
  },
  close: {
    width: 20,
    height: 20,
  },
  bellIcon: {
    marginLeft: 10,
    color: 'black',
  },
  searchBtn: {
    // width: '40%',
    // height: 50,
    backgroundColor: 'red',
    borderRadius: 8,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    marginBottom: 20,
  },
  searchTitle: {
    fontSize: SIZE.h4,
    color: 'black',
  },
  recipeList: {
    paddingBottom: 20,
  },
  recipeItem: {
    width: '100%',
    height: 100,
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 10,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  recipeTitle: {
    fontSize: SIZE.h4,
    fontWeight: '600',
    color: 'black',
    flex: 1,
  },
  recipeImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
});
