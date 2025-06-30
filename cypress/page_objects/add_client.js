class AddClient {
  addClient(val) {
    cy.visit(
      "https://prelivev2-vas-uae-affiliates.jarvisempg.com/admin/crm/clients/new"
    );
    cy.wait(1000); 
    cy.get('input[placeholder="50 123 XXXX"]')
      .type(val)
      .type("Cypress{enter}");
  }
  addName(val) {
    cy.get('input[placeholder="Enter name"]').type(val);
  }
  business(val) {
    cy.get('input[placeholder="Enter business name"]').type(val);
  }
  designation(val) {
    cy.get("#clientDesignation").click();
    cy.contains("div", val).click();
  }
  clientType(val) {
    cy.get("#clientType").click();
    cy.contains("div", val).click();
  }
  classification(val){
    cy.get("#clientClassification").click();
    cy.contains("div", val).click()
  }
  location(val1, val2){
    cy.get("#clientLocation").click()
    cy.contains("div", val1).click()
  }
}
export default AddClient;
