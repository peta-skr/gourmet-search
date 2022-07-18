import Home from "./page/Home";
import SearchResult from "./page/SearchResult";
import ShopDetail from "./page/ShopDetail";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import CssBaseline from "@mui/material/CssBaseline";
import { useLocation } from "react-router-dom";
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material/styles";
import NotFound from "./page/NotFound";

function App() {
  const [data, setData] = useState([]); //取得したデータを入れる
  const [available, setAvailable] = useState(0); //取得した店の件数を入れる
  const [load, setLoad] = useState(true); //ロード中かどうか
  const location = useLocation();

  let theme = createTheme({
    palette: {
      primary: {
        light: "#ffbb93",
        main: "#ff8a65",
        dark: "#c75b39",
        contrastText: "#fff",
      },
    },
  });
  theme = responsiveFontSizes(theme);

  return (
    <>
      <CssBaseline />

      <ThemeProvider theme={theme}>
        <Routes location={location} key={location.key}>
          <Route path="/" element={<Home />} />
          <Route
            path="/result"
            element={
              <SearchResult
                data={data}
                setData={setData}
                available={available}
                setAvailable={setAvailable}
                load={load}
                setLoad={setLoad}
              />
            }
          />
          <Route path="/detail" element={<ShopDetail data={data} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
