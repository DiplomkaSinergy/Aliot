
export const changeColor = (status: string) => {
  switch (status) {
    case 'Не оплачен':
      return 'status-def stRed'  
    case 'Оплачен':
      return 'status-def stsalat'  
    case 'В сборке':
      return 'status-def stblue'  
    case 'Ожидают получения':
      return 'status-def storange'  
    case 'Получен':
      return 'status-def stgreen'  
    case 'Отмененные':    
        return 'status-def stgreey'  
    default:
      return 'status-def'
  }
}