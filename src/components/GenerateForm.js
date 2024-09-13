import React, { useState } from "react";
import "../panes.css";
import { Parameter } from "./Parameters";
import Form, { FormThemeProvider, SubmitButton } from 'react-form-component'
import { generateDocument } from "../core/doc-generator";
import { downloadFile, genFilename } from "../core/utils";

// npm install @mui/material @emotion/react @emotion/styled
// import { ThemeProvider, createTheme } from '@mui/material/styles'; //<-- import createMuiTheme

export function GeneratedForm({ versionUpdateHandler }) {
  const [schema, setSchema] = useState([]);


  fetch("schema.json").then(r => r.json()).then(j => setSchema(j))//.then()
  // (async () => {
  //     await fetch("schema.json").then(r => r.json);
  // })();

  const onChange = (fieldsData, hasErrors, fieldName, doWithBlob) => {
    console.log("onChange:", fieldsData, fieldName, hasErrors)
    generateDocument(fieldsData, (blob) => {
      console.log("callback of doc generation triggered")
      versionUpdateHandler(blob)
      console.info("callback of doc generation complete")
      if (doWithBlob) doWithBlob(blob)
    })
  }

  const onSubmit = (fieldsData) => {
    onChange(fieldsData, undefined, undefined, (blob) => {
      downloadFile(blob, blob?.x_filename ?? genFilename())
    })
  }

  const colors = {
    accent: '#FDD835',
    success: '#FDD835',
  }

  // const theme = createTheme()
/*  */
  return (
    <div className="split left">
      <div className="content">
        <FormThemeProvider theme={{ colors: colors }}>
          <Form 
            allMandatory={true}
            //mandatory={schema.map((d) => d.tag)} 
            runOnChangeInitially={true}
            
            fields={schema.map((d) => d.tag)} 
            onChange={onChange}
            >
            {schema.map((d) => <Parameter def={d}/>)}
            <div id="form-submit-container" hidden>
              <SubmitButton onClick={onSubmit}/>
            </div>
          </Form>
        </FormThemeProvider>
      </div>
    </div>
  );
}
