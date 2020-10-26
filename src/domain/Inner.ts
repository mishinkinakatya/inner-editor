export interface InnerNodeItem {
    name: string;
    children: InnerNodeItem[];
    viewModel: undefined | NodeViewModel;
}

export type PropertyDescription = number | string | string[];

export interface NodeViewModel {
    [key: string]: PropertyDescription;
}
