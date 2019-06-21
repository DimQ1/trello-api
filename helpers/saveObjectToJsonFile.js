const fs = require('fs');
const path = require('path');

class SaveObjectToJsonFile {
    constructor(fileName) {
        this.savePath = path.join(__dirname, '..', 'dataAccess', 'assets', `${fileName}.json`);
    }

    save(objectForSaving) {
        return new Promise((resolve, reject) => {
            fs.writeFile(this.savePath, JSON.stringify(objectForSaving), (error) => {
                if (error) reject(error);
                resolve();
            });
        });
    }
}

module.exports = fileName => new SaveObjectToJsonFile(fileName);
