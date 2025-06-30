class Filters {
  refFilter(ref) {
    cy.visit("https://prelivev2-vas-uae-affiliates.jarvisempg.com/admin/crm/clients");
    cy.wait(3000);
    cy.get('[placeholder="Search by Ref #"]').type(ref);
    cy.contains("button", "Search").click();
    cy.get("tbody")
      .should("be.visible")
      .within(() => {
        cy.get("td").then((cells) => {
          const found = [...cells].some((cell) =>
            cell.innerText.includes(ref)
          )
        });
      });
  }
}

export default Filters;