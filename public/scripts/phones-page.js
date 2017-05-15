'use strict';

class PhonesPage {
  constructor(options) {
    this._el = options.el;

    this._cart = new ShoppingCart({
      el: this._el.querySelector('[data-component="shopping-cart"]'),
      template: document.querySelector('#shopping-cart-template').innerHTML
    });

    this._catalogue = new PhoneCatalogue({
      el: this._el.querySelector('[data-component="phone-catalogue"]')
    });

    this._viewer = new PhoneViewer({
      el: this._el.querySelector('[data-component="phone-viewer"]'),
    });

    this._catalogue.on('phoneSelected', (event) => {
      let phoneId = event.detail;
      let phoneDetails = this.getPhoneDetails(phoneId);

      this._catalogue.hide();
      this._viewer.showPhone(phoneDetails);
    });

    this._viewer.on('back', (event) => {
      this._viewer.hide();
      this._catalogue.show();
    });

    this._viewer.on('add', (event) => {
      this._cart.addItem(event.detail)
    });
  }

  getPhoneDetails(phoneId) {
    let xhr = new XMLHttpRequest();

    xhr.open('GET', `/data/phones/${phoneId}.json`, false);

    // xhr.onload = () => {
    //   if (xhr.status != 200) {
    //     alert( xhr.status + ': ' + xhr.statusText ); // пример вывода: 404: Not Found
    //   } else {
    //     console.log( JSON.parse(xhr.responseText) ); // responseText -- текст ответа.
    //   }
    // };


    xhr.send();

    if (xhr.status != 200) {
      alert( xhr.status + ': ' + xhr.statusText ); // пример вывода: 404: Not Found
    } else {
      console.log( JSON.parse(xhr.responseText) ); // responseText -- текст ответа.

      return JSON.parse(xhr.responseText);
    }
  }
}