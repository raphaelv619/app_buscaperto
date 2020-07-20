import firebaseDB from 'react-native-firebase';

class FirebaseRest {

    register(email, password, fields) {
        return new Promise((resolve, reject) => {
            firebaseDB.auth().createUserWithEmailAndPassword(email, password)
                .then(res => {
                    let profile = fields;
                    profile.email = email;
                    profile.uid = res.user.uid;
                    profile.password = password;
                    if (profile.foto != '' && profile.foto != undefined) {
                        let name = `${new Date().getTime()}_${Math.random(1000, 9999)}.jpg`;
                        this.uploadToStorage(fields.foto, 'imagens', 'image/jpeg', name).then((ret) => {
                            profile.foto = ret.downloadURL;
                            firebaseDB.database().ref(`${global.config.bancoFirebase}/users/${res.user.uid}`).set(profile);
                            resolve(profile);
                        }).catch((err) => {
                            reject(err)
                        })
                    } else {
                        firebaseDB.database().ref(`${global.config.bancoFirebase}/users/${res.user.uid}`).set(profile);
                        resolve(profile);
                    }
                }, err => {
                    reject(err)
                })
        });
    }

    login(email, password) {
        return new Promise((resolve, reject) => {
            firebaseDB.auth().signInWithEmailAndPassword(email, password)
                .then(res => {
                    firebaseDB.database().ref(`${global.config.bancoFirebase}/users/${res.user.uid}`).once('value').then(ret => {
                        resolve(ret._value);
                    })
                }, err => {
                    console.log('errrrrrrrr', err)
                    reject(err)
                })
        });
    }

    edit(email, password, fields) {

        return new Promise((resolve, reject) => {

            let profile = fields;
            profile.email = global.user.myprofile.email;
            profile.password = global.user.myprofile.password;
            profile.uid = global.user.uuid;
            if (profile.foto != global.user.myprofile.foto) {
                let name = `${new Date().getTime()}_${Math.random(1000, 9999)}.jpg`;
                this.uploadToStorage(fields.foto, 'imagens', 'image/jpeg', name).then((ret) => {
                    profile.foto = ret.downloadURL;
                    firebaseDB.database().ref(`${global.config.bancoFirebase}/users/${global.user.uuid}`).set(profile);
                    resolve(profile);
                }).catch((err) => {
                    reject(err)
                })
            } else {
                firebaseDB.database().ref(`${global.config.bancoFirebase}/users/${global.user.uuid}`).set(profile);
                resolve(profile);
            }

            // let currentPassword = global.user.myprofile.password;
            // if (email != global.user.myprofile.email) {
            //     this.reauthenticate(currentPassword).then(() => {
            //         var user = firebaseDB.auth().currentUser;
            //         user.updateEmail(email).then(() => {
            //             console.log("Email updated!");
            //         }).catch((error) => {
            //             reject(error)
            //             console.log(error);
            //         });
            //     }).catch((error) => {
            //         reject(error)
            //         console.log(error);
            //     });
            // }

            // if (password != '') {
            //     this.reauthenticate(currentPassword).then(() => {
            //         var user = firebaseDB.auth().currentUser;
            //         user.updatePassword(password).then(() => {
            //             profile.password = password;
            //             console.log("Password updated!");
            //         }).catch((error) => {
            //             reject(error)
            //             console.log(error);
            //         });
            //     }).catch((error) => {
            //         reject(error)
            //         console.log(error);
            //     });
            // }


        });
    }

    // reauthenticate = (currentPassword) => {
    //     var user = firebaseDB.auth().currentUser;
    //     var cred = firebaseDB.auth.EmailAuthProvider.credential(
    //         user.email, currentPassword);
    //     return user.reauthenticateWithCredential(cred);
    // }

    forgotPassword = (email) => {
        return new Promise((resolve, reject) => {
            firebaseDB.auth().sendPasswordResetEmail(email)
                .then(function (user) {
                    resolve();
                }).catch(function (e) {
                    reject(e);
                    console.log(e)
                })
        })
    }

    uploadToStorage(uri, folder, type, name) {
        return new Promise((resolve, reject) => {

            var storageRef = firebaseDB.storage().ref();

            storageRef.child(`${folder}/${name}`).put(uri, {
                contentType: type
            }).then((snapshot) => {

                resolve(snapshot);
            }).catch((error) => {
                console.log('error storage', error)
                reject(error);
            });

        });

    }

}

var firebase = new FirebaseRest();
global.firebase = firebase;
export var firebase;
