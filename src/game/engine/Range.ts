export class Range {
  public static rowRange(rowNumber: number, colCount: number): [number, number][] {
    return Array.from(new Array(colCount), (_, i) => [i, rowNumber]);
  }
}
