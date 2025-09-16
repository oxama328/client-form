import AddClient from "../page_objects/add_client";
const email = "admin@jarvisempg.com";
const password = "d672bcb35e2f";

const cname= "usama test"
const desig = "Marketing Manager"
const bname = "osama business"
const ctype = 'Dealership - Sales Agent'
const clfc = "Moderate"
const area = "Abu Dhabi"
const subarea = "Abu Dhabi Formula 1"
const cmail = "john.doe@example.com"
const category = "Manual"
const address = "123 Main St, Dubai"
const source = "Manual"
const pin = "25.2048, 55.2708"
const salesChannel = "Online"
const branches = "1-5"
const salesPersons = "6-10"
const dedicatedFI = "Yes"
const fiPersons = "1-2"
const financing = ["Bank", "In-house"]
const evaluations = ["Internal"]
const evalPartners = "EvalCo, VerifyInc"
const banks = "Bank A, Bank B"
const insuranceProcs = ["Partner A"]
const insuranceRate = "10"
const insurancePartners = "InsureOne, CoverAll"
const cfd = "123"
const evalId = "E-456"

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
    const client = new AddClient()
    client.addClient(555677654)
    client.addName(cname)
    client.email(cmail)
    client.designation(desig)
    client.business(bname)
    client.source(source)
    client.clientType(ctype)
    client.classification(clfc)
    client.address(address)
    client.location(area, subarea)
    client.pinLocation(pin)
    client.salesChannel(salesChannel)
    client.accountManager('Admin')
    client.numberOfBranches(branches)
    client.numberOfSalesPersons(salesPersons)
    client.dedicatedFI(dedicatedFI)
    client.numberOfFIPersons(fiPersons)
    client.financingProcessing(financing)
    client.evaluationsProcessing(evaluations)
    client.evaluationPartnerNames(evalPartners)
    client.listedBanks(banks)
    client.insuranceProcessing(insuranceProcs)
    client.insuranceCommissionRate(insuranceRate)
    client.insurancePartnerNames(insurancePartners)
    client.cfdId(cfd)
    client.evalId(evalId)
    client.save()
  })
  
})