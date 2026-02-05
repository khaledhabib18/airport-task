import DataLoader from 'dataloader';
import { BaggageTracking } from 'src/baggages/baggagesTracking.entity';
export interface IDataloaders {
  baggageTrackingsLoader: DataLoader<string, BaggageTracking[]>;
}
