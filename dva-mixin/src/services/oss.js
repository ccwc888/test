import { getData } from './request';

const client = new global.OSS.Wrapper({
  region: 'oss-cn-qingdao',
  accessKeyId: 'LTAIzvu0Yj2zar2W',
  accessKeySecret: 'xEAmfYu2ZcEsUaonZBffvPjCEYpLEK',
  bucket: 'hzzh-files',
});
export async function multipartUpload(storeAs, file, opt = {}) {
  try {
    const result = await client.multipartUpload(storeAs, file, opt);
    return result;
  } catch (ex) {
    console.error('file upload failed:', ex);
    return null;
  }
}
export function getFileUrl(objectKey, saveAs) {
  try {
    const result = client.signatureUrl(objectKey, {
      expires: 3600,
      response: {
        'content-disposition': `attachment; filename="${saveAs}"`,
      },
    });
    return result;
  } catch (ex) {
    return null;
  }
}
export async function saveStr(saveAs, str) {
  return await getData('oss', 'saveStr', { saveAs, context: str });
}
export async function getContext(objectKey) {
  const data = await getData('oss', 'getContext', { objectKey });
  if (!data.type && data.code && data.code !== 'error') return null;
  return data.data;
}
