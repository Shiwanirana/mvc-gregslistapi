import { ProxyState } from "../AppState.js"
import Home from "../Models/Home.js"
import { swapi } from "./AxiosService.js"

class HomesService {

  async getHomes(){
    let res = await swapi.get("houses")
    console.log(res.data)
    ProxyState.homes = res.data.map(h=> new Home(h))
  }
  async deleteHome(id) {
    let res = await swapi.delete("houses/"+id)
    console.log(res)
    ProxyState.homes = ProxyState.homes.filter(home => home.id != id)
  }
  async createHome(newHome) {
    let home = await swapi.post("houses", newHome)
    console.log("home")
    this.getHomes()
    // let home = new Home(newHome)
    // ProxyState.homes = [...ProxyState.homes, home]
  }

  async bid(id, newPrice){
    let homeData = {price: newPrice}
    let res = await swapi.put("houses/"+id, homeData)
    console.log(res)
    let oldHomeIndex = ProxyState.homes.findIndex(h=> h.id == id)

    let temp = ProxyState.homes
    temp.splice(oldHomeIndex,1,new Home(res.data))
    ProxyState.homes = temp
  }

}
// Singleton Pattern
export const homesService = new HomesService()