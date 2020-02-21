import React, { useState, useEffect } from "react";
import fetch from "./api/data";
import ReactTable from "react-table";
import "react-table/react-table.css";
import "./App.css";
import _ from "lodash";

function calculateResults(incomingData) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  const pointsPerTransaction = incomingData.map(transaction => {
    let points = 0;
    let over100 = transaction.amt - 100;

    if (over100 > 0) {
      // A customer receives 2 points for every dollar spent over $100 in each transaction
      points += over100 * 2;
    }
    if (transaction.amt > 50) {
      // plus 1 point for every dollar spent over $50 in each transaction
      points += 50;
    }
    const month = new Date(transaction.transactionDate).getMonth();
    return { ...transaction, points, month };
  });

  let byCustomer = {};
  let totalPointsByCustomer = {};
  pointsPerTransaction.forEach(pointsPerTransaction => {
    let { customerID, name, month, points } = pointsPerTransaction;
    if (!byCustomer[customerID]) {
      byCustomer[customerID] = [];
    }
    if (!totalPointsByCustomer[customerID]) {
      totalPointsByCustomer[name] = 0;
    }
    totalPointsByCustomer[name] += points;
    if (byCustomer[customerID][month]) {
      byCustomer[customerID][month].points += points;
      byCustomer[customerID][month].monthNumber = month;
      byCustomer[customerID][month].numTransactions++;
    } else {
      byCustomer[customerID][month] = {
        customerID,
        name,
        monthNumber: month,
        month: months[month],
        numTransactions: 1,
        points
      };
    }
  });
  let tot = [];
  for (var custKey in byCustomer) {
    byCustomer[custKey].forEach(cRow => {
      tot.push(cRow);
    });
  }

  let totByCustomer = [];
  for (custKey in totalPointsByCustomer) {
    totByCustomer.push({
      name: custKey,
      points: totalPointsByCustomer[custKey]
    });
  }
  return {
    summaryByCustomer: tot,
    pointsPerTransaction,
    totalPointsByCustomer: totByCustomer
  };
}

function App() {
  const [transactionData, setTransactionData] = useState(null);

  const columns = [
    {
      Header: "Customer",
      accessor: "name"
    },
    {
      Header: "Month",
      accessor: "month"
    },
    {
      Header: "Transactions",
      accessor: "numTransactions"
    },
    {
      Header: "Rewards",
      accessor: "points"
    }
  ];
  const totalsByColumns = [
    {
      Header: "Customer",
      accessor: "name"
    },
    {
      Header: "Total Rewards",
      accessor: "points"
    }
  ];

  function getIndividualTransactions(row) {
    let byCustMonth = _.filter(transactionData.pointsPerTransaction, tRow => {
      return (
        row.original.customerID === tRow.customerID &&
        row.original.monthNumber === tRow.month
      );
    });
    return byCustMonth;
  }

  useEffect(() => {
    fetch().then(data => {
      const results = calculateResults(data);
      setTransactionData(results);
    });
  }, []);

  if (transactionData == null) {
    return <div>Loading...</div>;
  }

  return transactionData == null ? (
    <div>Loading...</div>
  ) : (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-10">
            <h2>Monthly Rewards Earned per Customer</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-8">
            <ReactTable
              data={transactionData.summaryByCustomer}
              defaultPageSize={5}
              columns={columns}
              SubComponent={row => {
                return (
                  <div>
                    {getIndividualTransactions(row).map(tran => {
                      return (
                        <div className="container">
                          <div className="row">
                            <div className="col-8">
                              <strong>Transaction Date:</strong>{" "}
                              {tran.transactionDate} - <strong>$</strong>
                              {tran.amt} - <strong>Points: </strong>
                              {tran.points}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              }}
            />
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-10">
            <h2>Totals Rewards Earned By Each Customer</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-8">
            <ReactTable
              data={transactionData.totalPointsByCustomer}
              columns={totalsByColumns}
              defaultPageSize={5}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
