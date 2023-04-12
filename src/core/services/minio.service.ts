import { Client } from 'minio';
import multer from 'multer';
import multerMinIOStorage from 'multer-minio-storage';

import { RequestWithUser } from '@utils/interfaces/index.interface';
import { makeid } from '@utils/util';

export class MinioService {
  public minioClient: Client;
  public bucketName: string;

  constructor() {
    this.minioClient = new Client({
      endPoint: process.env.S3_ENDPOINT,
      accessKey: process.env.S3_ACCESS_KEY,
      secretKey: process.env.S3_SECRET_KEY,
      useSSL: true,
    });
    this.bucketName = process.env.BUCKET_NAME;
  }

  public async createFile(objectName: string, file: Buffer) {
    await this.minioClient.putObject(this.bucketName, objectName, file, null, function (err, etag) {
      if (err) return console.log(err);
      console.log('File uploaded successfully.');
    });
  }

  public async getObjectUrl(objectName) {
    return this.minioClient.presignedUrl('GET', this.bucketName, objectName);
  }

  public getMulter(): multer.Multer {
    const upload = multer({
      storage: multerMinIOStorage({
        minioClient: this.minioClient,
        bucket: this.bucketName,
        acl: 'public-read',
        key: function (req: RequestWithUser, file, cb) {
          const extension = file.originalname.substring(file.originalname.lastIndexOf('.'));
          cb(null, req.user.id + '/' + makeid(12) + extension);
        },
      }),
    });
    return upload;
  }
}
