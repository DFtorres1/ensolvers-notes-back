import { Module } from "@nestjs/common";
import { UsersController } from "./controllers/users.controller";
import { UsersModule } from "./users.module";
import { UsersService } from "./providers/users.service";

@Module({
    imports: [UsersModule],
    controllers: [UsersController],
    providers: [UsersService]
})
export class UsersHttpModule {}