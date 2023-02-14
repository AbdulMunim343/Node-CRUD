import React from "react";
import { Text, View } from "react-native";
import {LoginStyles}  from "./login.style";



const Login = () => {
    return (
        <View style={LoginStyles.container}>
            <Text style={LoginStyles.red}>just red</Text>
            <Text style={LoginStyles.bigBlue}>just bigBlue</Text>
            <Text style={[LoginStyles.bigBlue, LoginStyles.red]}>bigBlue, then red</Text>
            <Text style={[LoginStyles.red, LoginStyles.bigBlue]}>red, then bigBlue</Text>
        </View>
    )
}

export default Login;