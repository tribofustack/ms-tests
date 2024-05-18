const { Given, When, Then } = require('@cucumber/cucumber');
const request = require('supertest');
const dotenv = require('dotenv')

dotenv.config({
  path: ".env",
});

let response;
let cpf;

Given('a user with CPF {string}', (cpfInput) => {
  cpf = cpfInput;
});

When('the user sends a POST request to {string}', async (endpoint) => {
  const chai = await import('chai');
  const { expect } = chai;
  response = await request(process.env.BASE_URL)
    .post("/customer/auth")
    .send({ cpf: cpf });
});

Then('the response should be {int}', async (statusCode) => {
  const chai = await import('chai');
  const { expect } = chai;
  expect(response.status).to.equal(statusCode);
});

Then('the response should contain a JWT token', async () => {
  const chai = await import('chai');
  const { expect } = chai;
  expect(response.body).to.have.property('token');
});

Then('the response should contain an error message {string}', async (errorMessage) => {
  const chai = await import('chai');
  const { expect } = chai;
  expect(response.body).to.have.property('error', errorMessage);
});