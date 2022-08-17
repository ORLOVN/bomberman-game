import {SiteTheme} from './site-theme';

const Sequelize = require('sequelize');
import {sequelize} from '../../database';
import {ModelAttributes} from 'sequelize';
import {Model} from 'sequelize-typescript';
import {ETheme} from './enum';

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
    unique: true,
    references: {
      model: SiteTheme,
      key: 'theme',
    }
  },
}

export const User = sequelize.define('users', userModel);
