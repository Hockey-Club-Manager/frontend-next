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

export function getOpponentPosition(playerPosition: PlayerPosition): PlayerPosition {
    switch (playerPosition) {
        case PlayerPosition.Center: return PlayerPosition.Center;
        case PlayerPosition.LeftWing: return PlayerPosition.RightDefender;
        case PlayerPosition.RightDefender: return PlayerPosition.LeftWing;
        case PlayerPosition.RightWing: return PlayerPosition.LeftDefender;
        case PlayerPosition.LeftDefender: return PlayerPosition.RightWing;
        default: return PlayerPosition.GoaliePos;
    }
}

export enum PlayerRole {
    // Forward
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

export type UserID = 1|2;
export class FieldPlayer {
    constructor(
        public nativePosition: PlayerPosition,
        public number: number,
        public position: PlayerPosition,
        public positionCoefficient: number,
        public role: PlayerRole,
        public userID: UserID,
        public stats: PlayerStats,
    ) {}

    static fromJSON(json) {
        return new FieldPlayer(
            json.native_position,
            json.number,
            json.position,
            json.position_coefficient,
            json.role,
            json.user_id,
            {
                skating: json.stats.skating,
                shooting: json.stats.shooting,
                strength: json.stats.strength,
                iq: json.stats.iq,
                morale: json.stats.morale,
            }
        );
    }
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
        public fieldPlayers: Map<number, FieldPlayer>,
        public number: Fives,
        public iceTimePriority: IceTimePriority,
        public timeField: number,
    ) {}

    static fromJSON(json) {
        const fieldPlayers = new Map<number, FieldPlayer>();

        for (let playerNum in json.field_players) {
            fieldPlayers[playerNum] = FieldPlayer.fromJSON(json.field_players[playerNum]);
        }

        return new Five(
            fieldPlayers,
            json.number,
            json.ice_time_priority,
            json.time_field
        );
    }
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
        public userID: UserID,
        public stats: GoalieStats,
    ) {}

    static fromJSON(json) {
        return new Goalie(
            json.role,
            json.user_id,
            {
                gloveAndBlocker: json.stats.glove_and_blocker,
                pads: json.stats.pads,
                stand: json.stats.stand,
                stretch: json.stats.stretch,
                morale: json.stats.morale,
            }
        )
    }
}

export class Team {
    constructor(
       public five: Five,
       public goalie: Goalie,
       public score: number,
    ) {}

    static fromJSON(json) {
        return new Team(
            Five.fromJSON(json.five),
            Goalie.fromJSON(json.goalie),
            json.score,
        )
    }
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
    StartGame = "StartGame",
    EndOfPeriod = "EndOfPeriod",
    GameFinished = "GameFinished",
    FaceOff = "FaceOff",
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
export const nonMessageActions: ActionTypes[] =
    [ActionTypes.StartGame, ActionTypes.EndOfPeriod, ActionTypes.GameFinished, ActionTypes.FaceOff,
        ActionTypes.Goal, ActionTypes.Rebound, ActionTypes.Save,ActionTypes.Shot];

export class Event {
    constructor(
        public playerWithPuck: FieldPlayer | null,
        public action: ActionTypes,
        public zoneNumber: number,
        public time: number,
        public myTeam: Team,
        public opponentTeam: Team,
    ) {}

    static fromJSON(json) {
        return new Event(
            json.player_with_puck ? FieldPlayer.fromJSON(json.player_with_puck) : null,
            json.action,
            json.zone_number,
            json.time,
            Team.fromJSON(json.my_team),
            Team.fromJSON(json.opponent_team)
        );
    }
}

export type PlayerSide = 'left'|'right';
