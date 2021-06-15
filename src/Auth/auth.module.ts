import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RolesGuard } from './decorators/roles.guard'
// import { PeopleRepository } from './user.repository'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { User, UserScheme } from './user.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'topSecret51',
      signOptions: {
        expiresIn: '10000s'
      }
    }),
    MongooseModule.forFeature( [{ name: User.name, schema: UserScheme}])
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy
  ],
  exports:[
    JwtStrategy,
    PassportModule,
    AuthService
  ]
})
export class AuthModule {}
