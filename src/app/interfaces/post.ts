export interface Post {
  title: string;
  url?: string;
  by: string;
  time: number;
  score: number;
  descendants: number;
  kids: number[],
  text: string,
  type: string,
  id: number
}
