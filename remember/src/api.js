import axios from 'axios'

export const getTopics = async (user_id) => {
    try {
        const response = await axios.get('https://localhost:7115/Category/categoriesByUserId', {params:{user_id}});
        return response.data;
    }
    catch (error)
    {
        throw error;
    }
}

export const getWords = async (category_id) =>
{
    try {
        const response = await axios.get('https://localhost:7115/Word/wordsByCategotyId', {params:{category_id}});
      return response.data;

    }
    catch (error)
    {
        throw error;
    }
}

export const getWordCount = async (category_id) =>
{
    try {
        const response = await axios.get('https://localhost:7115/Word/countWordsByCategotyId', {params:{category_id}});
      return response.data;

    }
    catch (error)
    {
        throw error;
    }
}