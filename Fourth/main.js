class TravelPaymentStrategyGenerator {
    constructor() {
        this.randomizer = new Randomizer();
        
        this.errorMessage = 'Sorry, the data is invalid.';
        
        this.existingCoins = [1,2,3,4,5,6,7,8,9,10];
        this.numberOfDrivers = 10;
        this.bestStrategyFound = false;
        
        this.drivers = this.randomizer.createArrOfDrivers(this.numberOfDrivers);
    }
    
    generateTravelPaymentStrategy(tenTaxesOnRoad) {
        this.tenTaxesOnRoad = tenTaxesOnRoad;
        
        if (!this.isInputDataValid(tenTaxesOnRoad)) {
            console.log(this.errorMessage);
            
            return {success: false};
        }
        
        while(!this.bestStrategyFound) {
            let nextGeneration = this.removeWorseDriversInGeneration();
            
            this.drivers = this.reproduction(nextGeneration);
            
            if (this.checkingArrayOnAllSameElements(this.drivers)) {
                this.changeAHalfDriversOnRandom();
            }
            
            let probForNewGeneration = this.skipAllDriversOverFitnessFunction();
            
            this.bestStrategyFound = this.lookingForBestDecision(probForNewGeneration);
        }
        
        return this.bestStrategyFound;
    }
    
    isInputDataValid(tenTaxesOnRoad) {
        if (typeof tenTaxesOnRoad !== 'object') {
            return false;
        }
        
        let isPriceMoreThanTen = tenTaxesOnRoad.find(tax => tax > 10);
        let isCoinsNotNumber = tenTaxesOnRoad.find(tax => typeof tax !== 'number');
        let isTaxesLengthInvalid = tenTaxesOnRoad.length > 10 || tenTaxesOnRoad.length < 10;
        let isSumOfTaxesInvalid = this.randomizer.isSumOfRoadCoinsInvalid(tenTaxesOnRoad);
        let isDataValid = true;
        
        if (isPriceMoreThanTen || isTaxesLengthInvalid || isCoinsNotNumber || isSumOfTaxesInvalid) {
            isDataValid = false;
        }
        
        return isDataValid;
    }
    
    generateNewDriverWithNulls(parent1, parent2) {
        const newDriverWithNulls = [];
        
        // Create the most profitable set of coins
        this.tenTaxesOnRoad.forEach((tax, i) => {
            let paymentDifferenceParent1 = tax - parent1[i];
            let paymentDifferenceParent2 = tax - parent2[i];
            let newCoin;
            
            if ((paymentDifferenceParent1 <= paymentDifferenceParent2) && (paymentDifferenceParent1 >= 0)) {
                newCoin = parent1[i];
            } else if(paymentDifferenceParent2 >= 0){
                newCoin = parent2[i];
            } else if (Math.abs(paymentDifferenceParent1) <= Math.abs(paymentDifferenceParent2)) {
                newCoin = parent1[i];
            } else{
                newCoin = parent2[i];
            }
            
            // Checking for duplicate coins
            let addedCoin = newDriverWithNulls.find(coin => coin === newCoin);
            
            newDriverWithNulls.push(addedCoin ? 0 : newCoin);
        });
        
        return newDriverWithNulls;
    }
    
    findNotUsedCoins(newDriverWithNulls) {
        const notUsedCoins = [];
        
        this.existingCoins.forEach((coin) => {
            let foundCoin = newDriverWithNulls.find(function (item) {
                return coin === item;
            });
            
            if (!foundCoin) {
                notUsedCoins.push(coin);
            }
        });
        
        return notUsedCoins;
    }
    
    getNewDriverFromParents(parent1, parent2) {
        //create  child wich has nulls insted coins
        const newDriverFromParents = this.generateNewDriverWithNulls(parent1,parent2);
        const arrOfNotUsedCoins = this.findNotUsedCoins(newDriverFromParents);
        
        newDriverFromParents.forEach((item, i) => {
            if(item === 0){
                newDriverFromParents[i] = arrOfNotUsedCoins[0];
                arrOfNotUsedCoins.shift();
            }
        });
        
        return newDriverFromParents;
    }
    
    findBestDutyForDriver(driver) {
        let Debt = 0;
        let indexArr;
        let indexRoad;
        let driverArr = driver.slice();
        let roadArr = this.tenTaxesOnRoad.slice();
        
        for (let i = 0; i < 10; i++){
            /* 
              Best possibile way to pay the tax.
              Looking for the maximal coin in drivers wallet and 
              looking for the maximal tax on the Road and we pay maximal tax with maximal coin
              thus we get the least debt in the end.

              In case driver can not pay full price, we add the rest to the debt
             */
            if(Math.max.apply(null, driverArr) - Math.max.apply(null, roadArr) < 0){
                Debt += (Math.abs(Math.max.apply(null, driverArr) - Math.max.apply(null, roadArr)));
            }
            
            indexArr = driverArr.indexOf(Math.max.apply(null, driverArr));  
            indexRoad = roadArr.indexOf(Math.max.apply(null, roadArr));
            
            driverArr.splice(indexArr,1);
            roadArr.splice(indexRoad,1);
        }
        
        return Debt;
    }
    
    dutyPaiedDriverOnRoad(driver) {
        let facticalDebt = 0;

        // Calculating factical Debt
        this.tenTaxesOnRoad.forEach((tax, i) => {
            if (tax > driver[i]) {
                facticalDebt += tax - driver[i];
            }else{
                facticalDebt += 0;
            }
        });
        
        return facticalDebt;
    }
    
    fitness(driver) {
        // Getting value that shows drivers adaptation 
        let adaptation = this.findBestDutyForDriver(driver, this.tenTaxesOnRoad) / this.dutyPaiedDriverOnRoad(driver) ;
        
        return adaptation;
    }
    
    skipAllDriversOverFitnessFunction() {
        let arrayOfSurvivorProbability = [];
        
        // Getting array that shows probability
        this.drivers.forEach((driver) => {
            arrayOfSurvivorProbability.push(this.fitness(driver));
        });
        
        return arrayOfSurvivorProbability;
    }
    
    removeWorseDriversInGeneration() {

        const probabllytesOfSurviviorOfDrivers = this.skipAllDriversOverFitnessFunction();
        let numberDriversToRemove = 2;
        
        // Finding the least probability of survival and removing them
        while (numberDriversToRemove){
            let min = Math.min.apply(null, probabllytesOfSurviviorOfDrivers);
            let indexOfMin = probabllytesOfSurviviorOfDrivers.indexOf(min);
            
            probabllytesOfSurviviorOfDrivers.splice(indexOfMin,1);
            this.drivers.splice(indexOfMin,1);
            
            numberDriversToRemove--;
        }
        
        return this.drivers;
    }
    
    choseParents() {
        const parentPairs = [];
        let leftNumberOfDrivers = this.numberOfDrivers;
        
        while (leftNumberOfDrivers) {
            let pair = {
                a: Math.floor(Math.random() * (this.numberOfDrivers - this.numberOfDrivers / 5) + 0),
                b: Math.floor(Math.random() * (this.numberOfDrivers - this.numberOfDrivers / 5) + 0)
            };
            
            let repeatableEl = parentPairs.find(item => {
                return (item.a === pair.a && item.b === pair.b) ||
                        (item.a === pair.b && item.b === pair.a);
            });
            
            if ((pair.a !== pair.b) && !repeatableEl){
                parentPairs.push(pair);
                leftNumberOfDrivers--;
            }
        }
        
        return parentPairs;
    }
    
    reproduction(nextGeneration) {
        const parentPairs = this.choseParents();
        const newGenerationOfChildren = [];
        
        parentPairs.forEach(parentPair => {
            let pair = [parentPair.a, parentPair.b];
            
            newGenerationOfChildren.push(this.getNewDriverFromParents(nextGeneration[pair[0]], nextGeneration[pair[1]]));
        });
        
        return newGenerationOfChildren;
    }
    
    lookingForBestDecision(probForNewGeneration) {
        let result = false;
        
        probForNewGeneration.forEach((item,i)=>{
            if (item === 1){
                result = this.drivers[i];
            }
        });
        
        return result;
    }
    
    checkingArrayOnAllSameElements () {
        let quantityOfRepeatableDrivers = 0;
        let hasArrayAllSameElements = false;
        
        this.drivers.forEach(driver => {
            if (this.drivers[0].join('') === driver.join('')) {
                quantityOfRepeatableDrivers++;
            }
        });
        
        if (quantityOfRepeatableDrivers === this.numberOfDrivers) {
            hasArrayAllSameElements =  true;
        }
        
        return hasArrayAllSameElements;
    }
    
    changeAHalfDriversOnRandom() {
        for (let i = 0; i < this.numberOfDrivers / 2; i++ ) {
            this.drivers[i] = this.randomizer.getRandomDriver();
        }
        
        return this;
    }
}

