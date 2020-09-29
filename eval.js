const code = `
const schema = {foo: 'bar', hello: 'world'};
throw new Error("Bitch Ass nigga")
`.trim();

let ran = false
if (code.length > 2) {
    const skipCheck = true
    const start = code.substr(0, 1) === '{';
    const end = code.substr(code.length - 1) === '}';
    if (skipCheck || (start && end)) {
         eval(code);
        console.log(typeof schema)
        ran = true
    }
}

if (!ran)
    console.log('Invalid xpress-mongo schema!')


