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

export const deleteWord = async (word_id) =>
{
    try {
        const response = await axios.delete(`https://localhost:7115/Word/${word_id}`);
        return response.data;
    }
    catch (error)
    {
        throw error;
    }
}

export const addTopic = async(user_id, category_name) =>
{
    try {
        const response = await axios.post('https://localhost:7115/Category/addCategory', null, {params:{category_name, user_id}});
        return response.data;
    }
    catch (error)
    {
        throw new Error(error.response.data);
    }
}

export const checkUserCategory = async(category_id, user_id) =>
{
    try {
        const response = await axios.get('https://localhost:7115/Category/checkUserCategory', {params:{category_id, user_id}});
        console.log(category_id);
        console.log(user_id);
        console.log(response.data);
        return response.data;
    }
    catch (error)
    {
        throw error;
    }
}

export const addWord = async(english, russian, category_id) =>
{
    try {
        const response = await axios.post('https://localhost:7115/Word/addWord', null, {params:{english, russian, category_id}});
        return response.data;
    }
    catch (error)
    {
        throw new Error(error.response.data);
    }
}

export const copyCategory = async(category_id, user_id) =>
{
    try {
        const response = await axios.post('https://localhost:7115/Category/copyCategory', null, {params:{category_id, user_id}});
        return response.data;
    }
    catch (error)
    {
        throw new Error(error.response.data);
    }
}

export const getUserById = async (user_id) =>
{
    try {
        const response = await axios.get(`https://localhost:7115/User/${user_id}`);
        return response.data.name;
    }
    catch (error)
    {
        throw error;
    }
}