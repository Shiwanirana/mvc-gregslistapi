import CarsController from "./Controllers/CarsController.js";
import HomesController from "./Controllers/HomesController.js";
import JobsController from "./Controllers/JobsController.js";
// import ValuesController from "./Controllers/ValuesController.js";

class App {
  carsController = new CarsController();
  homesController = new HomesController();
  jobsController = new JobsController();
  // valuesController = new ValuesController();
}

window["app"] = new App();
