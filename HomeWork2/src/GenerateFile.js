import { FileGenerator } from "./FileGenerator.js";
import { INPUT_FILE_NAME, NUMBERS_COUNT } from "./Сonfig.js";

const fileGenerator = new FileGenerator(INPUT_FILE_NAME, NUMBERS_COUNT);
fileGenerator.generate();
