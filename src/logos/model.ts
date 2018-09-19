export class LogoModel {
  constructor(
    public id           = '',
    public userId       = '',
    public isMain       = false,
    public name         = 'default logo',
    public transparency = '',
    public url          = '',
    public coordX       = '',
    public coordY       = '',
    public fileId       = '',
    public height       = '',
    public width        = '',
  ) {
  }

  static logoResponseToModel(json: LogoResponse): LogoModel {
    const logo = new LogoModel();

    function isTrue(defaultLogo: any) {
      if (defaultLogo && ((defaultLogo === 1) || defaultLogo === '1')) {
        return true;
      }
      return false;
    }

    logo.id           = json.id;
    logo.userId       = json.user_id;
    logo.isMain       = isTrue(json.is_main);
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
