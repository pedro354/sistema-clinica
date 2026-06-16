import {
  CreateUserAttributes,
  UserRepository,
} from './../repositores/UserRepository';
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  async getUserById(id: number) {
    const user = await this.userRepository.findById(id);
    // Lembrete: Criar pagina de erro para por o 404 aqui
    if (!user) throw new Error('User not exists!');
    return user; 
  }
  async createUser(params: CreateUserAttributes) {
    if (!params.name?.trim()) throw new Error('Name is required!');

        if (!params.email.trim()) throw new Error('Email is required!');

        const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!regexEmail.test(params.email)) throw new Error('Invalid email');

        const userEmail = await this.userRepository.findByEmail(params.email);
        if (userEmail) throw new Error('Email already exists!');

        const password = params.password?.trim();
    /* Hash bycript aqui quando chegar a parte de segurança! */
    if (!password) throw new Error('Password is required!');
    if (password.length < 8)
      throw new Error('Passowrd must be at least 8 characters');

    return await this.userRepository.create(params);
  }
  async updateUser(userId: number, params: Partial<CreateUserAttributes>) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found!');
    }

    if (params.email) {
      const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      if (!regexEmail.test(params.email)) {
        throw new Error('Invalid email');
      }
      const existsEmail = await this.userRepository.findByEmail(params.email);
      if (existsEmail && existsEmail.id !== user.id) {
        throw new Error('Email is already in use by another account');
      }
    }
    if (params.password) {
      if (params.password.length < 8) {
        throw new Error('Password must be at least 8 characters');
      }
    }
    return await this.userRepository.update(userId, params);
  }
}
