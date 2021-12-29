import React, { Component } from 'react';
import { View, Text, ActivityIndicator, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import { Icon } from "../icon";
import { Form, Input, Item } from "native-base";
import { fonts, colors, p } from '../../styles';
import reactotron from 'reactotron-react-native';
export class SelectModal extends Component {
    state = {
        loading: false,
        busca: "",
        items: this.props.items,
        selectedCatType: null
    }

    removeAcento(newStringComAcento) {
        var string = newStringComAcento;
        var mapaAcentosHex = {
            a: /[\xE0-\xE6]/g,
            A: /[\xC0-\xC6]/g,
            e: /[\xE8-\xEB]/g,
            E: /[\xC8-\xCB]/g,
            i: /[\xEC-\xEF]/g,
            I: /[\xCC-\xCF]/g,
            o: /[\xF2-\xF6]/g,
            O: /[\xD2-\xD6]/g,
            u: /[\xF9-\xFC]/g,
            U: /[\xD9-\xDC]/g,
            c: /\xE7/g,
            C: /\xC7/g,
            n: /\xF1/g,
            N: /\xD1/g
        };

        for (var letra in mapaAcentosHex) {
            var expressaoRegular = mapaAcentosHex[letra];
            string = string.replace(expressaoRegular, letra);
        }

        return string;
    }

    async updateComponent(busca = "") {
        try {
            let items = [];

            busca = this.removeAcento(busca).toLowerCase();

            for (let o of this.props.items) {
                if (this.removeAcento(o.nome).toLowerCase().indexOf(busca) >= 0) {
                    items.push(o);
                }
            }

            this.setState({ loading: false, items });
        } catch (e) {
            global.log(e);
            this.setState({ loading: false, items: [] })
        }
    }

    timeout = null;

    buscar(busca) {
        this.setState({ busca, loading: true }, () => {
            if (this.timeout != null) {
                clearTimeout(this.timeout);
            }

            this.timeout = setTimeout(() => {
                this._onRefresh();
            }, 300);
        });
    }

    _onRefresh() {
        this.setState({ loading: true, items: [] }, () => {
            this.updateComponent(this.state.busca);
        });
    }

    _onPressItem = (item = null) => {
        if (this.props.filtrar) {
            this.props.filtrar(item);
        }
    };


    _renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity 
            style={{ flex: 1, height: 100, justifyContent: 'center', margin: 5, borderRadius: 8, overflow: 'hidden' }}
            onPress={() => {
                if (!this.props.selectedCatType) {
                    this._onPressItem(item)
                }
            }}
            >
            <ImageBackground
                resizeMode='cover'
                // source={{ uri: this.state.item.uri_foto }}
                imageStyle={{ width: '100%', height: '100%', flex: 1 }}
                style={{ flex: 1, height: 100, justifyContent: 'center' }}
                source={item.img}
            >
                
                    {this.props.selectedCatType === item.type ? 
                    <View style={[{ backgroundColor: 'rgba(0,0,0,0.6)', flex: 1, justifyContent: 'center', alignItems: 'center' }]}>
                        <ActivityIndicator color={`white`} size={`large`} />
                    </View>
                    :
                    <View style={[{ backgroundColor: 'rgba(0,0,0,0.6)', flex: 1, justifyContent: 'center', alignItems: 'center' }]}>
                    <Icon name={item.icon} type='FontAwesome5' size={16} style={[p.tcWhite, p.ml4]} />
                    <Text style={{ fontFamily: fonts.montBold, fontSize: fonts.default, marginLeft: 4, color: colors.white, textAlign: "center" }}>
                        {item.nome}
                    </Text>
                </View>
                    }
            </ImageBackground>
                </TouchableOpacity>

        )
    }

    _renderEmpty = () => {
        if (!this.state.loading) {
            return (
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 12 }}>
                    <Text>Nenhuma categoria foi encontrada</Text>
                </View>
            )
        }
        return <View />
    }

    render() {
        const { items, loading, busca } = this.state;

        return (
            <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
                <View style={{ flex: 1, margin: 12, backgroundColor: '#fefefe', opacity: 1, borderRadius: 4 }}>

                    <Form>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                            <Item style={{ flex: 1 }}>
                                <Icon name={'ios-search'} type={'Ionicons'} style={{ fontSize: 22 }} />

                                <Input
                                    placeholderColor='#c0c0c0'
                                    placeholder="Filtrar"
                                    value={busca}
                                    onChangeText={text => this.buscar(text)}
                                />
                            </Item>

                            <TouchableOpacity onPress={() => {
                                setTimeout(() => {
                                    this.props.onClose()
                                }, 100)
                            }}>
                                <View style={{ paddingHorizontal: 16 }}>
                                    <Icon name={'times'} type={'FontAwesome5'} size={16} />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </Form>
                    {this.state.loading ? 
                    <ActivityIndicator color={`black`} size={`large`} />
                    :
                    <View style={{ flex: 1 }}>
                        {items.length ? <Text style={[p.ml8, p.fsDef, p.mb8]}>Selecione uma categoria</Text> : <View />}
                        
                        <FlatList
                            keyboardShouldPersistTaps={`always`}
                            data={items}
                            numColumns={2}
                            renderItem={(data, index) => this._renderItem(data, index)}
                            ListEmptyComponent={this._renderEmpty}
                        />
                    </View>
                    }
                </View>
            </View>
        )
    }
}


