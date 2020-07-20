import ImagePicker from 'react-native-image-picker';
import ImageCropPicker from 'react-native-image-crop-picker';
import _ from 'lodash';


options = {
    title: 'Selecionar Imagens', customButtons: [{ name: 'galeria', title: 'Galeria' },],
    storageOptions: { skipBackup: true, cameraRoll: false, path: 'images' },
    cancelButtonTitle: 'Cancelar',
    takePhotoButtonTitle: 'Câmera',
    chooseFromLibraryButtonTitle: null,
    mediaType: 'photo',
    multiple: true,
    maxWidth: 800,
    maxHeight: 800,
    includeBase64: true,
};
optionsCrop = { width: 400, height: 400, includeBase64: true, mediaType: 'photo' };


export const _openCamera = (modificaCampo, type) => {
    ImagePicker.showImagePicker(options, (response) => {
        if (response.didCancel) { console.log("erro") }
        else if (response.error) { console.log('ImagePicker error: ', response.error); }
        else if (response.customButton) {
            ImageCropPicker.openPicker(options).then(images => {
                vetFotos = [];
                images.forEach(element => {
                    vetFotos = [...vetFotos, {
                        foto: element.path, foto_base_64: element.data, id: Date.now(),
                    }]
                });
                return modificaCampo(vetFotos, type, '');
            });
        }
        else {
            ImageCropPicker.openCropper({
                ...optionsCrop,
                path: response.uri,
            }).then(image => {
                return modificaCampo([{ foto: image.path, foto_base_64: image.data, id: Date.now(), }],
                    type, '');
            });
        }
    });
};



