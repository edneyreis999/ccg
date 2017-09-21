import {IHeroChampionRules, IAvatarChampionRules} from '../champion/champion-rules'

export interface IHeroDeckRules {
    // Deck composto por 3 heros
    heros: [IHeroChampionRules, IHeroChampionRules, IHeroChampionRules];
}

export interface IAvatarDeckRules {
    // Deck composto por 1 avatar
    avatar: IAvatarChampionRules;
}

export enum DeckType{
    HERO_DECK,
    AVATAR_DECK
}


