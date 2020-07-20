import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, Image, StatusBar, Linking, ImageBackground, ScrollView } from 'react-native';

import { colors, p } from '../../styles';
import { Content, Icon, RatingFixed } from '../../components';
import { Actions } from 'react-native-router-flux';


export default class DetalhesEstabelecimento extends Component {

    constructor(props) {
        super(props);

        this.state = {
            item: {},
            horarios: false
        }
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        let item = this.props.item;
        this.setState({ item })
        if(global.network.isConnected){
            global.show();
            global.maps.get(item.place_id).then(res => {
                if (res.result.opening_hours && res.result.opening_hours.weekday_text) {
                    item.horarios = res.result.opening_hours.weekday_text;
                }
                if (res.result.formatted_phone_number) {
                    item.telefone = res.result.formatted_phone_number;
                }
                global.hide();
                this.setState({ item })
            }).catch(err => {
                global.hide();
                console.log('err', err)
            })
        }
    }

    abreRota(item) {
        global.geolocation.abreRota(global.geolocation.lat, global.geolocation.lng, item.geometry.location.lat, item.geometry.location.lng)
    }

    abreTelefone(tel) {
        Linking.openURL(`tel:${tel}`)
    }

    translateOpeningHours(i) {
        let str = i;
        let retStr = '';

        if (str.indexOf('Monday') != -1) {
            let rpl = str.replace(/Monday:/g, "Segunda-feira");
            if (rpl.indexOf('Closed') != -1) {
                retStr = rpl.replace(/Closed/g, "Fechado");
            } else {
                retStr = rpl;
            }
        } else if (str.indexOf('Tuesday') != -1) {
            let rpl = str.replace(/Tuesday/g, "Terça-feira");
            if (rpl.indexOf('Closed') != -1) {
                retStr = rpl.replace(/Closed/g, "Fechado");
            } else {
                retStr = rpl;
            }
        } else if (str.indexOf('Wednesday') != -1) {
            let rpl = str.replace(/Wednesday/g, "Quarta-feira");
            if (rpl.indexOf('Closed') != -1) {
                retStr = rpl.replace(/Closed/g, "Fechado");
            } else {
                retStr = rpl;
            }
        } else if (str.indexOf('Thursday') != -1) {
            let rpl = str.replace(/Thursday/g, "Quinta-feira");
            if (rpl.indexOf('Closed') != -1) {
                retStr = rpl.replace(/Closed/g, "Fechado");
            } else {
                retStr = rpl;
            }
        } else if (str.indexOf('Friday') != -1) {
            let rpl = str.replace(/Friday/g, "Sexta-feira");
            if (rpl.indexOf('Closed') != -1) {
                retStr = rpl.replace(/Closed/g, "Fechado");
            } else {
                retStr = rpl;
            }
        } else if (str.indexOf('Saturday') != -1) {
            let rpl = str.replace(/Saturday/g, "Sábado");
            if (rpl.indexOf('Closed') != -1) {
                retStr = rpl.replace(/Closed/g, "Fechado");
            } else {
                retStr = rpl;
            }
        } else if (str.indexOf('Sunday') != -1) {
            let rpl = str.replace(/Sunday/g, "Domingo");
            if (rpl.indexOf('Closed') != -1) {
                retStr = rpl.replace(/Closed/g, "Fechado");
            } else {
                retStr = rpl;
            }
        }
        return retStr;
    }


