import Sequelize, {ModelAttributes} from 'sequelize';

import {Model} from 'sequelize-typescript';
import {SiteTheme} from './site-theme';
import {ETheme} from './enum';

import {sequelize} from '../../database';

interface IUser {
  id: number,
  yaId: number,
  theme: ETheme
}

const userModel: ModelAttributes<Model, IUser> = {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  yaId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: true,
  },
  theme: {
    type: Sequelize.STRING,
    allowNull: false,
    references: {
      model: SiteTheme,
      key: 'theme',
    }
  },
}

export const User = sequelize.define('users', userModel);
