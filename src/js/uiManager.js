export default class UIManager {
  // create a meal card method
  static createMealCard(meal) {
    return `
      <div class="recipe-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
        data-meal-id="${meal.id}">
        <div class="relative h-48 overflow-hidden">
          <img class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            src="${meal.thumbnail}" alt="${meal.name}"
            loading="lazy" />
          <div class="absolute bottom-3 left-3 flex gap-2">
            <span class="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold rounded-full text-gray-700">
              ${meal.category}
            </span>
            <span class="px-2 py-1 bg-emerald-500 text-xs font-semibold rounded-full text-white">
              ${meal.area}
            </span>
          </div>
        </div>
        <div class="p-4">
          <h3
            class="text-base font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors line-clamp-1">
            ${meal.name}
          </h3>
          <p class="text-xs text-gray-600 mb-3 line-clamp-2">
            ${meal.instructions[0].slice(0, 100)}...
          </p>
          <div class="flex items-center justify-between text-xs">
            <span class="font-semibold text-gray-900">
              <i class="fa-solid fa-utensils text-emerald-600 mr-1"></i>
              ${meal.category}
            </span>
            <span class="font-semibold text-gray-500">
              <i class="fa-solid fa-globe text-blue-500 mr-1"></i>
              ${meal.area}
            </span>
          </div>
        </div>
      </div>
    `;
  }

  // create a product card method
  static createProductCard(product) {
    return `
      <div class="product-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
        data-barcode="${product.barcode}">
        <div class="relative h-40 bg-gray-100 flex items-center justify-center overflow-hidden">
          <img class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
            src="${product.image}"
            alt="${product.name}" loading="lazy" />

          <!-- Nutri-Score Badge -->
          <div
            class="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded uppercase">
            Nutri-Score ${product.nutritionGrade.toUpperCase()}
          </div>

          <!-- NOVA Badge -->
          <div
            class="absolute top-2 right-2 bg-lime-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center"
            title="NOVA 2">
            ${product.novaGroup || ""}
          </div>
        </div>

        <div class="p-4">
          <p class="text-xs text-emerald-600 font-semibold mb-1 truncate">
            ${product.brand}
          </p>
          <h3 class="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
            ${product.name}
          </h3>

          <div class="flex items-center gap-3 text-xs text-gray-500 mb-3">
            <span><i class="fa-solid fa-weight-scale mr-1"></i>250g</span>
            ${Math.round(product.nutrients.calories) > 0 ? `<span><i class="fa-solid fa-fire mr-1"></i>${Math.round(product.nutrients.calories)} kcal/100g</span>` : ""}
          </div>

          <!-- Mini Nutrition -->
          <div class="grid grid-cols-4 gap-1 text-center">
            <div class="bg-emerald-50 rounded p-1.5">
              <p class="text-xs font-bold text-emerald-700">${product.nutrients.protein.toFixed(1)}g</p>
              <p class="text-[10px] text-gray-500">Protein</p>
            </div>
            <div class="bg-blue-50 rounded p-1.5">
              <p class="text-xs font-bold text-blue-700">${product.nutrients.carbs.toFixed(1)}g</p>
              <p class="text-[10px] text-gray-500">Carbs</p>
            </div>
            <div class="bg-purple-50 rounded p-1.5">
              <p class="text-xs font-bold text-purple-700">${product.nutrients.fat.toFixed(1)}g</p>
              <p class="text-[10px] text-gray-500">Fat</p>
            </div>
            <div class="bg-orange-50 rounded p-1.5">
              <p class="text-xs font-bold text-orange-700">${product.nutrients.sugar.toFixed(1)}g</p>
              <p class="text-[10px] text-gray-500">Sugar</p>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // create a food log item method
  static createFoodLogItem(logItem) {
    const typeLabel = logItem.type === "meal" ? "Recipe" : "Product";
    const typeColor =
      logItem.type === "meal" ? "text-emerald-600" : "text-blue-600";
    const time = new Date(logItem.date).toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });
    return `
        <div class="flex items-center justify-between bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-all">
          <div class="flex items-center gap-4">
            <img src="${logItem.image}"
              alt="Algerian Kefta (Meatballs)" class="w-14 h-14 rounded-xl object-cover">
            <div>
              <p class="font-semibold text-gray-900">${logItem.name}</p>
              <p class="text-sm text-gray-500">
                1 serving
                <span class="mx-1">•</span>
                <span class="${typeColor}">${typeLabel}</span>
              </p>
              <p class="text-xs text-gray-400 mt-1">${time}</p>
            </div>
          </div>
          <div class="flex items-center gap-4">
            <div class="text-right">
              <p class="text-lg font-bold text-emerald-600">${Math.round(logItem.calories)}</p>
              <p class="text-xs text-gray-500">kcal</p>
            </div>
            <div class="hidden md:flex gap-2 text-xs text-gray-500">
              <span class="px-2 py-1 bg-blue-50 rounded">${Math.round(logItem.protein)}g P</span>
              <span class="px-2 py-1 bg-amber-50 rounded">${Math.round(logItem.carbs)}g C</span>
              <span class="px-2 py-1 bg-purple-50 rounded">${Math.round(logItem.fat)}g F</span>
            </div>
            <button class="remove-foodlog-item text-gray-400 hover:text-red-500 transition-all p-2"
              data-log-id="${logItem.logId}">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>
        </div>
    `;
  }

  // create a category item method
  static createCategoryItem(category) {
    return `
      <div
        class="category-card bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-3 border border-emerald-200 hover:border-emerald-400 hover:shadow-md cursor-pointer transition-all group"
        data-category="${category.name}">
        <div class="flex items-center gap-2.5">
          <div
            class="text-white w-9 h-9 bg-gradient-to-br from-emerald-400 to-green-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
            <i class="fa-solid fa-drumstick-bite"></i>
          </div>
          <div>
            <h3 class="text-sm font-bold text-gray-900">${category.name}</h3>
          </div>
        </div>
      </div>
    `;
  }

  // create a product category item method
  static createProductCategoryItem(category) {
    return `
      <button
        class="product-category-btn px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium whitespace-nowrap hover:bg-blue-200 transition-all">
        <i class="fa-solid fa-glass-water mr-1.5"></i>${category.name}
      </button>
    `;
  }

  // create a area item method
  static createAreaItem(area) {
    return `
      <button
        class="px-4 py-2 bg-gray-100 text-gray-700 rounded-full font-medium text-sm whitespace-nowrap hover:bg-gray-200 transition-all"
        data-area="${area.name}">
        ${area.name}
      </button>
  `;
  }

  // create a meal details method
  static createMealDetails(meal) {
    return `
      <div class="relative h-80 md:h-96">
        <img src="${meal.thumbnail}"
          alt="${meal.name}" class="w-full h-full object-cover" />
        <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
        <div class="absolute bottom-0 left-0 right-0 p-8">
          <div class="flex items-center gap-3 mb-3">
            <span class="px-3 py-1 bg-emerald-500 text-white text-sm font-semibold rounded-full">${meal.category}</span>
            <span class="px-3 py-1 bg-blue-500 text-white text-sm font-semibold rounded-full">${meal.area}</span>
          </div>
          <h1 class="text-3xl md:text-4xl font-bold text-white mb-2">
            ${meal.name}
          </h1>
          <div class="flex items-center gap-6 text-white/90">
            <span class="flex items-center gap-2">
              <i class="fa-solid fa-clock"></i>
              <span>30 min</span>
            </span>
            <span class="flex items-center gap-2">
              <i class="fa-solid fa-utensils"></i>
              <span id="hero-servings">4 servings</span>
            </span>
            <span class="flex items-center gap-2">
              <i class="fa-solid fa-fire"></i>
              <span id="hero-calories">${meal.nutrition.calories} cal/serving</span>
            </span>
          </div>
        </div>
      </div>
    `;
  }

  // create a ingredient item method
  static createIngredientItem(ingredient) {
    return `
      <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors">
        <input
          type="checkbox"
          class="ingredient-checkbox w-5 h-5 text-emerald-600 rounded border-gray-300" />
        <span class="text-gray-700">
          <span class="font-medium text-gray-900">
            ${ingredient.measure}
          </span>
           ${ingredient.ingredient} 
        </span>
  
      </div>
  `;
  }

  // create a instruction item method
  static createInstructionItem(index, instruction) {
    return `
      <div class="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
        <div
          class="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0">
          ${index}
        </div>
        <p class="text-gray-700 leading-relaxed pt-2">
          ${instruction}
        </p>
      </div>
    `;
  }

  // create a nutrition summary method
  static createNutritionSummary(nutrition) {
    const proteinWidth = Math.min((nutrition.protein / 50) * 100, 100);
    const carbsWidth = Math.min((nutrition.carbs / 300) * 100, 100);
    const fatWidth = Math.min((nutrition.fat / 70) * 100, 100);
    const fiberWidth = Math.min((nutrition.fiber / 30) * 100, 100);
    const sugarWidth = Math.min((nutrition.sugar / 50) * 100, 100);
    return `
      <p class="text-sm text-gray-500 mb-4">Per serving</p>
      
      <div class="text-center py-4 mb-4 bg-linear-to-br from-emerald-50 to-teal-50 rounded-xl">
        <p class="text-sm text-gray-600">Calories per serving</p>
        <p class="text-4xl font-bold text-emerald-600">${nutrition.calories} cal</p>
      </div>

      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 rounded-full bg-emerald-500"></div>
            <span class="text-gray-700">Protein</span>
          </div>
          <span class="font-bold text-gray-900">${nutrition.protein}g</span>
        </div>
        <div class="w-full bg-gray-100 rounded-full h-2">
          <div class="bg-emerald-500 h-2 rounded-full" style="width: ${proteinWidth}%"></div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 rounded-full bg-blue-500"></div>
            <span class="text-gray-700">Carbs</span>
          </div>
          <span class="font-bold text-gray-900">${nutrition.carbs}g</span>
        </div>
        <div class="w-full bg-gray-100 rounded-full h-2">
          <div class="bg-blue-500 h-2 rounded-full" style="width: ${carbsWidth}%"></div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 rounded-full bg-purple-500"></div>
            <span class="text-gray-700">Fat</span>
          </div>
          <span class="font-bold text-gray-900">${nutrition.fat}g</span>
        </div>
        <div class="w-full bg-gray-100 rounded-full h-2">
          <div class="bg-purple-500 h-2 rounded-full" style="width: ${fatWidth}%"></div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 rounded-full bg-orange-500"></div>
            <span class="text-gray-700">Fiber</span>
          </div>
          <span class="font-bold text-gray-900">${nutrition.fiber}g</span>
        </div>
        <div class="w-full bg-gray-100 rounded-full h-2">
          <div class="bg-orange-500 h-2 rounded-full" style="width: ${fiberWidth}%"></div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 rounded-full bg-pink-500"></div>
            <span class="text-gray-700">Sugar</span>
          </div>
          <span class="font-bold text-gray-900">${nutrition.sugar}g</span>
        </div>
        <div class="w-full bg-gray-100 rounded-full h-2">
          <div class="bg-pink-500 h-2 rounded-full" style="width: ${sugarWidth}%"></div>
        </div>
      </div>

      <div class="mt-6 pt-6 border-t border-gray-100">
        <h3 class="text-sm font-semibold text-gray-900 mb-3">Other</h3>
        <div class="grid grid-cols-2 gap-3 text-sm">
            <div class="flex justify-between">
                <span class="text-gray-600">Cholesterol</span>
                <span class="font-medium">${nutrition.cholesterol}mg</span>
            </div>
            <div class="flex justify-between">
                <span class="text-gray-600">Sodium</span>
                <span class="font-medium">${nutrition.sodium}mg</span>
            </div>
        </div>
      </div>
    `;
  }

  // render meals in HTML method
  static renderMeals(meals) {
    const mealsContainer = document.getElementById("recipes-grid");

    this.clearContainer(mealsContainer);

    mealsContainer.innerHTML = meals
      .map((meal) => this.createMealCard(meal))
      .join("");
  }

  // render products in HTML method
  static renderProducts(products, searchTerm) {
    const productsContainer = document.getElementById("products-grid");

    this.clearContainer(productsContainer);
    if (searchTerm === "name") {
      productsContainer.innerHTML = products
        .map((product) => this.createProductCard(product))
        .join("");
    } else if (searchTerm === "barcode") {
      productsContainer.innerHTML = this.createProductCard(products);
    }
  }
  static renderProductDetails(product) {
    const proteinWidth = Math.min((product.nutrients.protein / 50) * 100, 100);
    const carbsWidth = Math.min((product.nutrients.carbs / 300) * 100, 100);
    const fatWidth = Math.min((product.nutrients.fat / 70) * 100, 100);
    const sugarWidth = Math.min((product.nutrients.sugar / 50) * 100, 100);

    document.getElementById("product-detail-image").src = product.image;
    document.getElementById("product-detail-image").alt = product.name;
    document.getElementById("product-detail-brand").textContent = product.brand;
    document.getElementById("product-detail-name").textContent = product.name;

    document.getElementById("product-detail-nutriscore").textContent =
      product.nutritionGrade.toUpperCase();
    document.getElementById("product-detail-nutriscore-label").textContent =
      product.nutritionGrade.toUpperCase();

    document.getElementById("product-detail-nova").textContent =
      product.novaGroup || "-";

    document.getElementById("product-detail-calories").textContent =
      `${Math.round(product.nutrients.calories)} kcal`;

    document.getElementById("product-detail-protein").textContent =
      `${product.nutrients.protein.toFixed(1)} g`;
    document.getElementById("product-detail-protein-bar").style.width =
      `${proteinWidth}%`;

    document.getElementById("product-detail-carbs").textContent =
      `${product.nutrients.carbs.toFixed(1)} g`;
    document.getElementById("product-detail-carbs-bar").style.width =
      `${carbsWidth}%`;

    document.getElementById("product-detail-fat").textContent =
      `${product.nutrients.fat.toFixed(1)} g`;
    document.getElementById("product-detail-fat-bar").style.width =
      `${fatWidth}%`;

    document.getElementById("product-detail-sugar").textContent =
      `${product.nutrients.sugar.toFixed(1)} g`;
    document.getElementById("product-detail-sugar-bar").style.width =
      `${sugarWidth}%`;

    document.getElementById("product-detail-saturated-fat").textContent =
      `${product.nutrients.fat.toFixed(1)} g`;

    document.getElementById("product-detail-fiber").textContent =
      `${product.nutrients.fiber.toFixed(1)} g`;

    document.getElementById("product-detail-sodium").textContent =
      `${product.nutrients.sodium.toFixed(1)} g`;

    document.getElementById("product-detail-ingredients").textContent =
      product.ingredients || "No ingredients available";
  }

  // render food logs in HTML method
  static renderFoodLogs(logItems) {
    const logContainer = document.getElementById("logged-items-list");

    this.clearContainer(logContainer);

    logContainer.innerHTML = logItems
      .map((logItem) => this.createFoodLogItem(logItem))
      .join("");
  }

  static emptyFoodLogs() {
    const logContainer = document.getElementById("logged-items-list");
    logContainer.innerHTML = `
      <div class="text-center py-8 text-gray-500">
        <i class="fa-solid fa-utensils text-4xl mb-3 text-gray-300"></i>
        <p class="font-medium">No meals logged today</p>
        <p class="text-sm">
          Add meals from the Meals page or scan products
        </p>
      </div>`;
  }

  static emptyProducts() {
    const productsContainer = document.getElementById("products-grid");
    productsContainer.innerHTML = `
      <div id="products-empty" class="py-12">
        <div class="text-center">
            <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i class="fa-solid fa-box-open text-3xl text-gray-400"></i>
            </div>
            <p class="text-gray-500 text-lg mb-2">No products to display</p>
            <p class="text-gray-400 text-sm">Search for a product or browse by category</p>
        </div>
      </div>`;
  }

  // render categories in HTML method
  static renderCategories(categories) {
    const categoriesContainer = document.getElementById("categories-grid");

    this.clearContainer(categoriesContainer);

    categoriesContainer.innerHTML = categories
      .map((category) => this.createCategoryItem(category))
      .join("");
  }

  // render Products categories in HTML method
  static renderProductCategories(categories) {
    const productCategoriesContainer =
      document.getElementById("product-categories");

    this.clearContainer(productCategoriesContainer);
    productCategoriesContainer.innerHTML = categories
      .map((category) => this.createProductCategoryItem(category))
      .join("");
  }

  // render areas in HTML method
  static renderAreas(areas) {
    const areasContainer = document.getElementById("areas-grid");

    this.clearContainer(areasContainer);

    areasContainer.innerHTML =
      `
      <button
        class="px-4 py-2 bg-emerald-600 text-white rounded-full font-medium text-sm whitespace-nowrap hover:bg-emerald-700 transition-all" 
        data-area="all">
        All Recipes
      </button>
    ` + areas.map((area) => this.createAreaItem(area)).join("");
  }

  // render instructions in HTML method
  static renderInstructions(instructions) {
    const instructionsContainer = document.getElementById("instructions-grid");

    this.clearContainer(instructionsContainer);

    instructionsContainer.innerHTML = instructions
      .map((instruction, index) =>
        this.createInstructionItem(index + 1, instruction),
      )
      .join("");
  }

  // render ingredients in HTML method
  static renderIngredients(ingredients) {
    const ingredientsContainer = document.getElementById("ingredients-grid");

    this.clearContainer(ingredientsContainer);

    ingredientsContainer.innerHTML = ingredients
      .map((ingredient) => this.createIngredientItem(ingredient))
      .join("");
  }

  // render nutrition summary in HTML method
  static renderNutritionSummary(nutrition) {
    const nutritionContainer = document.getElementById(
      "nutrition-facts-container",
    );

    nutritionContainer.innerHTML = this.createNutritionSummary(nutrition);
  }

  static createNutritionTotals(summary) {
    const caloriesWidth = Math.min((summary.calories / 2000) * 100, 100);
    const proteinWidth = Math.min((summary.protein / 50) * 100, 100);
    const carbsWidth = Math.min((summary.carbs / 250) * 100, 100);
    const fatWidth = Math.min((summary.fat / 65) * 100, 100);
    return `
      <div class="bg-emerald-50 rounded-xl p-4">
        <div class="flex items-center justify-between mb-2">
          <span class="text-sm font-semibold text-gray-700">Calories</span>
          <span class="text-sm text-gray-500">${Math.round(summary.calories)} / 2000 kcal</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2.5">
          <div class="bg-emerald-500 h-2.5 rounded-full" style="width: ${caloriesWidth}%"></div>
        </div>
      </div>
      <div class="bg-blue-50 rounded-xl p-4">
        <div class="flex items-center justify-between mb-2">
          <span class="text-sm font-semibold text-gray-700">Protein</span>
          <span class="text-sm text-gray-500">${Math.round(summary.protein)} / 50 g</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2.5">
          <div class="bg-blue-500 h-2.5 rounded-full" style="width: ${proteinWidth}%"></div>
        </div>
      </div>
      <!-- Carbs Progress -->
      <div class="bg-amber-50 rounded-xl p-4">
        <div class="flex items-center justify-between mb-2">
          <span class="text-sm font-semibold text-gray-700">Carbs</span>
          <span class="text-sm text-gray-500">${Math.round(summary.carbs)} / 250 g</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2.5">
          <div class="bg-amber-500 h-2.5 rounded-full" style="width: ${carbsWidth}%"></div>
        </div>
      </div>
      <!-- Fat Progress -->
      <div class="bg-purple-50 rounded-xl p-4">
        <div class="flex items-center justify-between mb-2">
          <span class="text-sm font-semibold text-gray-700">Fat</span>
          <span class="text-sm text-gray-500">${Math.round(summary.fat)} / 65 g</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2.5">
          <div class="bg-purple-500 h-2.5 rounded-full" style="width: ${fatWidth}%"></div>
        </div>
      </div>
    `;
  }

  static renderNutritionTotals(summary) {
    document.getElementById("foodlog-total-progress").innerHTML =
      this.createNutritionTotals(summary);
  }

  // render meal details in HTML method
  static renderMealDetails(meal) {
    const mealHero = document.getElementById("meal-hero");
    mealHero.innerHTML = this.createMealDetails(meal);
  }

  static renderYoutubeVideo(url) {
    const videoContainer = document.getElementById("meal-video");

    videoContainer.setAttribute(
      "src",
      `https://www.youtube.com/embed/${url.split("=").at(-1)}`,
    );
  }

  // clear container method
  static clearContainer(container) {
    container.innerHTML = "";
  }

  // show element in HTML
  static showElement(element) {
    element.classList.remove("hidden");
  }

  // hide element from HTML
  static hideElement(element) {
    element.classList.add("hidden");
  }

  // show section in HTML
  static showSection(target) {
    document
      .querySelectorAll(`[data-page="${target}"]`)
      .forEach((s) => s.classList.remove("hidden"));
  }

  // hide section from HTML
  static hideSection(id) {
    document.getElementById(id).classList.add("hidden");
  }

  // hide all sections from HTML
  static hideAllSections() {
    document.querySelectorAll("#main-content section").forEach((section) => {
      section.classList.add("hidden");
    });
  }

  // show loader in HTML
  static showLoader() {
    document.getElementById("app-loading-overlay").classList.remove("loading");
  }

  // hide loader from HTML
  static hideLoader() {
    document.getElementById("app-loading-overlay").classList.add("loading");
  }

  // show done alert in HTML
  static showDoneAlert(meal) {
    Swal.fire({
      icon: "success",
      title: "Meal Logged!",
      timer: 2000,
      text: meal,
      showConfirmButton: false,
    });
  }

  // show delete alert in HTML
  static showDeleteAlert() {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed)
        Swal.fire({
          title: "Deleted!",
          text: "Your meal has been deleted.",
          icon: "success",
        });
    });
  }
  // show adding alert in HTML
  static showAddingAlert(meal) {
    Swal.fire({
      title: "Are you sure?",
      text: `You need to add ${meal} to your daily log!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed)
        Swal.fire({
          title: "Added!",
          text: `${meal} has been added.`,
          icon: "success",
        });
    });
  }

  // toggle sidebar in HTML
  static toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("sidebar-overlay");

    if (sidebar.classList.contains("hidden")) {
      sidebar.classList.remove("hidden");
      overlay.classList.remove("hidden");
    } else {
      sidebar.classList.add("hidden");
      overlay.classList.add("hidden");
    }
  }
}
