import React, { useState, useEffect } from "react";
import { saveAs } from 'file-saver';
import "../panes.css";
import { genFilename } from "../core/utils";

const url = "v0.docx"

function mySaver(blob, filename) {
  const a = document.createElement('a')
  a.setAttribute('href', URL.createObjectURL(blob))
  a.setAttribute('hidden', 'true')
  a.setAttribute('download', filename)
  document.body.appendChild(a)
  a.click()
  a.remove()
}

export function DocxPreview({ blob }) {
  
  const [count, setCount] = useState(-1);

  useEffect(() => {
    async function foo() {
      const { renderAsync } = await import("docx-preview");
      let docData = blob ?? await fetch(url).then(r => r.blob());
      await renderAsync(docData, document.getElementById("docx-preview"))
      console.log(`rendered vresion ${count}`)  
      setCount(count+1)
    }
    foo()
  }, [blob]);

  const fname = blob?.x_filename ?? genFilename()

  const download = () => {
    // console.log(saveAs, blob, 'temp2.docx')
    // saveAs(blob, 'temp2.docx', 'a');
    mySaver(blob, fname)
  }

  return (
    <div className="split right">
      <div id="docx-toolbar" className="btn-toolbar p-2">
        <button className="btn btn-primary"
          onClick={download}>
          Download "{fname}" v{count}
        </button>
        {/* <button className="btn btn-outline-secondary"
          onClick={download}>
          Download "{fname}" v{count}
        </button> */}
      </div>
      {/* <p><code>version {count} blob.size={blob?.size}</code></p> */}
      <div id="docx-preview"></div>
    </div>
  );
}
