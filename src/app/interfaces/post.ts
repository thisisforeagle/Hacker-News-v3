export interface IPost {
  image: string;
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
export interface IComment {
  by: string;
  id: number;
  kids: number[];
  parent: number;
  text: string;
  time: number;
  type: string;
}
