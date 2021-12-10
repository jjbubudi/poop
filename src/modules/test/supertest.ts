import http from "http";
import { NextApiHandler } from "next";
import { apiResolver } from "next/dist/server/api-utils";
import supertest from "supertest";

export const nextSupertest = (handler: NextApiHandler) => {
  const server = http.createServer((request, response) =>
    apiResolver(
      request,
      response,
      undefined,
      handler,
      {
        previewModeId: "",
        previewModeEncryptionKey: "",
        previewModeSigningKey: ""
      },
      true
    )
  );
  return supertest(server);
};
