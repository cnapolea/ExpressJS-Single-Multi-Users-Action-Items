import axios from 'axios';

const url = 'api/lists';

const ListsAPI = {

  createList: async (data) => {
    axios.post(url, data)
      .then(res => res.status)
      .catch(err => err.message);
  },
  
  getLists: (setStateHandler) => {
    axios.get(url)
    .then(res => {
      setStateHandler({type:'FETCHING_DATA_SUCESS', data: res.data});
    })
    .catch(err => {throw err});
  },

  deleteList: async (data) => {
    axios.delete(url + `/${data}`)
    .then(res => res)
    .catch(err => err.message)
  }
}



export default ListsAPI;

