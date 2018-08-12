import { Movy } from "./Movy";
import { Producer } from "./Producer";
import {Actor } from "./Actor";

export class RequestObj{
    constructor(movy: Movy, producer: Producer, actors: Array<Actor>){
        this.movy = movy;
        this.producer = producer;
        this.actors = actors;
    }
    movy: Movy;
    producer: Producer;
    actors: Array<Actor>;
}