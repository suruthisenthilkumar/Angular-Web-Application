
import { Role } from 'src/app/models/role';
import { AuthService } from './auth-service';

export class UserRoleClass {
   
    constructor(private authService:AuthService){
    
    }
    get isAdmin(){
        return this.authService.hasRole(Role.Admin)
    }
    get isPH(){
        return this.authService.hasRole(Role.PH)
    }
    get isPL(){
        return this.authService.hasRole(Role.PL)
    }
    get isManager(){
        return this.authService.hasRole(Role.Manager)
    }
    get isSME(){
        return this.authService.hasRole(Role.SME)
    }
    get isGuest(){
        return this.authService.hasRole(Role.Guest)
    }
}