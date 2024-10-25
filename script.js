console.log("connected..")
const form = document.querySelector("#itemform"), itemInput = document.querySelector("#itemInput");
itemList = document.querySelector(".item-list"),
    feedback = document.querySelector(".feedback"),
    addBtn = document.querySelector("#add-item"),
    clearBtn = document.querySelector("#clear-btn");
console.log(form, itemInput);
let todoItems = [];
// TO-DO: Get List
const getList = function (todoItems) {
    itemList.innerHTML = "";
    todoItems.forEach((item, index) => {
        itemList.insertAdjacentHTML("beforeend",
            `
            <div class="item">
                    <div class="item-info">
                        <h5 class="item-index">${index}</h5>
                        <p class="item-name">${item}</p>
                    </div>
                    <div class="icons">
                        <i class="far fa-check-circle complete-item"></i>
                        <i class="far fa-edit edit-item"></i>
                        <i class="far fa-times-circle delete-item"></i>
                    </div>
                </div>   
            `
        );
        handleItem(item);
    });
}
// TO-DO: Handle item
const handleItem = function (itemName) {
    const item = itemList.querySelectorAll(".item");
    item.forEach((item) => {
        if (item.querySelector(".item-name").textContent.trim().toLowerCase() === itemName.trim().toLowerCase()) {
            // TO-DO Completed event
            item.querySelector(".complete-item").addEventListener("click", function () {
                let itemIndex = item.querySelector(".item-index");
                let itemName = item.querySelector(".item-name");
                itemIndex.classList.toggle("completed");
                itemName.classList.toggle("completed");
            })
            // TO-DO Edit event
            item.querySelector(".edit-item").onclick = () => {
                addBtn.innerHTML = "Edit item";
                itemInput.value = itemName;
                itemList.removeChild(item);
                todoItems = todoItems.filter((item) => {
                    return item !== itemName

                });
                setLocalStorage(todoItems);
            };
            // TO-DO Delete event
            item.querySelector(".delete-item").onclick = () => {
                if (confirm("Are you sure you want to delete this task?")) {
                    itemList.removeChild(item);
                    todoItems = todoItems.filter((item) => item !== itemName);
                    setLocalStorage(todoItems);
                    sendFeedback("Task deleted", "red")
                };
            }
        }
    })
}
// TO-DO: Add task to list
form.addEventListener("submit", function (e) {
    e.preventDefault();
    const itemName = itemInput.value;
    if (itemName.length === 0) {
        sendFeedback("Please enter valid value", "red")
    }
    else {
        todoItems.push(itemName);
        addBtn.innerHTML = "Add";
        setLocalStorage(todoItems);
        getList(todoItems);
        sendFeedback("Item added to the list", "green")
    }
    itemInput.value = "";
})
// TO-DO: Save and Load in local storage
const setLocalStorage = function (todoItems) {
    localStorage.setItem("todoItems", JSON.stringify(todoItems));
};
const getLocalStorage = function () {
    const todoStorage = localStorage.getItem("todoItems");
    if (todoStorage === "undefined" || todoStorage === null) {
        todoItems = [];
    }
    else {
        todoItems = JSON.parse(todoStorage);
        getList(todoItems);
    }
};
getLocalStorage();


// // TO-DO: Send feedback
function sendFeedback(text, className) {
    feedback.classList.add(`${className}`);
    feedback.innerHTML = text;
}
// TO-DO: Clear all items
clearBtn.onclick = () => {
    confirm("Are you sure to clear all tasks?") && ((todoItems = []),localStorage.clear(), getList(todoItems));
};