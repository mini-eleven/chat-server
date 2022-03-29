import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';

@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get('profile')
    async getProfile(@Request() req) {
        return this.userService.getProfile(req.user.id)
    }

}
