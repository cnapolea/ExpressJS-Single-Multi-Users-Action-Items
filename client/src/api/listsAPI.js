// jshint esversion:10


import axios from 'axios';

const url = 'api/lists';

const ListsAPI = {

  createList: async (data) => {
    axios.post(url, data)
      .then(res => res.status)
      .catch(err => err.message);
  },
  
  getLists: async (setStateHandler) => {
    axios.get(url)
    .then(res => {
      if (res.status === 200) {
        setStateHandler({type:'FETCHING_DATA_SUCCESS', data: res.data});
      } else {
        setStateHandler({type:'FETCHING_DATA_FAILURE'});
      }
    })
    .catch(err => {throw err;});
  },

  deleteList: async (listId) => {
    axios.delete(url + `/${listId}`)
    .then(res => res)
    .catch(err => err.message)
  },
  updateList: async (listId, data)=> {
    axios.patch(url+`/${listId}`, data)
    .then(res => res)
    .catch(err => {throw err;});
  },
}



export default ListsAPI;

