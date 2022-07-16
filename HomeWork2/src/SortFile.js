import { PreSorter } from "./PreSorter.js";
import { FinalSorter } from "./FinalSorter.js";
import { INPUT_FILE_NAME, NUMBERS_COUNT_IN_PRE_SORT_FILE, OUTPUT_FILE_NAME } from "./Сonfig.js";


const preSorter = new PreSorter(INPUT_FILE_NAME, NUMBERS_COUNT_IN_PRE_SORT_FILE);
preSorter.preSort().then((outputFileNames) => {
    console.log(`Предварительные файлы созданы и отсортированы`);
    
    const finalSorter = new FinalSorter(outputFileNames, OUTPUT_FILE_NAME);
    finalSorter.sortFinally().then(() => {
        preSorter.removePreSortFiles();
        console.log('Файл отсортирован');
    });
});

