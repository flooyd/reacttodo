var React = require('react')
var SearchForm = require('SearchForm')
var SearchMessage = require('SearchMessage')
var TodoApi = require('TodoApi')

var Main = React.createClass({
  getInitialState: function(){
    return {
        todosUpdated: false,
        disable: false
    }
  },

  handleDelete: function(todoId){
    var that = this
    this.setState({disable: true})
    TodoApi.deleteTodo(todoId).then(function(res){
        that.handleSearch()
        that.setState({disable: false})
    }, function(error) {
        that.setState({disable: false})
    })
  },

  handleEdit: function(todoId, newDescription, newCompleted) {
    var that = this
    if (newDescription) {
      TodoApi.editTodo(todoId, newDescription, newCompleted).then(function (res) {
        that.setState({disable: false})
        that.setState({currentEditId: null})
        that.handleSearch()

      }, function (error) {
        console.log(error)
      })
    } else {
      this.setState({disable: true})
      that.setState({currentEditId: todoId})
      that.handleSearch()
    }

    //set state (id being edited)

    //use id to create new row
    //pass prop to row (true if it is the generated edit row)
    //on edit submit, update row with same id and delete edit row
  },

  handleCancelEdit: function() {
    this.setState({currentEditId: null})
    this.setState({disable: false})
    this.handleSearch()
  },

  handleSearch: function(searchQuery){
    var descriptions = []
    var completeds = []
    var keys = []
    var ids = []

    if (searchQuery) {

    }
    else {
      var that = this

      TodoApi.getTodos().then(function(res){
        res.data.forEach(function(todo){
          descriptions.push(todo.description)
          completeds.push(todo.completed)
          keys.push(todo.id)
          ids.push(todo.id)
          if(todo.id === that.state.currentEditId)
          {
            descriptions.push(todo.description)
            completeds.push(todo.completed)
            keys.push(-1)
            ids.push(todo.id)
          }
          })
        that.setState({
          descriptions: descriptions,
          completeds: completeds,
          keys: keys,
          ids: ids
        })
        })
    }
  },

  render: function(){

    var descriptions = this.state.descriptions
    var completeds = this.state.completeds
    var keys = this.state.keys
    var ids = this.state.ids
    var that = this

    function renderTodos() {
      if (descriptions){
        var todoList = []
        for (var i = 0; i < descriptions.length; i++)
        {
          var description = descriptions[i]
          var completed = completeds[i]
          var key = keys[i]
          var id = ids[i]
          var color = 'black'
          var editRow = false

          if (key === -1) { //edit row
            color = 'red'
            console.log('hi')
            editRow = true
          }


          todoList.push(
            <SearchMessage key={key}
            disable={that.state.disable}
            todoId={id}
            description={description}
            completed={completed}
            onDelete={that.handleDelete}
            onCancelEdit={that.handleCancelEdit}
            onEdit={that.handleEdit}
            color={color}
            editRow={editRow}/>
        )
        }

        return todoList
      }
    }

    var searchQuery = this.state.searchQuery
    return(
      <div>
        <SearchForm onSearch={this.handleSearch}/>
        <table>
          <tbody>
            <tr>
              <th>Todo</th>
              <th>Completed?</th>
            </tr>
            {renderTodos()}
          </tbody>
        </table>
      </div>

    )
  }
})

module.exports = Main
