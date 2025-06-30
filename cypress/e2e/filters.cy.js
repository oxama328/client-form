import Filters from "../page_objects/filters";
const email = "admin@jarvisempg.com";
const password = "d672bcb35e2f";
const URL = "https://prelivev2-bayut-sa.jarvisempg.com/admin/crm/clients"

describe("filter searches", () => {
    beforeEach(() => {
    cy.login(email, password); 
  });

  it("Client Filters", () => {
    const fl = new Filters();
    fl.refFilter(67559)
  });
});
