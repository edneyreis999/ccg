import {IHeroCardRules, IAvatarCardRules} from '../card/card-rules'

export interface IBasicsChampionRules {
    name: string;
    health: number;
    class: AvatarClass | HeroClass;
}
///////////////////////////////////////////////////////////////////////////
////////////////////////// AVATAR CHAMPION  ///////////////////////////////
///////////////////////////////////////////////////////////////////////////
export interface IAvatarChampionRules extends IBasicsChampionRules {
    // 1 Avatar, 4 Spell, 2 Objective, 1 Enrage    
    spellCards: [IAvatarCardRules, IAvatarCardRules, IAvatarCardRules, IAvatarCardRules];
    objectiveCards: [IAvatarCardRules, IAvatarCardRules];
    enrageCard: IAvatarCardRules;
}

export enum AvatarClass {
    TROLL,
    GOBLIN,
    ORC
}
///////////////////////////////////////////////////////////////////////////
//////////////////////////// HERO CHAMPION  ///////////////////////////////
///////////////////////////////////////////////////////////////////////////
export interface IHeroChampionRules extends IBasicsChampionRules {
    // 2 Actions
    actionCards: [IHeroCardRules, IHeroCardRules];
}

export enum HeroClass {
    WARRIOR,
    RANGE,
    PRIEST
}