// import axios from 'axios';

// const API_KEY = '22cf3ccbdd504afd906baf0bad19cda1';
// const BASE_URL = 'https://api.spoonacular.com/recipes/complexSearch';

// const api = axios.create({
//     baseURL: BASE_URL,
//     headers: {
//         'Content-Type': 'application/json',
//         'x-api-key': API_KEY
//     }
// });

// export const MEAL_FILTERS = async () => {
//     try {
//         const responseDrink = await api.get('?type=drink');
//         console.log('Drink recipes:', responseDrink.data.results);
//         const responseBrunch = await api.get('?type=brunch');
//         const responseBreakfast = await api.get('?type=breakfast');
//         const responseMainCourse = await api.get('?type=main course');
//         const responseSnack = await api.get('?type=snack');

//         const firstDrinkDetails = await fetchRecipeDetails(responseDrink.data.results[0].id);
//         const firstBrunchDetails = await fetchRecipeDetails(responseBrunch.data.results[0].id);
//         const firstBreakfastDetails = await fetchRecipeDetails(responseBreakfast.data.results[0].id);
//         const firstMaincourseDetails = await fetchRecipeDetails(responseMainCourse.data.results[0].id);
//         const firstSnackDetails = await fetchRecipeDetails(responseSnack.data.results[0].id);

//         return {
//             drinks: responseDrink.data.results,
//             firstDrinkDetails: firstDrinkDetails,

//             brunch: responseBrunch.data.results,
//             firstBrunchDetails: firstBrunchDetails,

//             breakfast: responseBreakfast.data.results,
//             firstBreakfastDetails: firstBreakfastDetails,

//             snack: responseSnack.data.results,
//             firstSnackDetails: firstSnackDetails,

//             main_course: responseMainCourse.data.results,
//             firstMaincourseDetails: firstMaincourseDetails,
//         };
//     } catch (error) {
//         console.error('Error fetching data:', error);
//         throw error;
//     }
// };

// export const fetchRecipeDetails = async (id) => {
//     try {
//         const response = await api.get(`/${id}/information`);
//         return response.data;
//     } catch (error) {
//         console.error('Error fetching recipe details:', error);
//         // You can handle the error further, such as returning a default value or throwing it again
//         throw error;
//     }
// };


import axios from 'axios';
import imagePath from '../navStrings/imagePath';

const API_KEY = 'd1c8d614dc74ab5b2cdc40e807182959';
const BASE_URL = 'https://api.spoonacular.com/recipes';

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
    }
});

// export const MEAL_FILTERS = async () => {
//     try {
//         const mealTypes = ['drink', 'brunch', 'breakfast', 'main course', 'snack'];
//         const mealResponses = await Promise.all(
//             mealTypes.map(async (type) => {
//                 const url = `/complexSearch?type=${type}&apiKey=${API_KEY}`;
//                 console.log('Requesting URL: ',BASE_URL+url )
//                 const response = await api.get(url)
//                 return { type, data: response.data.results };
//             })
//         );

//         const mealDetails = await Promise.all(
//             mealResponses.map(async ({ type, data }) => {
//                 if (data.length === 0) return { type, details: null };
//                 const firstRecipeId = data[0].id;
//                 const firstRecipeDetails = await fetchRecipeDetails(firstRecipeId);
//                 return { type, details: firstRecipeDetails };
//             })
//         );

//         const result = mealResponses.reduce((acc, { type, data }, index) => {
//             acc[type.replace(' ', '_')] = data;
//             acc[`first${type.charAt(0).toUpperCase() + type.slice(1).replace(' ', '')}Details`] = mealDetails[index].details;
//             return acc;
//         }, {});

//         return result;
//     } catch (error) {
//         console.error('Error fetching data:', error);
//         throw error;
//     }
// };



export const fetchRecipeDetails = async (id) => {
    try {
        const url = `${id}/information?apiKey=${API_KEY}&includeNutrition=true`;
        console.log('Requesting URL:', BASE_URL + url);
        const response = await api.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching recipe details:', error);
        throw error;
    }
};


export const MEAL_FILTERS = [
    {title:'breakFast', icon:imagePath.logo},
    {title:'brunch', icon:imagePath.logo},
    {title:'lunch', icon:imagePath.logo},
    {title:'dinner', icon:imagePath.logo},
    {title:'teatime', icon:imagePath.logo},
]