import { Router } from "express";
import { Parking } from "./data";
import { faker } from "@faker-js/faker";
import { IEntity, IResponse } from "./utils/types";

const router = Router();
const randomIdx = () => Math.floor(Math.random() * 3);
const carTypes: IEntity.carType[] = ["electric", "hybrid", "petrol"];

// Parking
router.get("/parking", (req, res) => {
  const response: IResponse = {
    data: Parking,
    message: "success",
    success: true,
  };
  res.send(response);
});

// Car
const Car = (): IEntity.Car => {
  return {
    id: faker.string.uuid(),
    type: carTypes[randomIdx()],
    name: faker.vehicle.vehicle(),
    price: Number(faker.commerce.price()),
    get overallPrice() {
      return this.price * this.overallTime;
    },
    arrivedTime: Date.now(),
    get overallTime() {
      return this.departureTime ? this.departureTime - this.arrivedTime : 0;
    },
    departureTime: 0,
  };
};

setInterval(() => {
  if (Parking.cars.length < Parking.capacity) {
    Parking.cars.push(Car());
  } else if (Parking.freeSpace === 0) {
    for (let i = 0; i < 3; i++) {
      const car = Parking.cars.shift();
      car.departureTime = Date.now();
      console.log("deleted car: ", car);
    }
  }
}, 50000);

// Single get with Unparking
router.get("/car/:id", (req, res) => {
  const id = req.params.id;
  const car = Parking.cars.find((c) => c.id === id);
  car.departureTime = Date.now();

  const response: IResponse = {
    data: car,
    message: "success",
    success: true,
  };

  if (car) {
    res.send(response);
  } else {
    res.status(404).send("Car not found");
  }
});

// Unparking
router.delete("/car/:id", (req, res) => {
  const id = req.params.id;
  const carIdx = Parking.cars.findIndex((c) => c.id === id);

  if (carIdx !== -1) {
    const car = Parking.cars[carIdx];
    car.departureTime = Date.now();
    Parking.cars.splice(carIdx, 1);

    const response: IResponse = {
      data: car,
      message: "success",
      success: true,
    };

    console.log("deleted car: ", car);
    res.send(response);
  } else {
    res.status(404).send(`Car not found with id: ${id}`);
  }
});

export default router;
