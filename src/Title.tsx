import * as React from "react";

interface TitleProps {
    children: string;
}

export class Title extends React.Component<TitleProps> {
    componentDidUpdate() {
        document.title = this.props.children;
    }

    componentDidMount() {
        document.title = this.props.children;
    }

    render(): JSX.Element {
        return <></>;
    }
}
