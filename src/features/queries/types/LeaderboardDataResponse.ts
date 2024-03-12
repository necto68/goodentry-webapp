/* eslint-disable @typescript-eslint/naming-convention */

export interface ResponseRow {
  total_pnl: number;
  total_trades_completed: number;
  total_volume_weekly: number;
  user: string;
  week_no: number;
}

export interface LeaderboardDataResponse {
  result: {
    rows: ResponseRow[];
  };
}
