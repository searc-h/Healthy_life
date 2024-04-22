interface AlertDialogServiceType{
  title : string;
  message : string | Resource;
  confirmValue : string;
  alignment : DialogAlignment;
  action : Function
}


export function AlertDialogService(props : Partial<AlertDialogServiceType>){
  const {title , message , alignment , confirmValue , action} = props
  AlertDialog.show(
    {
      title: title || '提示',
      message: message || '',
      autoCancel: true,
      alignment: alignment || DialogAlignment.Center,
      offset: { dx: 0, dy: -20 },
      gridCount: 3,
      confirm: {
        value: confirmValue || '知道了',
        action: () => {
          console.info('Button-clicking callback')
          action && action()
        }
      },
      cancel: () => {
        console.info('Closed callbacks')
      }
    }
  )
}