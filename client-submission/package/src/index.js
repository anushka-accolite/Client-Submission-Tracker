import React, { Suspense } from "react";
import {createRoot} from 'react-dom/client';
import "./assets/scss/style.scss";
import App from "./App";
import {HashRouter } from "react-router-dom";
import Loader from "./layouts/loader/Loader";

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  // <Suspense fallback={<Loader />}>
  //   <HashRouter>
  //     <App />
  //   </HashRouter>
  // </Suspense>,
  <Suspense fallback={<Loader />}>
  <HashRouter>
  <App/>
  </HashRouter>
  </Suspense>

  // document.getElementById("root")
);

