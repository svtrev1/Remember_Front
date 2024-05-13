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

export const getAllTopics = async () => {
    try {
        const response = await axios.get('https://localhost:7115/Category/categories');
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

export const getCategoryNameById = async (category_id) =>
{
    try {
        const response = await axios.get('https://localhost:7115/Category/categoryNameById', {params:{category_id}});
        return response.data;
    }
    catch (error)
    {
        throw error;
    }
}

export const deleteTopic = async (category_id) =>
{
    try {
        const response = await axios.delete(`https://localhost:7115/Category/${category_id}`);
        return response.data;
    }
    catch (error)
    {
        throw error;
    }
}