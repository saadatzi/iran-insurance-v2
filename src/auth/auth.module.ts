import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { PeopleRepository } from './user.repository'
import { JwtModule, JwtService } from '@nestjs/jwt'
import { PassportModule, PassportStrategy } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { User } from './user.entity';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'topSecret51',
      signOptions: {
        expiresIn: '10000s'
      }
    }),
    TypeOrmModule.forFeature( [PeopleRepository])
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
