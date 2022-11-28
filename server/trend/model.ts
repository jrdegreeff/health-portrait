import type {Types} from 'mongoose';
import {Schema, model} from 'mongoose';

export type Trend = {
  _id: Types.ObjectId;
  item: string;
  label: string;
  value: number;
  date: Date;
};

const TrendSchema = new Schema({
  // The log entry to be added to the trend
  item: {
    type: String,
    required: true
  },
  // The label of the condition
  label: {
    type: String,
    required: true
  },
  // The value of the condition scale (1-5)
  value: {
    type: Number,
    required: true
  }, 
  // The date the entry was logged
  date: {
    type: Date,
    required: true
  }
});

const TrendModel = model<Trend>('Trend', TrendSchema);
export default TrendModel;
