// FooStore
// import { observable, action } from "mobx";
// import ExampleClass from "app/services/exampleClass";

// export class FooStore {
//     @observable
//     public foo: string = "";

//     @action
//     public doSomething() {
//         this.foo = ExampleClass.doSomething()
//     }
// }

// export default FooStore;

// BarStore
// import { observable, action } from "mobx";

// export class BarStore {
//     @observable
//     public bar: number = 0;

//     @action
//     public setBar(value: number) {
//         this.bar
//     }
// }

// export default BarStore;

//Your store:
import { FooStore } from "./FooStore";
import { BarStore } from "./BarStore";

class Store {
  // public fooStore: FooStore;
  // public barStore: BarStore;
  constructor() {
    this.fooStore = new FooStore();
    this.barStore = new BarStore();
  }
}

const stores = new Store();

export default stores;

//App.js ...
// import store from './yourStore';
// import { createContext } from "react";

// const GlobalStore = createContext(store);

// export default () => {
//     <GlobalStore.Provider>
//        <Main />
//     </GlobalStore.Provider>
// }

//

//Any other js file

// import store from './yourStore';

// export default class ExampleClass {
//     public static doSomething(): string {
//         // ...

//         store.BarStore.setBar(1000)

//         return "Some string"
//     }
// }
