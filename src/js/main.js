import Meal from "./Meal.js";
import Product from "./Product.js";
import FoodLog from "./FoodLog.js";
import UIManager from "./UIManager.js";

const foodLog = new FoodLog();

async function init() {
  let currentMeal = null;
  let currentProduct = null;

  try {
    UIManager.hideAllSections();
    UIManager.showSection("meal");

    // SideBar Events
    const navLinks = document.querySelectorAll(".nav-link");
    const sidebarBtnOpen = document.getElementById("header-menu-btn");
    const sidebarBtnClose = document.getElementById("sidebar-close-btn");
    const sidebar = document.getElementById("sidebar");
    const sidebarOverlay = document.getElementById("sidebar-overlay");

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.forEach((navLink) => {
          navLink.classList.remove("bg-emerald-50", "text-emerald-700");
          navLink.classList.add("text-gray-600", "hover:bg-gray-50");
          navLink.lastElementChild.classList.remove("font-semibold");
          navLink.lastElementChild.classList.add("font-medium");
        });
        link.classList.add("bg-emerald-50", "text-emerald-700");
        link.classList.remove("text-gray-600", "hover:bg-gray-50");
        link.lastElementChild.classList.add("font-semibold");
        link.lastElementChild.classList.remove("font-medium");
        UIManager.hideAllSections();
        UIManager.showSection(link.dataset.target);
        UIManager.showLoader();
        setTimeout(() => {
          UIManager.hideLoader();
        }, 700);
      });
    });

    sidebarBtnOpen.addEventListener("click", () => {
      sidebar.classList.add("open");
      sidebarOverlay.classList.add("active");
    });
    sidebarBtnClose.addEventListener("click", () => {
      sidebar.classList.remove("open");
      sidebarOverlay.classList.remove("active");
    });

    // Load Meals, Categories, Areas and Food Logs to UI
    UIManager.showLoader();

    const meals = await Meal.getAllMeals();
    UIManager.renderMeals(meals);

    const categories = await Meal.getMealCategories();
    UIManager.renderCategories(categories);

    const productsCategories = await Product.getProductCategories();
    UIManager.renderProductCategories(productsCategories);

    const areas = await Meal.getAreas();
    UIManager.renderAreas(areas);
    function updateFoodLog() {
      UIManager.renderFoodLogs(foodLog.getAllItems());
      UIManager.renderNutritionTotals(foodLog.calculateTotals());
      document.getElementById("logged-items-count").innerHTML =
        `Logged Items (${foodLog.getAllItems().length})`;

      if (foodLog.getAllItems().length === 0) {
        UIManager.emptyFoodLogs();
      }
    }
    updateFoodLog();
    UIManager.emptyProducts();

    // Filter meals by category
    const categoriesGrid = document.getElementById("categories-grid");
    categoriesGrid.addEventListener("click", async function (e) {
      const categoryCard = e.target.closest(".category-card");

      if (!categoryCard) return;

      UIManager.showLoader();

      try {
        const category = categoryCard.dataset.category;

        const meals = await Meal.filterByCategory(category);

        UIManager.renderMeals(meals);
      } catch (error) {
        console.log(error);
      } finally {
        UIManager.hideLoader();
      }
    });

    // Filter Products by category
    const categoriesProductGrid = document.getElementById("product-categories");
    categoriesProductGrid.addEventListener("click", async function (e) {
      const categoryProductCard = e.target.closest(".product-category-btn");

      if (!categoryProductCard) return;

      try {
        const category = categoryProductCard.textContent.trim();

        const products = await Product.filterByCategory(category);

        UIManager.renderProducts(products, "name");
        console.log(products);
      } catch (error) {
        console.log(error);
      }
    });

    // Filter meals by area
    const areasGrid = document.getElementById("areas-grid");

    areasGrid.addEventListener("click", async (e) => {
      const areaBtn = e.target.closest("[data-area]");

      if (!areaBtn) return;

      // Remove activation classes from all buttons and add it to the clicked button
      [...areasGrid.children].forEach((btn) => {
        btn.classList.remove(
          "bg-emerald-600",
          "text-white",
          "hover:bg-emerald-700",
        );
        btn.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
      });
      areaBtn.classList.remove(
        "bg-gray-100",
        "text-gray-700",
        "hover:bg-gray-200",
      );
      areaBtn.classList.add(
        "bg-emerald-600",
        "text-white",
        "hover:bg-emerald-700",
      );

      const area = areaBtn.dataset.area;

      UIManager.showLoader();

      try {
        if (area === "all") {
          const meals = await Meal.getAllMeals();
          UIManager.renderMeals(meals);
        } else {
          const meals = await Meal.filterByArea(area);
          UIManager.renderMeals(meals);
        }

        const mealsGrid = document.getElementById("recipes-grid");
        if (mealsGrid.innerHTML === "") {
          mealsGrid.innerHTML = `
            <div class="flex flex-col items-center justify-center py-12 text-center">
              <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <i class="fa-solid fa-magnifying-glass text-2xl text-gray-400"></i>
              </div>
              <p class="text-gray-500 text-lg">No recipes found. Try a different search term.</p>
            </div>
          `;
        }
      } catch (error) {
        console.error(error);
      } finally {
        UIManager.hideLoader();
      }
    });

    // Search for meals
    const mealSearchInput = document.getElementById("search-input");

    mealSearchInput.addEventListener("input", async (e) => {
      const searchValue = e.target.value.trim();

      if (!searchValue) {
        const meals = await Meal.getAllMeals();
        UIManager.renderMeals(meals);
        return;
      }

      const meals = await Meal.searchByName(searchValue);

      UIManager.renderMeals(meals);

      const mealsGrid = document.getElementById("recipes-grid");
      if (mealsGrid.innerHTML === "") {
        mealsGrid.innerHTML = `
            <div class="flex flex-col items-center justify-center py-12 text-center">
              <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <i class="fa-solid fa-magnifying-glass text-2xl text-gray-400"></i>
              </div>
              <p class="text-gray-500 text-lg">No recipes found. Try a different search term.</p>
            </div>
          `;
      }
    });

    // Get meal details on click of meal card
    const recipesGrid = document.getElementById("recipes-grid");
    recipesGrid.addEventListener("click", async (e) => {
      const mealCard = e.target.closest(".recipe-card");

      if (!mealCard) return;

      const mealId = mealCard.dataset.mealId;

      UIManager.showLoader();

      try {
        const mealData = await Meal.getMealById(mealId);
        const meal = new Meal(
          mealData.id,
          mealData.name,
          mealData.category,
          mealData.area,
          mealData.thumbnail,
          mealData.instructions,
          mealData.ingredients,
          mealData.youtube,
        );
        currentMeal = meal;
        await meal.getNutritionData();

        UIManager.renderIngredients(meal.ingredients);
        UIManager.renderInstructions(meal.instructions);
        UIManager.renderNutritionSummary(meal.nutrition);
        UIManager.renderMealDetails(meal);
        UIManager.renderYoutubeVideo(meal.youtube);

        UIManager.hideAllSections();
        UIManager.showSection("meal-details");
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (error) {
        console.log(error);
      } finally {
        UIManager.hideLoader();
      }
    });

    // Back to meals event listener
    document
      .getElementById("back-to-meals-btn")
      .addEventListener("click", () => {
        UIManager.hideAllSections();
        UIManager.showSection("meal");
      });

    // Add to Food Log Event Listeners
    const logMealBtn = document.getElementById("log-meal-btn");
    logMealBtn.addEventListener("click", () => {
      if (!currentMeal) return;
      const logItem = currentMeal.toFoodLogItem();
      foodLog.addLogItem(logItem);
      updateFoodLog();
      UIManager.showDoneAlert(
        `${currentMeal.name} has been added to your daily log.`,
      );
    });

    // Clear all food log event listener
    const clearAllLogsBtn = document.getElementById("clear-foodlog");
    clearAllLogsBtn.addEventListener("click", () => {
      foodLog.clearAllItems();
      updateFoodLog();
      UIManager.showDoneAlert("Food Log Cleared");
    });

    // Delete food log item event listener
    const loggedItemsList = document.getElementById("logged-items-list");
    loggedItemsList.addEventListener("click", (e) => {
      const deleteBtn = e.target.closest(".remove-foodlog-item");
      if (!deleteBtn) return;
      const logId = Number(deleteBtn.dataset.logId);
      foodLog.removeLogItem(logId);
      updateFoodLog();
      UIManager.showDoneAlert("Log Item Deleted");
    });

    // Product Search Event Listeners
    const productSearchInput = document.getElementById("product-search-input");
    const productBarcodeInput = document.getElementById("barcode-input");
    const productSearchBtn = document.getElementById("search-product-btn");
    const productBarcodeBtn = document.getElementById("lookup-barcode-btn");

    productSearchBtn.addEventListener("click", async (e) => {
      const query = productSearchInput.value.trim();
      if (query.length < 2) return;
      const products = await Product.searchByName(query);
      UIManager.renderProducts(products, "name");
      if (products.length === 0) {
        UIManager.emptyProducts();
      }
    });
    productBarcodeBtn.addEventListener("click", async (e) => {
      try {
        const query = productBarcodeInput.value.trim();
        if (query.length < 2) return;
        const products = await Product.searchByBarcode(query);
        UIManager.renderProducts(products, "barcode");
      } catch (error) {
        UIManager.emptyProducts();
      }
    });

    // Product Show Overlay Page
    const productsGrid = document.getElementById("products-grid");

    productsGrid.addEventListener("click", async (e) => {
      const productCard = e.target.closest(".product-card");
      if (!productCard) return;
      UIManager.showLoader();

      try {
        const barcode = productCard.dataset.barcode;

        const productData = await Product.searchByBarcode(barcode);

        const product = new Product(
          productData.id,
          productData.barcode,
          productData.name,
          productData.brand,
          productData.image,
          productData.nutritionGrade,
          productData.novaGroup,
          productData.nutrients,
        );
        currentProduct = product;

        UIManager.renderProductDetails(product);

        document.getElementById("product-overlay").classList.remove("hidden");
      } catch (error) {
        console.error(error);
      } finally {
        UIManager.hideLoader();
      }
    });

    document.querySelectorAll(".close-product-modal").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.getElementById("product-overlay").classList.add("hidden");
      });
    });

    const logProductBtn = document.querySelector(".add-product-to-log");

    logProductBtn.addEventListener("click", () => {
      const logItem = currentProduct.toFoodLogItem();
      foodLog.addLogItem(logItem);
      updateFoodLog();
      UIManager.renderFoodLogs(foodLog.getAllItems());
      document.getElementById("product-overlay").classList.add("hidden");
      UIManager.showDoneAlert(
        `${currentProduct.name} has been added to your daily log.`,
      );
    });
  } catch (error) {
    console.error(error);
  } finally {
    UIManager.hideLoader();
  }
}

init();
