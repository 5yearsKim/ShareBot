
import { PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "@/global/s3";
import { env } from "@/env";

export async function uploadFile(key: string, file: Buffer, contentType: string): Promise<string> {
  const command = new PutObjectCommand({
    Bucket: env.AWS_BUCKET_NAME,
    Key: key,
    Body: file,
    ContentType: contentType,
  });
  await s3Client.send(command);
  return key;
}

export async function deleteFile(key: string): Promise<void> {
  const command = new DeleteObjectCommand({
    Bucket: env.AWS_BUCKET_NAME,
    Key: key,
  });
  await s3Client.send(command);
}