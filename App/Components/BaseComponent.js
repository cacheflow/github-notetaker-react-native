var React = require('react-native');

class BaseComponent extends React.Component{
  
  bind(...methods) {
    methods.forEach(method => this[method] = this[method].bind(this));
  }
}

module.exports = BaseComponent;
