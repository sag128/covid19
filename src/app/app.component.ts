import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';

import { DetailRowService,GridModel, GridComponent, VirtualScrollService, PageSettingsModel } from '@syncfusion/ej2-angular-grids';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TestBed } from '@angular/core/testing';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [VirtualScrollService]
})
export class AppComponent implements OnInit{
  customAttributes: Object;
  constructor(private http:HttpClient) { }
  @ViewChild('Grid', {static: true}) gridObj: GridComponent;
  public options: PageSettingsModel;
    public parentData: Object[];
    public ready : boolean = false;
    public childGrid: GridModel;
    public data: Object[];
    public childJson : Object[];
  public initialSort: Object;
  

    ngOnInit(): void {
      this.getTestStatus().subscribe((res) => {
        this.data = res
        this.parentData = Array.of(this.parentData);
        this.childJson  = Array.of(this.childJson)
        for(let i=0;i<this.data.length;i++)
        {
          let active =0;
          let confirm = 0;
          let recover = 0;
          let deceased = 0;
          let inc_confirm = 0;
          let tot_c = 0;
          let inc_recovered = 0;
          let tot_r = 0;
          let inc_deceased = 0;
          let tot_d = 0;
          
          this.data[i] = Object.assign({},this.data[i],{district:"All"})
          for(let j = 0;j<this.data[i]['districtData'].length;j++)
          {
            
            let districtwise = "";
            let districtwise_r = "";
            
            let districtwise_d = "";
             districtwise  = "(▲"+this.data[i]['districtData'][j]['delta']['confirmed']+") " +this.data[i]['districtData'][j]['confirmed']
            if(Number(districtwise.replace(/^\D+/g, '').split(")")[0])==0)
            {
              this.data[i]['districtData'][j]['confirmed'] = this.data[i]['districtData'][j]['confirmed']
            }
            else
            {
              this.data[i]['districtData'][j]['confirmed'] = districtwise
  
            }
  
            districtwise_r  = "(▲"+this.data[i]['districtData'][j]['delta']['recovered']+") " +this.data[i]['districtData'][j]['recovered']
            if(Number(districtwise_r.replace(/^\D+/g, '').split(")")[0])==0)
            {
              this.data[i]['districtData'][j]['recovered'] = this.data[i]['districtData'][j]['recovered']
            }
            else
            {
              this.data[i]['districtData'][j]['recovered'] = districtwise_r
  
            }
            
            
            districtwise_d  = "(▲"+this.data[i]['districtData'][j]['delta']['deceased']+") " +this.data[i]['districtData'][j]['deceased']
            if(Number(districtwise_d.replace(/^\D+/g, '').split(")")[0])==0)
            {
              this.data[i]['districtData'][j]['deceased'] = this.data[i]['districtData'][j]['deceased']
            }
            else
            {
              this.data[i]['districtData'][j]['deceased'] = districtwise_d
  
            }
            
              
             
            active  = active + this.data[i]['districtData'][j]['active']
            confirm  = confirm + this.data[i]['districtData'][j]['confirmed']
            recover  = recover + this.data[i]['districtData'][j]['recovered']
            deceased  = deceased + this.data[i]['districtData'][j]['deceased']
            inc_confirm = inc_confirm+ Number(districtwise.replace(/^\D+/g, '').split(")")[0])
            tot_c = tot_c+ Number(districtwise.replace(/^\D+/g, '').split(")")[1])
            inc_recovered = inc_recovered+ Number(districtwise_r.replace(/^\D+/g, '').split(")")[0])
            tot_r = tot_r+ Number(districtwise_r.replace(/^\D+/g, '').split(")")[1])
            inc_deceased = inc_deceased+ Number(districtwise_d.replace(/^\D+/g, '').split(")")[0])
            tot_d = tot_d+ Number(districtwise_d.replace(/^\D+/g, '').split(")")[1])
            
            
            this.childJson.push({'statecode':this.data[i]['statecode'],'district':this.data[i]['districtData'][j]['district'],'active':this.data[i]['districtData'][j]['active'],'confirmed':this.data[i]['districtData'][j]['confirmed'],'recovered':this.data[i]['districtData'][j]['recovered'],'deceased':this.data[i]['districtData'][j]['deceased']})
          }
          
          this.data[i] = Object.assign({},this.data[i],{active:active})
          if(inc_confirm!=0)
          {
            this.data[i] = Object.assign({},this.data[i],{confirmed:"(▲ "+inc_confirm+")  "+tot_c})
            this.data[i] = Object.assign({},this.data[i],{confirmed_sort:tot_c})
          }
          else{
            this.data[i] = Object.assign({},this.data[i],{confirmed:tot_c})
            this.data[i] = Object.assign({},this.data[i],{confirmed_sort:tot_c})
          }
          
          if(inc_recovered!=0)
          {
            this.data[i] = Object.assign({},this.data[i],{recovered:"(▲ "+inc_recovered+")  "+tot_r})
            this.data[i] = Object.assign({},this.data[i],{recovered_sort:tot_r})
          }
          else{
            this.data[i] = Object.assign({},this.data[i],{recovered:tot_r})
            this.data[i] = Object.assign({},this.data[i],{recovered_sort:tot_r})
          }
          
  
          if(inc_deceased!=0)
          {
            this.data[i] = Object.assign({},this.data[i],{deceased:"(▲ "+inc_deceased+")  "+tot_d})
            this.data[i] = Object.assign({},this.data[i],{deceased_sort:tot_d})
          }
          else{
            this.data[i] = Object.assign({},this.data[i],{deceased:tot_d})
            this.data[i] = Object.assign({},this.data[i],{deceased_sort:tot_d})
          }
          
  
          // this.data[i] = Object.assign({},this.data[i],{recovered:recover})
          // this.data[i] = Object.assign({},this.data[i],{deceased:deceased})
  
        
        console.log(this.data);
        
      
    }
    console.log(this.data)
    console.log(this.childJson)
    this.ready = true;
    this.parentData = this.data      
    this.customAttributes = {class: 'customcss'};
    this.childGrid = {
      dataSource: this.childJson,
      queryString: 'statecode',
      
      columns: [
          { field: 'district', headerText: 'District' ,textAlign:'Left', maxWidth: 10},
          { field: 'active', headerText: 'Actv' ,textAlign:'Right' , maxWidth: 10 },
          { field: 'confirmed', headerText: 'Cnfrmd' ,textAlign:'Right' , maxWidth: 10 },
          { field: 'deceased', headerText: 'Dcsd' ,textAlign:'Right' , maxWidth: 10 },
          { field: 'recovered', headerText: 'Rcvrd' ,textAlign:'Right' , maxWidth: 10 }
      ],
    
  };

  
 
  });

  this.gridObj.refresh(); 


    
}
   
      
    
  
  
  
    getTestStatus() :Observable<any> {
      return this.http.get('https://api.covid19india.org/v2/state_district_wise.json') as Observable<any>;
    }
      
    

    
    // dataBound() {
    //     this.gridObj.autoFitColumns();
    // }
    
}
