class InStoreRepostiory {
    inStore = {};
    tempStore = {};
    inTransaction = false;

    constructor(){};

    begin(){
        this.inTransaction = true;
    };

    commit(){
        this.inStore = {...this.inStore, ...this.tempStore};
        this.inTransaction = false;
        this.tempStore = {};
    };

    rollback(){
        this.inTransaction = false;
        this.tempStore = {};
    };

    get(key){
        if (this.inTransaction){
            return this.tempStore[key];
        }
        else if (key in this.inStore){
            return this.inStore[key];
        }
        return null;
    };

    set(key, value){
        if (this.inTransaction){
            return this.tempStore[key] = value;
        }
        else {
            this.inStore[key] = value;
        }
    };

    unset(key){
        if (this.inTransaction){
            delete this.tempStore[key];
        }
        delete this.inStore[key];
    };
};

let sample = new InStoreRepostiory();

sample.set(`a`, 10);
console.log(sample.get(`a`));

sample.begin();
sample.set(`a`, 20);
console.log(`this is the actual db`, sample.inStore);
console.log(`this is the temp db`, sample.tempStore);

sample.rollback();
console.log(sample.get(`a`));
console.log(`this is the actual db`, sample.inStore);
console.log(`this is the temp db`, sample.tempStore);

// sample.set('a', '10');
// console.log(sample.inStore);
// console.log(sample.get('a'));
// sample.unset('a');
// console.log(sample.inStore);

// sample.begin();
// sample.set('b', '20');
// console.log(`this is the actual db`, sample.inStore);
// console.log(`this is the temp db`, sample.tempStore);
// sample.commit();
// console.log(`this is the actual db`, sample.inStore);
// console.log(`this is the temp db`, sample.tempStore); // should be empty

// sample.begin();
// sample.begin();
// sample.set('a', '30');



// console.log(`this is the actual db`, sample.inStore);
// console.log(`this is the temp db`, sample.tempStore);

// sample.rollback();
// console.log(`this is the actual db`, sample.inStore);
// console.log(`this is the temp db`, sample.tempStore);
