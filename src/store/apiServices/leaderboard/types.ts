type ScoreEntry = {
  id: number;
  name: string;
  score: number;
  avatar: string;
};

type ScoreEntryPostData = {
  data: ScoreEntry;
  ratingFieldName: string;
  teamName: string;
};

type ScoreRequestData = {
  ratingFieldName: string;
  cursor: number;
  limit: number;
};

type ScoreEntries = Array<{
  data: ScoreEntry;
}>;

export { ScoreEntry, ScoreRequestData, ScoreEntries, ScoreEntryPostData };
