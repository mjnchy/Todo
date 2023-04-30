function createElem (elem, id, classes, times = 1) {
    if (times === 1) {
        const element = document.createElement(elem);
        element.id = id;
        element.classList.add(...classes);

        return element;
    }

    else {
        let elementArray = [];
        for (let i = 0; i < times; i++) {
            const element = document.createElement(elem);
            element.id = id;
            element.classList.add(...classes);
            elementArray.push(element);
        };

        return elementArray;
    };
};

export {
    createElem
}