import Upyun from 'upyun'

export class UpyunCloud {
    constructor(options) {
        let service = new Upyun.Service(
            options.serviceName,
            options.operatorName,
            options.operatorPassword
        );
        this.upyun = new Upyun.Client(service);
        this.options = options;
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
