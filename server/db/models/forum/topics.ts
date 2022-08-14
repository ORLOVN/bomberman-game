const Sequelize = require('sequelize');
import {sequelize} from '../../../database';
import {ModelAttributes} from 'sequelize';
import {Model} from 'sequelize-typescript';

interface ITopic {
  id: number,
  topicId: string,
  yaId: number,
  title: string,
  body: string,
  createdAt: Date
}

const topicModel: ModelAttributes<Model, ITopic> = {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  topicId: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
  },
  yaId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  body: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
    allowNull: false,
  },
}

export const Topics = sequelize.define('topics', topicModel, {
  timestamps: false,
});
