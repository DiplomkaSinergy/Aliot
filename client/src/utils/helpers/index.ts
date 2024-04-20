
export const changeColor = (status: string) => {
  switch (status) {
    case 'Не оплачен':
      return 'status-def stRed'  
    case 'Купленные':
      return 'status-def stgreen'  
    case 'В сборке':
      return 'status-def stblue'  
    case 'Ожидают получения':
      return 'status-def storange'  
    case 'Отмененные':    
        return 'status-def stgreey'  
    default:
      return 'status-def'
  }
}