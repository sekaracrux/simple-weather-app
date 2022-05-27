import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { WeatherStackService} from "../weather-stack.service";
import {  ColDef,
          FilterChangedEvent,
          FilterModifiedEvent,
          FilterOpenedEvent,
          GridApi,
          GridReadyEvent,
          IProvidedFilter
 } from 'ag-grid-community';
@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
  
})
export class WeatherComponent implements OnInit {

  private gridApi!: GridApi;
  public weatherSearchForm!: FormGroup;
  public weatherData: any;

  columnDefs: ColDef[] = [
    { field: 'location',
      filter: 'agTextColumnFilter',
      filterParams: {
      buttons: ['reset', 'apply'],
      },
      cellClass : "grid_header"
    },
    { field: 'temprature' },
    { field: 'humidity' },
    { field: 'pressure' },
    { field: 'time' }
  ];

  rowData = [{}]
  http: any;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
  constructor(
    private formBuilder: FormBuilder,
    private weatherStackService: WeatherStackService
    ) {}

    ngOnInit() {
      this.weatherSearchForm = this.formBuilder.group({
        location: ['']
    });

    
  
  }


sendToAPIXU(formValues: any) {
  console.log(formValues);
  this.weatherStackService
  .getWeather(formValues.location)
  .subscribe(data => {
    this.weatherData = data;
    this.rowData = [...this.rowData, { location: this.weatherData.location.name, temprature: this.weatherData?.current.temperature , humidity: this.weatherData?.current?.humidity, pressure : this.weatherData?.current?.pressure, time: this.weatherData.current.observation_time}]
    console.log(this.weatherData)
  });
}

onFilterOpened(e: FilterOpenedEvent) {
  console.log('onFilterOpened', e);
}

onFilterChanged(e: FilterChangedEvent) {
  console.log('onFilterChanged', e);
  console.log('gridApi.getFilterModel() =>', e.api.getFilterModel());
}

onFilterModified(e: FilterModifiedEvent) {
  console.log('onFilterModified', e);
  console.log('filterInstance.getModel() =>', e.filterInstance.getModel());
  console.log(
    'filterInstance.getModelFromUi() =>',
    ((e.filterInstance as unknown) as IProvidedFilter).getModelFromUi()
  );
}

onGridReady(params: GridReadyEvent) {
  this.gridApi = params.api;
  this.rowData = [{}]
}


}
