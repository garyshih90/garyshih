const STORAGE_KEY = "costco-shopping-lists-v2";

const DEPARTMENTS = [
  "Fruits & Vegetables",
  "Bakery",
  "Meat & Seafood",
  "Dairy & Eggs",
  "Pantry & Dry Goods",
  "Frozen",
  "Beverages",
  "Snacks",
  "Household & Cleaning",
  "Health & Personal Care",
  "Other"
];

const KEYWORDS = {
  "Fruits & Vegetables": [
    "banana",
    "apple",
    "orange",
    "berries",
    "berry",
    "grape",
    "avocado",
    "lettuce",
    "spinach",
    "broccoli",
    "carrot",
    "onion",
    "potato",
    "tomato",
    "pepper",
    "vegetable",
    "fruit"
  ],
  Bakery: ["bread", "bagel", "muffin", "croissant", "cake", "bun", "roll", "tortilla"],
  "Meat & Seafood": ["chicken", "beef", "pork", "salmon", "shrimp", "turkey", "sausage", "steak", "fish"],
  "Dairy & Eggs": ["milk", "yogurt", "cheese", "egg", "butter", "cream"],
  "Pantry & Dry Goods": ["rice", "pasta", "flour", "sugar", "oil", "beans", "cereal", "sauce", "spice"],
  Frozen: ["frozen", "ice cream", "pizza", "waffle", "dumpling"],
  Beverages: ["water", "juice", "coffee", "tea", "soda", "drink"],
  Snacks: ["chips", "cracker", "nuts", "granola", "bar", "popcorn", "snack"],
  "Household & Cleaning": ["paper towel", "toilet paper", "detergent", "soap", "trash bag", "cleaner"],
  "Health & Personal Care": ["vitamin", "toothpaste", "shampoo", "conditioner", "lotion", "deodorant", "medicine"]
};

