import path from "node:path";

export const INPUT_FILE_NAME = path.join(process.cwd(), "/file/input.txt");
export const OUTPUT_FILE_NAME = path.join(process.cwd(), "/file/output.txt");
export const NUMBERS_COUNT = 13_000_000;
export const NUMBERS_COUNT_IN_PRE_SORT_FILE = Math.floor(NUMBERS_COUNT / 17);
