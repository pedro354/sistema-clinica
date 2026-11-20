
import jwt from 'jsonwebtoken'

export class TokenService {
    private readonly secret: string

    constructor() {
        const secret = process.env.JWT_SECRET

        if (!secret) {
            throw new Error('JWT_SECRET environment variable is not defined')
        }

        this.secret = secret
    }

    generateToken(userId: number): string {
        return jwt.sign(
            {},
            this.secret,
            {
                subject: String(userId),
                algorithm: 'HS256',
                expiresIn: '1h'
            }
        )
    }

    verifyToken(token: string): string {
        const decoded = jwt.verify(token, this.secret, {
            algorithms: ['HS256']
        })

        if (typeof decoded === 'string' || !decoded.sub) {
            throw new Error('Invalid token payload')
        }

        return decoded.sub
    }
}
