import { categorias } from '../screen/home/categorias'
const INITIAL_STATE = {
    favoritos: []
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case 'GET_FAVORITOS':
            let GET_FAVORITOS = { ...state };
            let favs = global.user.favoritos
            if (favs.length > 0) {
                let arr = [];
                for (let i = 0; i < categorias.length; i++) {
                    for (let j = 0; j < favs.length; j++) {
                        if (favs[j] == categorias[i].id) {
                            arr.push(categorias[i])
                        }
                    }
                }
                GET_FAVORITOS.favoritos = arr;
            } else {
                GET_FAVORITOS.favoritos = [];
            }
            return GET_FAVORITOS;

        default:
            return state;
    }
}
