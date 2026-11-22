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
    if (pageKey === "certificates" && itemsList) {
        let certificatesData = [
            {
                holder: "Максим",
                title: "Основи кібербезпеки та захисту інформації",
                grade: "Оцінка: 96/100 (Відмінно)",
                date: "Отримано: 16.11.2026",
                code: "ID: #ST-2026-849"
            },
            {
                holder: "Максим",
                title: "«Тестування програмного забезпечення (QA)»",
                grade: "Оцінка: 78/100 (Добре)",
                date: "Отримано: 16.11.2026",
                code: "ID: #ST-2026-760"
            }
        ];

        function renderCertificates(list) {
            itemsList.innerHTML = "";

            if (list.length === 0) {
                itemsList.innerHTML = `<p class="cert-meta">Сертифікатів за запитом не знайдено.</p>`;
                return;
            }

            list.forEach((cert) => {
                const card = document.createElement("div");
                card.className = "cert-card";
                card.innerHTML = `
                    <div class="cert-preview">
                        <span class="cert-preview-top">СЕРТИФІКАТ</span>
                        <span class="cert-preview-brand">SkillTest</span>
                        <span class="cert-preview-holder">${cert.holder}</span>
                    </div>
                    <div class="cert-info">
                        <div class="cert-title">${cert.title}</div>
                        <div class="cert-meta">${cert.grade}</div>
                        <div class="cert-meta">&bull; ${cert.date}</div>
                        <div class="cert-id">${cert.code}</div>
                    </div>
                    <div class="cert-actions">
                        <button type="button" class="cert-btn" data-action="PDF для «${cert.title}» (${cert.code})">Завантажити PDF</button>
                        <button type="button" class="cert-btn" data-action="Посилання на ${cert.code} скопійовано">Поділитись</button>
                    </div>
                `;
                itemsList.appendChild(card);
            });

            itemsList.querySelectorAll(".cert-btn").forEach((btn) => {
                btn.addEventListener("click", () => {
                    if (formFeedback) {
                        formFeedback.textContent = btn.dataset.action;
                        formFeedback.className = "js-message msg-success";
                    }
                });
            });
        }

        if (filterInput) {
            filterInput.addEventListener("input", () => {
                const q = filterInput.value.trim().toLowerCase();
                const filtered = certificatesData.filter(
                    (c) =>
                        c.title.toLowerCase().includes(q) ||
                        c.holder.toLowerCase().includes(q) ||
                        c.code.toLowerCase().includes(q)
                );
                renderCertificates(filtered);
            });
        }

        if (toggleListBtn) {
            let visible = true;
            toggleListBtn.addEventListener("click", () => {
                visible = !visible;
                itemsList.style.display = visible ? "flex" : "none";
                toggleListBtn.textContent = visible ? "Сховати список" : "Показати список";
            });
        }

        if (addItemForm && newItemInput && formFeedback) {
            addItemForm.addEventListener("submit", (event) => {
                event.preventDefault();
                const val = newItemInput.value.trim();

                if (!val) {
                    formFeedback.textContent = "Помилка: введіть назву сертифіката.";
                    formFeedback.className = "js-message msg-error";
                    newItemInput.focus();
                    return;
                }

                if (val.length < 3) {
                    formFeedback.textContent = "Помилка: назва має містити щонайменше 3 символи.";
                    formFeedback.className = "js-message msg-error";
                    newItemInput.focus();
                    return;
                }

                const randomId = Math.floor(100 + Math.random() * 900);
                certificatesData.push({
                    holder: "Максим",
                    title: val,
                    grade: "Оцінка: 90/100 (Відмінно)",
                    date: "Отримано: 23.11.2026",
                    code: `ID: #ST-2026-${randomId}`
                });

                if (filterInput) filterInput.value = "";
                renderCertificates(certificatesData);
                newItemInput.value = "";
                formFeedback.textContent = "Сертифікат успішно додано.";
                formFeedback.className = "js-message msg-success";
            });
        }

        renderCertificates(certificatesData);
        return;
    }
    const teacherRegForm = document.getElementById("teacherRegForm");
    const teacherFullName = document.getElementById("teacherFullName");
    const teacherAccessCode = document.getElementById("teacherAccessCode");
    const teacherPhone = document.getElementById("teacherPhone");
    const teacherFormFeedback = document.getElementById("teacherFormFeedback");

    if (pageKey === "teachers" && teacherRegForm && teacherFullName && teacherAccessCode && teacherPhone && teacherFormFeedback) {
        teacherRegForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const fullName = teacherFullName.value.trim();
            const accessCode = teacherAccessCode.value.trim();
            const phone = teacherPhone.value.trim();

            if (fullName.length < 3) {
                teacherFormFeedback.textContent = "Помилка: введіть повне ім'я викладача (мінімум 3 символи).";
                teacherFormFeedback.className = "js-message student-feedback msg-error";
                teacherFullName.focus();
                return;
            }

            if (accessCode.length < 3) {
                teacherFormFeedback.textContent = "Помилка: введіть код доступу (мінімум 3 символи).";
                teacherFormFeedback.className = "js-message student-feedback msg-error";
                teacherAccessCode.focus();
                return;
            }

            const digitsOnly = phone.replace(/\D/g, "");
            if (digitsOnly.length < 9) {
                teacherFormFeedback.textContent = "Помилка: введіть коректний номер телефону (+380...).";
                teacherFormFeedback.className = "js-message student-feedback msg-error";
                teacherPhone.focus();
                return;
            }

            items.push(`Викладач: ${fullName} (код доступу: ${accessCode}, тел.: ${phone})`);
            if (filterInput) filterInput.value = "";
            renderItems(items);

            teacherFullName.value = "";
            teacherAccessCode.value = "";
            teacherPhone.value = "";

            teacherFormFeedback.textContent = "Викладача успішно створено та додано до списку.";
            teacherFormFeedback.className = "js-message student-feedback msg-success";
        });
    }
    const studentRegForm = document.getElementById("studentRegForm");
    const studentFullName = document.getElementById("studentFullName");
    const studentCode = document.getElementById("studentCode");
    const studentPhone = document.getElementById("studentPhone");
    const studentFormFeedback = document.getElementById("studentFormFeedback");

    if (pageKey === "students" && studentRegForm && studentFullName && studentCode && studentPhone && studentFormFeedback) {
        studentRegForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const fullName = studentFullName.value.trim();
            const code = studentCode.value.trim();
            const phone = studentPhone.value.trim();

            if (fullName.length < 3) {
                studentFormFeedback.textContent = "Помилка: введіть повне ім'я (мінімум 3 символи).";
                studentFormFeedback.className = "js-message student-feedback msg-error";
                studentFullName.focus();
                return;
            }

            if (code.length < 2) {
                studentFormFeedback.textContent = "Помилка: введіть коректний код студента.";
                studentFormFeedback.className = "js-message student-feedback msg-error";
                studentCode.focus();
                return;
            }

            const digitsOnly = phone.replace(/\D/g, "");
            if (digitsOnly.length < 9) {
                studentFormFeedback.textContent = "Помилка: введіть коректний номер телефону (+380...).";
                studentFormFeedback.className = "js-message student-feedback msg-error";
                studentPhone.focus();
                return;
            }

            items.push(`${fullName} (код: ${code}, тел.: ${phone})`);
            if (filterInput) filterInput.value = "";
            renderItems(items);

            studentFullName.value = "";
            studentCode.value = "";
            studentPhone.value = "";

            studentFormFeedback.textContent = "Студента успішно зареєстровано та додано до списку.";
            studentFormFeedback.className = "js-message student-feedback msg-success";
        });
    }

    let items = [...(initialDataByPage[pageKey] || initialDataByPage.dashboard)];
    const coursesTableBody = document.getElementById("coursesTableBody");
    const focusAddBtn = document.getElementById("focusAddBtn");

    if (focusAddBtn && newItemInput) {
        focusAddBtn.addEventListener("click", () => {
            newItemInput.focus();
            newItemInput.scrollIntoView({ behavior: "smooth", block: "center" });
        });
    }

    if (pageKey === "courses" && coursesTableBody) {
        let courseRows = [
            { title: "Java / Spring", author: "Максим", volume: 30, tasks: "Show", completed: "Show" },
            { title: "Java / Spring", author: "Максим", volume: 30, tasks: "Show", completed: "Show" },
            { title: "Java / Spring", author: "Максим", volume: 30, tasks: "Show", completed: "Show" },
            { title: "Java / Spring", author: "Максим", volume: 30, tasks: "Show", completed: "Show" }
        ];

        function renderCourseRows(rows) {
            coursesTableBody.innerHTML = "";

            if (rows.length === 0) {
                const tr = document.createElement("tr");
                tr.innerHTML = `<td colspan="5">Курсів за запитом не знайдено.</td>`;
                coursesTableBody.appendChild(tr);
                return;
            }

            rows.forEach((row) => {
                const tr = document.createElement("tr");
                tr.innerHTML = `
                    <td><span class="course-link">${row.title}</span></td>
                    <td>${row.author}</td>
                    <td>${row.volume}</td>
                    <td><button type="button" class="action-link" data-info="Завдання курсу: ${row.title}">${row.tasks}</button></td>
                    <td><button type="button" class="action-link" data-info="Виконали курс: ${row.title}">${row.completed}</button></td>
                `;
                coursesTableBody.appendChild(tr);
            });

            coursesTableBody.querySelectorAll(".action-link").forEach((btn) => {
                btn.addEventListener("click", () => {
                    if (formFeedback) {
                        formFeedback.textContent = btn.dataset.info;
                        formFeedback.className = "js-message msg-success";
                    }
                });
            });
        }

        if (filterInput) {
            filterInput.addEventListener("input", () => {
                const q = filterInput.value.trim().toLowerCase();
                const filtered = courseRows.filter(
                    (r) => r.title.toLowerCase().includes(q) || r.author.toLowerCase().includes(q)
                );
                renderCourseRows(filtered);
            });
        }

        if (toggleListBtn && itemsList) {
            let visible = true;
            toggleListBtn.addEventListener("click", () => {
                visible = !visible;
                itemsList.style.display = visible ? "block" : "none";
                toggleListBtn.textContent = visible ? "Сховати список" : "Показати список";
            });
        }

        if (addItemForm && newItemInput && formFeedback) {
            addItemForm.addEventListener("submit", (e) => {
                e.preventDefault();
                const val = newItemInput.value.trim();
                if (!val) {
                    formFeedback.textContent = "Помилка: поле не може бути порожнім.";
                    formFeedback.className = "js-message msg-error";
                    newItemInput.focus();
                    return;
                }
                if (val.length < 3) {
                    formFeedback.textContent = "Помилка: введіть щонайменше 3 символи.";
                    formFeedback.className = "js-message msg-error";
                    newItemInput.focus();
                    return;
                }

                courseRows.push({
                    title: val,
                    author: "Максим",
                    volume: 24,
                    tasks: "Show",
                    completed: "Show"
                });
                if (filterInput) filterInput.value = "";
                renderCourseRows(courseRows);
                newItemInput.value = "";
                formFeedback.textContent = "Курс успішно додано до таблиці.";
                formFeedback.className = "js-message msg-success";
            });
        }

        renderCourseRows(courseRows);
        return;
    }
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