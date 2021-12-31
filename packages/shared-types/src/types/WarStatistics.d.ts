export declare type RecentFrag = {
  nickname: string
  level: number
  vocation: string
  timeStamp: number
}

export declare type OnlineSnapshot = {
  count: number
  timeStamp: number
}

export declare type GuildMemberStats = {
  nickname: string
  vocation: string
  level: number
  deathCount: number
  kills: number
}

export declare type XPSnapshot = {
  xp: number
  timeStamp: number
}

export declare type WarStatistics = {
  onlineCount: {
    guildA: OnlineSnapshot[]
    guildB: OnlineSnapshot[]
  }
  xpStats: {
    dailyXP: {
      guildA: XPSnapshot[]
      guildB: XPSnapshot[]
    }
    dailyXPDiff: {
      guildA: XPSnapshot[]
      guildB: XPSnapshot[]
    }
    currentXP: {
      guildA: number
      guildB: number
    }
    todayDiff: {
      guildA: number
      guildB: number
    }
    lastDiff: {
      guildA: number
      guildB: number
    }
  }
  score: {
    guildA: number
    guildB: number
    diffGuildA: number
    diffGuildB: number
  }
  top10Kills: {
    guildA: GuildMemberStats[]
    guildB: GuildMemberStats[]
  }
  top10Deaths: {
    guildA: GuildMemberStats[]
    guildB: GuildMemberStats[]
  }
  lastDeaths: {
    guildA: RecentFrag[]
    guildB: RecentFrag[]
  }
}
