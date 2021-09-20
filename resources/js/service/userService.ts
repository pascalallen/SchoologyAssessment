import {User} from '@/types/data';
import userApi from '@/api/user/userApi';

class UserService {
  public async getAllBySearchTerm(params: {
    search_term: string;
  }): Promise<User[]> {
    return await userApi.getAllBySearchTerm(params);
  }
}

export default new UserService();
