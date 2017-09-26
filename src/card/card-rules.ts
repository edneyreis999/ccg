import { HeroClass, AvatarClass } from '../champion/champion-rules'
export interface IBasicCardRules {
    class: HeroClass | AvatarClass;
}
///////////////////////////////////////////////////////////////////////////
//////////////////////////// AVATAR CARD  /////////////////////////////////
///////////////////////////////////////////////////////////////////////////
export interface IAvatarCardRules extends IBasicCardRules{
    // 1 Tipo, 1 Avatar, set spacific information
    action: EActionType;
    actionEffect?: Array<IActionEffect>;
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
    actionName: ETriggerCondition;
    actionValue?: number;
    description?: string;
}

export enum EActionType {
    SPELL,
    OBJECTIVE,
    ENRAGE
}
export enum EDestructionCondition {
    KILL,
    DAMAGE
}
export enum ETriggerCondition {
    KILL,
    DAMAGE
}
///////////////////////////////////////////////////////////////////////////
////////////////////////////// HEROS CARD  ////////////////////////////////
///////////////////////////////////////////////////////////////////////////
export interface IHeroCardRules extends IBasicCardRules{
    // 1 Classe, 1 Action, set spacific information
    action: EActionType;
    actionEffect: Array<IActionEffect>;
}

///////////////////////////////////////////////////////////////////////////
///////////////////////////// ACTIONS CARD  ///////////////////////////////
///////////////////////////////////////////////////////////////////////////
export interface IActionEffect {
    actionName: EActionEffect;
    actionValue?: number;
    description?: string;
}

export enum EActionEffect {
    MANA,
    FREEZE,
    DAMAGE,
    HEALTH,
    BOOST_DAMAGE,
    NEXT_ATTACK_HK
}


