import { StyleSheet, Dimensions } from 'react-native';

import { colors, metrics, fonts } from '../../styles';

const styles = StyleSheet.create({

    // header style

    header: {

        height: metrics.headerHeight, // height full header
        paddingTop: metrics.headerPadding, // this if u need on IOS
        backgroundColor: colors.primary, // background color header 
        alignItems: 'center',
        flexDirection: 'row',
        // borderTopWidth: 1,
        // borderTopColor: 'rgba(255,255,255, 0.2)',
        // elevation: 4,

    },

    // left flex header

    headerViewLeft: {

        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        // marginLeft: -16,
        // paddingLeft: 16,

    },

    // center flex header 

    headerViewCenter: {

        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

    },

    // right flex header

    headerViewRight: {

        flex: 4,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingRight: 16,

    },

    // title text header

    headerText: {

        color: colors.white,
        fontWeight: 'bold',
        fontSize: fonts.bigger,
        flexDirection: 'row',

    },

    // logo header 

    logo: {

        width: 100,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        flexDirection: 'row',

    },

    // btns header

    btnHead: {
        height: 60,
        width: 46,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'transparent',

    },

    // bell notify

    haveNotify: {

        top: -0,
        right: -0,
        width: 25,
        height: 25,
        position: 'absolute',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',

    },

    notify: {

        height: 15,
        width: 15,
        borderRadius: 20,
        alignItems: 'center',
        backgroundColor: colors.white,

    },

    numberNotify: {

        fontSize: 10,
        color: colors.primary,
        position: 'absolute',

    },

});

export default styles;
