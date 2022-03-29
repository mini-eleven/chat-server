import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>) { }

    async getProfile(userId: number) {
        const user = await this.userRepository.findOne(userId)
        const { password, ...result } = user
        return result
    }
}
