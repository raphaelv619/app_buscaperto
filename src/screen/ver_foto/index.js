import React, { Component } from 'react';
import {
    View,
    TouchableWithoutFeedback,
    ImageBackground,
} from 'react-native';

import { Icon } from '../../components';

import { Actions } from 'react-native-router-flux';



export default class VerFoto extends Component {

    render() {
        if (this.props.uri) {
            return (
                <ImageBackground 
                resizeMode='cover'
                style={{ flex: 1 }} 
                source={{ uri: this.props.uri }} >
                    <TouchableWithoutFeedback onPress={() => Actions.pop()}>
                        <View style={{ width: 40, height: 40, backgroundColor: 'rgba(000, 000, 000, 0.5)', margin: 18, borderRadius: 100, alignItems: 'center', justifyContent: 'center' }}>
                            <Icon type='FontAwesome5' name='chevron-left' size={20} style={{  color: '#FFF' }} />
                        </View>
                    </TouchableWithoutFeedback>
                </ImageBackground>
            );
        }
        else {
            return (<View />)
        }
    }
}




