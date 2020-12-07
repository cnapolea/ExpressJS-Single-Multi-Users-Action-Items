import axios from 'axios';


const createList = async (newListFormData) => {
    const createListURL = 'api/lists';

    axios({
        method: 'post',
        url: createListURL,
        data: await newListFormData
      })
    .then(res => console.log(res))
    .catch(e => console.log(e.message));
}

export default createList;