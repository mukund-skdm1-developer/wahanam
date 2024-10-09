import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {SIZE} from '../constants/theme';
import imagePath from '../navStrings/imagePath';

const RecipeDetails = ({route, navigation}) => {
  const data = route.params.data;
  const limitedInstructions = data.instructions ? data.instructions : [];
  const limitNutritions = data.nutrition ? data.nutrition : [];
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
      {/*Dish Image */}
      <Image style={styles.banner} source={{uri: data.thumbnail_url}} />
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <Image style={styles.backImg} source={imagePath.back} />
      </TouchableOpacity>
      <ScrollView
        style={styles.detailsContainer}
        contentContainerStyle={styles.scrollViewContent}
        keyboardShouldPersistTaps="handled">
        {/*Dish name */}
        <Text style={styles.title}>{data.name}</Text>

        {/*Approved Date */}
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image style={{width: 20, height: 20}} source={imagePath.approved} />
          <Text style={styles.details}>
            {' '}
            Approved At:{' '}
            {new Date(data.approved_at * 1000).toLocaleDateString()}
          </Text>
        </View>
        <Text style={styles.sectionTitle}>Description</Text>

        {/*Desription */}
        <Text style={styles.description}>{data.description}</Text>


        {/* Instructions details */}
        <View style={styles.instructionsHeader}>
          <Image style={styles.menuImg} source={imagePath.menu} />
          <Text style={styles.sectionTitle}>Instructions</Text>
        </View>
        {limitedInstructions.length > 0 ? (
          limitedInstructions.map((instruction, index) => (
            <View key={index} style={styles.instructionStep}>
              <Text style={styles.bulletPoint}>{'\u2022'}</Text>
              <Text style={styles.instructionText}>
                {instruction.display_text}
              </Text>
            </View>
          ))
        ) : (
          <Text style={styles.description}>No instructions available</Text>
        )}

        {/*Nuterition details */}
        <View style={styles.instructionsHeader}>
          <Image style={styles.menuImg} source={imagePath.nutrition} />
          <Text style={styles.sectionTitle}> Nutritions</Text>
        </View>

        <View style={styles.nutritionContainer}>
          <Text style={styles.nutritionLabel}>
            <Text style={styles.bulletPoint}>{'\u2022'}</Text>{'  '}
            Calories: {data.nutrition.calories}g
          </Text>
          <Text style={styles.nutritionLabel}>
            <Text style={styles.bulletPoint}>{'\u2022'}</Text>{'  '}
            Carbohydrates: {data.nutrition.carbohydrates}g
          </Text>
          <Text style={styles.nutritionLabel}>
            <Text style={styles.bulletPoint}>{'\u2022'}</Text>{'  '}
            Fat: {data.nutrition.fat}g
          </Text>
          <Text style={styles.nutritionLabel}>
            <Text style={styles.bulletPoint}>{'\u2022'}</Text>{'  '}
            Fiber: {data.nutrition.fiber}g
          </Text>
          <Text style={styles.nutritionLabel}>
            <Text style={styles.bulletPoint}>{'\u2022'}</Text>{'  '}
            Protein: {data.nutrition.protein}g
          </Text>
          <Text style={styles.nutritionLabel}>
            <Text style={styles.bulletPoint}>{'\u2022'}</Text>{'  '}
            Sugar: {data.nutrition.sugar}g
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RecipeDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  banner: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  backButton: {
    width: 50,
    height: 50,
    borderRadius: 50,
    top: 55,
    borderWidth: 0.9,
    position: 'absolute',
    left: 20,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backImg: {
    width: 25,
    height: 25,
  },
  detailsContainer: {
    padding: 20,
    backgroundColor: 'white',
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 20, // Add some padding to the bottom
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 0.1,
    marginVertical: 10,
    color: 'black',
    right: SIZE.width=20,
  },
  description: {
    fontSize: SIZE.h4,
    marginVertical: 10,
    color: 'black',
  },
  details: {
    fontSize: 14,
    marginVertical: 5,
    color: 'gray',
  },
  sectionTitle: {
    fontSize: SIZE.h2,
    color: 'black',
    fontWeight: 'bold',
    // marginTop: 5,
  },
  instructionsHeader: {
    flexDirection: 'row',
    marginTop: 10,
  },
  menuImg: {
    width: (SIZE.width = 20),
    height: (SIZE.height = 20),
    alignSelf: 'center',
  },
  instructionStep: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 5,
    marginTop: 10,
  },
  bulletPoint: {
    fontSize: 20,
    color: 'black',
    marginRight: 10,
  },
  instructionText: {
    fontSize: SIZE.h4,
    color: 'black',
    flex: 1,
  },
  nutritionLabel: {
    color: 'black',
    fontSize:SIZE.h4
  },
});
