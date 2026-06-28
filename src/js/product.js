export default class Product {
  constructor(
    id,
    barcode,
    name,
    brand,
    image,
    nutritionGrade,
    novaGroup,
    nutrients,
  ) {
    this.id = id;
    this.barcode = barcode;
    this.name = name;
    this.brand = brand;
    this.image = image;
    this.nutritionGrade = nutritionGrade;
    this.novaGroup = novaGroup;
    this.nutrients = nutrients;
  }

  // API for Product Search by Name
  static async searchByName(name) {
    try {
      const res = await fetch(
        `https://nutriplan-api.vercel.app/api/products/search?q=${name}`,
      );
      let data = await res.json();
      return data.results;
    } catch (error) {
      console.log(error);
    }
  }

  // API for Product Search by Barcode
  static async searchByBarcode(barcode) {
    try {
      const res = await fetch(
        `https://nutriplan-api.vercel.app/api/products/barcode/${barcode}`,
      );
      let data = await res.json();
      return data.result;
    } catch (error) {
      console.log(error);
    }
  }

  // API for Product Categories
  static async getProductCategories() {
    try {
      const res = await fetch(
        `https://nutriplan-api.vercel.app/api/products/categories`,
      );
      let data = await res.json();
      return data.results;
    } catch (error) {
      console.log(error);
    }
  }

  // API for Product Filter by Category
  static async filterByCategory(category) {
    try {
      const res = await fetch(
        `https://nutriplan-api.vercel.app/api/products/category/${category}`,
      );
      let data = await res.json();
      return data.results;
    } catch (error) {
      console.log(error);
    }
  }

  // Convert Product to FoodLogItem
  toFoodLogItem() {
    return {
      id: this.id,
      logId: Date.now() + Math.random(),
      type: "product",
      name: this.name,
      image: this.image,

      calories: this.nutrients.calories,
      protein: this.nutrients.protein,
      carbs: this.nutrients.carbs,
      fat: this.nutrients.fat,

      date: new Date().toISOString(),
    };
  }
}
