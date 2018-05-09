//import { Component, OnInit } from '@angular/core';
import {Component, ViewEncapsulation} from "@angular/core";
import {ColumnApi, GridApi, GridOptions} from "ag-grid/main";
import RefData from "../refData";
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.css']
})
export class DataGridComponent {

  private gridOptions: GridOptions;
  private icons: any;
  public rowData: any[];
  public columnDefs: any[];
  public rowCount: string;

  private api: GridApi;
  private columnApi: ColumnApi;

  constructor() {
      this.gridOptions = <GridOptions>{};
      this.rowData = this.createRowData();
      this.columnDefs = this.createColumnDefs();
  }

  private onReady(params) {
      this.api = params.api;
      this.columnApi = params.columnApi;
  }

  private createRowData() {
      const rowData: any[] = [];

      for (let i = 0; i < 200; i++) {
          const countryData = RefData.countries[i % RefData.countries.length];
          rowData.push({
              name: RefData.firstNames[i % RefData.firstNames.length] + ' ' + RefData.lastNames[i % RefData.lastNames.length],
              skills: {
                  android: Math.random() < 0.4,
                  html5: Math.random() < 0.4,
                  mac: Math.random() < 0.4,
                  windows: Math.random() < 0.4,
                  css: Math.random() < 0.4
              },
              dob: RefData.DOBs[i % RefData.DOBs.length],
              address: RefData.addresses[i % RefData.addresses.length],
              years: Math.round(Math.random() * 100),
              proficiency: Math.round(Math.random() * 100),
              country: countryData.country,
              continent: countryData.continent,
              language: countryData.language,
              mobile: createRandomPhoneNumber(),
              landline: createRandomPhoneNumber()
          });
      }

      return rowData;
  }

  private createColumnDefs() {
      const columnDefs = [
          {
              headerName: '#',
              width: 30,
              checkboxSelection: true,
              suppressSorting: true,
              suppressMenu: true,
              pinned: true
          },
          {
              headerName: 'Employee',
              children: [
                  {
                      headerName: "Name",
                      field: "name",
                      width: 150,
                      pinned: true,
                      editable:true,
                      filterParams: {
                        applyButton: true,
                        clearButton: true
                      }
                  },
                  {
                      headerName: "Country",
                      field: "country",
                      width: 150,
                      // an example of using a non-React cell renderer
                      cellRenderer: countryCellRenderer,
                      pinned: true,
                      filter: 'set',
                      filterParams: {
                          cellRenderer: countryCellRenderer,
                          cellHeight: 20
                      },
                      cellEditor: 'agRichSelect',
                      cellEditorParams: {
                          values: ["Argentina", "Brazil", "Colombia", "France", "Germany", "Greece", "Iceland", "Ireland",
                              "Italy", "Malta", "Portugal", "Norway", "Peru", "Spain", "Sweden", "United Kingdom",
                              "Uruguay", "Venezuela", "Belgium", "Luxembourg"],
                          cellRenderer: countryCellRenderer,
                      },
                      editable: true
                  },
                  {
                      headerName: "Date of Birth",
                      field: "dob",
                      width: 110,
                      pinned: true,
                      cellRenderer: function (params) {
                          return pad(params.value.getDate(), 2) + '/' +
                              pad(params.value.getMonth() + 1, 2) + '/' +
                              params.value.getFullYear();
                      },
                      filter: 'date',
                      columnGroupShow: 'open',
                      editable:true
                  }
              ]
          },
          {
              headerName: "Proficiency",
              field: "proficiency",
              width: 135,
              editable:true
              // supply an angular component
             // cellRendererFramework: ProficiencyCellRenderer
          },
          {
              headerName: 'Contact',
              children: [
                  {headerName: "Mobile", field: "mobile", width: 150, filter: 'text',
                  editable:true},
                  {headerName: "Landline", field: "landline", width: 150, filter: 'text',
                  editable:true},
                  {headerName: "Address", field: "address", width: 500, filter: 'text',
                  editable:true}
              ]
          }
      ];

      return columnDefs;
  }

  exportData(){
     
      
    let columnKeys = [

    ]

    var params = {

    fileName: 'exportData.xlsx',

    sheetName: 'Sheet1'

    };
    // var wb = XLSX.read(this.api.getDataAsExcel);
    // wb.Sheets[""]
   // var ws1 =  XLSX.utils.json_to_sheet(this.rowData,{header: columnKeys});
  
    var wb =  XLSX.read(this.api.getDataAsCsv(),{type : "binary"})

 

//    var range = XLSX.utils.decode_range(ws1['!ref']);

//    // console.log(range.e)

//     for(var C = range.s.c; C <= range.e.c; ++C) {

//       var address = XLSX.utils.encode_col(C) + "1"; // <-- first row, column number C

//       if(!ws1[address]) continue;

//      // console.log(address);

//     //  ws1[address].horizontal.alignment='center';

//       ws1[address].v = ws1[address].v.toUpperCase();

//     //  ws1[address].s{} = ws1[address].horizontal.alignment='center'

//     }

   

    // var wb = {SheetNames:["Sheet1"], Sheets:{}};

    // wb.Sheets["Sheet1"] = ws1;

    var xlsxContent = XLSX.write(wb, {
      bookType: "xlsx",
      type: "base64"
    });
    this.download(params,xlsxContent);
    }
    b64toBlob(b64Data, contentType) {
        var sliceSize = 512;
        var byteCharacters = atob(b64Data);    
        var byteArrays = [];
        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
          var slice = byteCharacters.slice(offset, offset + sliceSize);
          var byteNumbers = new Array(slice.length);
          for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
          }
          var byteArray = new Uint8Array(byteNumbers);
          byteArrays.push(byteArray);
        }
        var blob = new Blob(byteArrays, { type: contentType });
        return blob;
      }
    
      download(params, content) {
        var fileNamePresent = params && params.fileName && params.fileName.length !== 0;
        var fileName = fileNamePresent ? params.fileName : "noWarning.xlsx";
        var blobObject = this.b64toBlob(content, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        if (window.navigator.msSaveOrOpenBlob) {  
          window.navigator.msSaveOrOpenBlob(blobObject, fileName);
        } else {
          var downloadLink = document.createElement("a");
          downloadLink.href = URL.createObjectURL(blobObject);
          downloadLink.download = fileName;
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);
        }
      }
}

function countryCellRenderer(params) {
  const flag = "<img border='0' width='15' height='10' style='margin-bottom: 2px' src='https://www.ag-grid.com/images/flags/" + RefData.COUNTRY_CODES[params.value] + ".png'>";
  return flag + " " + params.value;
}

function createRandomPhoneNumber() {
  let result = '+';
  for (let i = 0; i < 12; i++) {
      result += Math.round(Math.random() * 10);
      if (i === 2 || i === 5 || i === 8) {
          result += ' ';
      }
  }
  return result;
}

//Utility function used to pad the date formatting.
function pad(num, totalStringSize) {
  let asString = num + "";
  while (asString.length < totalStringSize) asString = "0" + asString;
  return asString;
}