const ITEM_EMOJI_KEYWORDS = [
  { keywords: ["green apple"], emoji: "🍏" },
  { keywords: ["apple", "apples"], emoji: "🍎" },
  { keywords: ["pear", "pears"], emoji: "🍐" },
  { keywords: ["tangerine", "mandarin", "orange", "oranges"], emoji: "🍊" },
  { keywords: ["lemon", "lemons"], emoji: "🍋" },
  { keywords: ["lime", "limes"], emoji: "🍋" },
  { keywords: ["banana", "bananas"], emoji: "🍌" },
  { keywords: ["watermelon"], emoji: "🍉" },
  { keywords: ["grape", "grapes"], emoji: "🍇" },
  { keywords: ["strawberry", "strawberries"], emoji: "🍓" },
  { keywords: ["blueberry", "blueberries", "berry", "berries"], emoji: "🫐" },
  { keywords: ["melon", "cantaloupe", "honeydew"], emoji: "🍈" },
  { keywords: ["cherry", "cherries"], emoji: "🍒" },
  { keywords: ["peach", "peaches"], emoji: "🍑" },
  { keywords: ["mango", "mangoes"], emoji: "🥭" },
  { keywords: ["pineapple"], emoji: "🍍" },
  { keywords: ["coconut"], emoji: "🥥" },
  { keywords: ["kiwi", "kiwis"], emoji: "🥝" },
  { keywords: ["tomato", "tomatoes"], emoji: "🍅" },
  { keywords: ["avocado", "avocados"], emoji: "🥑" },
  { keywords: ["eggplant"], emoji: "🍆" },
  { keywords: ["potato", "potatoes"], emoji: "🥔" },
  { keywords: ["carrot", "carrots"], emoji: "🥕" },
  { keywords: ["corn"], emoji: "🌽" },
  { keywords: ["hot pepper", "chili", "jalapeno"], emoji: "🌶️" },
  { keywords: ["pepper"], emoji: "🫑" },
  { keywords: ["cucumber"], emoji: "🥒" },
  { keywords: ["leafy", "lettuce"], emoji: "🥬" },
  { keywords: ["broccoli"], emoji: "🥦" },
  { keywords: ["garlic"], emoji: "🧄" },
  { keywords: ["onion", "onions"], emoji: "🧅" },
  { keywords: ["mushroom", "mushrooms"], emoji: "🍄" },
  { keywords: ["peanut", "peanuts"], emoji: "🥜" },
  { keywords: ["beans"], emoji: "🫘" },
  { keywords: ["chestnut"], emoji: "🌰" },
  { keywords: ["bread", "bagel", "bagels", "croissant", "baguette"], emoji: "🥖" },
  { keywords: ["pretzel"], emoji: "🥨" },
  { keywords: ["flatbread"], emoji: "🫓" },
  { keywords: ["pancake", "pancakes"], emoji: "🥞" },
  { keywords: ["waffle", "waffles"], emoji: "🧇" },
  { keywords: ["cheese"], emoji: "🧀" },
  { keywords: ["meat", "beef", "steak"], emoji: "🥩" },
  { keywords: ["bacon"], emoji: "🥓" },
  { keywords: ["burger", "hamburger"], emoji: "🍔" },
  { keywords: ["fries", "french fries"], emoji: "🍟" },
  { keywords: ["pizza"], emoji: "🍕" },
  { keywords: ["hot dog"], emoji: "🌭" },
  { keywords: ["sandwich"], emoji: "🥪" },
  { keywords: ["taco", "tacos"], emoji: "🌮" },
  { keywords: ["burrito"], emoji: "🌯" },
  { keywords: ["tamale"], emoji: "🫔" },
  { keywords: ["falafel"], emoji: "🧆" },
  { keywords: ["egg", "eggs"], emoji: "🥚" },
  { keywords: ["chicken"], emoji: "🍗" },
  { keywords: ["turkey"], emoji: "🦃" },
  { keywords: ["dumpling", "dumplings"], emoji: "🥟" },
  { keywords: ["ramen", "noodle", "noodles"], emoji: "🍜" },
  { keywords: ["spaghetti", "pasta"], emoji: "🍝" },
  { keywords: ["rice"], emoji: "🍚" },
  { keywords: ["curry"], emoji: "🍛" },
  { keywords: ["sushi"], emoji: "🍣" },
  { keywords: ["fish", "salmon"], emoji: "🐟" },
  { keywords: ["shrimp", "prawn"], emoji: "🍤" },
  { keywords: ["lobster"], emoji: "🦞" },
  { keywords: ["crab"], emoji: "🦀" },
  { keywords: ["oyster"], emoji: "🦪" },
  { keywords: ["squid"], emoji: "🦑" },
  { keywords: ["milk"], emoji: "🥛" },
  { keywords: ["butter"], emoji: "🧈" },
  { keywords: ["ice cream"], emoji: "🍨" },
  { keywords: ["shaved ice"], emoji: "🍧" },
  { keywords: ["doughnut", "donut"], emoji: "🍩" },
  { keywords: ["cookie", "cookies"], emoji: "🍪" },
  { keywords: ["cake", "muffin", "cupcake"], emoji: "🧁" },
  { keywords: ["birthday cake"], emoji: "🎂" },
  { keywords: ["pie"], emoji: "🥧" },
  { keywords: ["chocolate"], emoji: "🍫" },
  { keywords: ["candy"], emoji: "🍬" },
  { keywords: ["lollipop"], emoji: "🍭" },
  { keywords: ["custard", "flan"], emoji: "🍮" },
  { keywords: ["honey"], emoji: "🍯" },
  { keywords: ["coffee"], emoji: "☕" },
  { keywords: ["tea"], emoji: "🫖" },
  { keywords: ["mate"], emoji: "🧉" },
  { keywords: ["bubble tea", "boba"], emoji: "🧋" },
  { keywords: ["juice"], emoji: "🧃" },
  { keywords: ["milkshake"], emoji: "🥤" },
  { keywords: ["soda"], emoji: "🥤" },
  { keywords: ["water"], emoji: "💧" },
  { keywords: ["beer"], emoji: "🍺" },
  { keywords: ["wine"], emoji: "🍷" },
  { keywords: ["champagne"], emoji: "🍾" },
  { keywords: ["whiskey"], emoji: "🥃" },
  { keywords: ["cocktail"], emoji: "🍸" },
  { keywords: ["chips", "chip"], emoji: "🍟" },
  { keywords: ["popcorn"], emoji: "🍿" },
  { keywords: ["salt"], emoji: "🧂" }
];


const DEPARTMENT_EMOJI = {
  "Fruits & Vegetables": "🥬",
  Bakery: "🥐",
  "Meat & Seafood": "🥩",
  "Dairy & Eggs": "🥛",
  "Pantry & Dry Goods": "🥫",
  Frozen: "🧊",
  Beverages: "🥤",
  Snacks: "🍿",
  "Household & Cleaning": "🧽",
  "Health & Personal Care": "🩺",
  Other: "🛒"
};

