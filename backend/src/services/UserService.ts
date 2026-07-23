import {
  CreateUserAttributes,
  UserRepository,
} from './../repositores/UserRepository';
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  async getUser(){
    const user = this.userRepository.find();
    return user
  }
  async getUserById(userId: number) {
        await this.validateUser(userId);
  }
  async createUser(params: CreateUserAttributes) {
    
    this.validateName(params.name)

    await this.validateEmail(params.email)

    this.validatePassword(params.password)

    return await this.userRepository.create(params);
  }
  async updateUser(userId: number, params: Partial<CreateUserAttributes>) {
    const currentUser = await this.validateUser(userId);

    if (params.email !== undefined) {
      await this.validateEmail(
        params.email,
        currentUser.id
      )
    }
    if (params.password) {
      await this.validatePassword(params.password)
    }
    return await this.userRepository.update(userId, params);
  }
  private async validateUser(userId: number){
    const user = await this.userRepository.findById(userId);
    if (!user) throw new Error('User not found! ');
    return user
  }
  private async validateName(name: string){
    if (!name?.trim()) throw new Error('Name is required!');
  }
  private async validateEmail(email: string, userId?: number){
    if (!email.trim()) throw new Error('Email is required!');
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regexEmail.test(email)) throw new Error('Invalid email');
    const userEmail = await this.userRepository.findByEmail(email);
    if (userEmail) throw new Error('Email already exists!');
        if (email) {
      const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      if (!regexEmail.test(email)) {
        throw new Error('Invalid email');
      }
      const existsEmail = await this.userRepository.findByEmail(email);
      if (existsEmail && existsEmail.id !== userId) {
        throw new Error('Email is already in use by another account');
      }
    }

  }
  private async validatePassword(password:string){
    if (!password.trim()) throw new Error('Email is required!');
    /* Hash bycript aqui quando chegar a parte de segurança! */
    if (!password) throw new Error('Password is required!');
    if (password.length < 8)
      throw new Error('Passowrd must be at least 8 characters');

  }

}
