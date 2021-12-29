import React, { Component } from 'react';
import { View, Text, Image, StatusBar } from 'react-native';

import TouchableScale from 'react-native-touchable-scale';
import { Actions } from 'react-native-router-flux';

import { colors, p } from '../../styles';
import { Content, Icon, Button } from '../../components';

export default class BemVindo extends Component {

    render() {

        return (

            <Content
                noHeader
                barStyle={'light-content'}
                color={colors.primary}
                style={[p.f1, { backgroundColor: colors.primary}, p.jCenter, p.aiCenter]}
                noScroll
            >

                <StatusBar backgroundColor={colors.primary} barStyle='light-content' />

                <View style={[p.f1, p.pt16, p.jCenter]}>

                    <Image
                        style={[p.mt0, { alignSelf: 'center' }]}
                        source={require('../../assets/images/bem_vindo/logo_text.png')}
                    />

                    <Text style={[{ color: colors.whiteD }, p.mt32, p.fsBig, p.ffBold, p.tCenter]}>Sem caô, só onde fica.</Text>

                    <Image
                        style={[p.mt32, { alignSelf: 'center' }]}
                        source={require('../../assets/images/bem_vindo/maps.png')}
                    />

                    <Button
                        backgroundColor={colors.secondary}
                        textColor={colors.black}
                        text="Entrar"
                        marginHorizontal={12}
                        marginTop={24}
                        height={50}
                        paddingHorizontal={18}
                        ffBold
                        onPress={() => Actions.reset('drawerMenu')}
                    />

                    {/* <Text style={[{ color: colors.whiteD }, p.mt12, p.fsDef, p.tCenter]}>Já tem conta?</Text>

                    <Button
                        backgroundColor={'rgba(255,255,255,0.1)'}
                        textColor={colors.whiteD}
                        text="Fazer login"
                        marginHorizontal={12}
                        marginTop={12}
                        height={50}
                        onPress={() => Actions.login()}
                    /> */}

                </View>

            </Content >

        );
    }
}

