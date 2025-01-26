import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersHttpModule } from './users/usershttp.module';
import { ConfigModule } from '@nestjs/config';
import { NotesHttpModule } from './notes/noteshttp.module';

@Module({
  imports: [
    NotesHttpModule,
    UsersHttpModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: +(process.env.DATABASE_PORT || 5432),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [__dirname + './**/*.entity{.ts,.js}'],
      synchronize: false,
      autoLoadEntities: true,
    }),
  ],
})
export class AppModule {}
