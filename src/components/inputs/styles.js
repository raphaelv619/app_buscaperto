import { StyleSheet, Dimensions, } from 'react-native';

import { colors, fonts, metrics, p } from '../../styles';

const styles = StyleSheet.create({

    contentInput: {
        flexDirection: 'column',
        marginBottom: 12,
        ...p.bgcWhite,
        ...p.bRad8,
        height: 45
    },

    labelInput: {

        fontSize: fonts.default,
        color: colors.grey,
        ...p.ffRegular
    },

    sectionInput: {

        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        paddingTop: 0,

    },

    inputView: {
        height: 45,
        flex: 1,
        flexDirection: 'column',

    },

    inputDefault: {
        height: 45,
        marginLeft: 12,
        marginRight: 12,
        fontSize: fonts.default,
        color: colors.dark,
        paddingLeft: 0,
        paddingRight: 0,
        ...p.ffRegular,
    },



    icon: {

        fontSize: 20,
        color: colors.dark,
        // marginRight: 12, 
        marginRight: 0,

    },

    borderInput: {

        height: 1,
        backgroundColor: colors.greyLight,

    },

    // focused

    textinput_focused: {
        backgroundColor: 'red',
        color: 'white'
    }


});

export default styles;
