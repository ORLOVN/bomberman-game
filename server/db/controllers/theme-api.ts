import {Request, Response} from 'express';
import { ThemeService } from "../services/theme-service";
import { IFindThemeRequest } from "../types";
import { User } from "../models/user";
import {ETheme} from '../models/enum';

const themeService = new ThemeService();

export class ThemeAPI {
  public static find = async (request: Request<IFindThemeRequest>, response: Response) => {
    const user = await themeService.find(request.params.yaId);

    if (!user) {
      await User.create({
        yaId: request.params.yaId,
        theme: ETheme.LIGHT
      })

      return response.status(200).json({theme: ETheme.LIGHT});
    }

    return response.status(200).json({theme: user.theme});
  }

  public static put = async (request: Request, response: Response) => {
    if (!request.body.yaId) {
      return response.status(400).json({error: { message: `Provided yaId has been invalid ${request.body.yaId}`}});
    }

    const updated = await themeService.put(request.body.yaId);

    return response.status(200).json({theme: updated.theme});
  }
}
