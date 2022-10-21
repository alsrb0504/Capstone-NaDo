import { ExecutionContext, Injectable, CanActivate, ForbiddenException } from "@nestjs/common";

@Injectable()
export class isLoggedInGuard implements CanActivate {
  async canActivate(context: ExecutionContext):  Promise<boolean>  {
   const request = context.switchToHttp().getRequest();
   const loggedIn = request?.isAuthenticated() 

   if(loggedIn) {
    return true
   }

   throw new ForbiddenException({}, 'you are not authorized user')
  }
}

@Injectable()
export class isNotLoggedInGuard implements CanActivate {
  async canActivate(context: ExecutionContext):  Promise<boolean>  {
   const request = context.switchToHttp().getRequest();
   const loggedIn = request?.isAuthenticated() 

   if(loggedIn) {
    throw new ForbiddenException('you are already logged', 'you are already logged in')
   }

   return true
  }
}