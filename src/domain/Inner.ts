export interface Inner {
    [path: string]: NodeViewModel;
}

export interface InnerNodeItem {
    name: string;
    children: InnerNodeItem[];
    viewModel: NodeViewModel | undefined;
}

export interface NodeViewModel {
    [key: string]: number | string | string[];
}
