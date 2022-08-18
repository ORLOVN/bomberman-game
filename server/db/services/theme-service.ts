import { BaseRESTService } from "./base-rest-service";
import { User } from "../models/user";
import { ETheme } from "../models/enum";

export class ThemeService implements BaseRESTService {
  public find = async (yaId: number) => User.findOne({ where: { yaId } });
  public put = async (yaId: number) => {
    const user = await this.find(yaId);

    const newTheme = user.theme === ETheme.LIGHT ? ETheme.DARK : ETheme.LIGHT;

    User.update(
      {
        theme: newTheme,
      },
      { where: { yaId } }
    );

    return Promise.resolve({ theme: newTheme });
  };
}
