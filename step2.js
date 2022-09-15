const fs = require('fs');
const process = require('process');
const axios = require('axios').default;

function cat(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log(`Error reading ${err['path']}: ${err}`);
            process.exit(1);

        }
        console.log(data);
    })
}

async function webCat(url) {
    try {
        const res = await axios.get(url);
        console.log(res.data);

    } catch (err) {
        console.error(`Error fetching ${url}: ${err}`);
        process.exit(1)
    }
}

let path = process.argv[2]
if (process.argv[2].substring(0, 4) === "http") {
    webCat(process.argv[2])
} else {
    cat(process.argv[2])
}