const INITIAL_STATE = {
    foto: '',
    nome: '',
    telefone: '',
    email: '',
    password: '',
    password_confirm: '',
    change: 0
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case 'USER_MODIFICA_CAMPO':
            let USER_MODIFICA_CAMPO = { ...state };
            USER_MODIFICA_CAMPO[action.payload.campo] = action.payload.valor;
            return USER_MODIFICA_CAMPO;

        case 'INIT_USER':
            let INIT_USER = { ...state };
            INIT_USER.foto = global.user.myprofile.foto;
            return INIT_USER;

        case 'CLEAN_USER':
            let CLEAN_USER = { ...state };
            CLEAN_USER.foto = '';
            return CLEAN_USER;

        case 'LOGIN_USUARIO_SUCESSO':
            return { ...state, ...INITIAL_STATE };

        default:
            return state;
    }
}
