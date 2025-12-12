import axios from 'axios';

async function fetchStories() {
  try {
    const response = await axios.get('http://localhost:8080/api/stories');
    const stories = response.data;
    console.log(JSON.stringify(stories, null, 2));
  } catch (error) {
    console.error('Error fetching stories:', error);
  }
}

fetchStories();

