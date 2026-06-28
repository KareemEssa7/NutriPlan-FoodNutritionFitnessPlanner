/*
FoodLog ==>
  = properties
    -logItem [{id, name, calories, protein, carbs, fats, date}]

  = methods
--DONE    -FoodLog.addLogItem(logItem)
--DONE    -FoodLog.removeLogItem(id)
--DONE    -FoodLog.getAllItems()
--DONE    -FoodLog.clearAllItems()
    -FoodLog.calculateTotals() // calories, protein, carbs, fats
--DONE    -FoodLog.saveItems()
--DONE    -FoodLog.loadItems()
*/
/*
new FoodLog()

↓

constructor()

↓

this.loadItems()

↓

localStorage.getItem("foodLog")

↓

JSON.parse(...)

↓

return Array

↓

this.logItems = Array
*/

export default class FoodLog {
  constructor() {
    this.logItems = this.loadItems();
  }

  // Add log item in array and save it in local storage
  addLogItem(logItem) {
    this.logItems.unshift(logItem);
    this.saveItems();
  }

  // Remove log item from array and save it in local storage
  removeLogItem(logId) {
    this.logItems = this.logItems.filter((item) => item.logId !== logId);
    this.saveItems();
  }

  // Save array in local storage
  saveItems() {
    localStorage.setItem("foodLog", JSON.stringify(this.logItems));
  }

  // Load array from local storage
  loadItems() {
    return JSON.parse(localStorage.getItem("foodLog")) || [];
  }

  // Get all log items from array
  getAllItems() {
    return this.logItems;
  }

  // Remove all log items from array and save it in local storage
  clearAllItems() {
    this.logItems = [];
    this.saveItems();
  }

  // Calculate total calories, protein, carbs and fats
  calculateTotals() {
    return this.logItems.reduce(
      (acc, item) => ({
        calories: acc.calories + item.calories,
        protein: acc.protein + item.protein,
        carbs: acc.carbs + item.carbs,
        fat: acc.fat + item.fat,
      }),
      {
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
      },
    );
  }
}
