export class Exercise {
  public id: number;
  public exerciseId: string;
  public name: string;
  public description: string;
  public videoUrl: string;
  public img: string;
  public numberOfPointsToPassed: number;
  public maxPoints: number;
  public numberOfAttempts: number;
  public level: string;
  public white: boolean;
  public red: boolean;
  public yellow: boolean;
  public green: boolean;
  public brown: boolean;
  public blue: boolean;
  public pink: boolean;
  public black: boolean;
  public buttonPass: boolean;
  public bonusPoint: boolean;
  public bonusInfo: string;
  public bonusNumberOfPoints: number;


  constructor() {
    this.id = 0;
    this.exerciseId = '';
    this.name = '';
    this.description = '';
    this.videoUrl = '';
    this.img = '';
    this.numberOfPointsToPassed = 0;
    this.maxPoints = 0;
    this.numberOfAttempts = 0;
    this.level = '';
    this.white = false;
    this.red = false;
    this.yellow = false;
    this.green = false;
    this.brown = false;
    this.blue = false;
    this.pink = false;
    this.black = false;
    this.buttonPass = false;
    this.bonusPoint = false;
    this.bonusInfo = '';
    this.bonusNumberOfPoints = 0;
  }
}
