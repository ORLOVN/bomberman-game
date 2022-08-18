import {Model} from 'sequelize-typescript';
import Sequelize, {ModelAttributes} from 'sequelize';
import { Topics } from './topics';

import {sequelize} from '../../../database';

export interface IComment {
  id: string,
  topicId: string,
  parentCommentId: null | string,
  yaId: number,
  body: string
}

const commentModel: ModelAttributes<Model, IComment> = {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  yaId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  body: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  topicId: {
    type: Sequelize.UUID,
    references: {
      model: Topics,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  parentCommentId: {
    type: Sequelize.STRING,
    defaultValue: null,
    allowNull: true,
  },
}

export const Comments = sequelize.define('comments', commentModel);
