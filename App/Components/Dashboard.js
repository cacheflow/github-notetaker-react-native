var React = require('react-native');
var BaseComponent = require('./BaseComponent');
var Profile = require('./Profile');
var Repositories = require('./Repositories');
var api = require('../Utils/api');
var Notes = require('./Notes');
var {
  Text,
  View,
  TouchableHighlight,
  Image,
  StyleSheet,
  NavigatorIOS
} = React;

var styles = StyleSheet.create({
  container: {
    marginTop: 65,
    flex: 1
  },
  image: {
    height: 350,
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
    alignSelf: 'center'
  }
});

class Dashboard extends BaseComponent{
  constructor() {
    super()
    this.bind('goToProfile', 'goToRepos')
  }
  makeBackground(btn) {
    var obj = {
      flexDirection: 'row',
      alignSelf: 'stretch',
      justifyContent: 'center', 
      flex: 1
    }
    if(btn === 0) {
      obj.backgroundColor = "#48BBEC"
    }
    else if(btn === 1) {
      obj.backgroundColor = "E77AAE"
    }
    else {
      obj.backgroundColor = "#758bf4"
    }
    return obj
  }
  goToProfile() {
    this.props.navigator.push({
      component: Profile,
      title: 'Profile Page',   
      passProps: {userInfo: this.props.userInfo}
    });
  }

  goToRepos() {
    api.getRepos(this.props.userInfo.login).then((response) => {
      this.props.navigator.push({
        component: Repositories, 
        title: 'Repos page', 
        passProps: {
          userInfo: this.props.userInfo, 
          repos: response 
        }
      });  
    });
  }
  goToNotes(){
    api.getNotes(this.props.userInfo.login)
    .then((res) => {
      res = res || {};
      this.props.navigator.push({
        component: Notes, 
        title: 'Notes',
        passProps: {
          notes: res, 
          userInfo: this.props.userInfo
        }
      })
    })
  }
render(){
  return (
      <View style={styles.container}>
        <Image source={{uri: this.props.userInfo.avatar_url}} style={styles.image}/>
        <TouchableHighlight
          style={this.makeBackground(0)}
          onPress={this.goToProfile.bind(this)}
          underlayColor={"#880475"}
          >
            <Text style={styles.buttonText}> View Profile </Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={this.makeBackground(1)}
          onPress={this.goToRepos}
          underlayColor={"#880475"}
          >
          <Text style={styles.buttonText}> View Repos </Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={this.makeBackground(2)}
          onPress={this.goToNotes.bind(this)}
          underlayColor={"#880475"}
          >
          <Text style={styles.buttonText}> View Notes </Text>
        </TouchableHighlight>

      </View>
    )
}
};

module.exports = Dashboard;
