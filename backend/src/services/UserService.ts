import { ConflictError } from '../errors/ConflictError.js';
import { ValidationError } from '../errors/ValidationError.js';
import { LoginResult } from '../types/User.js';
import { EMAIL_REGEX } from '../utils/regex.js';
import {
  CreateUserAttributes,
  UserRepository,
} from './../repositores/UserRepository.js';
import bcrypt from 'bcrypt'
import { TokenService } from './TokenService.js';

export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly tokenService: TokenService){}  
  async getUser() {
    const user = this.userRepository.find();
    return user;
  }
  async getUserById(userId: number) {
    await this.validateUser(userId);
    return await this.userRepository.findById(userId);
  }

  async loginUser(email: string, plainPassword: string ): Promise<LoginResult> {
    
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new ValidationError('Invalid email or password');

    const isMatch = await bcrypt.compare(plainPassword, user.password);
    if (!isMatch) throw new ValidationError('Invalid email or password');

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {password, ...publicUser} = user
    
    const token = this.tokenService.generateToken(user.id)


    return {user: publicUser, token}
  }
  async createUser(params: CreateUserAttributes) {
    this.validateName(params.name);

    await this.validateEmail(params.email);

    this.validatePassword(params.password);
    
    const hashedPassword = await this.hashPassword(params.password);
    params.password = hashedPassword;

    return await this.userRepository.create(params);
  }
  async updateUser(userId: number, params: Partial<CreateUserAttributes>) {
    const currentUser = await this.validateUser(userId);


    if (params.email !== undefined) {
      await this.validateEmail(params.email, currentUser.id);
    }
    if (params.password) {
      await this.validatePassword(params.password);
      const hashedPassword = await this.hashPassword(params.password);
      params = { ...params, password: hashedPassword };
    }

    return await this.userRepository.update(userId, params);
  }
  private async validateUser(userId: number) {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new ValidationError('User not found! ');
    return user;
  }
  private async validateName(name: string) {
    if (!name?.trim()) throw new ValidationError('Name is required!');
  }
  private async validateEmail(email: string, userId?: number) {
    if (!email.trim()) throw new ValidationError('Email is required!');

    if (!EMAIL_REGEX.test(email)) throw new ValidationError('Invalid email');
    const existsEmail = await this.userRepository.findByEmail(email);

    if (existsEmail && existsEmail.id !== userId) {
      throw new ConflictError('Email is already in use.');
    }
  }
  private async validatePassword(password: string) {
    if (!password.trim()) throw new ValidationError('Email is required!');

    if (password.length < 8)
      throw new ValidationError('Passowrd must be at least 8 characters');
  }

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }
}
