'use strict';

var JsonPorter = require('json-porter').default;              // Import library

(function app() {

    var jp;
    var myObj;

    function init() {

        jp = new JsonPorter();
    
        let btnExport = document.querySelector('#btnExport');
        let btnImport = document.querySelector('#btnImport');

        btnExport.addEventListener('click', export_click);
        btnImport.addEventListener('click', import_click);

        myObj = new Object();
        myObj.name = "json-porter object";
        myObj.desc = "Hello JsonPorter";
        myObj.elem = [ "JavaScript", "Download", "Upload", "JSON" ];

    }

    let export_click = function () {
        console.log('export: ', myObj);
        jp.export(myObj, 'MyObjectFilename.json');
    }

    let import_click = function () {
        jp.import().then(function (obj) {
            console.log('import: ', obj);
        });
    }

    init();

})();
