import { Request } from "express";
import { AppAbility } from "../casl/casl-ability.factory";

interface IPolicyHandler {
    handle(ability: AppAbility,request:Request): boolean
}

export declare type PolicyHandlerCallback = (ability: AppAbility,request:Request) => boolean

export type PolicyHandler = IPolicyHandler | PolicyHandlerCallback