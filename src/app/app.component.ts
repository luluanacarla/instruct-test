import {Component, OnInit} from '@angular/core';
import {Http} from "@angular/http";
import {User} from "./models/user";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';

    users: User[];
    usersFiltered: User[];

    constructor(private http: Http) {

    }

    ngOnInit(){
      this.getUsers();

    }

    getUsers() {
        this.http.get('http://jsonplaceholder.typicode.com/users')
            .subscribe(
                res => {
                  console.log("res",res.json());
                    this.users = res.json();
                    this.usersFiltered = res.json();
                    //res => this.users = res.json() as User[]
                    console.log("users",this.users);

                    this.usersFiltered = this.usersFiltered.sort(function(a, b){
                        if(a.name < b.name) return -1;
                        if(a.name > b.name) return 1;
                        return 0;
                    })
                }
            );
    }

    onSearchChange(searchValue : string ) {
        this.usersFiltered = this.users.filter((item) => {
            let reverseEmail = item.email.split("").reverse().join("");
            console.log(reverseEmail);
            let dotIndex = reverseEmail.toLowerCase().indexOf('.');
            console.log(dotIndex);
            let emailEnd = reverseEmail.substring(0,dotIndex+1);
            emailEnd = emailEnd.split("").reverse().join("");
            console.log(emailEnd);
            return emailEnd.toLowerCase().indexOf(searchValue.toLowerCase()) > -1;

        });
        console.log(searchValue);
    }
}
