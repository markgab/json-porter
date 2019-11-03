import JsonPorter from 'json-porter';

interface MyObject {
    name: string;
    desc: string;
    elem: string[];
}

class example {
    constructor() {
        this.init();
    }
    
    private _jp: JsonPorter<MyObject>;
    private _myObj: MyObject;

    public init(): void {

        this._jp = new JsonPorter<MyObject>();
        
        let btnExport = <HTMLButtonElement> document.querySelector('#btnExport');
        let btnImport = <HTMLButtonElement> document.querySelector('#btnImport');

        btnExport.addEventListener('click', this.export_click);
        btnImport.addEventListener('click', this.import_click);

        this._myObj = <any> new Object();
        this._myObj.name = "json-porter object";
        this._myObj.desc = "Hello JsonPorter";
        this._myObj.elem = [ "JavaScript", "Download", "Upload", "JSON" ];

    }
    
    protected export_click = () => {
        console.log('export: ', this._myObj);
        this._jp.export(this._myObj, 'MyObjectFilename.json');
    }

    protected import_click = async () => {
        let obj = await this._jp.import();
        console.log('import: ', obj);
    }

}

const ex = new example();
