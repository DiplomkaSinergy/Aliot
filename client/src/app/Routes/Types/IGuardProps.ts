import { Forms } from "@/components/Forms/types.interface"
import { ReactElement } from "react"

export type TGuardProps = {
    children: ReactElement
    activeMenu?: boolean
    activeAuthForm?: Forms | null
    handleMenu?: () => void
    handleAuthForm?: (value: Forms | null) => void
}