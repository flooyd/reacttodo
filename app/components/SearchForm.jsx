var React = require('react')

var SearchForm = React.createClass({
  onFormSubmit: function(e){
    e.preventDefault()

    var searchQuery = this.refs.searchQuery.value
    this.refs.searchQuery.value = ""
    this.props.onSearch(searchQuery)
  },

  render: function(){
    return(
      <div>
        <form onSubmit={this.onFormSubmit}>
          <input type="text" ref="searchQuery"></input>
          <button>Get Todos</button>
        </form>
      </div>
    )
  }
})

module.exports = SearchForm
