
export class Serie
 {
    id: number;
    name:String;
    channel:String;
    season:number;
    descripcion:String;
    url:String;
    imagen:String

    constructor(id:number,name:String,channel:String,season:number,descripcion:String,url:String,imagen:String)
    {
        this.id=id;
        this.name=name;
        this.channel=channel;
        this.season=season;
        this.descripcion=descripcion;
        this.url=url;
        this.imagen=imagen;
    }
 }