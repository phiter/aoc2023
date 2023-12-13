export * from 'lodash-es';

export const getIndex = (arr: any[], element: any) => {
  const index = arr.indexOf(element);
  return index > -1 ? index : undefined;
};

export const intersect = (arr1: any[], arr2: any[]) => arr1.filter(i => arr2.includes(i));
