import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, FlatList, Image, ActivityIndicator, TextInput, StatusBar } from 'react-native';

import { colors, p } from '../../../styles';
import { Button, Content, Icon, Input } from '../../../components';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { modificaCampo } from '../../../actions';
import { _openCamera } from '../../../util/camera';
import { TextInputMask } from 'react-native-masked-text';

class Signin extends Component {

    getObj() {

        return {
            nome: this.props.nome,
            telefone: this.props.telefone
        };

    }

    _next() {

        let obj = this.getObj();

        let erro = "";

        if (obj.nome == "") erro += "Preencha seu nome\n";
        if (obj.telefone == "") erro += "Preencha seu telefone\n";
        if (obj.telefone.length < 14) erro += "Informe o número completo\n";

        if (erro != "") {
            global.alert.alert(erro);
            return;
        }

        Actions.signin2();

    }

    render() {


        return (

            <Content
                title="Cadastro"
                noScroll
            >

                <StatusBar backgroundColor={colors.primary} barStyle='light-content' />

                <View style={[p.f1, p.p12]}>

                    <View style={[p.aiCenter]}>

                        <TouchableWithoutFeedback onPress={() => {
                            _openCamera((value, type, fild) => {
                                this.props.modificaCampo(value[0].foto, 'USER_MODIFICA_CAMPO', 'foto')
                            })
                        }}>
                            <View>


                                <View style={[p.aiCenter, p.jCenter, { width: 130, height: 130, borderRadius: 100, overflow: 'hidden' }]}>
                                    {this.props.foto != '' ?
                                        <Image
                                            source={{ uri: this.props.foto }}
                                            style={{ width: '100%', height: '100%', flex: 1 }}
                                            resizeMode='cover'
                                        /> :
                                        <Image
                                            source={require('../../../assets/images/man.png')}
                                            style={{ width: '100%', height: '100%', flex: 1 }}
                                            resizeMode='contain'
                                        />
                                    }
                                </View>

                                <View style={[p.p8]}>
                                    <Text style={[p.fsBig]}>Adicionar foto</Text>
                                </View>
                            </View>

                        </TouchableWithoutFeedback>
                    </View>

                    <View style={[p.mt12]}>
                        <Input
                            placeholder="Nome"
                            value={this.props.nome}
                            onChangeText={(text) => this.props.modificaCampo(text, 'USER_MODIFICA_CAMPO', 'nome')}
                            placeholderTextColor={colors.grey}
                        />
                    </View>
                    <View style={[p.mb8]}>
                        <TextInputMask
                            type={'cel-phone'}
                            options={{
                                maskType: 'BRL',
                                withDDD: true,
                                dddMask: '(99) '
                            }}
                            style={[p.fsDef, p.mb12, p.ml8]}
                            value={this.props.telefone}
                            onChangeText={(text) => this.props.modificaCampo(text, 'USER_MODIFICA_CAMPO', 'telefone')}
                            placeholder={'Telefone'}
                            placeholderTextColor={colors.grey}
                        />
                    </View>

                    <Button
                        text="Próximo"
                        backgroundColor={colors.primary}
                        onPress={() => this._next()}
                        textColor={colors.white}
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
        foto: state.UserReducer.foto
    }
)

export default connect(mapStateToProps, { modificaCampo })(Signin);
