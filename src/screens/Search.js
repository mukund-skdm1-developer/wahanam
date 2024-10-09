import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, FlatList } from 'react-native';
import axios from 'axios';
import { SIZE } from '../constants/theme';
import imagePath from '../navStrings/imagePath';
import showAlert from '../constants/showAlert';

export default function Search({ navigation }) {
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
          params: { name: search },
          headers: {
            'X-RapidAPI-Key': 'e8ad9eb1bcmsh9b339c197fa2dd4p190533jsn5c3ce926b5d4',
            'X-RapidAPI-Host': 'tasty.p.rapidapi.com',
          },
        }
      );

      setRecipes(response.data.results);
    } catch (error) {
      console.error('Error fetching recipes:', error);
      showAlert()
    }
  };

  const renderRecipeItem = ({ item }) => (
    <TouchableOpacity style={styles.recipeItem}
      onPress={() => navigation.navigate('RecipeDetails', {data:item})}
    >
      <Text style={styles.recipeTitle}>{item.name}</Text>
      <Image source={{ uri: item.thumbnail_url }} style={styles.recipeImage} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backbtn}>
        <Image source={imagePath.back} style={styles.backIcon} />
      </TouchableOpacity>

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

      {search !== '' && (
        <TouchableOpacity onPress={searchRecipe} style={styles.searchBtn}>
          <Text style={styles.searchTitle}>Search</Text>
        </TouchableOpacity>
      )}

      <FlatList
        data={recipes}
        renderItem={renderRecipeItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.recipeList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: SIZE.h1,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  backbtn: {
    backgroundColor: 'white',
    width: 50,
    height: 50,
    top:30,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    width: 25,
    height: 25,
  },
  searchBox: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: 'black',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop:60,
    marginBottom: 20,
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
  searchBtn: {
    width: '40%',
    height: 50,
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
