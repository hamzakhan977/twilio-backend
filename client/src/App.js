// App.js
import React, { useMemo, useState, useEffect } from "react";

import Table from "./Table";

function App() {

  /* 
    - Columns is a simple array right now, but it will contain some logic later on. It is recommended by react-table to memoize the columns data
    - Here in this example, we have grouped our columns into two headers. react-table is flexible enough to create grouped table headers
  */



  return (
    <div className="App">
      <Table />
    </div>
  );
}

export default App;