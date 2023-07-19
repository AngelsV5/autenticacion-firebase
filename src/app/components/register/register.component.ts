import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';
import{Router} from '@angular/router';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  formReg:FormGroup;

  constructor(
    private userService: UserService,
    private router:Router
  ){
    this.formReg=new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })

  }
  ngOnInit():void{

  }
  onSubmit(){
    this.userService.register(this.formReg.value)
    .then(response => {
      console.log(response);
      this.router.navigate(['/login']);
    })
    .catch((error) => {

      console.log(error);
      alert(this.firebaseError(error.code))
    });
  }

  firebaseError(code: string){
    switch(code){
      case 'auth/email-already-in-use':
      return 'El usuario ya existe';
      case 'auth/weak-password':
        return 'La contraseña es muy debil';
        default:
          return 'Correo invalido';

    }
  }

}
