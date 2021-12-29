const DEBUG = true;
const BASEDIR_DEV = "development";
const BASEDIR_PRO = "production";
const BASEDIR = DEBUG ? BASEDIR_DEV : BASEDIR_PRO;


var config = {
    debug: DEBUG,
    basedir: BASEDIR,
    key: 'AIzaSyDTTFc2M6ntc51WWmbm3q0RyikjFn_g2dQ',
    bancoFirebase: DEBUG ? 'developer' : 'production'
}

global.config = config;
export var config;
