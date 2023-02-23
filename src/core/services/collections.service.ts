import { hash } from 'bcrypt';
import DB from '@databases';
import { CreateCollectionDto, UpdateCollectionDto } from '@dtos/collections.dto';
import { HttpException } from '@exceptions/HttpException';
import { Collection, CollectionType, User } from '@interfaces/index.interface';
import { isEmpty } from '@utils/util';

export class CollectionService {
  public collections = DB.Collection;

  public async findMyCollection(userData: User): Promise<Collection[]> {
    const myCollection: Collection[] = await this.collections.findAll({
      where: { userId: userData.id, collectionType: null, parentId: null },
    });
    return myCollection;
  }

  public async findCollectionById(collectionId: number): Promise<Collection> {
    if (isEmpty(collectionId)) throw new HttpException(400, 'CollectionId is empty');

    const findCollection: Collection = await this.collections.findByPk(collectionId, {
      include: [
        { model: DB.Bookmark, as: 'bookmarks' },
        { model: DB.Collection, as: 'children' },
      ],
    });
    if (!findCollection) throw new HttpException(409, "Collection doesn't exist");

    return findCollection;
  }

  public async findCollectionByType(collectionType: CollectionType, userData: User): Promise<Collection> {
    if (isEmpty(collectionType)) throw new HttpException(400, 'collectionType is empty');

    let findCollection: Collection = await this.collections.findOne({
      where: { userId: userData.id, collectionType: collectionType },
      include: [{ model: DB.Bookmark, as: 'bookmarks' }],
    });
    if (!findCollection) {
      findCollection = await this.createCollection({ name: collectionType.toString(), collectionType }, userData);
    } //throw new HttpException(409, "Collection doesn't exist");

    return findCollection;
  }

  public async createCollection(collectionData: CreateCollectionDto, userData: User): Promise<Collection> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    const findCollection: Collection = await this.collections.findOne({ where: { name: collectionData.name, userId: userData.id } });
    if (findCollection) throw new HttpException(409, `This email ${collectionData.name} already exists`);

    const createCollectionData: Collection = await this.collections.create({ ...collectionData, userId: userData.id });
    return createCollectionData;
  }

  public async updateCollection(collectionId: number, collectionData: UpdateCollectionDto): Promise<Collection> {
    if (isEmpty(collectionData)) throw new HttpException(400, 'collectionData is empty');

    const findCollection: Collection = await this.collections.findByPk(collectionId);
    if (!findCollection) throw new HttpException(409, "User doesn't exist");
    await this.collections.update({ ...collectionData }, { where: { id: collectionId } });

    const updateCollection: Collection = await this.collections.findByPk(collectionId);
    return updateCollection;
  }

  public async deleteCollection(collectionId: number): Promise<Collection> {
    if (isEmpty(collectionId)) throw new HttpException(400, 'collectionId is empty');

    const findCollection: Collection = await this.collections.findByPk(collectionId);
    if (!findCollection) throw new HttpException(409, "User doesn't exist");

    await this.collections.destroy({ where: { id: collectionId } });

    return findCollection;
  }
}
