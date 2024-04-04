
//@ Aliot
import avr from '@/assets/img/CardPreviews/main/aliot/avr.svg'
import grsh from '@/assets/img/CardPreviews/main/aliot/grsh.svg'
import sha from '@/assets/img/CardPreviews/main/aliot/sha.svg'
import shs from '@/assets/img/CardPreviews/main/aliot/shs.svg'
import ukrm from '@/assets/img/CardPreviews/main/aliot/ukrm.svg'
import vru from '@/assets/img/CardPreviews/main/aliot/vru.svg'

//@ ABB
import CircuitBreakers from '@/assets/img/CardPreviews/main/abb/CircuitBreakers.svg'
import PureSteel from '@/assets/img/CardPreviews/main/abb/PureSteel.svg'
import HouseholdCabinets from '@/assets/img/CardPreviews/main/abb/HouseholdCabinets.svg'
import DifferentialAutomata from '@/assets/img/CardPreviews/main/abb/DifferentialAutomata.svg'

//@ Wago
import Multilevel from '@/assets/img/CardPreviews/main/wago/Multilevel.svg'
import CurrentTransformers from '@/assets/img/CardPreviews/main/wago/CurrentTransformers.svg'
import Adapters from '@/assets/img/CardPreviews/main/wago/Adapters.svg'
import ExplosionProofTerminals from '@/assets/img/CardPreviews/main/wago/ExplosionProofTerminals.svg'

//@ Wago

import masd from '@/assets/img/CardPreviews/main/chint/masd.svg'
import MeasuringInstruments from '@/assets/img/CardPreviews/main/chint/MeasuringInstruments.svg'
import efare from '@/assets/img/CardPreviews/main/chint/efare.svg'
import signalization from '@/assets/img/CardPreviews/main/chint/signalization.svg'


//@ scheider electric

import IntermediateRelays from '@/assets/img/CardPreviews/main/scheider/IntermediateRelays.svg'
import TimeRelay from '@/assets/img/CardPreviews/main/scheider/TimeRelay.svg'
import SwitchesEasy9 from '@/assets/img/CardPreviews/main/scheider/SwitchesEasy9.svg'
import aeps from '@/assets/img/CardPreviews/main/scheider/aeps.svg'




export interface IDataCompanies {
    img: string,
    title?: string,
    tag: string,
    to: string,
}
export interface IItemDataCompanies {
    img: string,
    title: string,
    price: string,
    to: string,
}

export const dataCompanies: IDataCompanies[] = [
    {
        img: avr,
        to: 'wago',
        tag: 'Aliot',
        title: 'Щит автоматического включения резерва АВР'
    },
    {
        img: grsh,
        to: 'chint',
        tag: 'Aliot',
        title: 'Главный распределительный щит (ГРЩ)'
    },
    {
        img: sha,
        to: 'abb',
        tag: 'Aliot',
        title: 'Щиты автоматики и управления (ЩА)'
    },
    {
        img: shs,
        to: 'abb',
        tag: 'Aliot',
        title: 'Щит силовой (ЩС)'
    },
    {
        img: ukrm,
        to: 'abb',
        tag: 'Aliot',
        title: 'Установки компенсации реактивной мощности (УКРМ)'
    },
    {
        img: vru,
        to: 'texnook',
        tag: 'Aliot',
        title: 'Вводно-распределительные устройства (ВРУ)'
    },

    //@ ABB 

    {
        img: CircuitBreakers,
        to: 'circuit_breakers',
        tag: 'ABB',
        title: 'Автоматические выключатели'
    },
    {
        img: PureSteel,
        to: 'pure_steel',
        tag: 'ABB',
        title: 'Pure Сталь'
    },
    {
        img: HouseholdCabinets,
        to: 'household_cabinets',
        tag: 'ABB',
        title: 'Бытовые шкафы (Боксы)'
    },
    {
        img: DifferentialAutomata,
        to: 'differential_automata',
        tag: 'ABB',
        title: 'Дифференциальные автоматы'
    },
    
    //@ Wago

    {
        img: Multilevel,
        to: 'multi_level_terminals',
        tag: 'Wago',
        title: 'Многоуровневые клеммы на DIN-рейку'
    },
    {
        img: CurrentTransformers,
        to: 'current_transformers',
        tag: 'Wago',
        title: 'Токовые трансформаторы'
    },
    {
        img: Adapters,
        to: 'adapters',
        tag: 'Wago',
        title: 'Переходники'
    },
    {
        img: ExplosionProofTerminals,
        to: 'explosion_proof_terminals',
        tag: 'Wago',
        title: 'Клеммы взрывозащищенные'
    },

    //@ Chint 

    {
        img: masd,
        tag: 'chint',
        to: 'modular_alarm_devices',
        title: 'Модульные аппараты сигнализации и управления'
    },
    {
        img: MeasuringInstruments,
        tag: 'chint',
        to: 'measuring_instruments',
        title: 'Измерительные приборы'
    },
    {
        img: efare,
        tag: 'chint',
        to: 'automatic_reserve_entry',
        title: 'Оборудование для автоматического ввода резерва'
    },
    {
        img: signalization,
        tag: 'chint',
        to: 'alarm_control',
        title: 'Оборудование сигнализации и управления'
    },

    //@ scheider electric

    {
        img: IntermediateRelays,
        tag: 'Schneider Electric',
        to: 'intermediate_relays',
        title: 'Реле промежуточные',
    },
    {
        img: TimeRelay,
        tag: 'Schneider Electric',
        to: 'time_relay',
        title: 'Реле времени',
    },
    {
        img: SwitchesEasy9,
        tag: 'Schneider Electric',
        to: 'easy_switches',
        title: 'Рубильники Easy 9',
    },
    {
        img: aeps,
        tag: 'Schneider Electric',
        to: 'automatic_engine_protection_systems',
        title: 'Автоматы защиты двигателя GV2',
    },
]



export const dataItemsCompanies: IItemDataCompanies[] = [
    {
        img: CircuitBreakers,
        price: '500$',
        title: 'fartune 14v 200A',
        to: 'ABB',
    },
    {
        img: CircuitBreakers,
        price: '500$',
        title: 'fartune 14v 200A',
        to: 'ABB',
    },
    {
        img: CircuitBreakers,
        price: '500$',
        title: 'fartune 14v 200A',
        to: 'ABB',
    },
    {
        img: CircuitBreakers,
        price: '500$',
        title: 'fartune 14v 200A',
        to: 'ABB',
    },
    {
        img: CircuitBreakers,
        price: '500$',
        title: 'fartune 14v 200A',
        to: 'ABB',
    },
]
