import { ProxyState } from "../AppState.js"
import Car from "../Models/Car.js"
import { swapi } from "./AxiosService.js"

class CarsService {

  async getCars(){
    let res = await swapi.get("cars")
    console.log(res.data)
    ProxyState.cars = res.data.map(c=> new Car(c))
  }
  async deleteCar(id) {
    let res = await swapi.delete("cars/"+id)
    console.log(res)
    ProxyState.cars = ProxyState.cars.filter(car => car.id != id)
  }
  async createCar(newCar) {
    let car = await swapi.post("cars", newCar)
    console.log("SERVICE: createCar", 2)
    this.getCars()
    // let car = new Car(newCar)
    // console.log(4)
    // ProxyState.cars = [...ProxyState.cars, car]
    // console.log(6)
  }
  async bid(id, newPrice){
    let carData = {price: newPrice}
    let res = await swapi.put("cars/"+id, carData)
    console.log(res)
    let oldCarIndex = ProxyState.cars.findIndex(c=> c.id == id)

    let temp = ProxyState.cars
    temp.splice(oldCarIndex,1,new Car(res.data))
    ProxyState.cars = temp
  }

}
// Singleton Pattern
export const carsService = new CarsService()