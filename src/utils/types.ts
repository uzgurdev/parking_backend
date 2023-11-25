export namespace IEntity {
  export type carType = "electric" | "hybrid" | "petrol";

  export interface Car {
    id: string;
    type: carType;
    name: string;
    price: number;
    arrivedTime: number;
    overallTime: number;
    overallPrice: number;
    departureTime: number;
  }

  export interface Parking {
    id: string;
    name: string;
    cars: Car[];
    capacity: number;
    freeSpace: number;
    currentCapacity: number;
  }
}

export interface IResponse {
  data: IEntity.Parking | IEntity.Car;
  message: string;
  success: boolean;
}
