import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { v4 as uuid } from 'uuid';
import { ImageSource } from '../models/imageSource';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor(private storage: AngularFireStorage) {}

  async getThumbnailUrl(imagePath, size = '224x224'): Promise<string> {
    if (!imagePath) {
      return null;
    }

    const foldername = imagePath.substring(0, imagePath.lastIndexOf('/') + 1);
    const filenameWithoutExt = imagePath.substring(
      imagePath.lastIndexOf('/') + 1,
      imagePath.lastIndexOf('.')
    );
    const ext = imagePath.split('.').pop();
    const thumbnailPath =
      foldername +
      'thumb_' +
      size +
      '_' +
      filenameWithoutExt +
      '.' +
      ext +
      '.jpg';

    return await this.storage.storage.ref(thumbnailPath).getDownloadURL();
  }

  async getThumbnail(
    image: ImageSource,
    size = '224x224'
  ): Promise<ImageSource> {
    const foldername = image.path.substring(0, image.path.lastIndexOf('/') + 1);
    const filenameWithoutExt = image.path.substring(
      image.path.lastIndexOf('/') + 1,
      image.path.lastIndexOf('.')
    );
    const ext = image.path.split('.').pop();
    const thumbnailPath =
      foldername +
      'thumb_' +
      size +
      '_' +
      filenameWithoutExt +
      '.' +
      ext +
      '.jpg';
    const thumnbnailRef = await this.storage.storage.ref(thumbnailPath);
    return {
      url: await thumnbnailRef.getDownloadURL(),
      size: (await thumnbnailRef.getMetadata()).size,
      name: thumnbnailRef.name,
      path: thumnbnailRef.fullPath,
    };
  }

  async getAllTraderImages(traderId: string): Promise<ImageSource[]> {
    const imageList = await this.storage.storage
      .ref(`Traders/${traderId}/BusinessImages`)
      .list();
    const images = await Promise.all(
      imageList.items.map(async (item) => {
        const metadata = (await item.getMetadata()) as firebase.storage.FullMetadata;
        if (
          metadata.contentType.startsWith('image/') &&
          !this.isThumbnail(metadata.fullPath)
        ) {
          return {
            url: await item.getDownloadURL(),
            size: metadata.size,
            name: metadata.name,
            path: item.fullPath,
          };
        }
      })
    );

    return images.filter((item) => item != null);
  }

  async getAllTraderImageUrls(traderId: string) {
    return (await this.getAllTraderImages(traderId)).map((i) => i.url);
  }

  uploadTraderImage(traderId: string, file: Blob) {
    const filePath = `Traders/${traderId}/BusinessImages/${uuid()}.png`;
    return this.storage.upload(filePath, file);
  }

  uploadProductImage(traderId: string, productId: string, file: Blob) {
    const filePath = `Traders/${traderId}/ProductImages/${productId}/${uuid()}.png`;
    return this.storage.upload(filePath, file);
  }

  async delteImageByUrl(url: string) {
    const imgRef = this.storage.storage.refFromURL(url);
    if (imgRef) {
      await imgRef.delete();
    }
  }

  async getImage(path: string): Promise<ImageSource> {
    const image = await this.storage.storage.ref(path);
    return {
      url: await image.getDownloadURL(),
      size: (await image.getMetadata()).size,
      name: image.name,
      path: image.fullPath,
    };
  }

  isThumbnail(filepath: string): boolean {
    return filepath.indexOf('/thumb_') > -1;
  }
}
