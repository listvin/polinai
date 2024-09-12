import React, { useState } from "react";
import "../panes.css";
import { Parameter } from "./Parameters";
import Form, { FormThemeProvider } from 'react-form-component'
import { generateDocument } from "../core/doc-generator";

// npm install @mui/material @emotion/react @emotion/styled
// import { ThemeProvider, createTheme } from '@mui/material/styles'; //<-- import createMuiTheme

export function GeneratedForm({ versionUpdateHandler }) {
  const onClick = undefined
  const [schema, setSchema] = useState([]);


  fetch("schema.json").then(r => r.json()).then(j => setSchema(j))//.then()
  // (async () => {
  //     await fetch("schema.json").then(r => r.json);
  // })();

  const onChange = (fieldsData, hasErrors, fieldName) => {
    console.log("onChange:", fieldsData, fieldName, hasErrors)
    generateDocument(fieldsData, (blob) => {
      console.log("callback of doc generation triggered")
      versionUpdateHandler(blob)
      console.info("callback of doc generation complete")
    })
  }

  // const theme = createTheme()

  return (
    <div class="split left">
      <div class="content">
        <FormThemeProvider theme={{}}>
          <Form fields={schema.map((d) => d.tag)} onChange={onChange}>
            {schema.map((d) => <Parameter def={d}/>)}
          </Form>
        </FormThemeProvider>
      </div>
    </div>
  );
}
