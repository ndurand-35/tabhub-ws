import { Client } from 'minio'

export class MinioService {
    public minioClient: Client
    public bucketName: string
    
    constructor() {
        this.minioClient = new Client({
            endPoint: process.env.S3_ENDPOINT,
            accessKey: process.env.S3_ACCESS_KEY,
            secretKey: process.env.S3_SECRET_KEY,
            useSSL : true
        })
        this.bucketName = process.env.BUCKET_NAME
    }

    public async createFile(objectName: string, file: Buffer) {
        await this.minioClient.putObject(this.bucketName, objectName, file, null, function (err, etag) {
			if (err) return console.log(err);
			console.log("File uploaded successfully.");
		});
    }

    public async getObjectUrl(objectName) {
		return this.minioClient.presignedUrl("GET", this.bucketName, objectName);
	}
}