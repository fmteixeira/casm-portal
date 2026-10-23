import { ButtonLink } from '../components/ui'

export default function NotFound() {
  return (
    <section className="wrap flex flex-col items-start gap-5 py-20 lg:py-32">
      <div className="kicker">Erro 404</div>
      <h1 className="m-0 font-display text-[64px]/[0.9] font-extrabold uppercase lg:text-[96px]">Fora do mapa</h1>
      <p className="m-0 text-body">Esta página não existe ou foi movida.</p>
      <ButtonLink to="/">Voltar ao início</ButtonLink>
    </section>
  )
}
