import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiProv } from './providers/api.prov';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private apiProv: ApiProv, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    
    if (this.apiProv.isAuthenticatedUser()) {
      return true;
    } else {
      // Redirige al usuario al componente de inicio de sesión si no está autenticado
      return this.router.createUrlTree(['/login']);
    }
  }
}
