import React, { Component } from "react";
import firebase from "firebase";
import { Text } from "react-native";
import { Button, Card, CardSection, Input, Spinner } from "./common";

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      error: "",
      loading: false
    };
    this.onButtonPress = this.onButtonPress.bind(this);
  }

  onButtonPress() {
    const { email, password } = this.state;
    console.log("Email: ", email, " Password: ", password);
    this.setState({ error: "", loading: true });
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.loginSuccess();
      })
      .catch(() => {
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(() => {
            console.log("No email password found. Creating a user...");
            this.loginSuccess();
          })
          .catch(() => {
            this.loginFailure();
          });
      });
  }

  loginSuccess() {
    console.log("Login Successfull");
    this.setState({
      email: "",
      password: "",
      error: ""
    });
  }

  loginFailure() {
    this.setState({ error: "Authentication Failed", loading: false });
  }

  renderButton() {
    // if (this.state.loading) {
    //   return <Spinner />;
    // }
    return <Button onPress={this.onButtonPress}>Log in</Button>;
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            label="Email"
            placeholder="user@gmail.com"
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
          />
        </CardSection>
        <CardSection>
          <Input
            label="Password"
            secureTextEntry={true}
            placeholder="password"
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
          />
        </CardSection>
        <Text style={styles.errorTextStyle}>{this.state.error}</Text>
        <CardSection>{this.renderButton()}</CardSection>
      </Card>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: "center",
    color: "red"
  }
};

export default LoginForm;
