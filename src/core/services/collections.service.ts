import { hash } from 'bcrypt';
import DB from '@databases';
import { CreateCollectionDto } from '@dtos/collections.dto';
import { HttpException } from '@exceptions/HttpException';
import { Collection,User } from '@interfaces/index.interface';
import { isEmpty } from '@utils/util';

export class CollectionService {
  public collections = DB.Collection;

  public async findMyCollection(userData: User): Promise<Collection[]> {
    const myCollection: Collection[] = await this.collections.findAll({ where: { userId : userData.id } });
    return myCollection;
  }

  // public async findUserById(userId: number): Promise<User> {
  //   if (isEmpty(userId)) throw new HttpException(400, "UserId is empty");

  //   const findUser: User = await this.users.findByPk(userId);
  //   if (!findUser) throw new HttpException(409, "User doesn't exist");

  //   return findUser;
  // }

  public async createCollection(collectionData: CreateCollectionDto, userData: User): Promise<Collection> {
    if (isEmpty(userData)) throw new HttpException(400, "userData is empty");

    const findUser: Collection = await this.collections.findOne({ where: { name: collectionData.name, userId : userData.id } });
    if (findUser) throw new HttpException(409, `This email ${collectionData.name} already exists`);

    const createCollectionData: Collection = await this.collections.create({ ...collectionData, userId : userData.id });
    return createCollectionData;
  }

  // public async updateUser(userId: number, userData: CreateUserDto): Promise<User> {
  //   if (isEmpty(userData)) throw new HttpException(400, "userData is empty");

  //   const findUser: User = await this.users.findByPk(userId);
  //   if (!findUser) throw new HttpException(409, "User doesn't exist");

  //   const hashedPassword = await hash(userData.password, 10);
  //   await this.users.update({ ...userData, password: hashedPassword }, { where: { id: userId } });

  //   const updateUser: User = await this.users.findByPk(userId);
  //   return updateUser;
  // }

  // public async deleteUser(userId: number): Promise<User> {
  //   if (isEmpty(userId)) throw new HttpException(400, "User doesn't existId");

  //   const findUser: User = await this.users.findByPk(userId);
  //   if (!findUser) throw new HttpException(409, "User doesn't exist");

  //   await this.users.destroy({ where: { id: userId } });

  //   return findUser;
  // }
}
