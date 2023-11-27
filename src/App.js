import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";

import "./App.css";
import HomePage from "./pages/HomePage";
import FilterPage from "./pages/FilterPage";
import NotFoundPage from "./pages/NotFoundPage";
import SearchPage from "./pages/SearchPage";
import DetailPage from "./pages/DetailPage";
import PopularMovie from "./pages/PopularMovie";
import CartPage from "./pages/CartPage";
import UpComing from "./pages/UpComing";
import FilterAppBar from "./components/FilterAppBar";
import SearchAppBar from "./components/SearchAppBar";
import PageContext from "./context/PageContext";
import TopRated from "./pages/TopRated";

const cardStyle = {
  display: "flex",
  justifyContent: "space-between",
};
function App() {
  const { state } = useContext(PageContext);
  const { filterAppBarOpen } = state;

  return (
    <div className="App">
      <SearchAppBar />
      <Container maxWidth={false} style={cardStyle}>
        {filterAppBarOpen ? <FilterAppBar /> : null}
        <Routes>
          <Route>
            <Route path="/" element={<HomePage />} />
            <Route path="/filter" element={<FilterPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/detail/:id" element={<DetailPage />} />
            <Route path="/popular" element={<PopularMovie />} />
            <Route path="/top" element={<TopRated />} />
            <Route path="/coming" element={<UpComing />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Container>
    </div>
  );
}

export default App;
