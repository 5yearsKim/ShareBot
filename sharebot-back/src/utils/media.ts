
import { PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "@/global/s3";
import { env } from "@/env";
import { Readable } from "stream";


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

export async function getFile(key: string): Promise<Buffer> {
  const command = new GetObjectCommand({
    Bucket: env.AWS_BUCKET_NAME,
    Key: key,
  });

  const response = await s3Client.send(command);

  // Convert the response body (ReadableStream) to a Buffer
  const streamToBuffer = async (stream: Readable): Promise<Buffer> => {
    return new Promise((resolve, reject) => {
      const chunks: any[] = [];
      stream.on("data", (chunk) => chunks.push(chunk));
      stream.on("end", () => resolve(Buffer.concat(chunks)));
      stream.on("error", reject);
    });
  };

  if (!response.Body) throw new Error("File not found");

  const fileBuffer = await streamToBuffer(response.Body as Readable);
  return fileBuffer;
}
