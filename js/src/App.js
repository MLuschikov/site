class App extends Component {
    constructor(props) {
        super(props);
        this.component1 = new component1({ id: 'comp1', parent: this.id, template: template.component1 });

        this.Menu = new Menu({ id: 'menu', parent: this.id, template: templateMenu, callbacks: { showMenuItem: (name) => this.showMenuItem(name) } });

        this.component1.hide();
    }

    showMenuItem(name){
        this.component1.hide();
        this.component2.hide();
        this.[name].show();
    }
}