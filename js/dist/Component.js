class Component {
    constructor({ id, parent, template = () => '<div>123</div>', templateParent = null, callbacks = {}, className }) {
        this.id = id;
        this.parent = parent;
        this.callbacks = callbacks;
        this.render(template(templateParent), className);
        addEventListeners();
    }

    show() {
        document.getElementById(this.id).classList.remove('hide');
    }

    hide() {
        document.getElementById(this.id).classList.add('hide');
    }

    render(template, className) {
        const elem = document.createElement('div');
        elem.setAttribute('id', this.id);
        if (className) elem.classList.add(className);
        elem.innerHTML = template;
        if (this.parent) {
            document.getElementById(this.parent).appendChild(elem);
        }
        else {
            document.querySelector('body').appendChild(elem);
        }
    }

    addEventListeners(id) { }
}