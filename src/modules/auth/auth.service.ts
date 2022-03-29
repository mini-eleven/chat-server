import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { nameVerify, passwordVerify } from 'src/common/tools/utils';
import { User } from 'src/entities/User';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService) { }


    async register(user: User): Promise<any> {
        const isExists = await this.userRepository.find({ name: user.name })
        if (isExists.length) {
            throw new Error('用户名已存在')
        }
        if (!nameVerify(user.name)) {
            throw new Error('用户名不合法')
        }
        if (!passwordVerify(user.password)) {
            throw new Error('密码不合法')
        }
        user.avatar = `api/avatar/avatar(${Math.round(Math.random() * 19 + 1)}).png`;
        user.role = 'user'
        const newUser = await this.userRepository.save(user)
        return newUser
    }

    async login(user: User): Promise<any> {
        const currentUser = await this._validateUser(user.name, user.password)
        if (!currentUser)
            throw new Error('用户不存在')
        const payload = { userName: currentUser.name, sub: currentUser.id }
        return {
            access_token: this.jwtService.sign(payload)
        }
    }

    /**
     * 验证
     * @param userName 
     * @param password 
     * @returns 
     */
    async _validateUser(userName: string, password: string) {
        const user = await this.userRepository.findOne({ name: userName, password: password })
        if (user && user.password) {
            const { password, ...result } = user
            return result
        }
        return null
    }
}
