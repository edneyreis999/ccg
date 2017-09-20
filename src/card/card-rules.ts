import {HeroClass} from '../champion/champion-rules'

export interface IBasicsCardRules {
    name: string;
}
///////////////////////////////////////////////////////////////////////////
//////////////////////////// AVATAR CARD  /////////////////////////////////
///////////////////////////////////////////////////////////////////////////
export interface IAvatarCardRules extends IBasicsCardRules {
    // 1 Tipo, 1 Avatar, set spacific information
    type: AvatarCardType;
    class: string;
    typeInfo: Array<IAvatarCardInfo>;
}

export enum AvatarCardType {
    AVATAR,
    SPELL,
    OBJECTIVE,
    ENRAGE
}

export interface IAvatarCardInfo {
    name: string;
    description: string;
}
///////////////////////////////////////////////////////////////////////////
////////////////////////////// HEROS CARD  ////////////////////////////////
///////////////////////////////////////////////////////////////////////////
export interface IHeroCardRules extends IBasicsCardRules {
    // 1 Classe, 1 Action, set spacific information
    heroClass: HeroClass;
    type: IActionType;
    typeInfo: Array<IHeroCardInfo>;
}

export interface IActionType {
    name: string;
    description: string;
}

export interface IHeroCardInfo {
    name: string;
    description: string;
}


