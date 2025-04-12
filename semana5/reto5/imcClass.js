import Category from './categoryClass.js';
import Constant from './constantClass.js';

export class Imc {
    constructor(weigth, heigth, imc, category) {
        this.weigth     = weigth
        this.heigth     = heigth
        this.imc        = imc
        this.category  = category
    }

    /**
     * Getters and Setters
     */
    getWeigth(){
        return this.weigth
    };

    setWeigth(weigth){
        this.weigth = weigth
        return this.weigth
    };

    getHeigth(){
        return this.heigth
    };

    setHeigth(heigth){
        this.heigth = heigth
        return this.heigth
    };

    getImc(){
        return this.imc
    };

    setImc(imc){
        this.imc = this.calculateIMC()
        return this.imc
    };

    /**
     * 
     * @returns This function returns the IMC (peso (kg) / altura (m)^2.)
     */
    calculateIMC(){
        this.imc = this.getWeigth() / (this.getHeigth() ** 2)
        return this.imc.toFixed(2)
    };

    /**
     * 
     * @returns This function returns the categorie by OMS
     */
    setCategory(){
        const imcValue = this.calculateIMC()
        for (let element of Category.categories) {
            const minimun = element.range.minimun;
            const maximun = element.range.maximun;
            if (imcValue >= minimun && imcValue < maximun) {
                this.category = element.category
                return this.category
            }
        }
        this.category = Constant.cCategoryError
        return this.category
    }

    getCategory(){
        return this.category
    }

    execute(){
        let exit = false;

        while (!exit) {
            try {
                let operation = parseInt(prompt(Constant.cIOperation));
                switch (operation) {
                    case 0:
                        exit = true;
                        alert(Constant.cExit);
                        return;
                    case 1:
                        this.setWeigth(prompt(Constant.cInsertWeigth));
                        this.setHeigth(prompt(Constant.cInsertHeigth));
                        this.calculateIMC();
                        this.setCategory();
                        alert(this.toString());
                        break;
                    default:
                        alert(`${Constant.cOperationError}`);
                        break;
                }
            } catch (error) {
                console.error(`${Constant.cError}: ${error}`);
            }
        }
    }

    /**
     * @returns Descriptions of values
     */
    toString(){
        return `Sus datos son los siguientes:\n Peso: ${this.getWeigth()}.\n Altura: ${this.getHeigth()}.\n IMC: ${this.getImc()}.\n Categoría: ${this.getCategory()}.`
    };

}