let state = loadState();

const listSelect = document.querySelector("#list-select");
const newListButton = document.querySelector("#new-list");
const deleteListButton = document.querySelector("#delete-list");
const editListNameButton = document.querySelector("#edit-list-name");
const bulkInput = document.querySelector("#bulk-input");
const parseButton = document.querySelector("#parse-button");
const clearButton = document.querySelector("#clear-active");
const departmentsContainer = document.querySelector("#departments");

listSelect.addEventListener("change", () => {
  state.activeListId = listSelect.value;
  saveState();
  render();
});

newListButton.addEventListener("click", () => {
  const nextName = `Costco Trip ${state.lists.length + 1}`;
  const list = createList(nextName);
  state.lists.unshift(list);
  state.activeListId = list.id;
  saveState();
  render();
});

editListNameButton.addEventListener("click", () => {
  const active = getActiveList();
  if (!active) return;

  const nextName = window.prompt("Rename checklist", active.name);
  if (!nextName || !nextName.trim()) return;

  active.name = nextName.trim();
  saveState();
  render();
});

deleteListButton.addEventListener("click", () => {
  const active = getActiveList();
  if (!active) return;

  state.lists = state.lists.filter((list) => list.id !== active.id);

  if (state.lists.length === 0) {
    const fallback = createList("Costco Trip 1");
    state.lists = [fallback];
    state.activeListId = fallback.id;
  } else if (state.activeListId === active.id) {
    state.activeListId = state.lists[0].id;
  }

  saveState();
  render();
});

parseButton.addEventListener("click", () => {
  const parsedItems = parseParagraph(bulkInput.value);
  if (!parsedItems.length) return;

  parsedItems.forEach((name) => addItem(name));
  bulkInput.value = "";
  render();
});

clearButton.addEventListener("click", () => {
  const active = getActiveList();
  if (!active) return;

  active.items = [];
  saveState();
  render();
});

function createList(name) {
  return {
    id: crypto.randomUUID(),
    name,
    items: []
  };
}

function parseParagraph(text) {
  return text
    .split(/[\n,;]+|\band\b/gi)
    .map((token) => token.replace(/[.]/g, "").trim())
    .filter(Boolean);
}

function getItemEmoji(name, department) {
  const normalized = name.toLowerCase();

  for (const rule of ITEM_EMOJI_KEYWORDS) {
    if (rule.keywords.some((keyword) => normalized.includes(keyword))) {
      return rule.emoji;
    }
  }

  return DEPARTMENT_EMOJI[department] || DEPARTMENT_EMOJI.Other;
}

function addItem(name) {
  const active = getActiveList();
  if (!active) return;

  const department = categorizeItem(name);
  const item = {
    id: crypto.randomUUID(),
    name,
    department,
    emoji: getItemEmoji(name, department),
    completed: false
  };

  active.items.push(item);
  saveState();
}

function categorizeItem(name) {
  const normalized = name.toLowerCase();

  for (const [department, keywords] of Object.entries(KEYWORDS)) {
    if (keywords.some((keyword) => normalized.includes(keyword))) {
      return department;
    }
  }

  return "Other";
}

function getActiveList() {
  const found = state.lists.find((list) => list.id === state.activeListId);
  return found || state.lists[0] || null;
}

function toggleItem(id) {
  const active = getActiveList();
  if (!active) return;

  active.items = active.items.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item));
  saveState();
  render();
}

function deleteItem(id) {
  const active = getActiveList();
  if (!active) return;

  active.items = active.items.filter((item) => item.id !== id);
  saveState();
  render();
}

function moveItemToDepartment(itemId, department) {
  const active = getActiveList();
  if (!active) return;

  active.items = active.items.map((item) => {
    if (item.id !== itemId) return item;

    return {
      ...item,
      department: DEPARTMENTS.includes(department) ? department : "Other",
      emoji: getItemEmoji(item.name, DEPARTMENTS.includes(department) ? department : "Other")
    };
  });

  saveState();
  render();
}

function groupByDepartment(items) {
  const grouped = Object.fromEntries(DEPARTMENTS.map((department) => [department, []]));

  items.forEach((item) => {
    const department = grouped[item.department] ? item.department : "Other";
    grouped[department].push(item);
  });

  DEPARTMENTS.forEach((department) => {
    grouped[department].sort((a, b) => {
      if (a.completed !== b.completed) {
        return Number(a.completed) - Number(b.completed);
      }

      return a.name.localeCompare(b.name, undefined, { sensitivity: "base" });
    });
  });

  return grouped;
}

