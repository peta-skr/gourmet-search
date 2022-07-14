import SearchInput from "./page/searchInput/SearchInput";
import SearchResult from "./page/searchResult/SearchResult";
import ShopDetail from "./page/shopDetail/ShopDetail";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

function App() {
  const [data, setData] = useState([]);
  const [available, setAvailable] = useState(0);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <SearchInput
              data={data}
              setData={setData}
              setAvailable={setAvailable}
            />
          }
        />
        {/* <Route path="/result">
          <Route
            path=":pageId"
            element={
              <SearchResult
                data={data}
                setData={setData}
                available={available}
              />
            }
          />
        </Route> */}
        <Route
          path="/result"
          element={
            <SearchResult data={data} setData={setData} available={available} />
          }
        />
        <Route path="/detail" element={<ShopDetail data={data} />} />
      </Routes>
    </div>
  );
}

export default App;
