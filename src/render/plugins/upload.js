import Upyun from 'upyun'

export class UpyunCloud {
    constructor(options) {
        const bucket = new Upyun.Service(options.serviceName,options.operatorName,options.operatorPassword)
        this.upyun = new Upyun.Client(bucket, function (bucket, method, path) {
            const params = {
                bucket: bucket.bucketName,
                method,
                path
            }
            return signHeader(params);
        });

        this.options = options;

        function signHeader(payload) {
            const bucket = new Upyun.Service(options.serviceName,options.operatorName,options.operatorPassword)
            const headSign = Upyun.sign.getHeaderSign(bucket, payload.method, payload.path, payload.contentMD5)
            return headSign
        }
    
    }

    async upload(path, content) {
        try {
            let result = await this.upyun.putFile(path, content);
            if (typeof result === "boolean") return result;
            if (typeof result === "object") {
                if (result["file-type"]) return true;
                throw result;
            }
        } catch (err) {
            throw err;
        }
    }

    async deleteFile(path) {
        try {
            return await this.upyun.deleteFile(path);
        } catch (err) {
            throw err;
        }
    }
}
