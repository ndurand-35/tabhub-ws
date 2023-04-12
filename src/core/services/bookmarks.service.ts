import { hash } from 'bcrypt';
import DB from '@databases';
import { CreateBookmarkDto, UpdateBookmarkDto } from '@dtos/bookmarks.dto';
import { HttpException } from '@exceptions/HttpException';
import { Bookmark, Collection, CollectionType, User } from '@interfaces/index.interface';
import { isEmpty } from '@utils/util';

export class BookmarkService {
  public bookmarks = DB.Bookmark;

  // public async findMyBookmark(userData: User): Promise<Bookmark[]> {
  //   const myBookmark: Bookmark[] = await this.bookmarks.findAll({ where: { userId: userData.id } });
  //   return myBookmark;
  // }

  public async findBookmarkById(bookmarkId: number): Promise<Bookmark> {
    if (isEmpty(bookmarkId)) throw new HttpException(400, 'BookmarkId is empty');

    const findBookmark: Bookmark = await this.bookmarks.findByPk(bookmarkId, { include: [{ model: DB.Collection, as: 'collection' }] });
    if (!findBookmark) throw new HttpException(409, "Bookmark doesn't exist");

    return findBookmark;
  }

  public async createBookmark(bookmarkData: CreateBookmarkDto, collectionData: Collection): Promise<Bookmark> {
    if (isEmpty(collectionData)) throw new HttpException(400, 'collectionData is empty');

    const findBookmark: Bookmark = await this.bookmarks.findOne({ where: { link: bookmarkData.link, collectionId: collectionData.id } });
    if (findBookmark) throw new HttpException(409, `This link ${bookmarkData.link} already exists`);

    const createBookmarkData: Bookmark = await this.bookmarks.create({ ...bookmarkData, collectionId: collectionData.id });
    return createBookmarkData;
  }

  public async updateBookmark(bookmarkId: number, bookmarkData: UpdateBookmarkDto): Promise<Bookmark> {
    if (isEmpty(bookmarkData)) throw new HttpException(400, 'bookmarkData is empty');

    const findBookmark: Bookmark = await this.bookmarks.findByPk(bookmarkId);
    if (!findBookmark) throw new HttpException(409, "Bookmark doesn't exist");
    await this.bookmarks.update({ ...bookmarkData }, { where: { id: bookmarkId } });

    const updateBookmark: Bookmark = await this.bookmarks.findByPk(bookmarkId);
    return updateBookmark;
  }

  public async deleteBookmark(bookmarkId: number): Promise<Bookmark> {
    if (isEmpty(bookmarkId)) throw new HttpException(400, 'bookmarkId is empty');

    const findBookmark: Bookmark = await this.bookmarks.findByPk(bookmarkId);
    if (!findBookmark) throw new HttpException(409, "Bookmark doesn't exist");

    if (findBookmark.collection.collectionType == CollectionType.TRASH) await this.bookmarks.destroy({ where: { id: bookmarkId } });

    return findBookmark;
  }
}
