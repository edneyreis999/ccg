import {HeroClass, AvatarClass} from '../champion/champion-rules'

///////////////////////////////////////////////////////////////////////////
//////////////////////////// AVATAR CARD  /////////////////////////////////
///////////////////////////////////////////////////////////////////////////
export interface IAvatarCardRules {
    // 1 Tipo, 1 Avatar, set spacific information
    action: EAvatarActionType;
    actionEffect: Array<IActionEffect>;
    completionEffect?: Array<IActionEffect>;
    destructionEffect?: Array<IActionEffect>;
    triggerEfect?: Array<IActionEffect>;
    destructionCondition?: Array<IDestructionCondition>;
    triggerCondition?: Array<ITriggerCondition>;
}
export interface IDestructionCondition {
    actionName: EDestructionCondition;
    actionValue?: number;
    description?: string;
}
export interface ITriggerCondition {
    actionName: EDestructionCondition;
    actionValue?: number;
    description?: string;
}

export enum EAvatarActionType {
    SPELL,
    OBJECTIVE,
    ENRAGE
}
export enum EDestructionCondition {
   
}
export enum ETriggerCondition {
    
}
///////////////////////////////////////////////////////////////////////////
////////////////////////////// HEROS CARD  ////////////////////////////////
///////////////////////////////////////////////////////////////////////////
export interface IHeroCardRules {
    // 1 Classe, 1 Action, set spacific information
    action: EHeroActionType;
    actionEffect: Array<IActionEffect>;
}

export enum EHeroActionType {
    SPELL
}

///////////////////////////////////////////////////////////////////////////
///////////////////////////// ACTIONS CARD  ///////////////////////////////
///////////////////////////////////////////////////////////////////////////
export interface IActionEffect {
    actionName: EActionEffect;
    actionValue?: number;
    description?: string;
}

export enum EActionEffect{
    MANA,
    FREEZE,
    DAMAGE
}


