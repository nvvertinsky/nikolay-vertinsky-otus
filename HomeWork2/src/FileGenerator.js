import fs from "node:fs";

export class FileGenerator {
    constructor(fileName, numbersCount) {
        this._fileName = fileName;
        this._writeStream = fs.createWriteStream(fileName);
        this._numbersCount = numbersCount;
    }

    generate() {
        console.log("Генерирую файл");

        for (let i = 0; i < this._numbersCount; i++) {
            this._writeStream.write(
                `${Math.floor(Math.random() * this._numbersCount)} `
            );
        }
        this._writeStream.end("", () => {
            const fileSizeInMb = Math.floor((fs.statSync(this._fileName).size / 1024 / 1024) * 10_000) / 10_000;
            console.log(`Файл сгенерирован. Размер файла: ${fileSizeInMb} МБ`);
        });
    }
}
