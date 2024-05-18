const { Given, When, Then } = require('@cucumber/cucumber');
const request = require('supertest');
const dotenv = require('dotenv')

dotenv.config({
  path: ".env",
});

let response;
let token;
let orderResponse;
let cpf;
let customerId = '90c44ff2-f792-4e49-bff5-a9c21216897e';
let products = [
  {
    id: '20fe350d-6531-4a1a-86a8-b01fdba8ec8f',
    quantity: 1,
    price: 11
  }
];

Given('a user with CPF {string}', (cpfInput) => {
  cpf = cpfInput;
});

When('the user sends a POST request to {string}', async (endpoint) => {
  const chai = await import('chai');
  const { expect } = chai;
  response = await request(process.env.BASE_URL)
    .post("/customer/auth")
    .send({ cpf: cpf });
  if (response.body.token) {
    token = response.body.token;
  }
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

When('the user sends a POST request to {string} to create an order', async (endpoint) => {
  const chai = await import('chai');
  const { expect } = chai;
  orderResponse = await request(process.env.BASE_URL)
    .post(endpoint)
    .set('Authorization', `Bearer ${token}`)
    .send({
      customerId: customerId,
      products: products
    });
});

Then('the order creation response should be {int}', async (statusCode) => {
  const chai = await import('chai');
  const { expect } = chai;
  expect(orderResponse.status).to.equal(statusCode);
});

Then('the order creation response should contain order details', async () => {
  const chai = await import('chai');
  const { expect } = chai;
  expect(orderResponse.body).to.have.property('customerId', customerId);
  expect(orderResponse.body).to.have.property('orderItems').that.is.an('array');
  expect(orderResponse.body.orderItems[0]).to.have.property('id', products[0].id);
  expect(orderResponse.body.orderItems[0]).to.have.property('quantity', products[0].quantity);
  expect(orderResponse.body.orderItems[0]).to.have.property('price', products[0].price);
  expect(orderResponse.body).to.have.property('createdAt');
});