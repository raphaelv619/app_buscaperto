import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, FlatList, Image, ActivityIndicator, TextInput, EventSubscriptionVendor, StatusBar } from 'react-native';

import { colors, p } from '../../../styles';
import { Button, Content, Icon, Input } from '../../../components';
import { userLogin } from '../../../actions';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: ''
        }
    }

    getObj() {

        return {
            login: this.state.login,
            password: this.state.password
        };

    }

    _login() {

        let obj = this.getObj();

        let erro = "";

        if (obj.login == "") erro += "Preencha seu e-mail\n";
        if (obj.password == "") erro += "Preencha sua senha\n";

        if (erro != "") {
            global.alert.alert(erro);
            return;
        }

        this.props.userLogin(obj.login, obj.password);

    }

    render() {


        return (

            <Content
                headerStyle={[p.bgcPrimary]}
                backgroundColor={colors.primary}
                color={colors.white}
                title="Login"
                noScroll
            >

                <View style={[p.mh16]}>

                    <StatusBar backgroundColor={colors.primary} barStyle='light-content' />
                    <View style={[p.mb12]}>
                        <Input
                            placeholder='Endereço de e-mail'
                            placeholderTextColor={colors.grey}
                            value={this.state.login}
                            keyboardType={'email-address'}
                            autoCapitalize={"none"}
                            onChangeText={(text) => this.setState({ login: text })}
                        />
                    </View>

                    <View style={[p.mb8]}>
                        <Input
                            value={this.state.password}
                            onChangeText={(text) => this.setState({ password: text })}
                            placeholder='Senha'
                            secureTextEntry
                            placeholderTextColor={colors.grey}
                        />
                    </View>

                    <View style={[p.row, p.aiCenter, {}]}>
                        <TouchableWithoutFeedback onPress={() => { Actions.forgotPassword() }}>
                            <View style={{ flex: 1, marginBottom: 12 }}>
                                <Text style={[p.tUnderline, p.fwBold, p.ffRegular, p.tUnderline, p.fsBig, p.tcWhite]}>Recuperar senha</Text>
                            </View>
                        </TouchableWithoutFeedback>

                        <View style={[{ flex: 1 }]}>
                            <View style={[p.ml32, p.jCenter, {}]}>

                                <Button
                                    noAnimation
                                    iconRight
                                    name="sign-out-alt"
                                    size={26}
                                    textLeft={true}
                                    height={44}
                                    flexDirection={'row'}
                                    mid
                                    disableIconLeft
                                    text="Entrar"
                                    onPress={() => this._login()}
                                />

                            </View>
                        </View>


                    </View>
                    <View style={[{ height: 300, maxWidth: 400}]}>
                        <Image
                            style={[{width:'100%', height:'100%', flex:1}]}
                            resizeMode="contain"
                            source={require('../../../assets/images/login.png')}
                        />
                    </View>


                </View>

            </Content >

        );
    }
}

const mapStateToProps = state => (
    {
       
    }
)

export default connect(mapStateToProps, { userLogin })(Login);

