import abb from '@/assets/img/companys/abb.svg'
import schneider from '@/assets/img/companys/schneider.svg'
import hensel from '@/assets/img/companys/hensel.svg'
import ls from '@/assets/img/companys/ls.svg'

import Moeller from '@/assets/img/companys/Moeller.svg'
import chint from '@/assets/img/companys/chint.svg'
import legrand from '@/assets/img/companys/legrand.svg'
import provento from '@/assets/img/companys/provento.svg'

export interface IDataItem {
    img: string; // Предполагается, что свойство img содержит строки (пути к изображениям)
}

export const dataTop: IDataItem[] = [
    {
        img: abb
    },
    {
        img: schneider
    },
    {
        img: hensel
    },
    {
        img: ls
    },
    {
        img: abb
    },
    {
        img: schneider
    },
    {
        img: hensel
    },
    {
        img: ls
    },
]

export const dataBottom: IDataItem[] = [
    {
        img: chint
    },
    {
        img: Moeller
    },
    {
        img: provento
    },
    {
        img: legrand
    },
    {
        img: chint
    },
    {
        img: Moeller
    },
    {
        img: provento
    },
    {
        img: legrand
    },
]