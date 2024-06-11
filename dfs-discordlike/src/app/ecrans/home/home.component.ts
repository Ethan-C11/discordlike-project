import {Component, inject} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {RouterLink} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatIconModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
http: HttpClient = inject(HttpClient);

ngOnInit() {
  this.http.get("http://localhost:3000/serveur").subscribe(value => console.log(value))
}
}
