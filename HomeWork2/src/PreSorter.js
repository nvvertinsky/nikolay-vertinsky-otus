import fs from "node:fs";
import util from "node:util";
import path from "node:path";
import { NumberFileReadStream } from "./NumberFileReadStream.js";

const writeFile = util.promisify(fs.writeFile);

export class PreSorter {
    constructor(fileName, preSortBufferSize) {
        this._readStream = new NumberFileReadStream(fileName);
        this._preSortBufferSize = preSortBufferSize;
        this._outputBuffer = [];
        this._outputFiles = [];
    }

    preSort() {
        return new Promise((resolve, reject) => {
            console.log("Разбиваю большой файл на несколько маленьких и сортирую каждый");
            this._readStream.on("data", this._onInputStreamData.bind(this));
            this._readStream.on("end", this._onInputStreamEnd.bind(this));

            this._presortResolve = resolve;
            this._presortReject = reject;
        });
    }
    
    removePreSortFiles() {
        this._outputFiles.forEach(({ fileName }) => {
            fs.rm(fileName, () => {});
        });

        console.log(`Предварительно отсортированные файлы удалены.`);
    }

    _buildFileEntry(fileName, writeFilePromise) {
        return {
            fileName,
            writeFilePromise
        };
    }

    _onInputStreamData(number) {
        this._outputBuffer.push(number);
        if (this._outputBuffer.length === this._preSortBufferSize) {
            this._dumpNextOutputFile();
        }
    }

    _onInputStreamEnd() {
        if (this._outputBuffer.length > 0) {
            this._dumpNextOutputFile();
        }

        Promise.all(
            this._outputFiles.map(({ writeFilePromise }) => writeFilePromise)
        ).then(
            () => {
                this._presortResolve(
                    this._outputFiles.map(({ fileName }) => fileName)
                );
            },
            (error) => {
                this._presortReject(error);
            }
        );
    }

    _dumpNextOutputFile() {
        const nextOutputFileName = this._outputFileName(this._outputFiles.length);

        const outFilePromise = this._saveOutputFile(
            nextOutputFileName,
            this._outputBuffer.sort((a, b) => a - b).join(" ")
        );

        this._outputFiles.push(
            this._buildFileEntry(nextOutputFileName, outFilePromise)
        );

        this._outputBuffer = [];
    }
    
    _outputFileName(index) {
        return path.join(process.cwd(), `/file/tmp.${index}.txt`);
    }
    
    _saveOutputFile(name, content) {
        return writeFile(name, content).then(
            () => {
                console.info(`${name}`);
            },
            (error) => {
                console.error(error);
            }
        );
    }
}
