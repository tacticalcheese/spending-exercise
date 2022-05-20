import React, { useState } from 'react';
import Form from './components/Form';
import FiltersAndOrderings from './components/FiltersAndOrderings';
import SpendingList from './components/SpendingList';
import Layout from './components/Layout';
import SpendingListFrontend from './components/SpendingListFrontend'

export default function App() {
  const [spendings, setSpendings] = useState([]);
  const [refresh, refreshList] = useState(0);
  const [filters, setFilters] = useState('/?orderBy=-spent_at');
  const [filterSwitch, setFilterSwitch] = useState(false);

  return (
    <>
      <Layout>
        <Form
          refresh={refresh}
          refreshList={refreshList}
        />
        <FiltersAndOrderings
          filters={filters}
          setFilters={setFilters}
          filterSwitch={filterSwitch}
          setFilterSwitch={setFilterSwitch}
        />
        {filterSwitch && (
          <SpendingListFrontend
          spendings={spendings}
          setSpendings={setSpendings}
          refresh={refresh}
          refreshList={refreshList}
          filters={filters}
          />
        )}
        {!filterSwitch && (
          <SpendingList
          spendings={spendings}
          setSpendings={setSpendings}
          refresh={refresh}
          refreshList={refreshList}
          filters={filters}
          />
        )}
      </Layout>
    </>
  );
}
