import 'regenerator-runtime/runtime';
import axios from 'axios';


const BASE_URL = 'https://jsonplaceholder.typicode.com';

const getTodoItems = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/todos?_limit=5`);

        const todoItems = response.data;

        console.log(`GET: Here's the list of todos`, todoItems);

        return todoItems;
    } catch (errors) {
        console.error(errors);
    }
};