export interface InnerNodeItem {
    name: string;
    children?: InnerNodeItem[];
    viewModel?: NodeViewModel;
}

export interface NodeViewModel {
    value?: string;
    error?: string[];
    children?: string[];
}

export enum NodeViewModelMode {
    Read,
    Edit
}