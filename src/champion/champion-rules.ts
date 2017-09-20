import {IHeroCardRules, IAvatarCardRules} from '../card/card-rules'

export interface IBasicsChampionRules {
    name: string;
    health: string;
}
///////////////////////////////////////////////////////////////////////////
////////////////////////// AVATAR CHAMPION  ///////////////////////////////
///////////////////////////////////////////////////////////////////////////
export interface IAvatarChampionRules extends IBasicsChampionRules {
    // 1 Avatar, 4 Spell, 2 Objective, 1 Enrage
    class: string;
    spellCards: [IAvatarCardRules, IAvatarCardRules, IAvatarCardRules, IAvatarCardRules];
    objectiveCards: [IAvatarCardRules, IAvatarCardRules];
    enrageCards: IAvatarCardRules;
}
///////////////////////////////////////////////////////////////////////////
//////////////////////////// HERO CHAMPION  ///////////////////////////////
///////////////////////////////////////////////////////////////////////////
export interface IHeroChampionRules extends IBasicsChampionRules {
    // 1 Classe, 2 Actions
    class: HeroClass;
    actionCards: [IHeroCardRules, IHeroCardRules];
}

export enum HeroClass {
    WARRIOR,
    RANGE,
    PRIEST
}


