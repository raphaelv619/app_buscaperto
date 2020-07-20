import React from 'react';
import { Alert } from 'react-native';

class AlertCustom {
    alert(text, func = null, title = null) {
        Alert.alert(
            title || "Alerta",
            text,
            [
                { text: 'OK', onPress: () => { if (func) func(); } },
            ],
            { cancelable: false }
        )
    }

    confirm(text, func = null, title = "Confirmar", func_cancel = null) {
        Alert.alert(
            title,
            text,
            [
                { text: 'Cancelar', onPress: () => { if (func_cancel) func_cancel(); } },
                { text: 'Confirma', onPress: () => { if (func) func(); } },
            ],
            { cancelable: false }
        )
    }

}


var alert = new AlertCustom();
global.alert = alert;
export var alert;
