import axios from 'axios';

const url = 'api/lists';

const ListsAPI = {

  createList: async (data) => {
    axios({
        method: 'post', 
        url: url, 
        data: await data
      })
      .then(res => res.status)
      .catch(e => e.message);
  },
  
  getLists: (setStateHandler) => {
    axios.get(url)
    .then(res => setStateHandler(res.data))
    .catch(err => {throw err});
  },
}



export default ListsAPI;

// {actionLists!=='undefined'&&actionLists.map(list => (<h1>{list.name}</h1>))}