    render() {
        return (

            <Content
                title="Detalhes"
                noScroll
            >
                <StatusBar backgroundColor={colors.primary} barStyle='light-content' />

                <ScrollView>

                    <ImageBackground
                        resizeMode='cover'
                        source={{ uri: global.network.isConnected ? this.state.item.uri_foto : '' }}
                        imageStyle={{ width: '100%', height: 180 }}
                        style={[{ width: '100%', height: 180, justifyContent: 'flex-end' }]}

                    >
                        <TouchableWithoutFeedback onPress={()=>{
                            if(this.state.item.uri_foto && global.network.isConnected){
                                Actions.verFoto({ uri: this.state.item.uri_foto})
                            }
                        }}>
                            <View style={[p.f1]}>
                                {!this.state.item.uri_foto && global.network.isConnected &&
                                    <View style={[p.f1, p.aiCenter, p.jCenter, { backgroundColor: colors.greyLight }]}>
                                        <Icon name={this.props.icon} type='FontAwesome5' size={40} style={[p.tcDark, { alignSelf: 'center' }]} />
                                    </View>
                                }
                                {!global.network.isConnected &&
                                    <View style={[p.f1, p.aiCenter, p.jCenter, { backgroundColor: colors.greyLight }]}>
                                        <Icon name={this.props.icon} type='FontAwesome5' size={40} style={[p.tcDark, { alignSelf: 'center' }]} />
                                    </View>
                                }
                            </View>
                        </TouchableWithoutFeedback>
                        <View style={[{ backgroundColor: 'rgba(0,0,0,0.6)' }, p.p12]}>
                            <Text style={[p.fsBig, { color: colors.secondary }]}>{this.state.item.name}</Text>
                        </View>
                    </ImageBackground>


                    <View style={[p.p12, p.f1]}>
                        <View>
                            <View style={[p.row, p.aiCenter, p.jBetween]}>
                                <View style={[p.row, p.aiCenter, p.mv4]}>
                                    <Icon name='route' type='FontAwesome5' size={16} style={[p.tcDark]} />
                                    <Text style={[p.ml8]}>{this.state.item.distancia}</Text>
                                </View>
                                {this.state.item.user_ratings_total &&
                                    <View style={[p.row, p.aiCenter]}>
                                        <RatingFixed rating={this.state.item.rating} size={14} />
                                        <Text>{`(${this.state.item.user_ratings_total})`}</Text>
                                    </View>
                                }
                            </View>
                            <View style={[p.row, p.aiCenter, p.mt8]}>
                                <Icon name='map-marker-alt' type='FontAwesome5' size={16} style={[p.tcDark]} />
                                <Text style={[p.ml12]}>{this.state.item.vicinity}</Text>
                            </View>
                            {this.state.item.opening_hours && global.network.isConnected &&
                                <Text style={{ color: this.state.item.opening_hours.open_now ? colors.greennew : colors.rednew, marginTop: 8 }}>{this.state.item.opening_hours.open_now ? 'Aberto' : 'Fechado'}</Text>
                            }
                            {this.state.item.horarios &&
                                <TouchableWithoutFeedback onPress={() => this.setState({ horarios: !this.state.horarios })}>
                                    <View style={[p.row, p.aiCenter, p.mv8]}>
                                        <Text>Horários de funcionamento</Text>
                                        <Icon name={!this.state.horarios ? 'chevron-down' : 'chevron-up'} type='FontAwesome5' size={16} style={[p.tcDark, p.ml4]} />
                                    </View>
                                </TouchableWithoutFeedback>
                            }
                            {this.state.horarios &&
                                this.state.item.horarios.map((i, index) => {
                                    return (
                                        <Text>{this.translateOpeningHours(i)}</Text>
                                    )
                                })
                            }
                            <TouchableWithoutFeedback onPress={() => this.abreRota(this.state.item)}>
                                <View style={[p.bgcSecondary, p.p8, p.bRad8, { height: 40 }, p.aiCenter, p.jBetween, p.row, p.mt8]}>
                                    <Text style={[p.tcDark, p.ffBold, p.fsRegular]}>Como chegar</Text>
                                    <Icon name='angle-right' type='FontAwesome5' size={18} style={[p.tcDark]} />
                                </View>
                            </TouchableWithoutFeedback>
                            {this.state.item.telefone &&
                                <TouchableWithoutFeedback onPress={() => this.abreTelefone(this.state.item.telefone)}>
                                    <View style={[p.bgcPrimary, p.p8, p.bRad8, { height: 40 }, p.aiCenter, p.jBetween, p.row, p.mt8]}>
                                        <Text style={[p.ffBold, p.fsRegular, p.tcWhite]}>{this.state.item.telefone}</Text>
                                        <Icon name='phone' type='FontAwesome5' size={18} style={[p.tcWhite]} />
                                    </View>
                                </TouchableWithoutFeedback>
                            }
                        </View>
                    </View>

                </ScrollView>





            </Content >

        );
    }
}
