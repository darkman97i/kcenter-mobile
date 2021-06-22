import { ref } from 'vue'
// import { ref, onMounted, watch } from 'vue';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
// import { Filesystem, Directory } from '@capacitor/filesystem'
// import { Storage } from '@capacitor/storage'

export function usePhotoGallery() {
    const photos = ref([]);
    const takePhoto = async () => {
        const cameraPhoto = await Camera.getPhoto({
            resultType: CameraResultType.Uri,
            source: CameraSource.Camera,
            quality: 100
        });

        const fileName = new Date().getTime() + '.jpeg';
        const savedFileImage = {
            filepath: fileName,
            webviewPath: cameraPhoto.webPath
        };

        photos.value = [savedFileImage, ...photos.value];
    };

    return {
        photos,
        takePhoto
    };
}