class Randomizer {
    constructor() {
        this.minSumOfCoins = 55;
    }
    
    getRandomRoadWithTenTaxes() {
        let randomRoadWithTenTaxes = this.getRandomTaxes();
        
        while (this.isSumOfRoadCoinsInvalid(randomRoadWithTenTaxes)) {
            randomRoadWithTenTaxes = this.getRandomTaxes()
        }
        
        return randomRoadWithTenTaxes;
    }
    
    isSumOfRoadCoinsInvalid(roadWithTaxes) {
        return this.getSumOfTaxes(roadWithTaxes) < this.minSumOfCoins;
    }
    
    getRandomDriver() {
        const min = 1;
        const max = 10;
        let totalNumbers = max - min + 1;
        let arrayTotalNumbers = [];
        let arrayRandomNumbers  = [];
        let tempRandomNumber;
        
        // Generating random numbers arrays for coins values
        while (totalNumbers--) {
            arrayTotalNumbers.push(totalNumbers + min);
        }
        
        while (arrayTotalNumbers.length) {
            tempRandomNumber = Math.round(Math.random() * (arrayTotalNumbers.length - 1));
            arrayRandomNumbers.push(arrayTotalNumbers[tempRandomNumber]);
            arrayTotalNumbers.splice(tempRandomNumber, 1);
        }
        
        return arrayRandomNumbers;
    }
    
    createArrOfDrivers(numberOfDrivers) {
        let randomDrivers = [];
        for (let i = 0; i<numberOfDrivers; i++){
            randomDrivers[i] = this.getRandomDriver();
        }
        
        return randomDrivers;
    }
    
    getRandomTaxes() {
        let taxes = [];
        
        for (let i = 0; i < 10; i++) {
            taxes.push(Math.floor(Math.random() * (10) + 1));
        }
        
        return taxes;
    }
    
    getSumOfTaxes(taxes) {
        let sumOfTaxes = 0;
        
        taxes.forEach(function (item) {
            sumOfTaxes += item;
        });
        
        return sumOfTaxes;
    }
}

const randomizer = new Randomizer();
// TODO: using prompt to collect the data
const tenTaxesOnRoad = randomizer.getRandomRoadWithTenTaxes();
const travelPaymentStrategyGenerator = new TravelPaymentStrategyGenerator(tenTaxesOnRoad);

console.log(travelPaymentStrategyGenerator.generateTravelPaymentStrategy(tenTaxesOnRoad));