export interface Inner {
    [path: string]: NodeViewModel;
}

export interface InnerNodeItem {
    name: string;
    fullPath: string;
    children: InnerNodeItem[];
    viewModel: NodeViewModel | undefined;
}

export type PropertyDescription = number | string | string[];

export interface NodeViewModel {
    [key: string]: PropertyDescription;
}
