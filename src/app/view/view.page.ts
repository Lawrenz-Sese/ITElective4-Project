import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataService } from "src/app/service/data.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit {

  @Input() name: any;
  @Input() price: any;
  @Input() image: any;



  prodInfo: any ={};

  dismissModal(){
    this.modalCtrl.dismiss();
 }

  constructor( private modalCtrl:ModalController, private ds: DataService) { }

  ngOnInit() {
  }


  // Add to cart function from pulled data, one item will insert per click.
  addToCart() {
    
    this.prodInfo.cart_pname = this.name;
    this.prodInfo.cart_pquant = this.price;
    this.prodInfo.image = this.image;
    this.prodInfo.user_id = localStorage.getItem("id");
    
    this.ds.sendApiRequest("addCart", JSON.parse(JSON.stringify(this.prodInfo))).subscribe(data => {
      // this.pullProducts();
    });

    Swal.fire({
      icon: 'success',
      text: 'Successfuly Added!',
    })

    // this.router.navigate(['/cart'])

    console.log(this.prodInfo);
  }

}
