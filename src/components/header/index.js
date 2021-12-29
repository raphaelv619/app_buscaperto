import React, { Component, } from 'react';
import { View, Text, StatusBar, TouchableWithoutFeedback, Dimensions, ImageBackground, Platform, Image } from 'react-native';

import styles from './styles';
import { colors, p } from '../../styles';
import { Actions } from 'react-native-router-flux';
import { Icon } from '..';
import TouchableScale from 'react-native-touchable-scale';
import { TextInput } from 'react-native-gesture-handler';
import { connect } from 'react-redux';

class Header extends Component {

    state = {
        searching: false,
    }

    _menuLeft() {

        return (
            <TouchableWithoutFeedback>

                <View style={[styles.btnHead, p.jStart]}>

                    <Icon name='search' size={22} style={{ color: this.props.color ? this.props.color : colors.white }} />

                </View>

            </TouchableWithoutFeedback>
        );
        if (this.props.hasOwnProperty("menu") && this.props.menu) {


        }

        return (
            <TouchableWithoutFeedback onPress={this.props.customPop != null ? this.props.customPop : () => Actions.pop()}>

                <View style={[styles.btnHead, p.jStart, p.pl16]}>

                    <Icon type="FontAwesome5" name='chevron-left' size={22} style={{ color: this.props.color ? this.props.color : colors.white }} />

                </View>

            </TouchableWithoutFeedback>
        );

    }

    _menuCenter() {
        return (

            <View style={[p.f1, p.jCenter]}>
                <View style={{ width: 236, height: 56, }}>
                    {/* <ImageBackground source={require('../../assets/images/logoBorderWhite.png')} style={{ width: 236, height: 56 }} resizeMode='contain' /> */}
                </View>
            </View>

        );

    }

    _menuRight() {
        let {
            onPress = () => global.alert.alert("Em desenvolvimento"),
            iconName = 'edit',
            iconType = 'FontAwesome5',
            iconSize = 22,
            color = colors.white,

        } = this.props;

        if (this.props.hasOwnProperty("bell") && this.props.bell) {
            return (
                <TouchableWithoutFeedback onPressOut={() => { return Actions.notification() }}>

                    <View style={styles.btnHead}>

                        <Icon name='alarm' size={22} style={{ color: '#fff' }} />

                        <View style={[styles.haveNotify,]}>

                            {this.props.total_msg > 0 && this.props.total_msg <= 9 && <View style={styles.notify}>

                                <Text style={styles.numberNotify}>{this.props.total_msg}</Text>

                            </View>}

                            {this.props.total_msg > 9 && <View style={styles.notify}>

                                <Text style={styles.numberNotify}>9+</Text>

                            </View>}

                        </View>

                    </View>

                </TouchableWithoutFeedback>
            );
        }

        if (this.props.hasOwnProperty("action") && this.props.action) {
            return (
                <View style={[p.row, p.aiCenter, { marginRight: -16 }]}>
                    <View style={[p.mr4]}>
                        <Text numberOfLines={1} style={[p.fsBigger, { color: this.props.color ? this.props.color : colors.white }, p.ffBlack, this.props.titleStyles != "" ? this.props.titleStyles : {}]}>{this.props.title}</Text>
                    </View>
                    <TouchableWithoutFeedback onPress={onPress}>
                        <View style={[p.pr16, p.pl8, p.jCenter, { height: 60 }]}>
                            <Icon name={iconName} type={iconType} size={iconSize} style={[{ color: this.props.iconColor ? this.props.iconColor : color }]} />
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            )
        }

        if (this.props.hasOwnProperty("title") && this.props.title) {
            return (
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <Text numberOfLines={1} style={[p.fsBigger, { color: this.props.color ? this.props.color : colors.white }, p.ffBlack, this.props.titleStyles != "" ? this.props.titleStyles : {}]}>{this.props.title}</Text>
                </View>
            )
        }


    }

    headerHome() {
        return (
            <View style={[{ minHeight: 60 }]}>
                <View style={[p.row, p.bgcSecondary, { height: 60 }, this.props.headerStyles ? this.props.headerStyles : {},]}>
                    <View style={[p.pl16]}>
                        <View style={[p.f1, p.jCenter]}>
                            <TouchableWithoutFeedback>
                                <View style={[p.jStart, { flexDirection: `row`, alignItems: `center` }]}>
                                    <Icon name='search' type="FontAwesome5" size={18} style={{ color: '#fff' }} />
                                    <Text style={{ color: `white`, fontSize: 16, fontWeight: `bold`, marginLeft: 16 }} >Resultados</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                </View>
                {this.props.subHeader && this.subHeader()}
            </View>
        );
    }

    subHeader() {
        let nome = 'John Doe';
        return (
            <View style={[p.bgcSecondary,
            this.props.subHeaderStyles ? this.props.subHeaderStyles : {},
            { minHeight: 108 - 60, borderBottomLeftRadius: 28 }]}>
                <View style={[p.row, p.ml16]}>
                    <Text style={[p.ffBlack, p.fsForce, p.tcWhite]}>Olá, </Text>
                    <Text style={[p.ffBlack, p.fsForce, p.tcWhite]}>{nome}</Text>
                </View>
            </View>
        );
    }


