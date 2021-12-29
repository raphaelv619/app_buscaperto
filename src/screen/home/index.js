import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, StatusBar, Modal, ActivityIndicator, TouchableWithoutFeedback } from 'react-native';

import { colors, p } from '../../styles';
import { SelectModal, Content, Icon, RatingFixed } from '../../components';
import { getFavoritos } from '../../actions';
import TouchableScale from 'react-native-touchable-scale';
import { Actions } from 'react-native-router-flux';

import { categorias } from './categorias'

import FastImage from 'react-native-fast-image'

import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import reactotron from 'reactotron-react-native';
import { WebView } from 'react-native-webview';



class Home extends Component {

    constructor(props) {
        super(props);
        
        this.advert = firebase.admob().rewarded('ca-app-pub-2527516909569780/6748013278');
        // this.bannerRequest = 
        this.state = {
            arr: [],
            selectedCategoria: null,
            selectedCategoriaBefore: null,
            selectedCatType: null,
            location: null,
            loading: false,
            itemsCount: 10,
            modalVisible: true,
            change: 0,
            heart: false,
            showSelector: true,
        }

    }

    componentDidMount() {
        let location = `${global.geolocation.lat}, ${global.geolocation.lng}`;
        this.setState({ location });

        this.advert.on('onRewarded', (event) => {
            this.setState({ modalVisible: false, loading: true, selectedCategoria: this.state.selectedCategoriaBefore }, () => {
                this.getData(`${global.geolocation.lat}, ${global.geolocation.lng}`, this.state.selectedCategoriaBefore.type)
             }) 
        });

        this.advert.on('onAdLoaded', (event) => {
            this.advert.show();
            this.setState({ selectedCatType: null })
        });
    }

    saveLocation() {
        global.user.saveLocation(global.geolocation.lat, global.geolocation.lng);
    }

    saveResults(location, type, res) {
        global.user.saveResults(location, type, res);
    }

    getData(location, type) {
        
        setTimeout(() => {
            const locations = global.user.locations;
            if (locations.length) {
                reactotron.log(`TEM LOCALIZACAO`, locations);
                for (let i = 0; i < locations.length; i ++) {
                    const distance = global.geolocation.getDistance(global.geolocation.lat, global.geolocation.lng, locations[i].lat, locations[i].lng);
                    if (
                        typeof distance === `string` && 
                        distance.includes(`km`) && 
                        parseInt(distance.replace(/\D/g,'') > 5)
                    ) {
                        if (i === locations.length - 1) {
                            reactotron.log(`NOVA LOCALIZACAO`, location);
                            //percorreu todas as locs e não encontrou nenhuma
                            //é uma localização diferente da que existe salva.
                            this.saveLocation();
                            this.getAll(location, type);
                        }
                    } else {
                        //Ja salvou uma localização aproximada antes.
                        //Verificar no array de resultados se possui alguma lista com a categoria selecionada e a localizacao.
                        const results = global.user.results;
                        reactotron.log(`JA TEM ESSA LOC RESULTS`, results, type);
                        if (results.length) {
                            for (let j = 0; j < results.length; j++) {
                                if (results[j].location === `${locations[i].lat}, ${locations[i].lng}` && results[j].type === type) {
                                    //Encontrou resultados salvos anteriormente.
                                    this.setState({ arr: results[j].data, loading: false, change: this.state.change + 1 });
                                    break;
                                } else {
                                    if (j === results.length - 1) {
                                        reactotron.log(`J`, j, `res.l`, results.length)
                                        //percorreu todas as locs e não encontrou nenhuma
                                        //é uma localização diferente da que existe salva.
                                        this.getAll(`${locations[i].lat}, ${locations[i].lng}`, type);
                                    }
                                }
                            }
                        } else {
                            //Não tem nenhum resultado, deve pegar da API
                            this.getAll(location, type);
                        }

                        break;
                    }
                }
            } else {
                reactotron.log(`NAO TEM LOCATIONS`)
                this.saveLocation();
                this.getAll(location, type);
            }
        }, 200);
    }

    getAll(location, type) {
        global.maps.getAll(location, type).then(res => {
            if (res.results.length > 0) {
                this.setState({ arr: res.results, loading: false, change: this.state.change + 1 })
            } else {
                this.setState({ loading: false, arr: [] })
            }
            this.saveResults(location, type, res.results);
        }).catch(err => {
            this.setState({ loading: false })
            console.log('errrr', err)
            global.alert.alert('Erro ao retornar dados.')
        })
    }


    abreRota(item) {
        global.geolocation.abreRota(global.geolocation.lat, global.geolocation.lng, item.geometry.location.lat, item.geometry.location.lng)
    }

