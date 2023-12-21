import { Alert } from '@navikt/ds-react';
import React, { Component, ErrorInfo } from 'react';

interface Props {
    children: React.ReactNode;
}

interface State {
    hasError: boolean;
    errorMessage: string;
}

class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, errorMessage: '' };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('ErrorBoundary fanget opp en feil: ', error, errorInfo);
        this.setState({ hasError: true, errorMessage: error.message });
    }

    render() {
        if (this.state.hasError) {
            return (
                <Alert variant='error' style={{ paddingTop: "60px" }}>
                    {`En feil har oppstått: ${this.state.errorMessage}`}
                </Alert>
            )
        }
        return this.props.children;
    }
}

export default ErrorBoundary;