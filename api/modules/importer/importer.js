
module.exports = {
    getUploadUrl: args => new Promise((resolve, reject) => {
        const AWS = require('aws-sdk')
        const s3 = new AWS.S3()
        const credentials = require('../../api_credentials.json').credentials.s3Upload
        const { awsAccessKeyId, awsSecretAccessKey } = credentials
        AWS.config.update({
            accessKeyId: awsAccessKeyId,
            secretAccessKey: awsSecretAccessKey,
            region: 'us-east-1'
        })
        
        const myBucket = 'influentmetricsdev'
        const { type, name } = args
        const signedUrlExpireSeconds = 60 * 1
        
        try {
            const url = s3.getSignedUrl('putObject', {
                Bucket: myBucket,
                Key: name,
                ContentType: type,
                Expires: signedUrlExpireSeconds
            })
            resolve(url)
        } catch (err) {
            reject(err)
        }
    })

}
