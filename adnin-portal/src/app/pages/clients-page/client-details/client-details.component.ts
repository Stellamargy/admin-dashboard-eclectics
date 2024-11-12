import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; 
import { ClientsService } from '../clients.service';
import { Client } from '../client.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-client-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './client-details.component.html',
  styleUrl: './client-details.component.css'
})
export class ClientDetailsComponent {

  client:Client | undefined;
  constructor(
    private activeRoute:ActivatedRoute,
    private clientService:ClientsService,
  ){

  }
  ngOnInit():void{
    this.getClient()
  }

  getClient():void{
    //use activatedRoute service to get the id (passed as  param)
    const clientId=this.activeRoute.snapshot.paramMap.get('id');
   if(clientId){
    this.clientService.getClientById(parseInt(clientId)).subscribe({
      next:(data)=>{
        this.client=data

      }
    })
   }

  }

}
