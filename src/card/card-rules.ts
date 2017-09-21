import {HeroClass, AvatarClass} from '../champion/champion-rules'

export interface IBasicsCardRules {
    name: string;
}
///////////////////////////////////////////////////////////////////////////
//////////////////////////// AVATAR CARD  /////////////////////////////////
///////////////////////////////////////////////////////////////////////////
export interface IAvatarCardRules extends IBasicsCardRules {
    // 1 Tipo, 1 Avatar, set spacific information
    action: AvatarActionType;
    actionInfo: Array<IAvatarActionInfo>;
}

export enum AvatarActionType {
    AVATAR,
    SPELL,
    OBJECTIVE,
    ENRAGE
}

export interface IAvatarActionInfo {
    name: string;
    description: string;
}
///////////////////////////////////////////////////////////////////////////
////////////////////////////// HEROS CARD  ////////////////////////////////
///////////////////////////////////////////////////////////////////////////
export interface IHeroCardRules extends IBasicsCardRules {
    // 1 Classe, 1 Action, set spacific information
    action: IActionType;
    actionInfo: Array<IHeroCardInfo>;
}

export interface IActionType {
    name: string;
    description: string;
}

export interface IHeroCardInfo {
    name: string;
    description: string;
}


