import { Spinner } from '@/Spinner'
import 'virtual:uno.css'
import './global.styl'

export function App(props: any) {
  return (
    <div className="h-full">
      <div className="flex-row h-full">
        <div className="h-full">
          <Spinner />
        </div>
        <b>Server host:</b> {props.serverHost}
      </div>
      {props.children}
    </div>
  )
}
