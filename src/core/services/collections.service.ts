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

    const findCollection: Collection = await this.collections.findOne({ where: { name: collectionData.name, userId : userData.id } });
    if (findCollection) throw new HttpException(409, `This email ${collectionData.name} already exists`);

    const createCollectionData: Collection = await this.collections.create({ ...collectionData, userId : userData.id });
    return createCollectionData;
  }

  public async updateCollection(collectionId: number, collectionData: CreateCollectionDto): Promise<Collection> {
    if (isEmpty(collectionData)) throw new HttpException(400, "collectionData is empty");

    const findCollection: Collection = await this.collections.findByPk(collectionId);
    if (!findCollection) throw new HttpException(409, "User doesn't exist");

    await this.collections.update({ ...collectionData }, { where: { id: collectionId } });

    const updateCollection: Collection = await this.collections.findByPk(collectionId);
    return updateCollection;
  }

  public async deleteCollection(collectionId: number): Promise<Collection> {
    if (isEmpty(collectionId)) throw new HttpException(400, "collectionId is empty");

    const findCollection: Collection = await this.collections.findByPk(collectionId);
    if (!findCollection) throw new HttpException(409, "User doesn't exist");

    await this.collections.destroy({ where: { id: collectionId } });

    return findCollection;
  }
}