    headerSearchLeft() {
        // IOS
        if (this.state.searching == Platform.OS == "ios") {
            return (
                <TouchableWithoutFeedback onPress={() => this.setState({ searching: false })}>
                    <View style={[p.jStart, p.pl16, p.jCenter, { height: 60, width: 46 }]}>
                        <Text style={[p.ffRegular, p.tcError,]}>
                            CANCELAR
            </Text>
                    </View>
                </TouchableWithoutFeedback>
            );
        }

        //ANDROID
        if (this.state.searching == true) {
            return (
                <TouchableWithoutFeedback onPress={() => this.setState({ searching: false }, () => this.props.onChangeSearch(false))}>
                    <View style={[p.jStart, p.pl16, p.jCenter, { height: 60, width: 46 }]}>
                        <Icon type="FontAwesome5" name='trash' size={22} style={[p.tcError]} />
                    </View>
                </TouchableWithoutFeedback>
            );
        }

        return (
            <TouchableWithoutFeedback onPressOut={this.props.customPop ? this.props.customPop : () => Actions.pop()}>
                <View style={[styles.btnHead, p.jStart, p.pl16]}>
                    <Icon type="FontAwesome5" name='chevron-left' size={22} style={[{ color: this.props.color ? this.props.color : colors.white }]} />
                </View>
            </TouchableWithoutFeedback>
        );
    }

    render() {

        if (this.props.search) {
            let headerStyle = this.props.headerStyle ? this.props.headerStyle : {};
            return (
                <View style={[p.row, p.bgcWhite, headerStyle]}>
                    <View style={[]}>
                        {this.headerSearchLeft()}
                    </View>
                    <View style={[p.f1]}>
                        {
                            (this.props.hasOwnProperty("title") && this.props.title) &&
                            <View style={[p.f1]}>
                                <TouchableScale style={[p.f1]} onPress={() => this.setState({ searching: true }, () => this.props.onChangeSearch(true))}>
                                    {!this.state.searching ?
                                        <View style={[p.f1, p.row, p.aiCenter]}>
                                            <View style={[this.props.search && this.props.title ? p.pr12 : {}, p.f1, p.aiEnd, p.jCenter]}>
                                                <Text numberOfLines={1} style={[p.ffBlack, p.fsBigger, { color: this.props.color ? this.props.color : '' }]}>{this.props.title}</Text>
                                            </View>
                                            <View style={[styles.btnHead, p.jStart, p.pr16]}>
                                                <TouchableScale onPress={() => this.setState({ searching: true }, () => this.props.onChangeSearch(true))}>
                                                    <Icon type="FontAwesome5" name='search' size={22} style={[{ color: this.props.color ? this.props.color : colors.white }]} />
                                                </TouchableScale>
                                            </View>
                                        </View>
                                        :
                                        <TextInput style={[p.f1, p.bRad8, p.bgcGreyLight, p.mv8, p.mr16]} autoFocus={true}
                                            value={this.props.searchvalue}
                                            onChangeText={(text) => this.props.searchOnChangeText(text)} />
                                    }
                                </TouchableScale>
                            </View>
                        }
                    </View>
                </View >
            );
        }

        if (this.props.iconRight) {
            let headerStyle = this.props.headerStyle ? this.props.headerStyle : {};
            return (
                <View style={[p.row, p.bgcWhite, headerStyle]}>
                    <View style={[]}>
                        {this.headerSearchLeft()}
                    </View>
                    <View style={[p.f1]}>
                        {
                            (this.props.hasOwnProperty("title") && this.props.title) &&
                            <View style={[p.f1]}>
                                <TouchableScale style={[p.f1]} onPress={() => { }}>
                                    <View style={[p.f1, p.row, p.aiCenter]}>
                                        <View style={[this.props.iconRight && this.props.title ? p.pr16 : {}, p.f1, p.aiEnd, p.jCenter]}>
                                            <Text numberOfLines={1} style={[p.ffBlack, p.fsBigger, { color: this.props.color ? this.props.color : '' }]}>{this.props.title}</Text>
                                        </View>
                                        {this.props.hasPermition &&
                                            <View style={[styles.btnHead, p.jStart, p.pr16]}>
                                                <TouchableScale onPress={() => this.props.onChangeIcon()}>
                                                    <Icon type="FontAwesome5" name='users-cog' size={22} style={[{ color: this.props.color ? this.props.color : colors.white }]} />
                                                </TouchableScale>
                                            </View>
                                        }
                                    </View>
                                </TouchableScale>
                            </View>
                        }
                    </View>
                </View >
            );
        }

        if (this.props.headerHome)
            return (
                <View>
                    {this.headerHome()}
                </View>
            );

        return (

            <View style={[styles.header, { backgroundColor: this.props.headerBackgroundColor ? this.props.headerBackgroundColor : colors.primary }, this.props.headerStyle ? this.props.headerStyle : {}]}>

                <StatusBar backgroundColor={this.props.statusBarColor ? this.props.statusBarColor : this.props.backgroundColor ? this.props.backgroundColor : colors.white} translucent={false} barStyle="light-content" {...this.props} />

                <View style={[styles.headerViewLeft, {}]}>

                    {this._menuLeft()}

                </View>

                <View style={[styles.headerViewRight, {}]}>

                    {this._menuRight()}

                </View>

            </View>

        );

    }

}

const mapStateToProps = state => (
    {
        foto: state.UserReducer.foto,
    }
)

export default connect(mapStateToProps, {})(Header);

