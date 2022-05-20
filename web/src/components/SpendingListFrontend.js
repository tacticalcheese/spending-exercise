import React, { useState, useEffect } from "react";
import { FiDollarSign } from "react-icons/fi";
import { DateTime } from "luxon";
import Loader from "./Loader";
import {
  ErrorMessage,
  Spending,
  IconWrapper,
  TextWrapper,
  Amount,
  AmountWrapper,
} from "../styles/ComponentStyles";

export default function SpendingListFrontend({ spendings, setSpendings, refresh, filters, refreshList}) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [modifiedList, setModifiedList] = useState([]);

  useEffect(() => {
    console.log('Frontend called')
    setLoading(true);
    fetch('/spendings', {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then(async (res) => {
        const body = await res.json();
        return {
          status: res.status,
          body,
        };
      })
      .then((response) => {
        if (response.status === 200) {
          setSpendings(response.body);
          setModifiedList(manipulateList(response.body));
        }
      })
      .catch((err) => {
        console.error(err);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
        refreshList(false);
      });
  }, [refresh]);
  
  useEffect(() => {
      if (!loading) {
        setModifiedList(manipulateList(spendings));
      }
  }, [filters]);

  function manipulateList(list) {
    const splittedFilters = filters.split(/[=&]/);
    
    const orderingField= splittedFilters[1].replace('-', '');
    const currencyField = splittedFilters[3];

    const orderedList = list.sort((a, b) => { 
      if (orderingField === 'spent_at') {
        return splittedFilters[1].includes('-') ? new Date(b[orderingField]) - new Date(a[orderingField]) : new Date(a[orderingField]) - new Date(b[orderingField]);
      } else {
        return splittedFilters[1].includes('-') ? b[orderingField]-a[orderingField] : a[orderingField]-b[orderingField];
      }
     });
    if (currencyField) {
      return orderedList.filter((element) => { return element.currency === currencyField});
    } else { return orderedList}
  }

  if (loading) return <Loader />;

  return (
    <>
        <div>I am frontend</div>
      {error && (
        <ErrorMessage>
          The server is probably down. Please try again later.
        </ErrorMessage>
      )}
      {!modifiedList.length && !error && (
        <h1 style={{ textAlign: "center", marginTop: "4rem" }}>
          Yay!{" "}
          <span role="img" aria-label="jsx-a11y/accessible-emoji">
            🎉
          </span>{" "}
          No spendings!
        </h1>
      )}
      {modifiedList.length > 0 &&
        modifiedList.map((spending) => (
          <Spending key={spending.id}>
            <IconWrapper>
              <FiDollarSign color="var(--color-blue)" />
            </IconWrapper>
            <TextWrapper>
              <h3>{spending.description}</h3>
              <p>
                {DateTime.fromISO(spending.spent_at).toFormat(
                  "t - MMMM dd, yyyy"
                )}
              </p>
            </TextWrapper>
            <AmountWrapper>
              <Amount currency={spending.currency}>
                {spending.amount}
              </Amount>
            </AmountWrapper>
          </Spending>
        ))}
    </>
  );
}