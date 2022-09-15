const fs = require('fs');
const process = require('process');
const axios = require('axios').default;

let text = null;
let out = null;

function handleOut(data, path, out) {
    if (out === null) {
        console.log(data);
    } else {
        text = data
        fs.writeFile(out, text, 'utf8', function (err) {
            if (err) {
                console.error(err);
                process.exit(1);
            }
            console.log(`# no output, but ${out} contains contents of ${path}`)
        })
    }
}
function cat(path, out) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log(`Error reading ${err['path']}: ${err}`);
            process.exit(1);

        }
        handleOut(data, path, out);
    })
}


async function webCat(url, out) {
    try {
        const res = await axios.get(url);
        handleOut(res.data, url, out);

    } catch (err) {
        console.error(`Error fetching ${url}: ${err}`);
        process.exit(1)
    }
}


if (process.argv[2] === "--out") {
    if (process.argv[4].substring(0, 4) === "http") {
        webCat(process.argv[4], process.argv[3])
    } else {
        cat(process.argv[4], process.argv[3])
    }
} else {
    if (process.argv[2].substring(0, 4) === "http") {
        webCat(process.argv[2], out)
    } else {
        cat(process.argv[2], out)
    }
}