import AsyncStorage from '@react-native-community/async-storage';

class Db {
    
    data = {};
    tableData = 'mydb';

    init() {
        return new Promise((resolve, reject) => {
            this.getData(this.tableData).then((mydb) => {
                if (mydb != null) this.data = mydb;
                resolve(this.data);
            }, (mydb) => {
                resolve(this.data);
            });
        });
    }

    get(key) {
        return this.data[key];
    }

    getData(table) {
        return new Promise(async (resolve, reject) => {
            try {
                let arr = [];
                let data = await AsyncStorage.getItem(table);
                if (data && data != null && data != "") {
                    arr = JSON.parse(data);
                }

                resolve(arr);
            } catch (e) {
                reject(e);
            }
        });
    }

    set(key, val) {
        let obj = {};
        obj[key] = val;
        return this.setO(obj);
    }

    setO(obj) {
        this.data = { ...this.data, ...obj };
        return this.setData(this.tableData, this.data);
    }

    setData(table, data) {
        return new Promise(async (resolve, reject) => {
            try {
                await this.setDataValidate(table, data);
                resolve("ok");
            } catch (e) {
                reject(e);
            }
        });
    }

    setDataValidate(table, data) {
        let newData = JSON.stringify(data);
        return AsyncStorage.setItem(table, newData);
    }

}

var db = new Db();

global.db = db;

export var db;
