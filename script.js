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
  { keywords: ["banana", "bananas"], emoji: "🍌" },
  { keywords: ["apple", "apples"], emoji: "🍎" },
  { keywords: ["orange", "oranges"], emoji: "🍊" },
  { keywords: ["grape", "grapes"], emoji: "🍇" },
  { keywords: ["strawberry", "strawberries", "berry", "berries"], emoji: "🍓" },
  { keywords: ["avocado", "avocados"], emoji: "🥑" },
  { keywords: ["broccoli"], emoji: "🥦" },
  { keywords: ["carrot", "carrots"], emoji: "🥕" },
  { keywords: ["bread", "bagel", "bagels", "croissant"], emoji: "🥖" },
  { keywords: ["cake", "muffin"], emoji: "🧁" },
  { keywords: ["chicken"], emoji: "🍗" },
  { keywords: ["beef", "steak"], emoji: "🥩" },
  { keywords: ["fish", "salmon", "shrimp"], emoji: "🐟" },
  { keywords: ["milk"], emoji: "🥛" },
  { keywords: ["cheese"], emoji: "🧀" },
  { keywords: ["egg", "eggs"], emoji: "🥚" },
  { keywords: ["rice"], emoji: "🍚" },
  { keywords: ["pasta"], emoji: "🍝" },
  { keywords: ["coffee"], emoji: "☕" },
  { keywords: ["tea"], emoji: "🫖" },
  { keywords: ["water"], emoji: "💧" },
  { keywords: ["juice"], emoji: "🧃" },
  { keywords: ["soda"], emoji: "🥤" },
  { keywords: ["chips", "chip"], emoji: "🥔" },
  { keywords: ["popcorn"], emoji: "🍿" },
  { keywords: ["ice cream"], emoji: "🍨" },
  { keywords: ["pizza"], emoji: "🍕" },
  { keywords: ["paper towel", "toilet paper"], emoji: "🧻" },
  { keywords: ["detergent", "cleaner", "soap"], emoji: "🧼" },
  { keywords: ["toothpaste"], emoji: "🪥" },
  { keywords: ["shampoo"], emoji: "🧴" },
  { keywords: ["vitamin"], emoji: "💊" }
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
const listNameInput = document.querySelector("#list-name");
const renameListButton = document.querySelector("#rename-list");
const bulkInput = document.querySelector("#bulk-input");
const parseButton = document.querySelector("#parse-button");
const clearButton = document.querySelector("#clear-active");
const singleItemInput = document.querySelector("#single-item");
const addItemButton = document.querySelector("#add-item");
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

renameListButton.addEventListener("click", () => {
  const active = getActiveList();
  const nextName = listNameInput.value.trim();
  if (!active || !nextName) return;

  active.name = nextName;
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

addItemButton.addEventListener("click", () => {
  const name = singleItemInput.value.trim();
  if (!name) return;

  addItem(name);
  singleItemInput.value = "";
  render();
});

singleItemInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    addItemButton.click();
  }
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
    listNameInput.value = activeList.name;
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
      <ul class="items">
        ${departmentItems
          .map(
            (item) => `
          <li>
            <input id="item-${item.id}" type="checkbox" ${item.completed ? "checked" : ""} data-id="${item.id}" />
            <label for="item-${item.id}" class="${item.completed ? "done" : ""}">${item.emoji} ${item.name}</label>
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
