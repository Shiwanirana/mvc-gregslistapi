import { ProxyState } from "../AppState.js"
import { homesService } from "../Services/HomesService.js"
 
function _drawHomes() {
  let homes = ProxyState.homes
  let template = ''
  homes.forEach(home => {
    template += home.Template
  })
  document.getElementById('homes').innerHTML = template
}

export default class HomesController {
  constructor() {
    ProxyState.on("homes", _drawHomes)
    _drawHomes()
    this.getHomes()
  }

  getHomes(){
   try{
     homesService.getHomes()
   }catch (error){
     console.error(error)
   }
  }
   createHome() {
    window.event.preventDefault()
    let form = window.event.target
    let newHome = {
      bedrooms: form['bedrooms'].value,
      bathrooms: form['bathrooms'].value,
      levels: form['levels'].value,
      year: form['year'].value,
      price: form['price'].value,
      description: form['description'].value,
      imgUrl: form['imgUrl'].value
    }
    try{
    homesService.createHome(newHome)
    }catch(error){
      console.error(error)
    }
    // @ts-ignore
    form.reset()
    // @ts-ignore
    $("#new-home-modal").modal('hide')
  }

   deleteHome(id){
     try{
     homesService.deleteHome(id)
     }catch (error){
       console.error(error)
     }
   }

   bid(id, price){
     try{
       console.log(id,price)
       homesService.bid(id,price)
     }catch (error){
       console.error(error)
     }
   }
 }