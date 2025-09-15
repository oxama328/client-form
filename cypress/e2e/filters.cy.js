import Filters from "../page_objects/filters";
import AddClient from "../page_objects/add_client";
const email = "admin@jarvisempg.com";
const password = "d672bcb35e2f";

const cname= "usama test"
const desig = "Marketing Manager"
const bname = "osama business"
const ctype = 'Dealership - Sales Agent'
const clfc = "Moderate"
const area = "Abu Dhabi"
const subarea = "Al Bidya"

  beforeEach(() => {
    cy.login(email, password);
  });

//   it("Client Filters", () => {
//     const fl = new Filters();
//     fl.refFilter(5)
//   });
// });

describe("Create a client", () => {


  it("with mandatory fields", () => {
    const client = new AddClient();
    client.addClient(555677654);
    client.addName(cname)
    client.designation(desig)
    client.business(bname)
    client.clientType(ctype)
    client.classification(clfc)
    client.location(area, subarea)
  });
});
