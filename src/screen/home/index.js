import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, FlatList, StatusBar, Modal } from 'react-native';

import { colors, p } from '../../styles';
import { SelectModal, Content, Icon, RatingFixed } from '../../components';
import { getFavoritos } from '../../actions';
import TouchableScale from 'react-native-touchable-scale';
import { Actions } from 'react-native-router-flux';

import { categorias } from './categorias'

import FastImage from 'react-native-fast-image'

import { connect } from 'react-redux';



class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            arr: [],
            selectedCategoria: this.props.favorito ? this.props.favorito : null,
            location: null,
            loading: false,
            itemsCount: 10,
            modalVisible: this.props.favorito || !global.network.isConnected ? false : true,
            change: 0,
            heart: false
        }

    }

    componentDidMount() {
        let location = `${global.geolocation.lat}, ${global.geolocation.lng}`;
        this.setState({ location });
        if (this.props.favorito) {
            if (global.network.isConnected) {
                this.getData(`${global.geolocation.lat}, ${global.geolocation.lng}`, this.props.favorito.type);
            } else {
                let favs = global.user.favoritos;
                let id = this.props.favorito.id;
                let index = favs.indexOf(id);
                this.setState({ arr: global.user.categorias[index].lista, loading: false, heart: true })
            }
        }
    }

    getData(location, type) {
        console.log('loccccccccc', location)
        this.setState({ loading: true });
        global.maps.getAll(location, type).then(res => {
            if (res.results.length > 0) {
                for (let i = 0; i < res.results.length; i++) {
                    let ref = res.results[i];
                    let dist = global.geolocation.getDistance(global.geolocation.lat, global.geolocation.lng, ref.geometry.location.lat, ref.geometry.location.lng);
                    res.results[i].distancia = dist;
                    if (res.results[i].photos) {
                        let foto_id = res.results[i].photos[0].photo_reference;
                        global.maps.getFoto(foto_id).then(ret => {
                            res.results[i].uri_foto = ret;
                            if (i == res.results.length - 1) {
                                this.setState({ arr: res.results, loading: false })
                                let favs = global.user.favoritos;
                                let id = this.state.selectedCategoria.id
                                if (favs.indexOf(id) != -1) {
                                    this.setState({ heart: true })
                                    global.user.updateList(favs.indexOf(id), res.results)
                                }
                            }
                        }).catch(err => {
                            console.log('err', err)
                        })
                    } else {
                        if (i == res.results.length - 1) {
                            this.setState({ arr: res.results, loading: false })
                            let favs = global.user.favoritos;
                            let id = this.state.selectedCategoria.id
                            if (favs.indexOf(id) != -1) {
                                this.setState({ heart: true })
                                global.user.updateList(favs.indexOf(id), res.results)
                            }
                        }
                    }
                }
            } else {
                this.setState({ loading: false, arr: [] })
            }
        }).catch(err => {
            this.setState({ loading: false })
            console.log('errrr', err)
            global.alert.alert('Erro ao retornar dados.')
        })
    }

    atualiza(categoria) {
        this.setState({ selectedCategoria: categoria, heart: false, arr:[] })
        this.getData(`${global.geolocation.lat}, ${global.geolocation.lng}`, categoria.type)
    }

    favoritar() {
        global.user.favoritarCategoria(this.state.selectedCategoria, this.state.arr);
        this.setState({ heart: !this.state.heart })
        this.props.getFavoritos();
    }

    abreRota(item) {
        global.geolocation.abreRota(global.geolocation.lat, global.geolocation.lng, item.geometry.location.lat, item.geometry.location.lng)
    }

    _onEnd() {
        if (this.state.itemsCount == 10) {
            this.setState({ itemsCount: 20, change: this.state.change + 1 })
        }
    }

    _onRefresh() {
        this.setState({ itemsCount: 10 })
    }

    _renderItem = ({ item, index }) => {
        return (
            <TouchableWithoutFeedback onPress={() => {
                this.setState({ detailPress: true })
                Actions.detalhesEstabelecimento({ item, icon: this.state.selectedCategoria.icon })
            }}>
                <View style={[p.p8, p.mv8, p.row]}>

                    <View style={[{ width: 100, height: 165, borderRadius: 8 }, p.ovfHidden]}>
                        {item.uri_foto ?

                            global.network.isConnected ?
                                <FastImage
                                    style={{ width: '100%', height: '100%', flex: 1 }}
                                    source={{
                                        uri: item.uri_foto,
                                        priority: FastImage.priority.high,
                                    }}
                                    resizeMode={FastImage.resizeMode.cover}
                                />
                                :
                                <View style={[p.aiCenter, p.jCenter, { backgroundColor: colors.grey, height: "100%" }]}>
                                    <Icon name={this.state.selectedCategoria.icon} type='FontAwesome5' size={24} style={[p.tcWhite]} />
                                </View>
                            :
                            <View style={[p.aiCenter, p.jCenter, { backgroundColor: colors.grey, height: "100%" }]}>
                                <Icon name={this.state.selectedCategoria.icon} type='FontAwesome5' size={24} style={[p.tcWhite]} />
                            </View>
                        }
                    </View>
                    <View style={[p.ml8, p.f1]}>
                        <View style={[p.f1]}>
                            <View style={[p.f1]}>
                                <Text numberOfLines={2} style={[p.fsDef, p.ffBold, p.mr8, p.f1]}>{item.name}</Text>
                                <View style={[p.row, p.aiCenter, p.mv4]}>
                                    <Icon name='route' type='FontAwesome5' size={16} style={[p.tcDark]} />
                                    <Text style={[p.ml8]}>{item.distancia}</Text>
                                </View>
                                {item.user_ratings_total &&
                                    <View style={[p.row, p.aiCenter]}>
                                        <RatingFixed rating={item.rating} size={14} />
                                        <Text>{`(${item.user_ratings_total})`}</Text>
                                    </View>
                                }
                                <Text numberOfLines={1} style={[p.mr8]}>{item.vicinity}</Text>
                                {item.opening_hours && global.network.isConnected &&
                                    <Text style={{ color: item.opening_hours.open_now ? colors.greennew : colors.rednew }}>{item.opening_hours.open_now ? 'Aberto' : 'Fechado'}</Text>
                                }

                            </View>
                            <View style={[p.f1, p.jEnd]}>
                                <TouchableWithoutFeedback onPress={() => this.abreRota(item)}>
                                    <View style={[p.bgcSecondary, p.p8, p.bRad8, { height: 40 }, p.aiCenter, p.jBetween, p.row]}>
                                        <Text style={[p.tcDark, p.ffBold, p.fsRegular]}>Como chegar</Text>
                                        <Icon name='angle-right' type='FontAwesome5' size={18} style={[p.tcDark]} />
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    _renderHeader() {
        if (!this.state.selectedCategoria && global.network.isConnected) {
            return (
                <Text style={[p.fsDef, p.ffBold, p.mt12, p.ml8]}>Selecione uma categoria</Text>
            )
        }
        if (this.state.arr.length == 0 && !this.state.loading && global.network.isConnected) {
            return (
                <Text style={[p.fsDef, p.ffBold, p.mt12, p.ml8]}>Nenhum resultado encontrado</Text>
            )
        }
        if (this.state.selectedCategoria && !this.state.loading) {
            return (
                <View style={[p.row, p.jBetween, p.aiCenter, p.ph8, !global.network.isConnected ? { marginTop: 12 } : {}]}>
                    <TouchableWithoutFeedback onPress={() => this.favoritar()}>
                        <View style={[p.row, p.aiCenter]}>
                            <Text style={[p.fsDef, p.ffBold]}>{this.state.heart ? "Favorito" : "Favoritar"}</Text>
                            <Icon name={'heart'} type={this.state.heart ? "FontAwesome" : "FontAwesome5"} size={22} style={{ color: this.state.heart ? colors.rednew : colors.dark, marginLeft: 4 }} />
                        </View>
                    </TouchableWithoutFeedback>
                    {!this.state.heart &&
                        <TouchableWithoutFeedback onPress={() => global.alert.alert('Favoritar uma categoria permite que você veja os dados dessa busca mesmo quando estiver sem internet.', () => { }, 'Sobre')}>
                            <View style={[p.aiCenter, p.jCenter, p.p4]}>
                                <Icon name={'info-circle'} type="FontAwesome5" size={22} style={{ color: colors.black, marginRight: 4 }} />
                            </View>
                        </TouchableWithoutFeedback>
                    }
                </View>
            )
        }
        if(!this.state.selectedCategoria && !global.network.isConnected){
            return(
                <Text style={[p.fsDef, p.ffBold, p.mt12, p.ml8]}>Você está offline, caso tenha favoritado alguma categoria, você pode ver os dados das últimas pesquisas na aba Favoritos</Text>
            )
        }
        return (
            <View />
        )
    }

    render() {

        return (

            <Content
                headerHome
                statusBarColor={colors.primary}
                barStyle={'light-content'} menu={true}
                color={colors.primary}
                noScroll
                headerStyles={p.bgcPrimary}
            >
                <StatusBar backgroundColor={colors.primary} barStyle='light-content' />

                <Modal
                    visible={this.state.modalVisible}
                >
                    <SelectModal
                        items={categorias}
                        onClose={() => {
                            this.setState({ modalVisible: false });
                        }}
                        filtrar={(obj) => { this.atualiza(obj), this.setState({ modalVisible: false }) }}
                    />
                </Modal>

                {global.network.isConnected &&
                    <View style={[p.row, p.aiCenter, p.p8, p.jBetween]}>
                        <TouchableWithoutFeedback onPress={() => this.setState({ modalVisible: true })}>
                            <View style={[p.f1, p.row, p.aiCenter, p.jBetween, p.bgcGreyLight, p.p8, p.mt16, p.mh8, p.bRad8, p.mb8]}>
                                <Text style={[p.fsDef, p.ffBold]}>{this.state.selectedCategoria ? this.state.selectedCategoria.nome : 'Selecione'}</Text>
                                <Icon name={'caret-down'} type="FontAwesome5" size={22} style={{ color: colors.black }} />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                }

                <FlatList
                    data={this.state.arr.slice(0, this.state.itemsCount)}
                    renderItem={this._renderItem}
                    ListHeaderComponent={() => this._renderHeader()}
                    onEndReached={() => this._onEnd()}
                    onEndReachedThreshold={0.01}
                    onRefresh={() => this._onRefresh()}
                    refreshing={this.state.loading}
                    showsVerticalScrollIndicator={false}
                    initialNumToRender={20}
                    removeClippedSubviews={true}
                    maxToRenderPerBatch={20}
                    legacyImplementation={true}
                    extraData={this.state.change}
                />

            </Content >

        );
    }
}

const mapStateToProps = state => (
    {
    }
)

export default connect(mapStateToProps, { getFavoritos })(Home);
