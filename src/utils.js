/**
 * Плюрализация
 * Возвращает вариант с учётом правил множественного числа под указанную локаль
 * @param value {Number} Число, под которое выбирается вариант формы.
 * @param variants {Object<String>} Варианты форм множественного числа.
 * @example plural(5, {one: 'товар', few: 'товара', many: 'товаров'})
 * @param [locale] {String} Локаль (код языка)
 * @returns {String}
 */
export function createElement(name, props = {}, ...children) {
  const element = document.createElement(name);

  // Назначение свойств и атрибутов
  for (const name of Object.keys(props)) {
    if (propNames.has(name)) {
      element[name] = props[name];
    } else {
      element.setAttribute(name, props[name]);
    }
  }

  // Вставка вложенных элементов
  for (const child of children) {
    element.append(child);
  }

  return element;
}

export const addString = (num, str) => {
  return num.toString().slice(-1) > 1
    && num.toString().slice(-1) < 5
    && (num.toString().slice(-2) > 20
      || num.toString().slice(-2) < 10)
    ? str
    : ''
}
export const addString = (num, str) => {
  return num.toString().slice(-1) > 1
    && num.toString().slice(-1) < 5
    && (num.toString().slice(-2) > 20
      || num.toString().slice(-2) < 10)
    ? str
    : ''
}