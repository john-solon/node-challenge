import request from "supertest";
import { app } from "../src/app";

describe("GET /api/imports", () => {
  it("should return 200 OK", () => {
    return request(app).get("/api/imports")
      .expect(200);
  });
});

describe("POST /api/imports", () => {
  it("should return 201 ACCEPTED when all params are correct", () => {
    return request(app).post("/api/imports")
      .send({bookId: '1', type: "word", url: "https://google.com"})
      .set('Accept', 'application/json')
      .expect(201);
  });

  it("should return 422 when the params are incorrect", () => {
    return request(app).post("/api/imports").expect(422);
  });
});
