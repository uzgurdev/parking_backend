export namespace IEntity {
  export type carType = "electric" | "hybrid" | "petal";

  export interface Car {
    id: string;
    type: carType;
    name: string;
    price: number;
    arrivedTime: number;
    overallTime: number;
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
