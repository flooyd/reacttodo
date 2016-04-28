var axios = require('axios')

//const URL = 'http://localhost:3001/todos'
const URL = 'https://flooydtodo.herokuapp.com/todos'

module.exports = {
  getTodos: function(){
    return axios.get(URL).then(function(res) {
      return res
    }, function (res){
      throw new Error(res)
    })
  },

  deleteTodo: function(todoId){
    var deleteUrl = URL + '/' + todoId
    return axios.delete(deleteUrl).then(function(res){
      return res
    }, function (res) {
      throw new Error(res)
    })
  },

  editTodo: function(todoId, description, completed){
    var editUrl = URL + '/' + todoId
    var data = {
      description: description,
      completed: completed
    }

    //data = JSON.stringify(data)
    console.log(data)
    return axios.put(editUrl, data).then(function(res){
      return res
    }, function (res) {
      throw new Error(res)
    })
  }

//   getTemp: function (location) {
//     var encodedLocation = encodeURIComponent(location)
//     var requestUrl = `${URL}&q=${encodedLocation}`
//
//     return axios.get(requestUrl).then(function(response) {
//       if (response.data.cod && response.data.message) {
//         throw new Error(response.data.message)
//       } else {
//         return {
//           temp: response.data.main.temp,
//           weather: response.data.weather[0].icon
//         }
//       }
//     }, function (response) {
//       throw new Error(response.data.message)
//     })
// }
}
