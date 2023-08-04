let fs = require('fs');

export class FileWriter {
    write(filePath: string, data: any) {
        fs.writeFile (filePath, JSON.stringify(data), function(err) {
                if (err) throw err.message('Something went wrong while writing report');
            }
        );
    }
}