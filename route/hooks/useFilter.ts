import { IOptions } from "../types/IOptions";
import { IPost } from "../types/IPost";

import { useMemo, useRef } from 'react';


export function useFilter(posts: IPost[], { sort, filter }: IOptions) {
    const resultRef = useRef<IPost[]>(posts);

    useMemo(() => {
        resultRef.current = resultRef.current.filter((post) => {
            const resultFilter = post[filter.name];
    

            return resultFilter.includes(filter.value);
        });
    }, [filter.name, filter.value, resultRef]);

    useMemo(() => {
        switch (sort) {
            case 'ASC':
                resultRef.current = [...resultRef.current].sort((a, b) => a.id - b.id);
                break;

            case 'DESC':
                resultRef.current = [...resultRef.current].sort((a, b) => b.id - a.id);
                break;

            default :{
                return resultRef.current
            }
        }
    }, [sort, resultRef]);

    return { result: resultRef.current };


}