import Sequelize, {ModelAttributes} from 'sequelize';
import {Model} from 'sequelize-typescript';

import {sequelize} from '../../../database';

interface ITopic {
  id: string,
  yaId: number,
  title: string,
  body: string
}

const topicModel: ModelAttributes<Model, ITopic> = {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  yaId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  body: {
    type: Sequelize.STRING,
    allowNull: false,
  },
}

export const Topics = sequelize.define('topics', topicModel);
