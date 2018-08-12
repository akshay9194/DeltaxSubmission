import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Actor} from './Actor'
import {Producer} from './Producer'
import {Movy} from './Movy'
import {RequestObj} from './RequestFile'
import { FormGroup, FormBuilder, Validators } from "@angular/forms";


@Component({
  selector: 'app-insert-data',
  templateUrl: './insert-data.component.html',
  styleUrls: ['./insert-data.component.css']
})
export class InsertDataComponent implements OnInit {
  private apiUrlAct = 'http://localhost:49793/api/imdb/GetActor';
  private apiUrlProd = 'http://localhost:49793/api/imdb/GetProducer';
  private apiUrlSave = 'http://localhost:49793/api/imdb/StoreMovieInfo';

  public dataValAct: any = {};
  public dataValProd: any = {};
  public ActorRows: any = [{}];
  public indexIns: number = 0;
  public indexDel: number = 0;
  public isVisible: boolean = false;
  public isDelVisible: boolean = true;
  public isBoxVisible: boolean = true;
  public actors = new Array<Actor>();
  public selectboxid = new Map<string,Actor>();
  public selectboxArray = new Array();
  public regForm:FormGroup;
  public actorForm:FormGroup;
  public producerForm:FormGroup;
  public actorSex: string;
  public producerSex: string;
  public producerObj: Producer;
  public actorVisible: boolean = false;
  public prodVisible: boolean = false;
  public actorFObj = new Array<Actor>();
  public isRegformVisible: boolean = true;
  public producerObjInc: Producer;

  constructor(private http: Http, private formBuilder:FormBuilder, ) { 
    console.log('Hello');
    this.getData(this.apiUrlAct);
    this.getData(this.apiUrlProd);
    this.getWholeData();
  }

  ngOnInit() {
    this.regForm=this.formBuilder.group({
      MovieName:['', Validators.required],
      MoviePosterUrl:['', Validators.required],
      MovieBio:['', Validators.required],
      MoviePlot:['', Validators.required],
      YearOfRelease:['', Validators.required],
      DataActor:['', Validators.required],
      DataProducer:['', Validators.required]
     })

     this.actorForm=this.formBuilder.group({
      ActorName:['', Validators.required],
      DOB:['', Validators.required],
      Bio:['', Validators.required]
     })

     this.producerForm=this.formBuilder.group({
      ProducerName:['', Validators.required],
      DOB:['', Validators.required],
      Bio:['', Validators.required]
     })
  }

  getData(apiUrl: string){
    return this.http.get(apiUrl).pipe(map((response: any) => response.json()));
  }

  getWholeData(){
      this.getData(this.apiUrlAct).subscribe(data => {
        console.log(data);
        this.dataValAct = data;
      })

      this.getData(this.apiUrlProd).subscribe(data => {
        console.log(data);
        this.dataValProd = data;
      })
  }

  public onChange(event): void {  // event will give you full breif of action
    const newVal = event.target.value.toString().split(',')[0];
    console.log(event.target.value.toString().split(',')[1]);
    console.log(newVal);
    if(newVal != 'Select'){
      if(this.selectboxid.has(event.target.id)){
        this.selectboxid.delete(event.target.id);
      }
      if(newVal > 0){
        this.selectboxid.set(event.target.id, new Actor(newVal, null, null, null, null));
      }
      else{
        let actorF: Actor = new Actor(
          0, event.target.value.toString().split(',')[1], null, null, null
        );
        var obj = this.actorFObj.find(x => x.Name === actorF.Name);
        if(obj != null){
          actorF = obj;
        }
        if(!this.actors.find(x => JSON.stringify(x).toLowerCase() === JSON.stringify(actorF).toLowerCase())){
          this.actors.push(actorF);
        }
      }
    }
  }

  public onChangeActor(event): void {  // event will give you full breif of action
    const newVal = event.target.value;
    console.log(event.target);
    console.log(newVal);
    if(newVal != "Select"){
      this.actorSex = newVal;
    }
  }

  public onChangeProducer(event): void {  // event will give you full breif of action
    const newVal = event.target.value;
    console.log(event.target);
    console.log(newVal);
    if(newVal != "Select"){
      this.producerSex = newVal;
    }
  }

