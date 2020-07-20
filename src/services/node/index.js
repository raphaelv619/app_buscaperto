import axios from 'axios';

export class Node {

    rest(link, foto = false) {
        return new Promise((resolve, reject) => {
            this.rfc(link, foto).then((data) => {
                if(data.data){
                    resolve(data.data);
                } else {
                    resolve(data);
                }
            }, reject);
        });
    }

    rfc(link, foto) {

        let rest = null;

        rest = this._axios(link, foto);

        return new Promise((resolve, reject) => {

            rest.then(response => {
                if(foto){
                    resolve(response.config.url);
                } else {
                    resolve(response);
                }
            })
            .catch((error) => {
                reject({ error: 99, error_msg: "Erro ao tentar acessar o servidor.", error_type: "erro_access" });
            });
        });
    }

    _axios(link) {
        let headers = {};

        headers['Accept'] = 'application/json';
        headers['Content-Type'] = 'application/json';

        return axios.get(link, { headers });
    }

}
