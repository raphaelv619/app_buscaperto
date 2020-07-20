import React from 'react';
import { View, TouchableWithoutFeedback, Text } from 'react-native';
import styles from './styles';
import { Icon } from '..';
import { colors } from '../../styles';

let rate = function (value, rate) {
    if (value > (rate - 0.5)) {
        return 'star';
    } else if (value > (rate - 1)) {
        return 'star-half';
    } else {
        return 'star-outline';
    }
};

export const RatingFixed = (props) => {
    let { size } = props;

    if (!size || size <= 0) {
        size = 24;
    }

    return <View {...props} style={{ flexDirection: 'row', alignItems: 'center' }}>


        <View>
            <Icon name={rate(props.rating, 1)} type={'Ionicons'} size={size}
                style={[styles.rating, { color: colors.grey }]} />
        </View>

        <View>
            <Icon name={rate(props.rating, 2)} type={'Ionicons'} size={size}
                style={[styles.rating, { color: colors.grey }]} />
        </View>

        <View>
            <Icon name={rate(props.rating, 3)} type={'Ionicons'} size={size}
                style={[styles.rating, { color: colors.grey }]} />
        </View>

        <View>
            <Icon name={rate(props.rating, 4)} type={'Ionicons'} size={size}
                style={[styles.rating, { color: colors.grey }]} />
        </View>

        <View>
            <Icon name={rate(props.rating, 5)} type={'Ionicons'} size={size}
                style={[styles.rating, { color: colors.grey }]} />
        </View>
    </View>;

};
