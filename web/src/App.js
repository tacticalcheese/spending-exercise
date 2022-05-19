import React, { useState } from 'react';
import Form from './components/Form';
import FiltersAndOrderings from './components/FiltersAndOrderings';
import SpendingList from './components/SpendingList';
import Layout from './components/Layout';

export default function App() {
  const [spendings, setSpendings] = useState([]);
  const [refresh, refreshList] = useState(0);
  const [filters, setFilters] = useState('/?orderBy=-spent_at');

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
        />
        <SpendingList
          spendings={spendings}
          setSpendings={setSpendings}
          refresh={refresh}
          filters={filters}
        />
      </Layout>
    </>
  );
}
