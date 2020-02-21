export default function() {
  // simulates data coming from a database.
  return Promise.resolve([
    {
      customerID: 1,
      name: "John",
      amt: 120,
      transactionDate: "01-01-2020"
    },
    {
      customerID: 1,
      name: "John",
      amt: 75,
      transactionDate: "01-02-2020"
    },
    {
      customerID: 1,
      name: "John",
      amt: 94,
      transactionDate: "01-02-2020"
    },
    {
      customerID: 1,
      name: "John",
      amt: 10,
      transactionDate: "02-01-2020"
    },
    {
      customerID: 1,
      name: "John",
      amt: 75,
      transactionDate: "02-02-2020"
    },
    {
      customerID: 1,
      name: "John",
      amt: 200,
      transactionDate: "03-01-2020"
    },
    {
      customerID: 1,
      name: "John",
      amt: 1,
      transactionDate: "03-04-2020"
    },
    {
      customerID: 1,
      name: "John",
      amt: 80,
      transactionDate: "03-03-2020"
    },
    {
      customerID: 1,
      name: "John",
      amt: 224,
      transactionDate: "03-02-2020"
    },
    {
      customerID: 2,
      name: "Mike",
      amt: 125,
      transactionDate: "01-01-2020"
    },
    {
      customerID: 2,
      name: "Mike",
      amt: 75,
      transactionDate: "01-02-2020"
    },
    {
      customerID: 2,
      name: "Mike",
      amt: 10,
      transactionDate: "02-01-2020"
    },
    {
      customerID: 2,
      name: "Mike",
      amt: 75,
      transactionDate: "02-02-2020"
    },
    {
      customerID: 2,
      name: "Mike",
      amt: 200,
      transactionDate: "03-01-2020"
    },
    {
      customerID: 2,
      name: "Mike",
      amt: 224,
      transactionDate: "03-02-2020"
    },
    {
      customerID: 3,
      name: "Kevin",
      amt: 120,
      transactionDate: "02-02-2020"
    }
  ]);
}
