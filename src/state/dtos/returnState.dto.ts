import { StateEntity } from "../entities/state.entity";

export class returnStateDto {
    name:string;

    constructor (state: StateEntity){
        this.name = state.name;
    }
}