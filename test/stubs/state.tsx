import type { FunctionComponent } from 'preact';
import { useState } from 'preact/hooks';

const Counter: FunctionComponent<{
    defaultCount?: number;
}> = (props)  => {
    const [count] = useState(props.defaultCount ?? 0);

    return <div>2 * {count} = {count * 2}</div>
}

export default () => {
    return <>
        <Counter defaultCount={3}/>
    </>
}
