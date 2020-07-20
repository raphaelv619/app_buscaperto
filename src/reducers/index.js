import { combineReducers } from 'redux';
import UserReducer from './UserReducer';
import FavoritosReducer from './FavoritosReducer';

export default combineReducers({
    UserReducer,
    FavoritosReducer
});
