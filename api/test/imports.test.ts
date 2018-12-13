import request from "supertest";
import { app, store } from "../src/app";

describe("GET /api/imports", () => {
  it("should return 200 OK", () => {
    return request(app).get("/api/imports")
      .expect(200);
  });
});

describe("POST /api/imports", () => {
  it("should return 201 ACCEPTED when all params are correct", () => {
    return request(app).post("/api/imports")
      .field("bookdId", "1")
      .field("type", "word")
      .field("url", "https://google.com")
      .expect(201);
  });

  it("should return 422 when the params are incorrect", () => {
    return request(app).post("/api/imports").expect(422);
  });
});
