import { Platform } from 'react-native';

export default {
    padding: 16,
    ...Platform.select({
        ios: { headerHeight: 62, headerPadding: 0 },
        android: { headerHeight: 62, headerPadding: 0 },
    }),
    tabBarHeight: 50,
};
