import React, { Component } from "react";
import { Text, View } from "react-native";
import firebase from "firebase";
import { Header, Button } from "./components/common";
import LoginForm from "./components/LoginForm";

class SrcApp extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: null
    };
  }
  componentWillMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyDzkcD6CccmWpp5Sr_J6PEFIdnNH9-kVXM",
      authDomain: "authentication-48183.firebaseapp.com",
      databaseURL: "https://authentication-48183.firebaseio.com",
      projectId: "authentication-48183",
      storageBucket: "authentication-48183.appspot.com",
      messagingSenderId: "164672054813"
    });
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <Button onPress={() => firebase.auth().signOut()}>Log out</Button>
        );
      case false:
        return <LoginForm />;
      default:
        return <Text>Spinner component...Wait</Text>;
    }
  }

  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}

export default SrcApp;
