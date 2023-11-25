import { IEntity } from "utils/types";
import { faker } from "@faker-js/faker";

const capacity = 5;

const Parking: IEntity.Parking = {
  id: faker.string.uuid(),
  name: "Parking 1",
  cars: [],
  capacity,
  get freeSpace() {
    return this.capacity - this.cars.length;
  },
  get currentCapacity() {
    return this.cars.length;
  },
};

export { Parking };
