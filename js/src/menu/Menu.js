class Menu extends Component {
    addEventListeners() {
        document.querySelectorAll('.menu-item').forEach(button => button.addEventListener('click', (event) => this.callbacks.showMenuItem(event.target.dataset.item)));
    }
}