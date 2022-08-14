const Sequelize = require('sequelize');
import {Model} from 'sequelize-typescript';
import {ModelAttributes} from 'sequelize';
import { Topics } from './topics';
import {sequelize} from '../../../database';

interface IComment {
  id: number,
  topicId: string,
  commentId: string,
  parentCommentId: null | string,
  yaId: number,
  body: string,
  createdAt: Date
}

const commentModel: ModelAttributes<Model, IComment> = {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  topicId: {
    type: Sequelize.STRING,
    references: {
      model: Topics,
      key: 'topicId',
    }
  },
  commentId: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
  },
  parentCommentId: {
    type: Sequelize.STRING,
    defaultValue: null,
    allowNull: true,
  },
  yaId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: true,
  },
  body: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  createdAt: {
    type: Sequelize.TIMESTAMP,
    defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
    allowNull: false,
  },
}

export const Comments = sequelize.define('topics', commentModel, {
  timestamps: false,
});
