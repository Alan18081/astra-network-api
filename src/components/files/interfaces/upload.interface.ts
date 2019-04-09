import ReadableStream = NodeJS.ReadableStream;

export interface Upload {
   filename: string;
   mimetype: string;
   encoding: string;
   createReadStream: () => ReadableStream;

}