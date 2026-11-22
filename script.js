document.addEventListener("DOMContentLoaded", () => {
    const pageKey = document.body.dataset.page || "dashboard";
    const navItems = document.querySelectorAll(".nav-item");
    const filterInput = document.getElementById("filterInput");
    const toggleListBtn = document.getElementById("toggleListBtn");
    const itemsList = document.getElementById("itemsList");
    const addItemForm = document.getElementById("addItemForm");
    const newItemInput = document.getElementById("newItemInput");
    const formFeedback = document.getElementById("formFeedback");

    const initialDataByPage = {
        dashboard: [
            "Курси: 58 активних навчальних програм",
            "Студенти: 200 зареєстрованих учасників",
            "Викладачі: 25 перевіряючих менторів",
            "Завдання: 680 тестових запитань у базі"
        ],
        courses: [
            "Основи кібербезпеки — 18 тем, 4 тести",
            "Python та алгоритми — 22 теми, 6 тестів",
            "Вебверстка HTML5/CSS3/JS — 16 тем, 5 тестів",
            "Комп'ютерні мережі — 14 тем, 3 тести"
        ],
        students: [
            "Максим — середній бал: 19.5",
            "Олена — середній бал: 18.8",
            "Артем — середній бал: 19.0",
            "Софія — середній бал: 17.9"
        ],
        teachers: [
            "Перевірено робіт за тиждень: 48",
            "Очікують оцінювання: 9",
            "Активних груп у роботі: 6"
        ],
        certificates: [
            "Сертифікат #ST-101 — Основи кібербезпеки",
            "Сертифікат #ST-102 — Вебверстка та інтерфейси",
            "Сертифікат #ST-103 — Аналіз мережевого трафіку"
        ]
    };

    let items = [...(initialDataByPage[pageKey] || initialDataByPage.dashboard)];
    let isListVisible = true;

    navItems.forEach((link) => {
        link.addEventListener("click", () => {
            navItems.forEach((item) => item.classList.remove("active"));
            link.classList.add("active");
        });
    });

    function renderItems(listToShow) {
        if (!itemsList) return;
        itemsList.innerHTML = "";

        if (listToShow.length === 0) {
            const li = document.createElement("li");
            li.textContent = "Записів за запитом не знайдено.";
            itemsList.appendChild(li);
            return;
        }

        listToShow.forEach((text) => {
            const li = document.createElement("li");
            li.textContent = text;
            itemsList.appendChild(li);
        });
    }

    if (filterInput) {
        filterInput.addEventListener("input", () => {
            const query = filterInput.value.trim().toLowerCase();
            const filtered = items.filter((item) => item.toLowerCase().includes(query));
            renderItems(filtered);
        });
    }

    if (toggleListBtn && itemsList) {
        toggleListBtn.addEventListener("click", () => {
            isListVisible = !isListVisible;
            itemsList.style.display = isListVisible ? "flex" : "none";
            toggleListBtn.textContent = isListVisible ? "Сховати список" : "Показати список";
        });
    }

    if (addItemForm && newItemInput && formFeedback) {
        addItemForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const value = newItemInput.value.trim();

            if (!value) {
                formFeedback.textContent = "Помилка: поле не може бути порожнім.";
                formFeedback.className = "js-message msg-error";
                newItemInput.focus();
                return;
            }

            if (value.length < 3) {
                formFeedback.textContent = "Помилка: введіть щонайменше 3 символи.";
                formFeedback.className = "js-message msg-error";
                newItemInput.focus();
                return;
            }

            items.push(value);
            if (filterInput) filterInput.value = "";
            renderItems(items);
            newItemInput.value = "";
            formFeedback.textContent = "Запис успішно додано.";
            formFeedback.className = "js-message msg-success";
        });
    }

    renderItems(items);
});