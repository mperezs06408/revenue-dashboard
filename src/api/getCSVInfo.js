import Papa from 'papaparse';

export const fetchData = async(path, callback) => {
    Papa.parse(
        path,
        {
            header: true,
            download:true,
            skipEmptyLines: true,
            complete: callback
        }
    )
}