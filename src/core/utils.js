//TODO take year from dt

function downloadFile(blob, filename) {
    const a = document.createElement('a')
    a.setAttribute('href', URL.createObjectURL(blob))
    a.setAttribute('hidden', 'true')
    a.setAttribute('download', filename)
    document.body.appendChild(a)
    a.click()
    a.remove()
}

function genFilename(fullname = '', birthday = '') {
    const by = /^(\d\d\.\d\d\.)?\d\d\d\d$/.test(birthday) 
        ? birthday.substr(-4)
        : /^\d\d\d\d[^\d]*$/.test(birthday) ? birthday.substr(0,4) : null
    const yo = by
        ? ` ${2024-Number(by)}`// лет`
        : ''

    // const [sur, fst, mid] = fullname.trim().split(/ +/)
    // const shname = 

    const parts = fullname.trim().split(/ +/)
    const shname = parts[0] + ' ' + parts.slice(1).map((p) => p[0]).join('')

    return (shname + yo + '.docx')
        .replace(/ +/g, ' ')
        .replace(/^ .docx$/, 'noname.docx')
}

// function test(n, bd) {
//     console.log(`n=${n}, bd=${bd} => "${genFilename(n, bd)}"`)
// }
// test('Иванов Артур Богданович', '22.11.2000')
// test('Иванов А B', '1989')
// test('Иванов Артур', '')
// test('Иванов', '2000')
// test('Иванов', '22.11.2000')
// test('Иванов', '2212y')
// test('')
// test('','')
// test()

export { genFilename, downloadFile }
