import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { Button, Container } from "@mui/material";

import SearchAppBar from "./components/SearchAppBar";
import "./App.css";
import HomePage from "./pages/HomePage";
import FilterPage from "./pages/FilterPage";
import NotFoundPage from "./pages/NotFoundPage";
import SearchPage from "./pages/SearchPage";
import DetailPage from "./pages/DetailPage";
import FilterAppBar from "./components/FilterAppBar";
import PageContext from "./context/PageContext";

const cardStyle = {
  display: "flex",
  justifyContent: "space-between",
  width: "100vw",
  backgroundColor: "blue",
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
            <Route path="/job/:id" element={<DetailPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Container>
    </div>
  );
}

export default App;
