import { Injectable } from '@nestjs/common';
import { AdminService } from 'src/admin/admin.service';

@Injectable()
export class AuthService {
    constructor(private readonly adminService: AdminService) {

    }

    async validateAdmin(email: string, password: string) {
        const admin = await this.adminService.findOne(email)
        if (admin && admin.password === password) {
            const { password, ...result } = admin;
            return result
        }
        return null

    }
}
