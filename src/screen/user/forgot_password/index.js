import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, FlatList, Image, ActivityIndicator, TextInput, EventSubscriptionVendor, StatusBar } from 'react-native';

import { colors, p } from '../../../styles';
import { Button, Content, Icon, Input } from '../../../components';
import { userForgotPassword } from '../../../actions';

export default class ForgotPassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            login: ''
        }
    }

    getObj() {

        return {
            login: this.state.login
        };

    }

    _userForgotPassword() {

        let obj = this.getObj();

        let erro = "";

        if (obj.login == "") erro += "Preencha seu e-mail\n";

        if (erro != "") {
            global.alert.alert(erro);
            return;
        }

        userForgotPassword(obj.login);

    }

    render() {


        return (

            <Content
                headerStyle={[p.bgcPrimary]}
                backgroundColor={colors.primary}
                color={colors.white}
                title="Recuperar senha"
                noScroll
            >

                <View style={[p.mh16]}>

                    <StatusBar backgroundColor={colors.primary} barStyle='light-content' />
                    <Text style={[p.tcWhite, p.ffBold, p.fsDef, p.fwBold, p.mb8, {}]}>Use seu e-mail para recuperar a senha</Text>
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

                    <View style={{ marginTop: 16 }}>

                        <Button
                            noAnimation
                            iconRightSize={22}
                            big
                            loading={this.props.loading_login}
                            onPress={() => this._userForgotPassword()}
                            text="Recuperar Senha"
                        />

                    </View>


                </View>

            </Content >

        );
    }
}

