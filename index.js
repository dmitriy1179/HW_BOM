const file = document.getElementById("file");
const el = document.getElementById("el")
const list = document.createElement("ul")

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function fakeUploadFile (file, ms) {
    return new Promise(resolve => {
        setTimeout(function() {
            resolve(file);
        }, ms)
    })
}
/*
file.addEventListener("change", async event => {
    const files = event.target.files;
    for (let file of files) {
        const item = document.createElement("li");
        item.innerText = "Loading";
        const ms = randomInteger(600, 1200);
        list.appendChild(item);
        const uploadedFile = await fakeUploadFile(file, ms);
        item.innerText = `${uploadedFile.name}, ${uploadedFile.size} kbytes`;
    }
    elem.appendChild(list);
});

el.appendChild(list);

//Дополнительно 2 (Promise.all)
//Показать на экране то количество лоадеров сколько файлов было выбрано
//Убрать лоадеры после того как все файлы будут загружены

file.addEventListener("change", async event => {
    const files = event.target.files;
    const promiseArr = []
    list.innerHTML = "";
    for (let file of files) {
        const item = document.createElement("li");
        item.innerText = "Loading";
        const ms = randomInteger(600, 1200);
        list.appendChild(item);
        const uploadedFile = fakeUploadFile(file, ms);
        promiseArr.push(uploadedFile);
    }
    const resPromiseArr = await Promise.all(promiseArr);
    const nodeListLi = list.querySelectorAll("li")
    for (let i = 0; i < resPromiseArr.length; i++) {
        nodeListLi.item(i).innerText = `${resPromiseArr[i].name}, ${resPromiseArr[i].size} kbytes`;
    }
});

el.appendChild(list);


//Дополнительно 3
//Показать на экране то количество лоадеров сколько файлов было выбрано
//Сделать загрузку файлов последовательно (как в 1м варианте) заменяя индикатор загрузки на имя файла

file.addEventListener("change", async event => {
    const files = event.target.files;
    const ms = randomInteger(600, 1200);
    const promiseArr = [];
    list.innerHTML = "";
    for (let file of files) {
        const item = document.createElement("li");
        item.innerText = "Loading";
        list.appendChild(item);
        const uploadedFile = fakeUploadFile(file, ms);
        promiseArr.push(uploadedFile);
    }
    const resPromiseArr = await Promise.all(promiseArr);
    const nodeListLi = list.querySelectorAll("li")
    for (let i=0; i < resPromiseArr.length; i++) {
        const uploadedFile = await fakeUploadFile(resPromiseArr[i], ms);
        nodeListLi.item(i).innerText = `${uploadedFile.name}, ${uploadedFile.size} kbytes`;
    }
});

el.appendChild(list);
*/
file.addEventListener("change", async event => {
    const files = event.target.files;
    list.innerHTML = "";
    for (let i=0; i < files.length; i++) {
        const item = document.createElement("li");
        item.innerText = "Loading";
        list.appendChild(item);
    }
    const nodeListLi = list.querySelectorAll("li")
    for (let i=0; i < files.length; i++) {
        const ms = randomInteger(600, 1200);
        const uploadedFile = await fakeUploadFile(files[i], ms);
        nodeListLi.item(i).innerText = `${uploadedFile.name}, ${uploadedFile.size} kbytes`;
    }
});

el.appendChild(list);

//Задание 2 Promise.race 
function clicksTimer (ms) {
    return new Promise(resolve => {
        setTimeout(() => resolve({
            res: "Defeat",
            bgc: "red"
        }), ms)
    })
}

function clicksCounter (button, clickCount) {
    return new Promise(resolve => {
        var count = 0;
        if (count >= clickCount) {
            resolve({
                res: "Victory",
                bgc: "green"
            })          
        }
        else {
            button.onclick = () => {
                count++;
                if (count >= clickCount) {
                    resolve({
                        res: "Victory",
                        bgc: "green"
                    })
                }
            }
        }
    }) 
}

function raceButton(clickCount, waitMs) {
    const container = document.createElement("div");
    const button = document.createElement("button");
    const result = document.createElement("span");
    button.style.width = "200px";
    button.style.height = "50px";
    button.style.margin = "5px";
    button.innerText = `Click me ${clickCount} times`;
    var count = 0;
    var t1 = 0;
    button.addEventListener("click", async function () {
        count++;
        var t = performance.now();
        var t2 = t - t1;
        var t3 = waitMs - (t2 === t ? 0 : t2);
        button.innerText = `${clickCount - count} clicks to win, time left ${t3} ms`;
        if (count === 1) {
            t1 = performance.now();
            const race = await Promise.race([clicksTimer(waitMs), clicksCounter(button, clickCount-1)]);
            result.innerText = race.res;
            button.style.backgroundColor = race.bgc;
            button.disabled = true;
        }
    })
    container.appendChild(button);
    container.appendChild(result);
    el.appendChild(container);
}
  
raceButton(10, 5000);
raceButton(1, 3000);
raceButton(5, 2000);
raceButton(20, 7000);

