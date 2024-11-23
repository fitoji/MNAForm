
//import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="flex flex-col justify-center py-4 space-y-1 bg-sky-50">
      <p className="text-xs text-slate-500 text-center">
        2024 MNAForm v.Alpha. Una iniciativa de
        <a className="text-xs text-slate-800 font-bold" target="_blank" href="https://fitoji.dev.ar/"> Aneka </a>
      </p>

      <div className='flex flex-row justify-center text-xs text-slate-500'>
      <div className="text-xs hover:text-emerald-600 transition-colors" to="#">
          Términos de servicio
      </div>
      <div className="text-xs hover:text-emerald-600 transition-colors mx-2" to="#">
          Privacidad
      </div>
        <a target="_blank" href="https://icons8.com/icon/5RKOijedhIGw/discord"> || Iconos </a>
        <span className="mx-1"> by </span>
        <a target="_blank" href="https://icons8.com">Icons8 y FreePik</a>
      </div>
    </footer>
  )
}

export default Footer