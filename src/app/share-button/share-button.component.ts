import { Component, OnInit } from '@angular/core';
import {Form, FormBuilder, FormGroup, NgForm} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {IMail} from '../imail';
import {Router} from '@angular/router';

@Component({
  selector: 'app-share-button',
  templateUrl: './share-button.component.html',
  styleUrls: ['./share-button.component.css']
})
export class ShareButtonComponent implements OnInit {
    public href: string = "";

  shareForm: FormGroup;
  constructor(private fb: FormBuilder, public client: HttpClient,
              private router : Router) { }

  ngOnInit(): void {
    this.shareForm = this.fb.group({
      email: ['']
    });
  }
  // tslint:disable-next-line:typedef
  onSubmit() {
    this.href = this.router.url;
    const data = {
      email: this.shareForm.value.email,
      href : this.href
    };
    this.client.post('http://localhost:8080/sendSimpleEmail', data).subscribe(
      (response: IMail) => {
        console.log(response);
      }, error => {
        console.log(error);
      }
    );
    // console.log(this.router.url);
    console.log(window.location.href);
   }

}
