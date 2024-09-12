import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';
import PizZipUtils from 'pizzip/utils/index.js';
import { saveAs } from 'file-saver';
import expressionParser from 'docxtemplater/expressions';
import { genFilename } from './utils';

const templateUrl = 'v0.docx'
// 'https://docxtemplsater.com/ang-example.docx'

function loadFile(url, callback) {
  PizZipUtils.getBinaryContent(url, callback);
}

function adaptData(values) {
    for (const key in values) {
        if (Object.hasOwnProperty.call(values, key)) {
            const v = values[key];
            if (v instanceof Array) values[key] = v.sort().join(', ')
            
        }
    }
    console.log('adapted values', values)
    return values
    // values.map((v) => {
    //     v instanceof Array ? v.join(', ') : v
    // })
}

let prevValues = 404

export const generateDocument = (values, callback) => {
    if (values == prevValues) {
      console.info('values did not change, skipping')
      return
    }
    prevValues = values

    loadFile(
      templateUrl,
      function (error, content) {
        if (error) {
          throw error;
        }
        const zip = new PizZip(content);
        const doc = new Docxtemplater(zip, {
          paragraphLoop: true,
          linebreaks: true,
          parser: expressionParser,
        });
        doc.render(adaptData(values));
        const out = doc.getZip().generate({
          type: 'blob',
          mimeType:
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        }); //Output the document using Data-URI
        out.x_filename = genFilename(values.intro_fullname, values.intro_birthday)
        // saveAs(out, 'temp.docx');
        callback(out)
      }
    );
  };
