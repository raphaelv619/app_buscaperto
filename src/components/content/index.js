import React from 'react';
import {
    Dimensions,
    Image,
    ScrollView,
    StatusBar,
    View,
} from 'react-native';
import { Container, Content as ContentNative } from 'native-base'

import Header from '../header';
import { colors, p } from '../../styles';

import { Button } from '../../components';

export const Content = (props) => {

    return (
        <Container style={{ flex: 1, position: 'relative' }} showsVerticalScrollIndicator={false}>

            {!props.noHeader && <StatusBar backgroundColor={props.statusBarColor ? props.statusBarColor : props.backgroundColor ? props.backgroundColor : colors.white} barStyle={'dark-content'} {...props} />}
            {!props.noHeader && <Header {...props} />}
            {!props.noScroll && <ContentNative style={[p.f1, { backgroundColor: props.backgroundColor ? props.backgroundColor : colors.white }, props.bodyStyle]} {...props} />}
            {props.noScroll && <View style={[p.f1, { backgroundColor: props.backgroundColor ? props.backgroundColor : colors.white }, props.bodyStyle]}  {...props} />}
            {props.buttonBottomPage &&
                <View style={[{ position: "absolute", left: 16, right: 16, bottom: 0 }]}>
                    <Button
                        text={props.buttonText}

                        onPress={props.buttonOnPress}
                        style={[p.m16, p.ele2,]}
                    />
                </View>
            }

        </Container>
    )
}
