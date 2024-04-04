import React, { ReactNode} from 'react'

interface IProps<T> {
    items: T[] | undefined,
    rebderItems: (item: T, i:number) => ReactNode
}


export function List<T>({items, rebderItems}: IProps<T>) {
  return (
    <>
        {items?.map(rebderItems)}
    </>
  )
}