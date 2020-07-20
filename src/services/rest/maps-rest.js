import { Node } from '../node';

class MapsRest {
    node = null;

    constructor() {
        this.node = new Node();
        this.api = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?";
        this.api_foto = "https://maps.googleapis.com/maps/api/place/photo?";
        this.api_detail = "https://maps.googleapis.com/maps/api/place/details/json?";
    }

    getAll(location, type) {
        let params = `location=${location}&rankby=distance&type=${type}&key=${global.config.key}`;
        return this.node.rest(this.api + params);
    }

    getFoto(id){
        let params = `maxwidth=500&photoreference=${id}&sensor=false&key=${global.config.key}`;
        return this.node.rest(this.api_foto + params, true);
    }

    get(id){
        let params = `place_id=${id}&fields=formatted_phone_number,opening_hours&key=${global.config.key}`;
        return this.node.rest(this.api_detail + params);
    }

}

var maps = new MapsRest();
global.maps = maps;
export var maps;
