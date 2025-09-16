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
  location(city, area){
    // Open the location picker (click the input inside the container)
    cy.get('#clientLocation')
      .scrollIntoView()
      .within(() => {
        cy.get('input').first().click({ force: true });
      });

    // Scope: visible modal (robust fallbacks if .modal.fade.show is not present)
    cy.get('body', { timeout: 10000 }).then(($b) => {
      const modalRoot = $b.find('.modal.fade.show').length
        ? '.modal.fade.show'
        : ($b.find('[role="dialog"]:visible').length ? '[role="dialog"]:visible' : '.modal:visible');
      cy.get(modalRoot, { timeout: 10000 }).should('be.visible').within(() => {
      // Cities column: scope by header text to avoid index fragility
      cy.contains('h6', /^Cities$/i)
        .closest('.modal-inner-wrapper')
        .within(() => {
          cy.get('.filter__row--section input.ant-input')
            .first()
            .clear({ force: true })
            .type(city, { force: true });

          // Click the whole row that contains the span text
          cy.contains('.modal-list span', new RegExp(`^${city}$`, 'i'), { timeout: 10000 })
            .parents('.modal-list')
            .first()
            .scrollIntoView()
            .click({ force: true });
        });

      // Areas column: appears after city selection
      if (area) {
        cy.contains('h6', /^Areas$/i)
          .closest('.modal-inner-wrapper')
          .within(() => {
            cy.get('.filter__row--section input.ant-input')
              .first()
              .clear({ force: true })
              .type(area, { force: true });

            cy.contains('.modal-list span', new RegExp(`^${area}$`, 'i'), { timeout: 10000 })
              .parents('.modal-list')
              .first()
              .scrollIntoView()
              .click({ force: true });
          });
      }

      // Only two levels: city and area. No sub-area selection needed.

        // Find the Done button by text and click it
        cy.contains('button', 'Done', { matchCase: false, timeout: 10000 })
          .filter(':visible')
          .last()
          .scrollIntoView()
          .click({ force: true });
      });
    });
  }
  uploadLogo(filePath) {
    cy.get('#logo-logo').selectFile(filePath, { force: true });
  }
  email(val) {
    cy.get('input[placeholder="Enter email"]').type(val);
  }
  clientCategory(val) {
    cy.get('#rc_select_4').click({ force: true }).type(val, { force: true }).type('{enter}', { force: true });
  }
  address(val) {
    cy.get('input[placeholder="Enter Address"]').type(val);
  }
  source(val, position) {
    // Open the Source dropdown with tight scoping to its field container
    cy.contains('label', /^Source$/i, { timeout: 10000 })
      .should('be.visible')
      .closest('.faq-form, .form-group, div')
      .within(() => {
        cy.get('.Select_selectContainer__CYh32 .ant-select, .ant-select')
          .first()
          .scrollIntoView()
          .click({ force: true });
      });

    // Interact only with the dropdown that just opened
    cy.get('.ant-select-dropdown:visible', { timeout: 10000 })
      .last()
      .within(() => {
        // If user intention is simply to click Manual, do that first
        cy.contains('.ant-select-item-option-content', /^Manual$/i).then(($opt) => {
          if ($opt && $opt.length && (!val || /manual/i.test(String(val)))) {
            cy.wrap($opt).scrollIntoView().click({ force: true });
            return;
          }
        });

        // If a 1-based index is provided, select that option
        if (typeof position === 'number' && position >= 1) {
          cy.get('.ant-select-item-option')
            .eq(position - 1)
            .scrollIntoView()
            .click({ force: true });
          return;
        }

        // Otherwise prefer selecting by text
        if (val && typeof val === 'string') {
          // Try search input if present for quicker filtering
          cy.get('input.ant-select-selection-search-input').then(($inp) => {
            if ($inp.length) {
              cy.wrap($inp).type(val, { force: true });
            }
          });
          cy.contains('.ant-select-item-option-content', new RegExp(`^${val}$`, 'i'), { timeout: 10000 })
            .scrollIntoView()
            .click({ force: true });
          return;
        }

        // Fallback to first option
        cy.get('.ant-select-item-option').first().scrollIntoView().click({ force: true });
      });

    // Verify the selection reflected in the field (if val provided)
    if (val && typeof val === 'string') {
      cy.contains('label', /^Source$/i)
        .closest('.faq-form, .form-group, div')
        .find('.ant-select .ant-select-selector')
        .should('contain.text', val);
    }
  }
  pinLocation(val) {
    cy.get('input[placeholder="Select Pin Location (Latitude, Longitude)"]')
      .scrollIntoView()
      .click({ force: true })
      .clear({ force: true })
      .type(val, { force: true });
  }
  salesChannel(val) {
    cy.get('#salesChannel').click({ force: true }).type(val, { force: true }).type('{enter}', { force: true });
  }
  accountManager(name) {
    cy.contains('label', 'Account Manager')
      .parent()
      .find('button')
      .scrollIntoView()
      .click({ force: true });
    cy.get('body')
      .contains('div', name, { matchCase: false, timeout: 10000 })
      .scrollIntoView()
      .click({ force: true });
  }
  numberOfBranches(val) {
    cy.get('#rc_select_9').click({ force: true }).type(val, { force: true }).type('{enter}', { force: true });
  }
  numberOfSalesPersons(val) {
    cy.get('#rc_select_10').click({ force: true }).type(val, { force: true }).type('{enter}', { force: true });
  }
  dedicatedFI(val) {
    cy.get('#rc_select_11').click({ force: true }).type(val, { force: true }).type('{enter}', { force: true });
  }
  numberOfFIPersons(val) {
    cy.get('#rc_select_12').click({ force: true }).type(val, { force: true }).type('{enter}', { force: true });
  }
  financingProcessing(values) {
    const options = Array.isArray(values) ? values : [values];
    cy.contains('label', 'Financing Processing')
      .scrollIntoView();
    cy.contains('label', 'Financing Processing')
      .parent()
      .within(() => {
        cy.get('.ant-select').click({ force: true });
        options.forEach((opt) => {
          cy.get('input.ant-select-selection-search-input')
            .type(`${opt}{enter}`, { force: true });
        });
      });
    cy.get('body').type('{esc}', { force: true });
  }
  evaluationsProcessing(values) {
    const options = Array.isArray(values) ? values : [values];
    cy.contains('label', 'Evaluations Processing')
      .scrollIntoView();
    cy.contains('label', 'Evaluations Processing')
      .parent()
      .within(() => {
        cy.get('.ant-select').click({ force: true });
        options.forEach((opt) => {
          cy.get('input.ant-select-selection-search-input')
            .type(`${opt}{enter}`, { force: true });
        });
      });
    cy.get('body').type('{esc}', { force: true });
  }
  evaluationPartnerNames(val) {
    cy.get('textarea[name="evaluation_partner_names"]').type(val);
  }
  listedBanks(val) {
    cy.get('textarea[name="listed_banks"]').type(val);
  }
  insuranceProcessing(values) {
    const options = Array.isArray(values) ? values : [values];
    cy.contains('label', 'Insurance Processing')
      .scrollIntoView();
    cy.contains('label', 'Insurance Processing')
      .parent()
      .within(() => {
        cy.get('.ant-select').click({ force: true });
        options.forEach((opt) => {
          cy.get('input.ant-select-selection-search-input')
            .type(`${opt}{enter}`, { force: true });
        });
      });
    cy.get('body').type('{esc}', { force: true });
  }
  insuranceCommissionRate(val) {
    cy.get('input[name="insurance_commission_rate"]').type(val);
  }
  insurancePartnerNames(val) {
    cy.get('textarea[name="insurance_partner_names"]').type(val);
  }
  cfdId(val) {
    cy.get('input[name="cfd_id"]').type(val);
  }
  evalId(val) {
    cy.get('input[name="eval_id"]').type(val);
  }
  save() {
    // Prefer the fixed footer Save button
    cy.get('body').then(($b) => {
      if ($b.find('.ClientFormRevamped_fixedButtons__qoc5Q').length) {
        cy.get('.ClientFormRevamped_fixedButtons__qoc5Q')
          .should('be.visible')
          .within(() => {
            cy.contains('button, .ant-btn', /^\s*Save\s*$/i)
              .scrollIntoView()
              .should('be.visible')
              .click({ force: true });
          });
      } else {
        // Fallback to any visible Save button
        cy.contains('button, .ant-btn', /^\s*Save\s*$/i)
          .filter(':visible')
          .first()
          .scrollIntoView()
          .click({ force: true });
      }
    });
  }
}
export default AddClient;
