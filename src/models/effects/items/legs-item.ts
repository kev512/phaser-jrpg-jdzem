import { Effect } from '../effects';
import { Item } from './item';

export abstract class LegsItem extends Item {
    constructor(
        id: string,
        name: string,
        description: string,
        effect: Effect,
        price: number,
    ) {
        super(id, name, description, effect, price);
    };
};