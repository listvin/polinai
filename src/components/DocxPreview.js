import React, { useState, useEffect } from "react";
import "../panes.css";
import { genFilename } from "../core/utils";
import { toast } from 'react-toastify';

const url = "v0.docx"

export function DocxPreview({ blob }) {
  
  const [count, setCount] = useState(-1);

  useEffect(() => {
    async function foo() {
      const { renderAsync } = await import("docx-preview");
      let docData = blob ?? await fetch(url).then(r => r.blob());
      await renderAsync(docData, document.getElementById("docx-preview"), null, {
        // className: "docx", //class name/prefix for default and document style classes
        // inWrapper: true, //enables rendering of wrapper around document content
        // ignoreWidth: false, //disables rendering width of page
        // ignoreHeight: false, //disables rendering height of page
        // ignoreFonts: false, //disables fonts rendering
        // breakPages: true, //enables page breaking on page breaks
        // ignoreLastRenderedPageBreak: true, //disables page breaking on lastRenderedPageBreak elements
        // experimental: false, //enables experimental features (tab stops calculation)
        // trimXmlDeclaration: true, //if true, xml declaration will be removed from xml documents before parsing
        // useBase64URL: false, //if true, images, fonts, etc. will be converted to base 64 URL, otherwise URL.createObjectURL is used
        // renderChanges: false, //enables experimental rendering of document changes (inserions/deletions)
        // renderHeaders: true, //enables headers rendering
        // renderFooters: true, //enables footers rendering
        // renderFootnotes: true, //enables footnotes rendering
        // renderEndnotes: true, //enables endnotes rendering
        // renderComments: false, //enables experimental comments rendering
        // debug: false, //enables additional logging
      })
      console.log(`rendered vresion ${count}`)  
      setCount(count+1)
    }
    foo()
  }, [blob]);

  const fname = blob?.x_filename ?? genFilename()

  const submit = () => {
    document.querySelector('#form-submit-container>button').click()
    toast(`${fname} downloaded`, { autoClose: 2000, hideProgressBar: true, closeButton: false })
  }

  return (
    <div className="split right">
      {/* <div id="docx-toolbar" className="btn-group p-2">
        <button className="btn btn-primary"
          onClick={submit}>
          Download "{fname}"
        </button>
      </div> */}
      {/* <p><code>version {count} blob.size={blob?.size}</code></p> */}
      <div id="docx-preview"></div>
      <div className="fab" onClick={submit}>
        ⬇
      </div>
    </div>
  );
}
