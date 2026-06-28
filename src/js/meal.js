export default class Meal {
  constructor(
    id,
    name,
    category,
    area,
    thumbnail,
    instructions,
    ingredients,
    youtube,
  ) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.area = area;
    this.thumbnail = thumbnail;
    this.instructions = instructions;
    this.ingredients = ingredients;
    this.youtube = youtube;
    this.nutrition = {};
  }

  // API for Get All Meals
  static async getAllMeals() {
    try {
      const res = await fetch(
        "https://nutriplan-api.vercel.app/api/meals/search?page=1&limit=25",
      );
      let data = await res.json();
      return data.results;
    } catch (error) {
      console.log(error);
    }
  }

  // API for Get Meals by Name
  static async searchByName(name) {
    try {
      const res = await fetch(
        `https://nutriplan-api.vercel.app/api/meals/search?q=${name}`,
      );

      let data = await res.json();

      return data.results;
    } catch (error) {
      console.log(error);
    }
  }

  // API for Get Meal by Id
  static async getMealById(id) {
    try {
      const res = await fetch(
        `https://nutriplan-api.vercel.app/api/meals/${id}`,
      );
      let data = await res.json();
      return data.result;
    } catch (error) {
      console.log(error);
    }
  }

  // API for Get Meal Ingredients
  static async getMealIngredients(id) {
    let mealData = await Meal.getMealById(id);
    return mealData.ingredients;
  }

  // API for Get Meal Categories
  static async getMealCategories() {
    try {
      const res = await fetch(
        `https://nutriplan-api.vercel.app/api/meals/categories`,
      );
      let data = await res.json();
      return data.results.slice(0, 12);
    } catch (error) {
      console.log(error);
    }
  }

  // API for Get Areas
  static async getAreas() {
    try {
      const res = await fetch(
        `https://nutriplan-api.vercel.app/api/meals/areas`,
      );
      let data = await res.json();
      return data.results;
    } catch (error) {
      console.log(error);
    }
  }

  // API for Get Meals by Category
  static async filterByCategory(category) {
    try {
      const res = await fetch(
        `https://nutriplan-api.vercel.app/api/meals/filter?category=${category}`,
      );
      let data = await res.json();
      return data.results;
    } catch (error) {
      console.log(error);
    }
  }

  // API for Get Meals by Area
  static async filterByArea(area) {
    try {
      const res = await fetch(
        `https://nutriplan-api.vercel.app/api/meals/filter?area=${area}`,
      );
      let data = await res.json();
      return data.results;
    } catch (error) {
      console.log(error);
    }
  }

  // API for Get Nutrition Data for Meal
  async getNutritionData() {
    const mealIngredients = await Meal.getMealIngredients(this.id);
    let ingredients = mealIngredients.map(
      (item) => `${item.measure} ${item.ingredient}`,
    );
    try {
      const res = await fetch(
        "https://nutriplan-api.vercel.app/api/nutrition/analyze",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "a64ITxce324Z7Eaas2bwgub9l6YUeJNuY1gJtG5q",
          },
          body: JSON.stringify({
            recipeName: this.name,
            ingredients,
          }),
        },
      );
      let data = await res.json();
      let fullData = data.data.perServing;
      this.nutrition = fullData;
      return this.nutrition;
    } catch (error) {
      console.log(error);
    }
  }

  // Convert Meal to FoodLogItem
  toFoodLogItem() {
    return {
      id: this.id,
      logId: Date.now() + Math.random(),
      type: "meal",
      name: this.name,
      image: this.thumbnail,

      calories: this.nutrition.calories,
      protein: this.nutrition.protein,
      carbs: this.nutrition.carbs,
      fat: this.nutrition.fat,

      date: new Date().toISOString(),
    };
  }
}
