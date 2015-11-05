var React = require('react-native');
var BaseComponenet = require('../BaseComponent');
var {
  View, 
  WebView,
  StyleSheet
} = React; 

var styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: "#F6F6EF",
    flexDirection: 'column'
  }
});

class Web extends BaseComponenet{
  render() {
    return (
      <View style={styles.container}>
        <WebView url={this.props.url} />
      </View> 
    )
  }
}

Web.propTypes = {
  url: React.PropTypes.string.isRequired
}

module.exports = Web;