import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StatusBar, SafeAreaView } from 'react-native';

import { Actions } from 'react-native-router-flux';

import { Icon } from '..';
import { p, colors } from '../../styles';

export default class MenuContainer extends Component {

    _sair() {
        global.alert.confirm("Gostaria de sair?", () => {
            global.bootstrap.logout();
        });
    }

    render() {

        return (

            <SafeAreaView style={[p.f1, p.bgcPrimary]}>

                <StatusBar backgroundColor={colors.primary} />

                <View style={[p.mb16]}>
                    <TouchableOpacity onPress={() => Actions.userEdit()} activeOpacity={0.85}>
                        {/* <TouchableOpacity onPress={() => () => Actions.userEdit()} activeOpacity={0.85}> */}
                        <View style={[p.bgcPrimary, p.row, p.ph16, p.pv22]}>
                            <View style={[p.mr16, p.bCircle, p.ovfHidden, p.bgcPrimaryLight]}>
                                {/* <Image source={require('../../assets/images/man.png')} style={{ width: 80, height: 80 }} resizeMode='contain' /> */}
                            </View>

                            <View style={[p.f1, p.jAround]}>

                                <Text numberOfLines={1} style={[p.ffRegular, p.fsBigger, p.tcWhite]}>{global.user.myprofile.nome}</Text>

                                <Text style={[p.ffBlack, p.fsDef, p.tcWhite]}>Bem vindo</Text>

                            </View>
                        </View>
                    </TouchableOpacity>
                </View>

                {/* btns menu */}

                <View style={[p.f1, p.ph16]}>

                    <ScrollView>

                        <View style={[p.mb22]}>
                            <TouchableOpacity onPress={() => Actions.reset("drawerMenu")} style={[]}>

                                <View style={[p.row, p.aiCenter]}>
                                    <Icon name='home' type='FontAwesome5' size={28} style={[p.tcYellow, p.mr16]} />

                                    <Text style={[p.ffBlack, p.tcWhite, p.fsBig]}>Home</Text>
                                </View>

                            </TouchableOpacity>
                        </View>

                        <View style={[p.mb22]}>
                            <TouchableOpacity onPress={() => Actions.favoritos()}>

                                <View style={[p.row, p.aiCenter]}>

                                    <Icon name='heart' type='FontAwesome' size={28} style={[p.tcYellow, p.mr16]} />

                                    <Text style={[p.ffBlack, p.tcWhite, p.fsBig, {marginLeft:4}]}>Favoritos</Text>

                                </View>

                            </TouchableOpacity>
                        </View>

                        <View style={[p.mb22]}>
                            <TouchableOpacity onPress={() => this._sair()}>

                                <View style={[p.row, p.aiCenter]}>

                                    <Icon name='sign-out' type='FontAwesome' size={28} style={[p.tcYellow, p.mr16]} />

                                    <Text style={[p.ffBlack, p.tcWhite, p.fsBig, {marginLeft:6}]}>Sair</Text>

                                </View>

                            </TouchableOpacity>
                        </View>


                    </ScrollView>

                </View>

            </SafeAreaView >
        );
    }
}
