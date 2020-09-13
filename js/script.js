const filterByType = (type, ...values) => values.filter(value => typeof value === type), //создаем переменную filterByType с параметрами type, ...values, применив на value спред-оператор и присваиваем ей результат работы функции. Она создает новый массив с элементами, тип которых равен значению type

    hideAllResponseBlocks = () => { //создаем переменную hideAllResponseBlocks и присваиваем ей результат работы функции. 
        const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block')); //создаем переменную и присваиваем ей новый массив, созданный из коллекции элементов dialog__response-block
        responseBlocksArray.forEach(block => block.style.display = 'none'); //перебираем массив и устанавливаем каждому элементу стиль display = 'none'
    },

    showResponseBlock = (blockSelector, msgText, spanSelector) => { //создаем переменную showResponseBlock с параметрами blockSelector, msgText, spanSelector
        hideAllResponseBlocks(); //вызываем функцию hideAllResponseBlocks
        document.querySelector(blockSelector).style.display = 'block'; //получаем элемент по селектору и устанавливаем ему стиль display = 'block'
        if (spanSelector) { //ставим условие, что если параметр spanSelector true
            document.querySelector(spanSelector).textContent = msgText; //то селектору spanSelector устанавливается текстовое содержимое равное параметру msgText
        }
    },

    showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'), //создаем переменную showError с параметром msgText. В ней вызываем функцию showResponseBlock с аргументами '.dialog__response-block_error', msgText, '#error'

    showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'), //создаем переменную showResults с параметром msgText. В ней вызываем функцию showResponseBlock с аргументами '.dialog__response-block_ok', msgText, '#ok'

    showNoResults = () => showResponseBlock('.dialog__response-block_no-results'), //создаем переменную showNoResults. В ней вызываем функцию showResponseBlock с аргументами '.dialog__response-block_no-results'

    tryFilterByType = (type, values) => { //создаем переменную tryFilterByType с параметрами type, values. 
        try { //С помощью конструкции try пытаемся 
            const valuesArray = eval(`filterByType('${type}', ${values})`).join(", "); //создать переменную valuesArray, которая выполняет JavaScript код, представленный строкой. А именно вызывает функцию filterByType с аргументами type и values и с помощью метода join объединяет элементы в строку
            const alertMsg = (valuesArray.length) ? //создать переменную alertMsg и присвоить ей значение, в случае если длина valuesArray больше ноля, то
                `Данные с типом ${type}: ${valuesArray}` : //`Данные с типом ${type}: ${valuesArray}`
                `Отсутствуют данные типа ${type}`; //иначе значение - `Отсутствуют данные типа ${type}`
            showResults(alertMsg); //вызываем функцию showResults c аргументом alertMsg
        } catch (e) { //в случае, если вышеописанный код вызовет ошибку, 
            showError(`Ошибка: ${e}`); //вызываем функцию showError с аоргументом `Ошибка: ${e}`, которая в блоке покажет статус ошибки
        }
    };

const filterButton = document.querySelector('#filter-btn'); //создаем переменную filterButton и присваиваем ей селектор '#filter-btn'

filterButton.addEventListener('click', e => { //вешаем обработчик события клик на переменную filterButton
    const typeInput = document.querySelector('#type'); //создаем переменную typeInput и присваиваем ей селектор '#type'
    const dataInput = document.querySelector('#data'); //создаем переменную dataInput и присваиваем ей селектор '#data'

    if (dataInput.value === '') { //создаем условие, в котором если значение переменной dataInput равно пустому месту 
        dataInput.setCustomValidity('Поле не должно быть пустым!'); //то вызываем на этом инпуте функцию setCustomValidity, которая показывает message - 'Поле не должно быть пустым!'
        showNoResults(); //вызываем функцию showNoResults
    } else { //иначе
        dataInput.setCustomValidity(''); //вызываем на этом инпуте функцию setCustomValidity с пустым значением, которая в случае отсутствия пользовательской ошибки скроет сообщение
        e.preventDefault(); //отменяем действие браузера по умолчанию
        tryFilterByType(typeInput.value.trim(), dataInput.value.trim()); //вызываем функцию tryFilterByType с аргументами равными значению инпута typeInput с обрезанными пробелами и значению инпута dataInput с обрезанными пробелами.
    }
});