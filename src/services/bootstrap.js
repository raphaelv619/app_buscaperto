import SplashScreen from 'react-native-splash-screen';
import { Actions } from 'react-native-router-flux';

class Bootstrap {
    async init() {
        try {
            await global.network.check();
            await global.geolocation.getCurrentPosition();
            await global.db.init();
            await global.user.init();
            this.splashHide();
            return "initialized";
        } catch (e) {
            this.splashHide();
            throw err;
        }
    }

    splashHide() {
        setTimeout(() => {
            SplashScreen.hide();
        }, 1000);
    }

    logout() {
        global.user.logout();
        Actions.reset('stack0');
    }
}

var bootstrap = new Bootstrap();
global.bootstrap = bootstrap;
export var bootstrap;
