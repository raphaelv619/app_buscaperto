import { Actions } from 'react-native-router-flux';

export const userRegister = (email, password, fields) => {
    return dispatch => {

        global.show();
        global.firebase.register(email, password, fields)
            .then((res) => {
                global.hide();
                dispatch({ type: 'LOGIN_USUARIO_SUCESSO' });
                global.user.updateProfile(res);
                Actions.reset('drawerMenu');
            })
            .catch((err) => {
                global.hide();
                console.log('err', err.message);
                let msg = err.message;
                if (msg.indexOf('badly') != -1) {
                    global.alert.alert('E-mail inválido')
                } else if (msg.indexOf('use') != -1) {
                    global.alert.alert('Este e-mail ja existe')
                } else {
                    global.alert.alert('Erro ao fazer login. Verifique sua internet')
                }
            });
    }
}

export const userLogin = (login, password) => {
    global.show();
    global.firebase.login(login, password)
        .then((res) => {
            global.hide();
            global.user.updateProfile(res);
            Actions.reset('drawerMenu');
        })
        .catch((err) => {
            global.hide();
            console.log('err', err.message);
            let msg = err.message;
            if (msg.indexOf('email') != -1) {
                global.alert.alert('E-mail inválido')
            } else if (msg.indexOf('password') != -1) {
                global.alert.alert('Senha incorreta')
            } else if (msg.indexOf('user') != -1){
                global.alert.alert('Este usuário não existe')
            } else {
                global.alert.alert('Erro ao fazer login. Verifique sua internet')
            }
        });
}

export const userEdit = (email, password, fields) => {
    return dispatch => {

        global.show();
        global.firebase.edit(email, password, fields)
            .then((res) => {
                global.hide();
                dispatch({ type: 'LOGIN_USUARIO_SUCESSO' });
                global.user.updateProfile(res);
                dispatch({ type: 'INIT_USER' });
                global.alert.alert('Perfil atualizado com sucesso')
            })
            .catch((err) => {
                global.hide();
                console.log('err', err.message);
                let msg = err.message;
                if (msg.indexOf('badly') != -1) {
                    global.alert.alert('E-mail inválido')
                } else if (msg.indexOf('use') != -1) {
                    global.alert.alert('Este e-mail ja existe')
                } else {
                    global.alert.alert('Erro ao fazer login. Verifique sua internet')
                }
            });
    }
}

export const userForgotPassword = (login) => {
    global.show();
    global.firebase.forgotPassword(login)
        .then((res) => {
            global.hide();
            global.alert.alert('Foi enviado um e-mail com as instruções para recuperar sua senha')
        })
        .catch((err) => {
            global.hide();
            console.log('err', err.message);
            let msg = err.message;
            if (msg.indexOf('email') != -1) {
                global.alert.alert('E-mail inválido')
            } else if (msg.indexOf('password') != -1) {
                global.alert.alert('Senha incorreta')
            } else if (msg.indexOf('user') != -1) {
                global.alert.alert('Este usuário não existe')
            } else {
                global.alert.alert('Erro ao fazer login. Verifique sua internet')
            }
        });
}





