const DEBUG = true;
const BASEDIR_DEV = "development";
const BASEDIR_PRO = "production";
const BASEDIR = DEBUG ? BASEDIR_DEV : BASEDIR_PRO;


var config = {
    debug: DEBUG,
    basedir: BASEDIR,
    key: 'AIzaSyD6FCqQYJddEjieJv1uFg8Vw_xQ4DIc9E8',
    bancoFirebase: DEBUG ? 'developer' : 'production'
}

global.config = config;
export var config;
