var React = require('react')
var ReactDOM = require('react-dom')
var Main = require('Main')

var objOne = {
  name: 'Floyd',
  location: 'Austin'
}

var objTwo = {
  age: 25,
  ...objOne
}

console.log(objTwo)

ReactDOM.render(
    <Main/>,
    document.getElementById('app')
);
