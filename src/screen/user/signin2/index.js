import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';

import { colors, p } from '../../../styles';
import { Button, Content, Input } from '../../../components';
import { connect } from 'react-redux';
import { modificaCampo, userRegister } from '../../../actions';

class Signin2 extends Component {

    getObj() {

        return {
            nome: this.props.nome,
            telefone: this.props.telefone,
            foto: this.props.foto
        };

    }

    _userRegister() {

        let obj = this.getObj();

        let erro = "";

        if (this.props.email == "") erro += "Preencha seu e-mail\n";
        if (this.props.password == "") erro += "Preencha sua senha\n";
        if (this.props.password.length < 6) erro += "A senha deve ter no mínimo 6 caracteres\n";
        if (this.props.password_confirm == "") erro += "Confirme sua senha\n";
        if (this.props.password != this.props.password_confirm) {
            erro += "As senhas devem ser iguais\n";
        }

        if (erro != "") {
            global.alert.alert(erro);
            return;
        }

        this.props.userRegister(this.props.email, this.props.password, obj);

    }

    render() {


        return (

            <Content
                title="Cadastro"
                noScroll
            >

                <StatusBar backgroundColor={colors.primary} barStyle='light-content' />

                <View style={[p.f1, p.p12]}>

                    <View style={[p.mt12]}>
                        <Input
                            placeholder="E-mail"
                            value={this.props.email}
                            onChangeText={(text) => this.props.modificaCampo(text, 'USER_MODIFICA_CAMPO', 'email')}
                            placeholderTextColor={colors.grey}
                            keyboardType={'email-address'}
                            autoCapitalize={"none"}
                        />
                    </View>

                    <View style={[p.mt12]}>
                        <Input
                            placeholder="Senha"
                            value={this.props.password}
                            onChangeText={(text) => this.props.modificaCampo(text, 'USER_MODIFICA_CAMPO', 'password')}
                            placeholderTextColor={colors.grey}
                            secureTextEntry
                        />
                    </View>

                    <View style={[p.mt12]}>
                        <Input
                            placeholder="Confirmar senha"
                            value={this.props.password_confirm}
                            onChangeText={(text) => this.props.modificaCampo(text, 'USER_MODIFICA_CAMPO', 'password_confirm')}
                            placeholderTextColor={colors.grey}
                            secureTextEntry
                        />
                    </View>


                    <Button
                        text="Finalizar"
                        backgroundColor={colors.primary}
                        textColor={colors.white}
                        onPress={() => this._userRegister()}
                    />

                </View>


            </Content >

        );
    }
}

const mapStateToProps = state => (
    {
        nome: state.UserReducer.nome,
        telefone: state.UserReducer.telefone,
        foto: state.UserReducer.foto,
        email: state.UserReducer.email,
        password: state.UserReducer.password,
        password_confirm: state.UserReducer.password_confirm
    }
)

export default connect(mapStateToProps, { modificaCampo, userRegister })(Signin2);
