export enum ItemsCondition {
    NEW = 1,
    OLD = 2,
}

export const getItemsCondition = (value: number) => {
    return ItemsCondition[value];
}