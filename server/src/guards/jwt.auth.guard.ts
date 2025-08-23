import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader) {
      throw new UnauthorizedException('Authorization header is missing.');
    }

    const [type, token] = authHeader.split(' ');

    if (type.toLowerCase() !== 'bearer' || !token) {
      throw new UnauthorizedException('Invalid authorization type. Bearer expected.');
    }

    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET as string);
      // Attach the JWT payload to the request for later use
      request.user = payload;
      return true;
    } catch (e) {
      throw new UnauthorizedException('Invalid or expired token.');
    }
  }
}