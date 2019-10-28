/*****************************************************************************************************
 * Description: Save a JavaScript object as a JSON file download, and import a JSON file to
 *              parse it to an object
 * Author:      Mark Gabriel
 * Version:     1.0
 * License:     MIT
 *****************************************************************************************************/
export default class JsonPorter<T> {
    /**
     * HTML Imput element
     */
    private _inputFile;
    private _importResolve;
    private _importReject;
    /**
     * Accepts a data object and a filename, this function
     * serializes the object to a json string and then
     * tells the browser to download a file with the given
     * name and the json string as the contents of the file
     * @param obj Object to serialize to json file
     * @param filename name of file to generator and download
     */
    export(obj: any, filename: string): void;
    /**
     * Opens a file selection dialog to import
     * a JSON a file which will be parsed to an
     * object expected to be of type T
     */
    import(): Promise<T>;
    /**
     * Presents user with a file picker dialog
     */
    private _selectImportFile;
    /**
     * File selection event handler
     */
    private _onImportFile_select;
    private _processFileContents;
    /**
     * Destroys file input element and resets json-porter
     */
    private _cleanUp;
    /**
     * Returns true if browser is IE, otherwise false
     */
    private _isIE;
}
