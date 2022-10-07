export class User {
  public id: number;
  public userId: string;
  public firstName: string;
  public lastName: string;
  public username: string;
  public email: string;
  public lastLoginDate: Date;
  public joinDate: Date;
  public profileImageUrl: string;
  public active: boolean;
  public notLocked: boolean;
  public role: string;
  public authorities: [];
  public progressList: [];
  public favoriteSlotOne: string;
  public favoriteSlotTwo: string;
  public favoriteSlotThree: string;
  public stripeId: string;
  public nextPay: Date;


  constructor() {
    this.id = 0;
    this.userId = '';
    this.firstName = '';
    this.lastName = '';
    this.username = '';
    this.email = '';
    this.lastLoginDate = new Date;
    this.joinDate = new Date;
    this.profileImageUrl = '';
    this.active = false;
    this.notLocked = false;
    this.role = '';
    this.authorities = [];
    this.progressList = [];
    this.favoriteSlotOne = '';
    this.favoriteSlotTwo = '';
    this.favoriteSlotThree = '';
    this.stripeId = '';
    this.nextPay = new Date;
  }
}
