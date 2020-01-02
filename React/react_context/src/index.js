import React from "react";
import ReactDOM from "react-dom";
import App from "Components/App";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import "./typography";

createGlobalStyle`
${reset};
body{
    background-color:#ecf0f1;
}`;

ReactDOM.render(<App />, document.getElementById("root"));
