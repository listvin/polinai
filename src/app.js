import React, { useState } from 'react';


import { DocxPreview } from './components/DocxPreview';
import { GeneratedForm } from './components/GenerateForm';

function RootComponent() {
  // const [version, setVersion] = useState(-1)
  // const versionUpdateHandler = () => {
  //   setVersion(version+1)
  // }

  const [blob, setBlob] = useState(null)
  const versionUpdateHandler = (newBlob) => {
    setBlob(newBlob)
  }

  return (
    <div id="app_root">
      <GeneratedForm versionUpdateHandler={versionUpdateHandler}/>
      <DocxPreview blob={blob} />
      {/* <h1>Test docxtemplater</h1>
      <button onClick={generateDocument}>Generate document</button>
      <p>Click the button above to generate a document using ReactJS</p>
      <p>
        You can edit the data in your code in this example. In your app, the
        data would come from your database for example.
      </p> */}
    </div>
  );
}

export const App = class App extends React.Component {
  render() {
    return (<RootComponent />)
  }
};
