import { DataTypes, Model } from 'sequelize';
import sequelize from './index';

class Measure extends Model {}

Measure.init({
  measure_uuid: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  customer_code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  measure_datetime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  measure_type: {
    type: DataTypes.ENUM('WATER', 'GAS'),
    allowNull: false,
  },
  measure_value: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  confirmed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  image_url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Measure',
});

export default Measure;
