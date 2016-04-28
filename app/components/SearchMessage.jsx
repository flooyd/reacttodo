var React = require('react')

var SearchMessage = React.createClass({
  // getInitialState: function ()
  //   return {
  //     select: 'Completed?'
  //   },

  onFormDelete: function(e){
    e.preventDefault()
    var todoId = this.props.todoId
    this.props.onDelete(todoId)
  },

  onFormEdit: function(e){
    e.preventDefault()
    var todoId = this.props.todoId
    if(this.props.editRow) {
      //this.props.onEditSubmit(todoId)
      var description = this.refs.descInput.value
      var completed = this.refs.select.value

      if (description.length > 0 && (completed === 'Yep' || completed === 'Nope')) {
        if (completed === 'Yep') {
          this.props.onEdit(todoId, description, true)
        } else {
          this.props.onEdit(todoId, description, false)
        }
      } else {
        alert('Description and Completed must be filled out.')
      }
    } else {
      this.props.onEdit(todoId)
    }

  },

  cancelEdit: function(){
    this.props.onCancelEdit()
  },

  // handleChange: function(event) {
  //   this.setState({select: event.target.value})
  // }

  render: function(){
    var description = this.props.description
    var completed
    var color = {
      color: this.props.color
    }

    if (this.props.completed === true)
    {
      completed = 'Yep'
    }
    else {
      completed = 'Nope'
    }

    if (this.props.editRow) {
      return(
        <tr style={color}>
          <td>
            <form onSubmit={this.onFormEdit}>
              <input placeholder='New Todo here...' ref='descInput' style={{display:'inline', marginRight: '10px'}} type='text' ref='descInput'></input>
                <select ref='select' style={{marginRight: '10px'}} required='required'>
                  <option>Completed?</option>
                  <option>Yep</option>
                  <option>Nope</option>
                </select> <br/>
              <button>Submit Changes</button>
            </form>
            <form onSubmit={this.cancelEdit}><button>Cancel</button></form>
          </td>
        </tr>

      )
    } else {
    return(
      <tr style={color}>
        <td>{description}</td>
        <td>{completed}</td>
        <td>
          <form onSubmit={this.onFormEdit}>
            <button disabled={this.props.disable}>Edit</button>
          </form>
        </td>
        <td>
          <form onSubmit={this.onFormDelete}>
            <button disabled={this.props.disable}>Delete</button>
          </form>
        </td>
      </tr>
    )
  }
  }
})


module.exports = SearchMessage
