export class LogoModel {
  constructor(
    public id = '',
    public userId = '',
    public isMain = '',
    public name = '',
    public transparency = '',
    public url = '',
    public coordX = '',
    public coordY = '',
    public fileId = '',
    public height = '',
    public width = '',
  ) {
  }

  static logoResponseToModel(json: LogoResponse): LogoModel {
    const logo = new LogoModel();

    logo.id           = json.id;
    logo.userId       = json.user_id;
    logo.isMain       = json.is_main;
    logo.name         = json.name;
    logo.transparency = json.transparency;
    logo.url          = json.url;
    logo.fileId       = json.file_id;
    logo.coordX       = json.coord_x;
    logo.coordY       = json.coord_y;
    logo.fileId       = json.file_id;
    logo.height       = json.height;
    logo.width        = json.width;

    return logo;
  }
}
