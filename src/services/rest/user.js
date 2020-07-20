import { modificaCampo } from '../../actions';
class User {
    uuid = null;
    myprofile = {};
    categorias = [];
    favoritos = [];

    init() {
        let dbdata = global.db.get("user");
        if (dbdata) {
            if (dbdata.uuid) this.uuid = dbdata.uuid;
            if (dbdata.myprofile) this.myprofile = dbdata.myprofile;
            if (dbdata.categorias) this.categorias = dbdata.categorias;
            if (dbdata.favoritos) this.favoritos = dbdata.favoritos;
        }
        global.store.dispatch(modificaCampo("", "INIT_USER", ""));
    }

    syncDb() {
        global.db.set("user", { uuid: this.uuid, myprofile: this.myprofile, categorias: this.categorias, favoritos: this.favoritos });
    }

    updateProfile(fields) {
        this.myprofile = fields;
        this.uuid = fields.uid;
        this.syncDb();
    }

    logout() {
        this.uuid = null;
        this.syncDb();
    }

    favoritarCategoria(categoria, lista) {
        let salva = true;
        let arr = this.categorias;
        let favs = this.favoritos;
        for (let i = 0; i < arr.length; i++) {
            let cat = arr[i].categoria;
            if (cat.id == categoria.id) {
                salva = false;
                arr.splice(i, 1);
                favs.splice(i, 1)
                this.categorias = arr;
                this.favoritos = favs;
                break;
            }

        }
        if (salva) {
            let obj = {}
            obj.categoria = categoria;
            obj.lista = lista;
            this.favoritos.push(categoria.id)
            this.categorias.push(obj);
        }
        this.syncDb();
    }

    updateList(index, lista){
        this.categorias[index].lista = lista;
        this.syncDb();
    }

}

var user = new User();
global.user = user;
export var user;
