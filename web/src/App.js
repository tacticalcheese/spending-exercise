import React, { useState } from 'react';
import Form from './components/Form';
import FiltersAndOrderings from './components/FiltersAndOrderings';
import SpendingList from './components/SpendingList';
import Layout from './components/Layout';

export default function App() {
  const [spendings, setSpendings] = useState([]);
  const [refresh, refreshList] = useState(0);

  return (
    <>
      <Layout>
        <Form
          refresh={refresh}
          refreshList={refreshList}
        />
        <FiltersAndOrderings/>
        <SpendingList
          spendings={spendings}
          setSpendings={setSpendings}
          refresh={refresh}
        />
      </Layout>
    </>
  );
}
