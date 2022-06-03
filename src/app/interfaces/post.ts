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
