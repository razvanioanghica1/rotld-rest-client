const schemaValidator = require("../../schemaValidator");
const schema = require("../command-nameserver-update.schema");

test("should throw without argument", () => {
  expect(() => schemaValidator.assert(undefined, schema)).toThrow();
});

test("should throw on invalid argument (wrong type)", () => {
  expect(() => schemaValidator.assert(1, schema)).toThrow();
});

test("should throw on empty argument", () => {
  expect(() => schemaValidator.assert({}, schema)).toThrow();
});

test("should return undefined", () => {
  expect(
    schemaValidator.assert(
      {
        nameserver: "ns1.xn--yla.ro",
        ips: "192.168.0.1"
      },
      schema
    )
  ).toBeUndefined();
});

test("should throw with invalid nameserver (wrong type)", () => {
  expect(() =>
    schemaValidator.assert(
      {
        nameserver: ["ns1.xn--yla.ro"],
        ips: "192.168.0.1"
      },
      schema
    )
  ).toThrow();
});

test("should throw without nameserver", () => {
  expect(() =>
    schemaValidator.assert(
      {
        ips: "192.168.0.1"
      },
      schema
    )
  ).toThrow();
});

test("should throw with invalid nameserver (containing punycode)", () => {
  expect(() =>
    schemaValidator.assert(
      {
        nameserver: "ns1.ș.ro",
        ips: "192.168.0.1"
      },
      schema
    )
  ).toThrow();
});

test("should throw with invalid nameserver (containing port)", () => {
  expect(() =>
    schemaValidator.assert(
      {
        nameserver: "ns1.xn--yla.ro:80",
        ips: "192.168.0.1"
      },
      schema
    )
  ).toThrow();
});

test("should throw without ips", () => {
  expect(() =>
    schemaValidator.assert(
      {
        nameserver: "ns1.xn--yla.ro"
      },
      schema
    )
  ).toThrow();
});

test("should throw with invalid ips (wrong type)", () => {
  expect(() =>
    schemaValidator.assert(
      {
        nameserver: "ns1.xn--yla.ro",
        ips: ["192.168.0.1", "192.168.0.2"]
      },
      schema
    )
  ).toThrow();
});

test("should throw with empty ips", () => {
  expect(() =>
    schemaValidator.assert(
      {
        nameserver: "ns1.xn--yla.ro",
        ips: ""
      },
      schema
    )
  ).toThrow();
});

test("should throw with invalid ips (wrong length)", () => {
  expect(() =>
    schemaValidator.assert(
      {
        nameserver: "ns1.xn--yla.ro",
        ips: "192.168.0.1,192.168.0.2,192.168.0.3"
      },
      schema
    )
  ).toThrow();
});

test("should throw with invalid ips (wrong format)", () => {
  expect(() =>
    schemaValidator.assert(
      {
        nameserver: "ns1.xn--yla.ro",
        ips: "192.168.0.a"
      },
      schema
    )
  ).toThrow();
});
