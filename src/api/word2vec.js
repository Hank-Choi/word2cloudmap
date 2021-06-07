import axios from 'axios'

axios.defaults.baseURL = "http://localhost:5000"

export const postParagraph = async (paragraph) => {
  let bodyFormData = new FormData();
  bodyFormData.append('paragraph', paragraph);
  const response = await axios.post('/model/', bodyFormData, {
    headers:{
        'Content-Type': `multipart/form-data; boundary=${bodyFormData._boundary}`,
    }
  })
  axios.defaults.headers['uuid'] = response.data['unique_id']
  return response.data['rank']
}

export const getSimilarWords = async (word) => {
  return axios.get('/words/', {
    params: {
      'base_word': word
    }
  })
}
