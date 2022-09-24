import { ComponentWithAs, InputProps, TextareaProps } from "@chakra-ui/react";
import { FieldInputProps } from "formik";
import { ObjectShape, TypeOfShape } from "yup/lib/object";

export type ShapeType = TypeOfShape<ObjectShape>;

export type Props<T extends ShapeType> = {
  name: keyof T;
  label?: string;
  placeholder: string;
  component:
    | ComponentWithAs<"input", InputProps>
    | ComponentWithAs<"textarea", TextareaProps>
    | ((props: FieldInputProps<ShapeType[keyof ShapeType]>) => JSX.Element);
  showError?: boolean;
};
