import { Component } from '@angular/core';
import { DataService } from "src/app/service/data.service";
import { Router } from '@angular/router';
import { TemplateRef, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  alertCtrl: any;
  productinfo: any;

  constructor(private ds: DataService, public route: Router) { }

  @ViewChild('content') callAPIDialog: TemplateRef<any>;

  ngOnInit(): void {
    this.pullProducts();
  }

  pullProducts() {
    this.ds.sendApiRequest("products", null).subscribe(data => {
      this.products = data.payload;
    })

  }

  products: any;
  prodID: any;
  prodInfo: any = {};
  pid: any;
  pname: any;
  pdesc: any;
  pquant: any;

  addProduct() {
    this.prodInfo.pname = this.pname;
    this.prodInfo.pdesc = this.pdesc;
    this.prodInfo.pquant = this.pquant;

    this.ds.sendApiRequest("addProduct", JSON.parse(JSON.stringify(this.prodInfo))).subscribe(data => {
      this.pullProducts();
    });

    Swal.fire({
      icon: 'success',
      text: 'Successfuly Added!',
    })

    this.pname = '';
    this.pdesc = '';
    this.pquant = '';
  }

  // delProduct(e) {

  //   Swal.fire({
  //     title: 'Remove item?',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Yes'
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       this.ds.sendApiRequest("delProduct", { "pid": e }).subscribe(data => {
  //       });
  //       Swal.fire(
  //         'Deleted!',
  //         'Item has been removed.',
  //         'success'
  //       )
  //       this.pullProducts();
  //     }
  //   })
  // }

  async delProduct(e) {
    this.prodInfo.pid = e;
    Swal.fire({
      title: 'Remove item?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        this.ds.sendApiRequest("delProduct", JSON.parse(JSON.stringify(this.prodInfo))).subscribe(data => {
          this.pullProducts();
        });
        Swal.fire(
          'Deleted!',
          'Item has been removed.',
          'success'
        )
      }
    })
  }


  editForm = (products) => {

    this.prodInfo.pid1 = products.pid;
    this.prodID = this.prodInfo.pid1;
    this.prodInfo.pname1 = products.pname;
    this.prodInfo.pdesc1 = products.pdesc;
    this.prodInfo.pquant1 = products.pquant;

    console.log(this.prodID);
  }

  editProduct(e) {
    e.preventDefault();
    this.ds.sendApiRequest("editProduct", JSON.parse(JSON.stringify(this.prodInfo, this.prodID))).subscribe(data => {
      this.pullProducts();
    });
  }


}
