// dataloader.service.ts
import { Injectable } from '@nestjs/common';
import DataLoader from 'dataloader';
import { IDataloaders } from './dataloader.interface';
import { BaggageTracking } from 'src/baggages/baggagesTracking.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

@Injectable()
export class DataloaderService {
  constructor(
    @InjectRepository(BaggageTracking)
    private readonly baggageTrackingsRepository: Repository<BaggageTracking>,
  ) {}

  getLoaders(): IDataloaders {
    const baggageTrackingsLoader = this._createBaggageTrackingsLoader();
    return { baggageTrackingsLoader };
  }

  private _createBaggageTrackingsLoader() {
    return new DataLoader<string, BaggageTracking[]>(
      async (baggageIds: string[]) =>
        await this.getBaggagesBaggageTrackingsByBatch(baggageIds),
    );
  }
  async getAllBaggageTrackingsByIds(
    baggageTrackingsIds: string[],
  ): Promise<BaggageTracking[]> {
    return await this.baggageTrackingsRepository.find({
      where: { baggageId: In(baggageTrackingsIds) },
    });
  }

  async getBaggagesBaggageTrackingsByBatch(
    baggageIds: string[],
  ): Promise<BaggageTracking[][]> {
    const baggageTrackings = await this.getAllBaggageTrackingsByIds(baggageIds);
    return baggageIds.map(
      (id) =>
        baggageTrackings.filter(
          (baggageTracking) => baggageTracking.baggageId === id,
        ) || [],
    );
  }
}
