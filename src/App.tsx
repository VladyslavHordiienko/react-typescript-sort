import React from 'react';
import Header from "./assets/components/Header";

import {compare} from 'natural-orderby';

function App() {
    interface ICondition {
        include?: object[],
        exclude?: object[],
        sort_by: string
    }

    const [data, setData] = React.useState<object[]>([])
    const [conditions, setConditions] = React.useState<ICondition | null>(null)
    const [output, setOutput] = React.useState<string>('')

    const addJson = (e: React.ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader();
        if (!e.target.files) return
        reader.readAsText(e.target?.files[0]);
        reader.onloadend = (e) => {
            const data = JSON.parse(e.target?.result as string).data
            const conditions = JSON.parse(e.target?.result as string).conditions
            setData([...data])
            setConditions(conditions)
        }
    }
    const sortFn = () => {


    if (data && conditions) {
        const include = conditions.include ? Object.values(conditions.include) : false
        const exclude = conditions.exclude ? Object.values(conditions.exclude) : false
        const sortBy = Object.values(conditions.sort_by)

        let result: object[] = []

        if (include) {
            result = data.filter(obj => {
                return include.some(obj2 => {
                    return obj2[Object.keys(obj2) as keyof typeof obj2] === obj[Object.keys(obj2) as keyof typeof obj2]
                })
            })

        }
        if (exclude) {
            result = data.filter(obj => {
                return exclude.every(obj2 => obj2[Object.keys(obj2) as keyof typeof obj] !== obj[Object.keys(obj2) as keyof typeof obj])
            })
        }

        if(result.length){
            sortBy.forEach(key => {
                    setOutput(JSON.stringify({
                            "result": result.sort((a, b) => compare()(a[key as keyof typeof a], b[key as keyof typeof b]))
                        }, null, 2)
                    )
                }
            )
        }

    }
}

return (
    <div className="container">
        <Header addJson={addJson}/>
        <main className="main">
            {
                !data.length
                    ? <p className="error">Need to load json file</p>
                    : <div style={{width: "50%"}}>
                        <div className="table">
                            <div className="result">
                                {
                                    !output
                                        ? <p>Click on sort button</p>
                                        : <div>
                                            <div style={{marginBottom: "10px"}}>Output:</div>
                                            <pre style={{marginBottom: "10px"}}>{output}</pre>
                                        </div>
                                }
                            </div>
                            <button className="btn" onClick={sortFn}>Sort</button>
                        </div>
                    </div>
            }
        </main>
    </div>
);
}

export default App;
