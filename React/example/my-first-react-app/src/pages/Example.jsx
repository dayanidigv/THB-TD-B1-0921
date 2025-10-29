import { useMemo, useState } from 'react';
import FunctionComponent from '../Component/Examples/001_FunctionComponent/FunctionComponent';
import ClassComponent from '../Component/Examples/002_ClassComponent/ClassComponent';
import PropsExample from '../Component/Examples/003_Props/PropsExample';
import StateExample from '../Component/Examples/004_state/StateExample';
import LifecycleExample from '../Component/Examples/005_ComponentLifeCycle/LifecycleExample';
import UseStateExample from '../Component/Examples/006_hooks/6.01_useState/UseStateExample';
import UseEffectExample from '../Component/Examples/006_hooks/6.02_useEffect/UseEffectExample';
import UseRefExample from '../Component/Examples/006_hooks/6.03_useRef/UseRefExample';
import UseContextExample from '../Component/Examples/006_hooks/6.04_useContext/UseContextExample';
import UseContextToggle from '../Component/Examples/006_hooks/6.04_useContext/UseContextToggle';
import UseReducerExample from '../Component/Examples/006_hooks/6.05_useReducer/UseReducerExample';
import UseWindowWidthExample from '../Component/Examples/006_hooks/6.06_customHook/UseWindowWidthExample';
import UseCallbackExample from '../Component/Examples/006_hooks/6.07_useCallback/UseCallbackExample';
import UseMemoExample from '../Component/Examples/006_hooks/6.08_useMemo/UseMemoExample';
import UseSearchParamsExample from '../Component/Examples/006_hooks/6.09_useSearchParams/UseSearchParamsExample';
import UseNavigateExample from '../Component/Examples/006_hooks/6.10_useNavigate/UseNavigateExample';
import ConditionalExample from '../Component/Examples/007_Conditional/ConditionalExample';
import ListExample from '../Component/Examples/008_List/ListExample';
import FormValidation from '../Component/Examples/009_FormValidation/FormValidation';
import ControlledInput from '../Component/Examples/010_Controlled/ControlledInput';
import UncontrolledInput from '../Component/Examples/011_Uncontrolled/UncontrolledInput';
import EventExample from '../Component/Examples/012_EventHandling/EventExample';
import ErrorBoundary from '../Component/Examples/013_ErrorBoundary/ErrorBoundary';
import BuggyComponent from '../Component/Examples/013_ErrorBoundary/BuggyComponent';



function Example() {
    const [selectedTitle, setSelectedTitle] = useState('');

    const examples = useMemo(
        () => [
            { title: 'Function Component', component: FunctionComponent, desc: 'Simple functional component' },
            { title: 'Class Component', component: ClassComponent, desc: 'Basic class-based component' },
            { title: 'Props Example', component: PropsExample, desc: 'Passing props from parent to child' },
            { title: 'State Example', component: StateExample, desc: 'Local component state with useState / this.state' },
            { title: 'Lifecycle Example', component: LifecycleExample, desc: 'Mount/update/unmount examples' },
            { title: 'UseState Example', component: UseStateExample, desc: 'Hook: useState' },
            { title: 'UseEffect Example', component: UseEffectExample, desc: 'Hook: useEffect (side-effects)' },
            { title: 'UseRef Example', component: UseRefExample, desc: 'Hook: useRef (DOM refs / mutable values)' },
            { title: 'UseContext Example', component: UseContextExample, desc: 'Hook: useContext (shared state)' },
            { title: 'UseContext Toggle', component: UseContextToggle, desc: 'Interactive useContext demo with theme toggle' },
            { title: 'UseReducer Example', component: UseReducerExample, desc: 'Hook: useReducer (complex state)' },
            { title: 'UseWindowWidth Example', component: UseWindowWidthExample, desc: 'Custom hook example' },
            { title: 'UseCallback Example', component: UseCallbackExample, desc: 'Hook: useCallback (stable handlers)' },
            { title: 'UseMemo Example', component: UseMemoExample, desc: 'Hook: useMemo (memoize expensive computations)' },
            { title: 'UseSearchParams Example', component: UseSearchParamsExample, desc: 'Hook: useSearchParams (read/write query params)' },
            { title: 'UseNavigate Example', component: UseNavigateExample, desc: 'Hook: useNavigate (programmatic navigation)' },
            { title: 'Conditional Example', component: ConditionalExample, desc: 'Conditional rendering' },
            { title: 'List Example', component: ListExample, desc: 'Rendering lists with keys' },
            { title: 'Form Validation', component: FormValidation, desc: 'Controlled form + simple validation' },
            { title: 'Controlled Input', component: ControlledInput, desc: 'Controlled input example' },
            { title: 'Uncontrolled Input', component: UncontrolledInput, desc: 'Uncontrolled input using ref' },
            { title: 'Event Example', component: EventExample, desc: 'Handling events (click)' },
            {
                title: 'Buggy Component',
                component: () => (
                    <ErrorBoundary>
                        <BuggyComponent error={false} />
                        <BuggyComponent error={true} />
                        <BuggyComponent error={false} />
                    </ErrorBoundary>
                ),
                desc: 'Error boundary demo (component throws)'
            }
        ],
        []
    );

    const selected = useMemo(() => examples.find((ex) => ex.title === selectedTitle) || null, [examples, selectedTitle]);
    const Selected = selected ? selected.component : null;

    return (
        <div style={{ padding: 20 }}>
            <h1>Welcome to the Example Page</h1>
            <p>Minimal examples showing basic React concepts. Each section is intentionally tiny.</p>

            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <label htmlFor="example-select">Choose example</label>
                <select id="example-select" value={selectedTitle} onChange={(e) => setSelectedTitle(e.target.value)}>
                    <option value="">— Select example —</option>

                    {examples.map((ex) => (
                        <option key={ex.title} value={ex.title}>
                            {ex.title}
                        </option>
                    ))}
                </select>
            </div>

            <div style={{ marginTop: 20 }}>
                {selectedTitle ? (
                    <section style={{ borderTop: '1px solid #eee', paddingTop: 12 }}>
                        <div style={{ marginTop: 12 }}>
                            <center style={{...boxStyle, maxWidth: '600px', margin: '0 auto' }}>
                                <Selected />
                            </center>
                        </div>
                    </section>
                ) : (
                    <p>Please select an example from the dropdown above.</p>
                )}
            </div>
        </div>
    );
}

const boxStyle = {
    border: '1px solid #ddd',
    padding: 12,
    borderRadius: 4,
    backgroundColor: '#f9f9f9',
    marginTop: 12,
};

export default Example;