export interface PlayerStats {
    skating: number;
    shooting: number;
    strength: number;
    iq: number;
    morale: number;
}

export enum PlayerPosition {
    Center = "Center",
    LeftWing = "LeftWing",
    RightWing = "RightWing",
    LeftDefender = "LeftDefender",
    RightDefender = "RightDefender",
    GoaliePos = "GoaliePos",
}

export enum PlayerRole {
    // Winger
    Passer = "Passer",
    Shooter = "Shooter",
    TryHarder = "TryHarder",
    Dangler = "Dangler",

    // Defender
    Rock = "Rock",
    Goon = "Goon",
    Professor = "Professor",
    ToughGuy = "ToughGuy",

    // goalie
    Wall = "Wall",
    Post2Post = "Post2Post",
}

export class FieldPlayer {
    constructor(
        public nativePosition: PlayerPosition,
        public position: PlayerPosition,
        public positionCoefficient: number,
        public role: PlayerRole,
        public stats: PlayerStats,
    ) {}
}

export enum Fives {
    First = "First",
    Second = "Second",
    Third = "Third",
    Fourth = "Fourth",
}

export enum IceTimePriority {
    SuperLowPriority = "SuperLowPriority",
    LowPriority = "LowPriority",
    Normal = "Normal",
    HighPriority = "HighPriority",
    SuperHighPriority = "SuperHighPriority",
}

export class Five {
    constructor(
        public fieldPlayers: Map<String, FieldPlayer>,
        public number: Fives,
        public iceTimePriority: IceTimePriority,
        public timeField: number,
    ) {}
}

export interface GoalieStats {
    gloveAndBlocker: number,
    pads: number,
    stand: number,
    stretch,
    morale: number,
}

export class Goalie {
    constructor(
        public role: PlayerRole,
        public userID: number,
        public stats: GoalieStats,
    ) {}
}

export class Team {
    constructor(
       public five: Five,
       public goalie: Goalie,
       public score: number,
    ) {}
}

export enum ActionTypes {
    Pass = "Pass",
    Shot = "Shot",
    Move = "Move",
    Hit = "Hit",
    Dangle = "Dongle",
    PokeCheck = "PokeCheck",
    Battle = "Battle",
    Goal = "Goal",
    Save = "Save",
    Rebound = "Rebound",
    EndOfPeriod = "EndOfPeriod",
    GameFinished = "GameFinished",
    PassCatched = "PassCatched",
    PuckLose = "PuckLose",
    Overtime = "Overtime",

    TakeTO = "TakeTO",
    CoachSpeech = "CoachSpeech",
    GoalieOut = "GoalieOut",
    GoalieBack = "GoalieBack",

    FirstTeamChangeActiveFive = "FirstTeamChangeActiveFive",
    SecondTeamChangeActiveFive = "SecondTeamChangeActiveFive",
}

export class Event {
    constructor(
        public playerWithPuck: FieldPlayer,
        public action: ActionTypes,
        public zoneNumber: number,
        public time: number,
        public myTeam: Team,
        public opponentTeam: Team,
    ) {}
}
