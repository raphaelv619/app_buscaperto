import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, Image, StatusBar, ScrollView } from 'react-native';

import { colors, p } from '../../../styles';
import { Button, Content, Icon, Input } from '../../../components';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { userEdit } from '../../../actions';
import { _openCamera } from '../../../util/camera';
import { TextInputMask } from 'react-native-masked-text';

class Edit extends Component {

    constructor(props) {
        super(props);

        this.state = {
            nome: global.user.myprofile.nome,
            telefone: global.user.myprofile.telefone,
            foto: global.user.myprofile.foto,
            // email: global.user.myprofile.email,
            // alterarSenha: false,
            // password: '',
            // password_confirm: ''
        }
    }

    getObj() {
        return {
            foto: this.state.foto,
            nome: this.state.nome,
            telefone: this.state.telefone,
        };
    }

    _userEdit() {
        let obj = this.getObj();

        let erro = "";

        if (obj.nome == "") erro += "Preencha seu nome\n";
        if (obj.telefone == "") erro += "Preencha seu telefone\n";
        if (obj.telefone.length < 14) erro += "Informe o número completo\n";

        if (erro != "") {
            global.alert.alert(erro);
            return;
        }

        if(!global.network.isConnected){
            global.alert.alert('Você está sem internet, não é possível atualizar os dados.');
            return;
        }

        this.props.userEdit(null, null, obj);
        // if (this.state.alterarSenha) {
        //     if (this.state.password == '' || this.state.password_confirm == '') return global.alert.alert("Para alterar a senha você deve preencher corretamente os dois campos de senha");
        //     if (this.state.password != this.state.password_confirm) return global.alert.alert("As senhas devem ser iguais");
        //     if (this.state.password.length < 6) return global.alert.alert("A senha deve ter no mínimo 6 caracteres");
        // } else {
        //     this.props.userEdit(this.state.email, this.state.password, obj);
        // }
    }

    render() {


        return (

            <Content
                title="Perfil"
                noScroll
            >

                <StatusBar backgroundColor={colors.primary} barStyle='light-content' />

                <ScrollView>


                    <View style={[p.f1, p.p8]}>

                        <View style={[p.aiCenter]}>

                            <TouchableWithoutFeedback onPress={() => {
                                _openCamera((value, type, fild) => {
                                    this.setState({ foto: value[0].foto})
                                })
                            }}>
                                <View>


                                    <View style={[p.aiCenter, p.jCenter, { width: 130, height: 130, borderRadius: 100, overflow: 'hidden' }]}>
                                        {this.state.foto != '' ?
                                            <Image
                                                source={{ uri: this.state.foto }}
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
                                        <Text style={[p.fsBig, p.tCenter]}>Alterar foto</Text>
                                    </View>
                                </View>

                            </TouchableWithoutFeedback>
                        </View>

                        <View style={[p.mt16]}>
                            <Text style={[{ marginLeft: 12 }]}>Nome</Text>
                            <Input
                                placeholder="Nome"
                                value={this.state.nome}
                                onChangeText={(text) => this.setState({ nome: text })}
                                placeholderTextColor={colors.grey}
                            />
                        </View>
                        <View style={[]}>
                            <Text style={[{ marginLeft: 12 }]}>Telefone</Text>
                            <TextInputMask
                                type={'cel-phone'}
                                options={{
                                    maskType: 'BRL',
                                    withDDD: true,
                                    dddMask: '(99) '
                                }}
                                style={[p.fsDef, p.mb12, p.ml8]}
                                value={this.state.telefone}
                                onChangeText={(text) => this.setState({ telefone: text })}
                                placeholder={'Telefone'}
                                placeholderTextColor={colors.grey}
                            />
                        </View>

                        {/* <View style={[p.mt0]}>
                            <Text style={[{ marginLeft: 12 }]}>E-mail</Text>
                            <Input
                                placeholder="E-mail"
                                value={this.state.email}
                                onChangeText={(text) => this.setState({ email: text })}
                                placeholderTextColor={colors.grey}
                                keyboardType={'email-address'}
                                autoCapitalize={"none"}
                            />
                        </View>


                        <TouchableWithoutFeedback onPress={() => this.setState({ alterarSenha: !this.state.alterarSenha })}>
                            <View style={[p.row, p.aiCenter, p.mb16, { marginLeft: 12 }]}>
                                <Text style={[p.fsDef, p.ffBold]}>Alterar senha</Text>
                                <Icon name={!this.state.changeSenha ? 'chevron-down' : 'chevron-up'} type='FontAwesome5' size={16} style={[p.tcDark, p.ml4]} />
                            </View>
                        </TouchableWithoutFeedback>

                        {this.state.alterarSenha &&
                            <View>
                                <View style={[p.mt0]}>
                                    <Input
                                        placeholder="Nova senha"
                                        value={this.state.password}
                                        onChangeText={(text) => this.setState({ password: text })}
                                        placeholderTextColor={colors.grey}
                                        secureTextEntry
                                    />
                                </View>

                                <View style={[p.mt0]}>
                                    <Input
                                        placeholder="Confirmar nova senha"
                                        value={this.state.password_confirm}
                                        onChangeText={(text) => this.setState({ password_confirm: text })}
                                        placeholderTextColor={colors.grey}
                                        secureTextEntry
                                    />
                                </View>
                            </View>
                        } */}


                        <Button
                            text="Salvar"
                            backgroundColor={colors.primary}
                            onPress={() => this._userEdit()}
                            textColor={colors.white}
                        />

                    </View>
                </ScrollView>



            </Content >

        );
    }
}

const mapStateToProps = state => (
    {

    }
)

export default connect(mapStateToProps, { userEdit })(Edit);
