/*****************************************************************************************************
 * Description: Save a JavaScript object as a JSON file download, and import a JSON file to
 *              parse it to an object
 * Author:      Mark Gabriel
 * Version:     1.0.2
 * License:     MIT
 *****************************************************************************************************/

export default class JsonPorter<T> {

    /**
     * HTML Imput element 
     */
    private _inputFile: HTMLInputElement;

    /**
     * Import promise resolve function
     */
    private _importResolve: (obj: T) => any;

    /**
     * Import promise reject function
     */
    private _importReject: (err: any) => void;
    
    /**
     * Accepts a data object and a filename, this function 
     * serializes the object to a json string and then
     * tells the browser to download a file with the given
     * name and the json string as the contents of the file
     * @param obj Object to serialize to json file
     * @param filename name of file to generator and download
     */
    public export(obj: any, filename: string): void {

        let encoding = 'data:text/json;charset=utf-8,';                     // Prefix of download content establish text encoding schema
        let contents = JSON.stringify(obj, null, 2);                        // Prep payload of document contents
        let data: any;

        if(!filename.match(/.+\..{1,5}$/i)) {                               // If a file extension is not provided
            filename = filename + '.json';                                  // Assume a .json extension
        }

        if (this._isIE()) {                                                 // Detect Internet Explorer

            data = new Blob([contents], {type: encoding});                  // Handle download differently
            navigator.msSaveBlob(data, filename);                           // for IE

        } else {                                                            // Otherwise, browser is not IE
 
            data = encoding + encodeURIComponent(contents);                 // Concat prefix with payload
            var lnk = document.createElement('a');                          // Create new hyperlink element
            lnk.setAttribute('href', data);                                 // Assign data to href
            lnk.setAttribute('download', filename);                         // Set filename
            lnk.style.display = "none";                                     // Hide hyperlink
            document.body.appendChild(lnk);                                 // Append link to html document
            lnk.click();                                                    // Click the link
            lnk.remove();                                                   // Dispose of hyperlink
            
        }
    }    

    /**
     * Opens a file selection dialog to import
     * a JSON a file which will be parsed to an
     * object expected to be of type T
     */
    public import(): Promise<T> {
        return new Promise((resolve, reject) => {
            this._importResolve = resolve;                                  // Save resolve function for later
            this._importReject = reject;                                    // Save reject function for later
            this._selectImportFile();                                       // Open file selection dialog
        });
    }

    /**
     * Presents user with a file picker dialog
     */
    private _selectImportFile(): void {
        var inputFile = document.createElement('input');                    // Create html input element
        inputFile.setAttribute('type', 'file');                             // Set input type to file
        inputFile.setAttribute('accept', 'application/json');               // restrict file input to .json files 
        inputFile.addEventListener('change', this._onImportFile_select);    // Assign change event handler to process file
        inputFile.style.display = 'none';                                   // Hide input element
        document.body.appendChild(inputFile);                               // Add input to page
        this._inputFile = inputFile;                                        // Save a pointer to input for later
        inputFile.click();                                                  // Click the input
    }

    /**
     * File selection event handler
     */
    private _onImportFile_select = (e: Event): void => {
        try {
            if(this._inputFile && 
               this._inputFile.files && 
               this._inputFile.files.length) {                              // If input has a file selected
                let fileInfo = this._inputFile.files[0];                    // Get file information
                let reader = new FileReader();                              // Create new FileReader
                reader.onload = <any> this._processFileContents;            // Assign file load event handler
                reader.readAsText(fileInfo);                                // Begin reading file
            }
        }
        catch(err) {
            this._importReject(err);
            this._cleanUp();
        }
    }

    private _processFileContents = (e: Event): any => { 
        let reader = <FileReader> e.currentTarget;                          // Get FileReader
        let json = <string> reader.result;                                  // Get file contents

        try {
            let obj = JSON.parse(json);                                     // Parse contents
            this._importResolve(<T>obj);                                    // Resolve import promise and return new object
        } catch(err) {
            this._importReject(err);                                        // Process any error
        } finally {
            this._cleanUp();                                                // Always wipe up the mess
        }
    }

    /**
     * Destroys file input element and resets json-porter
     */
    private _cleanUp(): void {
        if(this._inputFile) {                                               // If file input exists
            this._inputFile.remove();                                       // Dispose of the element
            this._inputFile = null;
            this._importReject = null;
            this._importResolve = null;
        }
    }
    
    /**
     * Returns true if browser is IE, otherwise false
     */
    private _isIE(): boolean {
        return /*@cc_on@*/false || !!document['documentMode'];
    }

}