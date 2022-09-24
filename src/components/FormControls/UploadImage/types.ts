import { ObjectShape, TypeOfShape } from "yup/lib/object";

export type Props = {
  name: string;
  image: null | string | File;
};

export type ShapeType = TypeOfShape<ObjectShape>;
