import { EventEmitter } from 'events'; 
import { NumberFileReadStream } from "./NumberFileReadStream.js";

export class Reader extends EventEmitter {
    constructor(fileName) {
        super();
        
        this._fileName = fileName;
        this._isFinished = false;
        this._number = null;
        this._readableEventFired = false;
        this._readCount = 0;

        this._fileStream = new NumberFileReadStream(fileName);
        this._fileStream.on('end', this._onFileStreamEnd.bind(this));
        this._fileStream.on('readable', this._onFileStreamReadable.bind(this));
    }
    
    _onFileStreamEnd() {
        
    }

    _onFileStreamReadable() {        
        this._readableEventFired = true;
        this.emit('streamIsReadable');
    }    
    
    start() {
        return new Promise((resolve, reject) => {
            if (this._readableEventFired) {
                this._number = this._fileStream.read();
                this._readCount++;
                this._readableEventFired = false;
                resolve();
            } else {
                this.once('streamIsReadable', () => {
                    this._number = this._fileStream.read();
                    this._readCount++;
                    this._readableEventFired = false;
                    resolve();
                });
            }
        });
    }

    isFinished() {
        return this._isFinished;
    }

    getNumber() {
        return this._number;
    }

    loadNextNumber() {
        return new Promise((resolve, reject) => {
            const result = this._fileStream.read();
            if (result === null && this._readableEventFired) {
                this._isFinished = true;
                resolve();
            } else if (result === null) {
                this.once("streamIsReadable", () => {
                    const result = this._fileStream.read();
                    this._readableEventFired = false;
                    if (result === null) {
                        this._isFinished = true;
                    } else {
                        this._number = result;
                        this._readCount++;
                    }
                    resolve();
                });
            } else {
                this._readableEventFired = false;
                this._number = result;
                this._readCount++;
                resolve();
            }
        });
    }
}
