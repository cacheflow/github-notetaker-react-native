var React = require('react-native');
var Badge = require('./Badge');
var Separator = require('./Helpers/Separator');
var BaseComponent = require('./BaseComponent')
var Web = require('./Helpers/Web');

var {
  ScrollView, 
  Text, 
  View,
  TouchableHighlight,
  StyleSheet
} = React; 

var styles = StyleSheet.create({
  container: {
    flex: 1, 
  }, 

  rowContainer: {
    flexDirection: 'column',
    flex: 1, 
    padding: 10
  }, 

  name: {
    color: '#48BBEC', 
    fontSize: 18, 
    paddingBottom: 5
  }, 

  stars: {
    color: '#48BBEC', 
    fontSize: 14, 
    paddingBottom: 5
  }, 

  description: {
    fontSize: 14, 
    paddingBottom: 5
  }
});

class Repositories extends BaseComponent{
  constructor() {
    super() 
    this.bind('openPage');
  }
  openPage(url) {
    this.props.navigator.push({
      component: Web,
      title: 'Web View', 
      passProps: {url: url}
    })
  }

  render() {
  var repos = this.props.repos;
  console.log(repos);
  var list = repos.map((item, index) => {
    var description = repos[index].description ? < Text style={styles.description}> {repos[index].description} </Text> : <View />; 
    return (
      <View key={index}>
        <View style={styles.rowContainer}>
          <TouchableHighlight
            onPress={this.openPage.bind(this, repos[index].html_url)}
            underlayColor="transparent">
            <Text style={styles.name}>{repos[index].name}</Text> 
          </TouchableHighlight>
          <Text style={styles.stars}> Stars: {repos[index].stargazers_count} </Text>
          {description}
          <Separator/>
          </View> 
      </View>
    )
  })
    return (
      <ScrollView style={styles.container}>
        <Badge userInfo={this.props.userInfo}> 
        </Badge>
        {list}
      </ScrollView> 
    )
  }
}
Repositories.propTypes = {
  userInfo: React.PropTypes.object.isRequired, 
  repos: React.PropTypes.array.isRequired
};



module.exports = Repositories;