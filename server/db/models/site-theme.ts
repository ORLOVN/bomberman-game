import {ModelAttributes} from 'sequelize';

const Sequelize = require('sequelize');
import {sequelize} from '../../database';
import {Model} from 'sequelize-typescript';
import {ETheme} from './enum';

interface ISiteTheme {
  id: number,
  theme: ETheme
}

const siteThemeModel: ModelAttributes<Model, ISiteTheme> = {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  theme: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
}

export const SiteTheme = sequelize.define('siteTheme', siteThemeModel);
