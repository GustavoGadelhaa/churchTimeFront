export interface DashboardStats {
  totalGroups: number;
  openEvents: number;
  activeMembers: number;
  todayCheckins: number;
}

export interface MyGroupInfo {
  id: number;
  name: string;
  description: string | null;
  leaderName: string | null;
  memberCount: number;
  activeEvents: number;
  active: boolean;
}
