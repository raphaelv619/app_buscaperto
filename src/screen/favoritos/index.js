import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, FlatList, ImageBackground, StatusBar } from 'react-native';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import { colors, p, fonts } from '../../styles';
import { Content, Icon } from '../../components';
import { getFavoritos } from '../../actions'
import { categorias } from '../home/categorias';

class Favoritos extends Component {


    componentDidMount() {
        this.props.getFavoritos();
    }


    _renderItem = ({ item, index }) => {
        let changeStyle = index == this.props.favoritos.length - 1 && index % 2 == 0;
        return (
            <ImageBackground
                resizeMode='cover'
                imageStyle={{ width: '100%', height: '100%', flex: 1 }}
                style={[p.f1, p.jCenter, p.ovfHidden, p.bRad8, { height: 100, margin: 5, }, changeStyle  ? {flex:0.5, marginRight:10} : {}]}
                source={item.img}
            >

                <TouchableWithoutFeedback onPress={() => Actions.home({favorito:item})}>
                    <View style={[{ backgroundColor: 'rgba(0,0,0,0.6)', flex: 1, justifyContent: 'center', alignItems: 'center' }]}>
                        <Icon name={item.icon} type='FontAwesome5' size={16} style={[p.tcWhite, p.ml4]} />
                        <Text style={{ fontFamily: fonts.montBold, fontSize: fonts.default, marginLeft: 4, color: colors.white, textAlign: "center" }}>
                            {item.nome}
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
            </ImageBackground>

        )
    }

    _renderEmpty = () => {
        if (this.props.favoritos.length == 0) {
            return (
                <View style={{ marginTop: 12 }}>
                    <Text>Nenhuma categoria foi encontrada</Text>
                </View>
            )
        }
        return <View />
    }

    _renderHeader(){
        if(!global.network.isConnected){
            return <Text style={[p.mb12]}>Você está offline, mas pode navegar nas últimas buscas de suas categorias favoritas.</Text>
        } else {
            return <View/>
        }
    }

    render() {

        return (

            <Content
                title="Favoritos"
                noScroll
                customPop={ !global.network.isConnected ?  () => Actions.reset('drawerMenu') : null}
            >

                <StatusBar backgroundColor={colors.primary} barStyle='light-content' />

                <View style={[p.f1, p.p12]}>

                    <FlatList
                        data={this.props.favoritos}
                        numColumns={2}
                        ListEmptyComponent={this._renderEmpty}
                        renderItem={(data, index) => this._renderItem(data, index)}
                        ListHeaderComponent={()=>this._renderHeader()}
                    />

                </View>


            </Content >

        );
    }
}

const mapStateToProps = state => (
    {
        favoritos: state.FavoritosReducer.favoritos,
    }
)

export default connect(mapStateToProps, { getFavoritos })(Favoritos);


