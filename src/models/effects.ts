export class Effect {
  private hunger: number;
  private thirst: number;
  private urine: number;
  private poop: number;
  private stress: number;
  private fatigue: number;
  private cash: number;
  private reputation: number;
  // private speed: number;
  // pass in consumables attributes

  constructor(hunger: number,
              thirst: number,
              urine: number,
              poop: number,
              stress: number,
              fatigue: number) {
                this.hunger = hunger;
                this.thirst = thirst;
                this.urine = urine;
                this.poop = poop;
                this.stress = stress;
                this.fatigue = fatigue;
    };

    getEffectHuger() : number {
        return this.hunger;
    };

    getEffectThirst() : number {
        return this.thirst;
    };

    getEffectUrine(): number {
        return this.urine;
    };
    getEffectPoop(): number {
        return this.poop;
    };
    getEffectStress(): number {
        return this.stress;
    };
    getEffectFatigue(): number {
        return this.fatigue;
    };

    resetEffect() {
        this.hunger = 0;
        this.thirst = 0;
        this.urine = 0;
        this.poop = 0; 
        this.stress = 0;
        this.fatigue = 0;
    }
};
