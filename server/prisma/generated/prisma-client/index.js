"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_lib_1 = require("prisma-client-lib");
var typeDefs = require("./prisma-schema").typeDefs;

var models = [
  {
    name: "Class",
    embedded: false
  },
  {
    name: "Degree",
    embedded: false
  },
  {
    name: "Meta",
    embedded: false
  },
  {
    name: "Noncurricular",
    embedded: false
  },
  {
    name: "Program",
    embedded: false
  },
  {
    name: "Requirement",
    embedded: false
  },
  {
    name: "Term",
    embedded: false
  },
  {
    name: "Year",
    embedded: false
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `http://localhost:4466`
});
exports.prisma = new exports.Prisma();
