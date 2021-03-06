var app = angular.module("offworldApp", ['ui.bootstrap', 'ngAnimate', 'ngSanitize']);

app.controller("mainController", function ($scope, $timeout, $interval) {
    app.storyText($scope);
    app.domeGenerator($scope);

    // Initialisation
    $scope.gameStarted = true;
    $scope.impatience = 0;

    // Progress
    $scope.rigsAvailable = true;
    $scope.pumpsAvailable = false;
    $scope.pumpsActive = false;
    $scope.extractorsAvailable = false;
    $scope.extractorsActive = false;
    $scope.wellsAvailable = false;
    $scope.wellsActive = false;

    $scope.factoryAvailable = false;
    $scope.factoryActive = false;

    $scope.automationAvailable = false;
    $scope.automationActive = false;

    $scope.componentAvailable = false;
    $scope.alloyAvailable = false;
    $scope.fuelAvailable = false;
    $scope.materialAvailable = false;

    $scope.domeAvailable = false;
    $scope.domeActive = false;

    // States
    $scope.drillStatus = true;
    $scope.extractorStatus = true;
    $scope.signalStatus = true;
    $scope.broadcastStatus = true;
    $scope.factoryStatus = true;
    $scope.droneStatus = true;

    // Facilities
    $scope.totalRigs = 1;
    $scope.rigCost = 5;

    $scope.totalPumps = 0;
    $scope.pumpCost = 10;

    $scope.totalWells = 0;
    $scope.wellCost = 10;

    $scope.totalExtractors = 0;
    $scope.extractorCost = 10;

    // Dome Resources
    $scope.greenhouses = 0;
    $scope.residences = 0;
    $scope.labs = 0;

    $scope.population = 0;

    $scope.selectedDomeFacility = 0;
    $scope.maximumBuildings = 40;

    // Factory
    $scope.factoryInput = "materialSelected";
    $scope.factoryOutput = "materialSelected";
    $scope.factoryQuantity = 1;
    $scope.factoryQuantityOutput = 1;
    $scope.factoryTimer = 100;
    $scope.factoryProcessingTime = 0;
    

    // Signal
    $scope.broadcastTimer = 100;

    // Drones
    $scope.droneTimer = 100;

    // Ore
    $scope.ore = 0;
    $scope.oreTimer = 100;

    $scope.automatedOre = false;
    $scope.oreAutomationCost = 10;

    // Metal
    $scope.metal = 0;
    $scope.metalTimer = 100;

    $scope.automatedMetal = false;
    $scope.metalAutomationCost = 25;

    // Water
    $scope.water = 0;
    $scope.waterCounter = 0;

    // Gas
    $scope.gas = 0;
    $scope.gasCounter = 0;

    // Material
    $scope.material = 0;

    // Alloy
    $scope.alloy = 0;

    // Component
    $scope.component = 0;

    // Fuel
    $scope.fuel = 0;

    // Waste
    $scope.waste = 0;

    // Drones
    $scope.drones = 0;

    $scope.droneQuantity = 1;
    $scope.droneQuantityOutput = 1;

    // Timing
    $scope.oreInterval = 500; // Time in ms between ticks
    $scope.oreIncrement = 10; // Amount to be added each tick
    $scope.oreClock = 10; // Total number of ticks (where applicable)

    $scope.metalInterval = 500;
    $scope.metalIncrement = 1;
    $scope.metalClock = 100;

    $scope.waterInterval = 500;
    $scope.waterIncrement = 5;

    $scope.gasInterval = 500;
    $scope.gasIncrement = 1;

    $scope.factoryInterval = 500;
    $scope.factoryIncrement = 2;
    $scope.factoryClock = 50;

    $scope.broadcastInterval = 1000;
    $scope.broadcastIncrement = 1;
    $scope.broadcastClock = 100;

    $scope.droneInterval = 500;
    $scope.droneIncrement = 4;
    $scope.droneClock = 25;

    // Game Controller

    $scope.startGame = function () {
        
        $scope.gameStarted = true;
    }

    // Events

    $scope.getNextStory = function () {
        if ($scope.logArray[$scope.story] != undefined) {
            $scope.newEvent($scope.logArray[$scope.story]);
            $scope.story += 1;
        } else {
            $scope.newEvent($scope.logBroadcastReturn);
        }

    }

    $scope.newEvent = function (x) {
        if ($scope.events.length == 100)
        {
            $scope.events.pop();
        }

        // Angular repeat funniness
        x = angular.copy(x);

        x.id = $scope.eventCounter;
        $scope.eventCounter++;

        $scope.events.unshift(x);
    };

    // Ore

    $scope.getOreTimer = function () {
        return $scope.oreTimer;
    }

    $scope.drill = function () {
        if($scope.oreTimer == 100 && $scope.drillStatus == true)
        {
            $scope.drillStatus = false;
            $scope.oreTimer = 0;
            $scope.ore += $scope.totalRigs;
            $interval($scope.drillCooldown, $scope.oreInterval, $scope.oreClock);
        }
        
    }

    $scope.drillCooldown = function () {

        $scope.oreTimer += $scope.oreIncrement;
        if ($scope.oreTimer == 100 && $scope.drillStatus == false)
        {
            $scope.drillStatus = true;

            if ($scope.automatedOre == true) {
                $scope.drill();
            }
        }
        
    };

    // Metal

    $scope.getMetalTimer = function () {
        return $scope.metalTimer;
    };

    $scope.extract = function () {
        if ($scope.metalTimer == 100 && $scope.extractorStatus == true) {
            $scope.extractorStatus = false;
            $scope.metalTimer = 0;
            $scope.metal += $scope.totalExtractors;
            $interval($scope.extractorCooldown, $scope.metalInterval, $scope.metalClock);
        }

    };

    $scope.extractorCooldown = function () {

        $scope.metalTimer += $scope.metalIncrement;
        if ($scope.metalTimer == 100 && $scope.extractorStatus == false) {
            $scope.extractorStatus = true;

            if ($scope.automatedMetal == true)
            {
                $scope.extract();
            }
        }

    };

    // Water

    $scope.waterCooldown = function () {

        $scope.waterCounter += $scope.waterIncrement;

        if ($scope.waterCounter == 100) {
            $scope.addWater();
            $scope.waterCounter = 0;
        }
        
    };

    $scope.addWater = function () {
        $scope.water += $scope.totalPumps;
    }

    // Gas

    $scope.gasCooldown = function () {

        $scope.gasCounter += $scope.gasIncrement;

        if ($scope.gasCounter == 100) {
            $scope.addGas();
            $scope.gasCounter = 0;
        }

    };

    $scope.addGas = function () {
        $scope.gas += $scope.totalWells;
    }

    // Signal

    $scope.broadcast = function () {
        if ($scope.broadcastTimer == 100 && $scope.broadcastStatus == true) {
            $scope.broadcastStatus = false;
            $scope.broadcastTimer = 0;
            $interval($scope.broadcastCounter, $scope.broadcastInterval, $scope.broadcastClock);
        }

    }

    $scope.broadcastCounter = function () {

        $scope.broadcastTimer += $scope.broadcastIncrement;
        if ($scope.broadcastTimer >= 100 && $scope.broadcastStatus == false) {
            $scope.broadcastStatus = true;
            $scope.getNextStory();
        }

    };

    $scope.getBroadcast = function () {
        return $scope.broadcastTimer;
    }

    // Factory

    $scope.process = function (resource, quantity) {

        $scope.factoryOutput = resource;
        $scope.factoryQuantityOutput = quantity;
        $scope.factoryTimeCalculator();

        if ($scope.factoryTimer == 100 && $scope.factoryStatus == true && $scope.factoryUseResources() == true) {
            $scope.factoryTimer = 0;
            $scope.factoryStatus = false;
            $interval($scope.factoryCounter, $scope.factoryProcessingTime, $scope.factoryClock);
        }

    }

    $scope.factoryCounter = function () {

        $scope.factoryTimer += $scope.factoryIncrement;
        if ($scope.factoryTimer == 100 && $scope.factoryStatus == false)
        {
            $scope.factoryProduction();
            $scope.factoryStatus = true;
            
        }
    };

    $scope.getFactory = function () {
        return $scope.factoryTimer;
    }

    $scope.factoryUseResources = function () {
        switch ($scope.factoryOutput) {

            case "materialSelected":
                if ($scope.ore >= (1 * $scope.factoryQuantityOutput) && $scope.water >= (1 * $scope.factoryQuantityOutput)) {
                    $scope.ore -= (1 * $scope.factoryQuantityOutput);
                    $scope.water -= (1 * $scope.factoryQuantityOutput);
                    return true;
                } else {
                    return false;
                }

            case "alloySelected":
                if ($scope.ore >= (1 * $scope.factoryQuantityOutput) && $scope.metal >= (1 * $scope.factoryQuantityOutput)) {
                    $scope.ore -= 1;
                    $scope.metal -= 1;
                    return true;
                } else {
                    return false;
                }

            case "componentSelected":
                if ($scope.metal >= (1 * $scope.factoryQuantityOutput) && $scope.gas >= (1 * $scope.factoryQuantityOutput)) {
                    $scope.gas -= (1 * $scope.factoryQuantityOutput);
                    $scope.metal -= (1 * $scope.factoryQuantityOutput);
                    return true;
                } else {
                    return false;
                }

            case "fuelSelected":
                if ($scope.gas >= (1 * $scope.factoryQuantityOutput) && $scope.water >= (1 * $scope.factoryQuantityOutput)) {
                    $scope.gas -= (1 * $scope.factoryQuantityOutput);
                    $scope.water -= (1 * $scope.factoryQuantityOutput);
                    return true;
                } else {
                    return false;
                }

            default:
                return false;

        }
    }

    $scope.factoryProduction = function() {
        switch ($scope.factoryOutput) {

            case "materialSelected":
                $scope.material += (1 * $scope.factoryQuantityOutput);
                $scope.waste += (1 * $scope.factoryQuantityOutput);
                break;

            case "alloySelected":
                $scope.alloy += (1 * $scope.factoryQuantityOutput);
                $scope.waste += (1 * $scope.factoryQuantityOutput);
                break;

            case "componentSelected":
                $scope.component += (1 * $scope.factoryQuantityOutput);
                $scope.waste += (1 * $scope.factoryQuantityOutput);
                break;

            case "fuelSelected":
                $scope.fuel += (1 * $scope.factoryQuantityOutput);
                $scope.waste += (1 * $scope.factoryQuantityOutput);
                break;

            default:
                break;
                
        }
    }

    $scope.factoryTimeCalculator = function () {
        switch ($scope.factoryOutput) {

            case "materialSelected":
                $scope.factoryProcessingTime = $scope.factoryInterval;
                break;

            case "alloySelected":
                $scope.factoryProcessingTime = $scope.factoryInterval;
                break;

            case "componentSelected":
                $scope.factoryProcessingTime = $scope.factoryInterval * 2;
                break;

            case "fuelSelected":
                $scope.factoryProcessingTime = $scope.factoryInterval * 2;
                break;

            default:
                break;

        }
    }

    // Drones

    $scope.build = function (quantity) {
        if ($scope.droneTimer == 100 && $scope.droneStatus == true && $scope.alloy >= (2 * $scope.droneQuantity) && $scope.metal >= (2 * $scope.droneQuantity) && $scope.component >= (1 * $scope.droneQuantity) && $scope.fuel >= (1 * $scope.droneQuantity)) {
            $scope.droneQuantityOutput = quantity;
            $scope.droneStatus = false;
            $scope.droneTimer = 0;
            $scope.alloy -= (2 * $scope.droneQuantityOutput);
            $scope.metal -= (2 * $scope.droneQuantityOutput);
            $scope.component -= (1 * $scope.droneQuantityOutput);
            $scope.fuel -= (1 * $scope.droneQuantityOutput);

            $interval($scope.droneCounter, $scope.droneInterval, $scope.droneClock);
        }

    }

    $scope.droneCounter = function () {

        $scope.droneTimer += $scope.droneIncrement;
        if ($scope.droneTimer >= 100 && $scope.droneStatus == false) {
            $scope.droneStatus = true;
            $scope.drones += (1 * $scope.droneQuantityOutput);
        }

    };

    $scope.getDrones = function () {
        return $scope.droneTimer;
    }

    // Buy Facilities

    $scope.buyRig = function () {
        if ($scope.ore >= $scope.rigCost) {
            $scope.ore -= $scope.rigCost;
            $scope.totalRigs += 1;

            $scope.firstUnlockCheck();

            if ($scope.pumpsAvailable == false && $scope.totalRigs >= 2) {
                // Unlock water pumping
                $scope.showTabTwo = true;
                $scope.pumpsAvailable = true;
                $scope.newEvent($scope.logPumpsUnlocked);
            }
        }
    };

    $scope.buyExtractor = function () {
        if ($scope.material >= $scope.extractorCost) {
            $scope.material -= $scope.extractorCost;
            $scope.totalExtractors += 1;
            $scope.secondUnlockCheck();

            if ($scope.extractorsActive == false) {
                // First Extractor only
                $scope.extractorsActive = true;
                $scope.newEvent($scope.logFirstExtractor);
            }
        }
    };

    $scope.buyPump = function () {
        if ($scope.ore >= $scope.pumpCost) {
            $scope.ore -= $scope.pumpCost;
            $scope.totalPumps += 1;

            $scope.firstUnlockCheck();

            if ($scope.pumpsActive == false) {

                // First pump only
                $scope.pumpsActive = true;
                $interval($scope.waterCooldown, $scope.waterInterval);
                $scope.newEvent($scope.logFirstPump);
            }
        }

    };

    $scope.buyWell = function () {
        if ($scope.material >= $scope.wellCost) {
            $scope.material -= $scope.wellCost;
            $scope.totalWells += 1;
            $scope.secondUnlockCheck();

            if ($scope.wellsActive == false) {

                // First well only
                $scope.wellsActive = true;
                $interval($scope.gasCooldown, $scope.gasInterval);
                $scope.newEvent($scope.logFirstWell);
            }
        }

    };

    $scope.buyFactory = function () {

        if ($scope.ore >= 100 && $scope.water >= 100) {
            $scope.ore -= 100;
            $scope.water -= 100;
            $scope.factoryActive = true;
            $scope.extractorsAvailable = true;
            $scope.wellsAvailable = true;
            $scope.newEvent($scope.logFirstFactory);
        }

    }

    $scope.buyAutomation = function () {

        if ($scope.component >= 25 && $scope.metal >= 25 && $scope.alloy >= 25) {
            $scope.component -= 25;
            $scope.metal -= 25;
            $scope.alloy -= 25;
            $scope.automationActive = true;
            $scope.newEvent($scope.logFirstAutomation);
        }

    }

    $scope.buyOreAutomation = function () {
        if($scope.automationActive && $scope.drones >= $scope.oreAutomationCost)
        {
            $scope.drones -= $scope.oreAutomationCost;
            $scope.automatedOre = true;
            $scope.drill();
        }
    }

    $scope.buyMetalAutomation = function () {
        if ($scope.automationActive && $scope.drones >= $scope.metalAutomationCost) {
            $scope.drones -= $scope.metalAutomationCost;
            $scope.automatedMetal = true;
            $scope.extract();
        }
    }

    $scope.firstUnlockCheck = function () {
        if($scope.totalRigs >= 10 && $scope.totalPumps >= 10 && $scope.factoryAvailable == false)
        {
            $scope.factoryAvailable = true;
            $scope.newEvent($scope.logFactoryUnlocked);
        }
    }

    $scope.secondUnlockCheck = function () {

        if ($scope.totalExtractors > 1 && $scope.totalWells > 1 && $scope.automationAvailable == false) {
            $scope.automationAvailable = true;
            $scope.newEvent($scope.logAutomationUnlocked);
        }
    }

    // Dome Facilities

    $scope.buyDome = function () {
        if ($scope.metal >= 1000 && $scope.alloy >= 500) {
            $scope.metal -= 1000;
            $scope.alloy -= 500;
            $scope.domeActive = true;
            $scope.initialiseCanvas();
            $scope.drawDome();
        }
    }

    $scope.buyGreenhouse = function () {
        if ($scope.material >= 10 && $scope.water >= 100 && $scope.drones >= 1) {
            $scope.material -= 10;
            $scope.water -= 100;
            $scope.drones -= 1;
            $scope.greenhouses += 1;
            if ($scope.greenhouses < $scope.maximumBuildings) {
                $scope.constructBuildingThree();
            }
        }
    }

    $scope.buyLab = function () {
        if ($scope.material >= 20 && $scope.component >= 10 && $scope.drones >= 1) {
            $scope.material -= 20;
            $scope.component -= 10;
            $scope.drones -= 1;
            $scope.labs += 1;
            if ($scope.labs < $scope.maximumBuildings) {
                $scope.constructBuildingTwo();
            }
        }
    }

    $scope.buyResidence = function () {
        if ($scope.material >= 30 && $scope.drones >= 1) {
            $scope.material -= 30;
            $scope.drones -= 1;
            $scope.residences += 1;
            if ($scope.residences < $scope.maximumBuildings) {
                $scope.constructBuildingOne();
            }
        }
    }

    $scope.domeInfo = function (facility) {
        $scope.selectedDomeFacility = facility;
    }

    // Misc

    $scope.debug = function()
    {
        $scope.pumpsAvailable = true;
        $scope.extractorsAvailable = true;
        $scope.wellsAvailable = true;

        $scope.factoryAvailable = true;
        $scope.automationAvailable = true;

        $scope.newEvent($scope.logDebug);
    }

    $scope.debugResources = function () {
        $scope.ore += 1000;
        $scope.water += 1000;
        $scope.metal += 1000;
        $scope.gas += 1000;
        $scope.material += 1000;
        $scope.alloy += 1000;
        $scope.component += 1000;
        $scope.fuel += 1000;
        $scope.drones += 100;
    }

    $scope.debugDome = function () {
        $scope.domeAvailable = true;
        $scope.initialiseCanvas();
    }

    $scope.impatienceCheck = function () {

        if ($scope.impatience <= 20) {
            $scope.impatience += 1;

        } else {

            $scope.newEvent($scope.logImpatience)
            $scope.impatience = 0;
        }
    };

});