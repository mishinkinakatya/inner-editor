import * as React from "react";
import * as ReactDOM from "react-dom";
import { Title } from "./Title";
import { X3Screen } from "./x3Screen";

const pushStateListeners: Array<() => void> = [];

function X1Screen(): JSX.Element {
    return (
        <>
            <Title>X1 Title</Title>
            We are in x1
        </>
    );
}

function X2Screen(): JSX.Element {
    return (
        <>
            <Title>X2 Title</Title>
            We are in x2
        </>
    );
}

interface RouterLinkProps {
    href: string;
    children: React.ReactNode;
}

function RouterLink(props: RouterLinkProps): JSX.Element {
    return (
        <a
            href={props.href}
            onClick={event => {
                if (event.ctrlKey) return;
                if (event.button == 4) return;
                event.preventDefault();
                window.history.pushState("", "", props.href);
                for (const listener of pushStateListeners) {
                    listener();
                }
            }}
        >
            {props.children}
        </a>
    );
}

interface BrowserRouterProps {
    children: React.ReactNode;
}

class BrowserRouter extends React.Component<BrowserRouterProps> {
    componentDidMount() {}

    render(): JSX.Element {
        console.log(2);
        return <>{this.props.children}</>;
    }
}
class MyApp extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <RouterLink href={"/x1"}>x1</RouterLink>
                {" - "}
                <RouterLink href={"/x2"}>x2</RouterLink>
                <div>
                    <Route path="/x1">
                        <X1Screen />
                    </Route>
                    <Route path="/x2">
                        <X2Screen />
                    </Route>
                    <ParametricRoute path="/xs/:id">
                        {(args: { id: string }) => <X3Screen id={args.id} />}
                    </ParametricRoute>
                </div>
            </BrowserRouter>
        );
    }
}

interface RouteProps {
    path: string;
    children: React.ReactNode | React.ReactNode[];
}

class Route extends React.Component<RouteProps> {
    componentDidMount() {
        pushStateListeners.push(() => this.forceUpdate());
        window.addEventListener("popstate", event => {
            this.forceUpdate();
        });
    }

    render(): JSX.Element {
        if (window.location.pathname == this.props.path) {
            return <>{this.props.children}</>;
        }
        return <></>;
    }
}

interface ParametricRouteProps {
    path: string;
    children: (args: any) => React.ReactNode;
}

class ParametricRoute extends React.Component<ParametricRouteProps> {
    componentDidMount() {
        pushStateListeners.push(() => this.forceUpdate());
        window.addEventListener("popstate", event => {
            this.forceUpdate();
        });
    }

    render(): JSX.Element {
        const match = new RegExp(
            this.props.path
                .split("/")
                .map(x => (x.startsWith(":") ? `(?<${x.substring(1)}>[^/]*)` : x))
                .join("/"),
        ).exec(window.location.pathname);

        if (match != null) {
            return <>{this.props.children(match.groups)}</>;
        }
        return <></>;
    }
}

async function renderInner() {
    return ReactDOM.render(<MyApp />, document.querySelector(`#root`));
}

(async function () {
    try {
        await renderInner();
    } catch (err) {
        console.error(err);
    }
})();
