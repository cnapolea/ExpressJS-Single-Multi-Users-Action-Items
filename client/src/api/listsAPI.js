import axios from 'axios';

const url = 'api/lists';

const ListsAPI = {

  createList: async (data) => {
    axios.post(url, {data: await data})
      .then(res => res.status)
      .catch(err => err.message);
  },
  
  getLists: (setStateHandler) => {
    axios.get(url)
    .then(res => setStateHandler(res.data))
    .catch(err => {throw err});
  },

  deleteList: async (data) => {
    axios.delete(url, null, {params: {listId: data}})
    .then(res => res.status)
    .catch(err => err.message)
  }
}



export default ListsAPI;

