const arrayJSON = {
    "services": [
        {
            "id": 1,
            "head": null,
            "name": "Проф.осмотр",
            "node": 0,
            "price": 100.0,
            "sorthead": 20
        },
        {
            "id": 2,
            "head": null,
            "name": "Хирургия",
            "node": 1,
            "price": 0.0,
            "sorthead": 10
        },
        {
            "id": 3,
            "head": 2,
            "name": "Удаление зубов",
            "node": 1,
            "price": 0.0,
            "sorthead": 10
        },
        {
            "id": 4,
            "head": 3,
            "name": "Удаление зуба",
            "node": 0,
            "price": 800.0,
            "sorthead": 10
        },
        {
            "id": 5,
            "head": 3,
            "name": "Удаление 8ого зуба",
            "node": 0,
            "price": 1000.0,
            "sorthead": 30
        },
        {
            "id": 6,
            "head": 3,
            "name": "Удаление осколка зуба",
            "node": 0,
            "price": 2000.0,
            "sorthead": 20
        },
        {
            "id": 7,
            "head": 2,
            "name": "Хирургические вмешательство",
            "node": 0,
            "price": 200.0,
            "sorthead": 10
        },
        {
            "id": 8,
            "head": 2,
            "name": "Имплантация зубов",
            "node": 1,
            "price": 0.0,
            "sorthead": 20
        },
        {
            "id": 9,
            "head": 8,
            "name": "Коронка",
            "node": 0,
            "price": 3000.0,
            "sorthead": 10
        },
        {
            "id": 10,
            "head": 8,
            "name": "Слепок челюсти",
            "node": 0,
            "price": 500.0,
            "sorthead": 20
        }
    ]
};

const getInsertedArrayHorseElments = (array) => {
    let returnedArray = [];

    for (key in array.services) {
        if (array.services[key].head == null) {
            returnedArray.push(getJSONObject(array.services[key]));
        }
    }

    return returnedArray;
}

const getJSONObject = (arrayElement) => {
    return {
        id: arrayElement.id,
        item: arrayElement,
        array: [],
    };
}

const getHorseItems = (array) => {
    let returnedArray = [];

    for (key in array.services) {
        if (!returnedArray.includes(array.services[key].head) && array.services[key].head != null) {
            returnedArray.push(array.services[key].head);
        }
    }

    return returnedArray;
}

const horseElementArray = getInsertedArrayHorseElments(JSON);

const getInsertedArray = (array) => {
    const horseItemsArray = getHorseItems(array);
    let proccesedArray = JSON.parse(JSON.stringify(array));
    let horseElements = [];

    for (let i = 0; i < horseItemsArray.length; i++) {
        for (let key in proccesedArray.services) {
            if (proccesedArray.services[key].id == horseItemsArray[i]) {
                horseElements.push(getJSONObject(proccesedArray.services[key]));
            }
        }
    }

    for (let j = 0; j < proccesedArray.services.length; j++) {
        for (let i = 0; i < horseElements.length; i++) {
            if (proccesedArray.services[j].head === horseElements[i].id) {
                horseElements[i].array.push(getJSONObject(proccesedArray.services[j]));
            }
        }
    }

    return horseElements;
}

const horseElementsArray = getInsertedArrayHorseElments(arrayJSON)
const insertedArray = getInsertedArray(arrayJSON);
const mainContentContainer = document.querySelector('.main-content-container');
const consistHTML = horseElementsArray.map((element) => `<li>${element.item.name} ${element.item.price} \n ${insertedArray.map((element)=>  `<li class="space"> ${element.item.name} ${element.item.price} </li>`).join('')}</li>`);

mainContentContainer.innerHTML = consistHTML.join('');