  public onChangeProd(event): void{
    const newval = event.target.value;
    if(newval != "Select"){
      if(newval != 0){
        this.producerObj = new Producer(newval,null, null, null, null);
      }
      else{
        this.producerObj = this.producerObjInc;
      }
    }
  }

  UpdateActorModel(){
    if(this.actorForm.get('ActorName').value != "" && this.actorSex != "" && this.actorSex != "Select"
    && this.actorForm.get("DOB").value != "" && this.actorForm.get("Bio").value != ""){
      this.dataValAct.push({"id":0, "name":this.actorForm.get('ActorName').value});
      this.indexIns = this.indexIns - 1;
      this.actorFObj.push(new Actor(
        0, this.actorForm.get('ActorName').value,this.actorSex,this.actorForm.get("DOB").value,
        this.actorForm.get("Bio").value 
      ));
      this.actorForm.reset();
      this.actorVisible = false;
    }
    else{
      window.alert("Data Missing");
    }
  }

  setFormVisible(i: number){
    if(i == 0)
      this.actorVisible = true;
    if(i == 1)
      this.prodVisible = true;
  }

  UpdateProducerModel(){
    if(this.producerForm.get('ProducerName').value != "" && this.producerSex != "" && this.producerSex != "Select" &&
    this.producerForm.get('DOB').value != null && this.producerForm.get('Bio').value != ""){
      this.dataValProd.push({"id":0, "name":this.producerForm.get('ProducerName').value});
      this.producerObjInc = new Producer(0, this.producerForm.get('ProducerName').value, this.producerSex,
      this.producerForm.get('DOB').value, this.producerForm.get('Bio').value);
      this.producerForm.reset();
      this.prodVisible = false;
    }
    else{
      window.alert("Data Missing!!");
    }
  }

  SaveData(){
    console.log(this.indexIns);
    for (var i = 0; i<= this.indexIns; i++) {
      if(this.selectboxid.get(i.toString()) != null){
        this.actors.push(this.selectboxid.get(i.toString()));
      }
    }

    let reqobj = new Array<RequestObj>();
    //if(this.regForm.get(''))
    reqobj.push(
      new RequestObj(
        new Movy(this.regForm.get('MovieName').value, this.regForm.get('YearOfRelease').value, this.regForm.get('MoviePlot').value,
        this.regForm.get('MovieBio').value, this.regForm.get('MoviePosterUrl').value),
        this.producerObj,
        this.actors
      )
    );    
    if(reqobj[0].movy.Bio != "" && reqobj[0].movy.name != "" && reqobj[0].movy.Plot != "" &&
      reqobj[0].movy.Poster != "" && reqobj[0].movy.YoR > 1800 && 
      reqobj[0].actors != null && reqobj[0].producer != null){
        console.log(reqobj);
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const options = new RequestOptions({headers: headers});
        console.log(JSON.stringify(reqobj));
        this.http.post(this.apiUrlSave, JSON.stringify(reqobj), options).subscribe((data) => {});
        this.regForm.reset();
    }
    else{
      if(reqobj[0].movy.YoR < 1800){
        window.alert('Year of release should be greater then 1800.') 
      }
      window.alert('Data is not properly formed.')
    }
  }

  addRow() {
    this.indexIns = this.indexIns + 1;
    this.ActorRows.push({});
    console.log(this.indexIns);
    if(this.indexIns >= 1){
      this.isDelVisible = false;
      this.isBoxVisible = true;
    }
    if(this.indexIns > 2)
    {
      console.log(this.indexIns);
      this.isVisible = true;
      this.isBoxVisible = false;
    }
  }

  delRow() {
    this.indexIns = this.indexIns - 1;
    console.log(this.indexIns);
    if(this.indexIns < 3)
    {
      this.isBoxVisible = true;
    }
    if(this.indexIns < 1)
    {
      this.isDelVisible = true;
      this.isVisible = false;
    }
    this.actors.pop();
    this.ActorRows.pop();
  }

  CloseAction(i: number){
    if(i == 0)
      this.actorVisible = false;
    if(i == 1)
      this.prodVisible = false;
  }

  ResetAction(i: number){
    if(i == 0)
      this.actorForm.reset();
    if(i == 1)
      this.producerForm.reset();
  }
}
