export default interface Filter {
  [key: string]: {
    operator: '=' | '>' | '>=' | '<' | '<=' | '!=';
    value: string | number;
  };
}
