import React, { ReactNode} from 'react'

interface IProps<T> {
    items: T[] | undefined,
    renderItems: (item: T, i:number) => ReactNode
}


export function List<T>({items, renderItems}: IProps<T>) {
  return items?.map(renderItems)
}