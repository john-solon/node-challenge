import request from "supertest";
import { app, store } from "../src/app";

describe("GET /api/exports", () => {
  it("should return 200 OK", () => {
    return request(app).get("/api/exports")
      .expect(200);
  });
});

describe("POST /api/exports", () => {
  it("should return 201 ACCEPTED when all params are correct", () => {
    return request(app).post("/api/exports")
      .field("bookdId", "1")  
      .field("type", "epub")
      .expect(201);
  });

  it("should return 422 when the params are incorrect", () => {
    return request(app).post("/api/exports").expect(422);
  });
});
