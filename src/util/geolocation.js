import Geolocation from 'react-native-geolocation-service';
import LaunchNavigator from 'react-native-launch-navigator';

class GeolocationMeta {

    constructor(){
        this.lat = null;
        this.lng = null;
    }


    getCurrentPosition() {
        let options = {
            "distanceFilter": 10,
            "timeout": 30 * 1000,
            "enableHighAccuracy": true
        }

        return new Promise((resolve, reject) => {
            Geolocation.getCurrentPosition((res) => {
                this.lat = res.coords.latitude;
                this.lng = res.coords.longitude;
                let obj = res.coords;
                resolve(obj);
            }, (err) => {
                console.log('errrr', err)
                reject(err);
                global.alert.alert("Não foi possível conseguir a sua localização, verifique o GPS.");
            }, options);
        });
    }

    getDistance(lat1, lon1, lat2, lon2) {
        var R = 6371; // km (change this constant to get miles)
        var dLat = (lat2 - lat1) * Math.PI / 180;
        var dLon = (lon2 - lon1) * Math.PI / 180;
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        if (d > 1) return Math.round(d) + "km";
        else if (d <= 1) return Math.round(d * 1000) + "m";
        return d;
    }

    abreRota = (latI, lngI, latF, lngF) => {
        LaunchNavigator.navigate([latF, lngF], {
            start: `${latI}, ${lngI}`,
            transportMode: 'driving'
        }).then(res => {
            
        }).catch(e => {
            
        })
    }

}


var geolocation = new GeolocationMeta();
global.geolocation = geolocation;
export var geolocation;
