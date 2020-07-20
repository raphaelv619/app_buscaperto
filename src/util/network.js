import NetInfo from "@react-native-community/netinfo";

class Network {

    constructor() {
        this.isConnected = true;
    }


    check(){
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                this.isConnected = true;
            } else {
                this.isConnected = false;
            }
        });
    }

}


var network = new Network();
global.network = network;
export var network;