function renderListOptions(activeList) {
  listSelect.innerHTML = state.lists
    .map((list) => `<option value="${list.id}">${list.name}</option>`)
    .join("");

  if (activeList) {
    listSelect.value = activeList.id;
  }
}

function renderItems(activeList) {
  departmentsContainer.innerHTML = "";

  if (!activeList) {
    departmentsContainer.innerHTML = '<p class="empty">No checklist available. Create one to begin.</p>';
    return;
  }

  const grouped = groupByDepartment(activeList.items);

  DEPARTMENTS.forEach((department) => {
    const departmentItems = grouped[department];
    if (departmentItems.length === 0) return;

    const section = document.createElement("section");
    section.className = "department";

    section.innerHTML = `
      <h3>${department}</h3>
      <ul class="items" data-department="${department}">
        ${departmentItems
          .map(
            (item) => `
          <li class="item-row" draggable="true" data-item-id="${item.id}">
            <input id="item-${item.id}" type="checkbox" ${item.completed ? "checked" : ""} data-id="${item.id}" />
            <label for="item-${item.id}" class="${item.completed ? "done" : ""}">${item.emoji} ${item.name}</label>
            <button class="item-delete" type="button" data-id="${item.id}" aria-label="Delete ${item.name}">✕</button>
          </li>`
          )
          .join("")}
      </ul>
    `;

    departmentsContainer.append(section);
  });

  if (!departmentsContainer.childElementCount) {
    departmentsContainer.innerHTML = '<p class="empty">No items yet. Add items above to start your list.</p>';
  }

  departmentsContainer.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
    checkbox.addEventListener("change", () => toggleItem(checkbox.dataset.id));
  });

  departmentsContainer.querySelectorAll('.item-delete').forEach((button) => {
    button.addEventListener("click", () => deleteItem(button.dataset.id));
  });

  departmentsContainer.querySelectorAll('.item-row').forEach((row) => {
    row.addEventListener("dragstart", (event) => {
      event.dataTransfer?.setData("text/plain", row.dataset.itemId || "");
      event.dataTransfer?.setData("application/x-item-id", row.dataset.itemId || "");
      row.classList.add("dragging");
    });

    row.addEventListener("dragend", () => {
      row.classList.remove("dragging");
    });
  });

  departmentsContainer.querySelectorAll('.items').forEach((list) => {
    list.addEventListener("dragover", (event) => {
      event.preventDefault();
      list.classList.add("drag-over");
    });

    list.addEventListener("dragleave", () => {
      list.classList.remove("drag-over");
    });

    list.addEventListener("drop", (event) => {
      event.preventDefault();
      list.classList.remove("drag-over");
      const itemId = event.dataTransfer?.getData("application/x-item-id") || event.dataTransfer?.getData("text/plain");
      const department = list.dataset.department;

      if (!itemId || !department) return;
      moveItemToDepartment(itemId, department);
    });
  });
}

function render() {
  const activeList = getActiveList();
  if (activeList && state.activeListId !== activeList.id) {
    state.activeListId = activeList.id;
    saveState();
  }

  renderListOptions(activeList);
  renderItems(activeList);
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function loadState() {
  const fallback = {
    lists: [createList("Costco Trip 1")],
    activeListId: null
  };

  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if (!raw || !Array.isArray(raw.lists) || raw.lists.length === 0) {
      fallback.activeListId = fallback.lists[0].id;
      return fallback;
    }

    const normalizedLists = raw.lists.map((list) => ({
      id: list.id || crypto.randomUUID(),
      name: String(list.name || "Costco Trip"),
      items: Array.isArray(list.items)
        ? list.items.map((item) => {
            const department = DEPARTMENTS.includes(item.department) ? item.department : "Other";
            const name = String(item.name || "Unnamed Item");
            return {
              id: item.id || crypto.randomUUID(),
              name,
              department,
              emoji: item.emoji || getItemEmoji(name, department),
              completed: Boolean(item.completed)
            };
          })
        : []
    }));

    return {
      lists: normalizedLists,
      activeListId: raw.activeListId || normalizedLists[0].id
    };
  } catch {
    fallback.activeListId = fallback.lists[0].id;
    return fallback;
  }
}

if (!state.activeListId && state.lists.length) {
  state.activeListId = state.lists[0].id;
}

render();