    _renderItem = ({ item, index }) => {
        const distancia = global.geolocation.getDistance(global.geolocation.lat, global.geolocation.lng, item.geometry.location.lat, item.geometry.location.lng);
        return (
            <TouchableWithoutFeedback>
                <View style={[p.p8, p.mv8, p.row]}>

                    <View style={[{ width: 100, borderRadius: 8 }, p.ovfHidden]}>
                            <View style={[p.aiCenter, p.jCenter, { backgroundColor: colors.grey, flex: 1}]}>
                                <Icon name={this.state.selectedCategoria.icon} type='FontAwesome5' size={24} style={[p.tcWhite]} />
                            </View>
                    </View>
                    <View style={[p.ml8, p.f1]}>
                        <View style={[p.f1]}>
                            <View style={[p.f1]}>
                                <Text numberOfLines={2} style={[p.fsDef, p.ffBold, p.mr8, p.f1]}>{item.name}</Text>
                                <View style={[p.row, p.aiCenter, p.mv4]}>
                                    <Icon name='route' type='FontAwesome5' size={16} style={[p.tcDark]} />
                                    <Text style={[p.ml8]}>{distancia}</Text>
                                </View>
                                {item.user_ratings_total &&
                                    <View style={[p.row, p.aiCenter]}>
                                        <RatingFixed rating={item.rating} size={14} />
                                        <Text>{`(${item.user_ratings_total})`}</Text>
                                    </View>
                                }
                                <Text style={[p.mr8]}>{item.vicinity}</Text>
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
                <Text style={[p.fsDef, p.ffBold, p.mt12, { marginLeft: 16 }]}>Selecione uma categoria</Text>
            )
        }
        if (this.state.arr.length == 0 && !this.state.loading && global.network.isConnected) {
            return (
                <Text style={[p.fsDef, p.ffBold, p.mt12, { marginLeft: 16 }]}>Nenhum resultado encontrado</Text>
            )
        }
        return (
            <View />
        )
    }

    renderBanner() {
        const Banner = firebase.admob.Banner;
        const AdRequest = firebase.admob.AdRequest;
        const request = new AdRequest();
        if (this.state?.selectedCategoria?.type) {
            request.addKeyword(this.state.selectedCategoria.type);
        }
        return (
            <Banner
              unitId={`ca-app-pub-2527516909569780/7695592426`}
              size={"SMART_BANNER"}
              request={request.build()}
            />
          );
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
                        filtrar={(obj) => { 
                            this.setState({selectedCategoriaBefore: obj, selectedCatType: obj.type })
                            const AdRequest = firebase.admob.AdRequest;
                            const request = new AdRequest();
                            request.addKeyword(obj.type);
                            this.advert.loadAd(request.build());
                        }}
                        selectedCatType={this.state.selectedCatType}
                    />
                </Modal>

                {this.state.showSelector &&
                    <TouchableOpacity onPress={() => {
                        setTimeout(() => {
                            this.setState({ modalVisible: true })
                        }, 100)
                    }}>
                        <View style={[p.row, p.aiCenter, p.p8, p.jBetween]}>
                            <View style={[p.f1, p.row, p.aiCenter, p.jBetween, p.bgcGreyLight, p.p8, p.mh8, p.bRad8]}>
                                <Text style={[p.fsDef, p.ffBold]}>{this.state.selectedCategoria ? this.state.selectedCategoria.nome : 'Selecione'}</Text>
                                <Icon name={'caret-down'} type="FontAwesome5" size={22} style={{ color: colors.black }} />
                            </View>
                        </View>
                    </TouchableOpacity>
                }
                {/* <WebView 
                source={{ uri: 'www.google.com/search?q=restaurantes+perto+de+mim&tbm=lcl' }}
                geolocationEnabled={true}
                style={{ width: `100%`, height: `100%` }}
                injectedJavaScriptBeforeContentLoaded="var markup = document.getElementsByClassName('VkpGBb');
                alert(markup[0]);"
                onMessage={event => reactotron.log('Received: ', event.nativeEvent.data)}
                // rl_tile-group
                // onNavigationStateChange={(navState) => {
                //     // reactotron.log(`NAV STATE`, navState)
                //     if (navState.url.includes(`#`)) {
                //         if (this.state.showSelector) {
                //             setTimeout(() => {
                //                 this.setState({ showSelector: false })
                //             }, 500)
                //         }
                //     } else {
                //         if (!this.state.showSelector) {
                //             setTimeout(() => {
                //                 this.setState({ showSelector: true })
                //             }, 500)
                //         }
                //     }
                //     // Keep track of going back navigation within component
                //     // this.canGoBack = navState.canGoBack;
                //   }}
                /> */}
                {/* /search?client=safari&rls=en&tbs=lf:1,lf_ui:9&tbm=lcl&sxsrf=AOaemvJnt6v-j_Z6dGinXwLcZh46df2nEg:1640706973019&q=padarias+perto+de+mim&rflfq=1&num=10&sa=X&ved=2ahUKEwj4ibri7Yb1AhXpqJUCHbkvAfwQjGp6BAgDEFE */}

                {this.state.loading ? 
                    <ActivityIndicator style={{ marginTop: 16 }} size={'large'} color={`black`} />
                    :
                    <FlatList
                        data={this.state.arr}
                        renderItem={this._renderItem}
                        ListHeaderComponent={() => this._renderHeader()}
                        refreshing={this.state.loading}
                        showsVerticalScrollIndicator={false}
                        initialNumToRender={5}
                        removeClippedSubviews={true}
                        maxToRenderPerBatch={5}
                        legacyImplementation={true}
                        extraData={this.state.change}
                    />
                }
                {!this.state.modalVisible && !this.state.loading ? this.renderBanner() : <View /> }


            </Content >

        );
    }
}

const mapStateToProps = state => (
    {
    }
)

export default connect(mapStateToProps, { getFavoritos })(Home);
