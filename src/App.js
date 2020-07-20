import React, { Component, } from 'react';
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { createStore, applyMiddleware } from 'redux';

import Routes from './Routes';
import reducers from './reducers';

import * as services from './services';
import * as util from './util';
import Loading from './components/loading';

import { PermissionsAndroid, Platform, View } from 'react-native';


class App extends Component {

    permissions = [
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    ];

    verifyPermissions(res = null) {
        if (res != null) {
            let liberado = true;

            for (let x in res) {
                if (res[x] != "granted") {
                    liberado = false;
                }
            }

            if (liberado) {
                global.geolocation.getCurrentPosition();
                return
            };
        }

        global.alert.alert("Para que você consiga interagir no app, será necessário aceitar todas as permissões solicitadas.", () => {
            this.updatePermissions();
        }, "Alerta" );
    }

    updatePermissions() {
        try {
            if (this.permissions.length <= 0) return;

            PermissionsAndroid.requestMultiple(this.permissions).then((res) => {
                this.verifyPermissions(res);
            }, (err) => {
                this.verifyPermissions();
            });
        } catch (err) {
        }
    }

    componentDidMount() {
        console.disableYellowBox = true;
        global.bootstrap.init().then((res) => {
            if(global.user.uuid){
                if (global.network.isConnected){
                    Actions.reset("drawerMenu");
                } else {
                    Actions.replace('favoritos')
                }
            } else {
                Actions.reset("stack0");
            }
        }).catch((err) => {
            console.log("bootstrap error", err);
        });
        if (Platform.OS !== 'ios') this.updatePermissions();

    }

    render() {
        global.store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
        return (

            <View style={{ flex: 1 }}>
                <Loading />
                <Provider store={global.store}>
                    <Routes />
                </Provider>
            </View>
        );
    }
}

export default App;
