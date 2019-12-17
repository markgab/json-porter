"use strict";
/*****************************************************************************************************
 * Description: Save a JavaScript object as a JSON file download, and import a JSON file to
 *              parse it to an object
 * Author:      Mark Gabriel
 * Version:     1.0.2
 * License:     MIT
 *****************************************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var JsonPorter = /** @class */ (function () {
    function JsonPorter() {
        var _this = this;
        /**
         * File selection event handler
         */
        this._onImportFile_select = function (e) {
            try {
                if (_this._inputFile &&
                    _this._inputFile.files &&
                    _this._inputFile.files.length) { // If input has a file selected
                    var fileInfo = _this._inputFile.files[0]; // Get file information
                    var reader = new FileReader(); // Create new FileReader
                    reader.onload = _this._processFileContents; // Assign file load event handler
                    reader.readAsText(fileInfo); // Begin reading file
                }
            }
            catch (err) {
                _this._importReject(err);
                _this._cleanUp();
            }
        };
        this._processFileContents = function (e) {
            var reader = e.currentTarget; // Get FileReader
            var json = reader.result; // Get file contents
            try {
                var obj = JSON.parse(json); // Parse contents
                _this._importResolve(obj); // Resolve import promise and return new object
            }
            catch (err) {
                _this._importReject(err); // Process any error
            }
            finally {
                _this._cleanUp(); // Always wipe up the mess
            }
        };
    }
    /**
     * Accepts a data object and a filename, this function
     * serializes the object to a json string and then
     * tells the browser to download a file with the given
     * name and the json string as the contents of the file
     * @param obj Object to serialize to json file
     * @param filename name of file to generator and download
     */
    JsonPorter.prototype.export = function (obj, filename) {
        var encoding = 'data:text/json;charset=utf-8,'; // Prefix of download content establish text encoding schema
        var contents = JSON.stringify(obj, null, 2); // Prep payload of document contents
        var data;
        if (!filename.match(/.+\..{1,5}$/i)) { // If a file extension is not provided
            filename = filename + '.json'; // Assume a .json extension
        }
        if (this._isIE()) { // Detect Internet Explorer
            data = new Blob([contents], { type: encoding }); // Handle download differently
            navigator.msSaveBlob(data, filename); // for IE
        }
        else { // Otherwise, browser is not IE
            data = encoding + encodeURIComponent(contents); // Concat prefix with payload
            var lnk = document.createElement('a'); // Create new hyperlink element
            lnk.setAttribute('href', data); // Assign data to href
            lnk.setAttribute('download', filename); // Set filename
            lnk.style.display = "none"; // Hide hyperlink
            document.body.appendChild(lnk); // Append link to html document
            lnk.click(); // Click the link
            lnk.remove(); // Dispose of hyperlink
        }
    };
    /**
     * Opens a file selection dialog to import
     * a JSON a file which will be parsed to an
     * object expected to be of type T
     */
    JsonPorter.prototype.import = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._importResolve = resolve; // Save resolve function for later
            _this._importReject = reject; // Save reject function for later
            _this._selectImportFile(); // Open file selection dialog
        });
    };
    /**
     * Presents user with a file picker dialog
     */
    JsonPorter.prototype._selectImportFile = function () {
        var inputFile = document.createElement('input'); // Create html input element
        inputFile.setAttribute('type', 'file'); // Set input type to file
        inputFile.setAttribute('accept', 'application/json'); // restrict file input to .json files 
        inputFile.addEventListener('change', this._onImportFile_select); // Assign change event handler to process file
        inputFile.style.display = 'none'; // Hide input element
        document.body.appendChild(inputFile); // Add input to page
        this._inputFile = inputFile; // Save a pointer to input for later
        inputFile.click(); // Click the input
    };
    /**
     * Destroys file input element and resets json-porter
     */
    JsonPorter.prototype._cleanUp = function () {
        if (this._inputFile) { // If file input exists
            this._inputFile.remove(); // Dispose of the element
            this._inputFile = null;
            this._importReject = null;
            this._importResolve = null;
        }
    };
    /**
     * Returns true if browser is IE, otherwise false
     */
    JsonPorter.prototype._isIE = function () {
        return /*@cc_on@*/ false || !!document['documentMode'];
    };
    return JsonPorter;
}());
exports.default = JsonPorter;
//# sourceMappingURL=json-porter.js.map