const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

const { expect } = chai;
chai.use(sinonChai);

const { productService } = require("../../../src/services");
const { productController } = require("../../../src/controllers");
const { products } = require("./mocks/products.controller.mock");

describe("Teste de unidade do productController", function () {
  describe("Listando os produtos", function () {
    it("Deve retornar o status 200 e a lista de produtos", async function () {
      // arrange
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productService, "listAllProducts")
        .resolves({ type: null, message: products });

      // act
      await productController.listAllProducts(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(products);
    });
  });

  afterEach(function () {
    sinon.restore();
  });
  it("deve responder com 200 e o produto quando existir", async function () {
    // Arrange
    const res = {};
    const req = {
      params: { id: 1 },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productService, "getProductById")
      .resolves({ type: null, message: products[0] });

    // Act
    await productController.getProductById(req, res);

    // Assert
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(products[0]);
  });
});
