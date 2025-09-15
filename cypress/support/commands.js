// login
const vas_uae_affi = "https://prelivev2-vas-uae-affiliates.jarvisempg.com/admin/login"

Cypress.Commands.add("login", (email, password) => {
  cy.visit(vas_uae_affi);
  cy.contains("Login with Email").click();
  cy.get('[name="email"]').type(email);
  cy.get('[name="password"]').type(password);
  cy.get('[type="submit"]').click();
  cy.url().should("include", "/dashboard");
});
