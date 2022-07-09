import React from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import API from '../../lib/axios.jsx';
import { Clock, Users, CalendarCheck } from 'phosphor-react';
import StarRating from '../../components/StarRating/StarRating.jsx';
import useWindowSize from '../../hook/useWindowSize.jsx';

const InformativeCourse = () => {
  let { id } = useParams();
  const [curso, setCurso] = React.useState();
  const [capaURL, setCapaURL] = React.useState('');
  let windowSize = useWindowSize();

  React.useEffect(() => {
    const carregarCurso = async () => {
      const { data } = await API.get(`/cursos/${id}/`);
      setCurso(data);
      setCapaURL(data.capa);
    };
    carregarCurso();
  }, []);

  return (
    <main className="grid">
      <section
        style={{ backgroundImage: `url(${capaURL})` }}
        className="w-full bg-cover bg-center bg-blend-multiply bg-primaryColor_2"
      >
        <div className="w-full max-w-[69.375rem] mx-auto / 1200:w-[85%]">
          <nav className="mt-[1.875rem] text-[#E0E0E0] text-[1rem] font-semibold">
            <Link to="/">Início </Link>
            <Link to="/cursos">/ Cursos </Link>
            <Link to="/cursos">/ Módulos </Link>
            <Link
              to={`/cursos/${curso?.id}`}
              className="font-bold text-white"
            >{`/ ${curso?.titulo}`}</Link>
          </nav>
          <h1 className="text-white font-bold text-[2.5rem] mt-[3.75rem] / 1200:text-center">
            {curso?.titulo}
          </h1>
          <h2 className="text-[1.5625rem] text-white font-semibold mt-[1.875rem] mb-[3.1875rem] / 1200:text-center">
            {curso?.parceiros}
          </h2>
        </div>
      </section>
      <section className="w-full max-w-[69.375rem] grid mx-auto / 1200:w-[85%]">
        <h1 className="place-self-center text-[2.5rem] text-primaryColor_2 mt-[1.875rem] / 1200:text-center">
          Informações Gerais do Curso
        </h1>
        <div className="flex flex-wrap justify-evenly mt-[2.8125rem] text-[1.2225rem] font-bold / tablet:flex-col tablet:gap-[1rem] tablet:items-center">
          <div className="flex gap-[0.75rem] items-center mx-[0.5rem]">
            <Clock size={25} className="text-primaryColor_2" weight="fill" />
            <span className="text-[1.046875rem]">
              {curso?.duracao.replace('h', ' horas')}
            </span>
          </div>
          <div className="flex gap-[0.75rem] items-center mx-[0.5rem]">
            <CalendarCheck
              size={22}
              className="text-primaryColor_2"
              weight="fill"
            />
            <span className="text-[1.046875rem]">Desde {curso?.criado_em}</span>
          </div>
          <div className="flex gap-[0.75rem] items-center mx-[0.5rem]">
            <Users size={29} className="text-primaryColor_2" weight="fill" />
            <span className="text-[1.046875rem]">
              {curso?.matriculados
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}{' '}
              alunos matriculados
            </span>
          </div>
          <div className="flex mx-[0.5rem]">
            <span className="flex gap-[0.61125rem] items-center">
              <StarRating qtdAvaliacoes={curso?.avaliacao} />
              {curso?.avaliacao}
              {windowSize.width > 768
                ? ` (
              ${curso?.numero_avaliacoes
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
              avaliações )`
                : null}
            </span>
          </div>
        </div>
      </section>
      <section className="w-full max-w-[69.375rem] grid mx-auto / 1200:w-[85%]">
        <h2 className="mt-[2.875rem] text-primaryColor_2 font-semibold text-[1.5625rem] justify-self-center">
          Sobre o curso
        </h2>
        <p className="mt-[1.875rem] text-justify text-[1rem]">{curso?.sobre}</p>
      </section>
      <section className="w-full max-w-[69.375rem] grid mx-auto / 1200:w-[85%]">
        {(curso?.objetivo_geral != undefined) |
        (curso?.objetivo_especifico != undefined) ? (
          <h2 className="my-[1.875rem] text-primaryColor_2 font-semibold text-[1.5625rem] justify-self-center">
            Objetivos
          </h2>
        ) : null}
        {curso?.objetivo_geral && (
          <div>
            <h3 className="font-bold text-[1rem]">Objetivo Geral</h3>
            <p className="mt-[0.8125rem] text-[1rem] text-justify">
              {curso?.objetivo_geral}
            </p>
          </div>
        )}
        {curso?.objetivo_especifico && (
          <div>
            <h3 className="font-bold my-[1rem]">Objetivos Específicos</h3>
            <ul key={curso?.id} className="list-disc">
              {curso?.objetivo_especifico
                .replace('-', '')
                .split('-')
                .map((line) => (
                  <li className="mx-[2rem] text-justify">{line}</li>
                ))}
            </ul>
          </div>
        )}
      </section>
      <section className="w-full max-w-[69.375rem] grid mx-auto / 1200:w-[85%]">
        <h2 className="font-semibold mt-[1.875rem] text-primaryColor_2 text-[1.5625rem] justify-self-center">
          Recursos educacionais
        </h2>
        <p className="mt-[1.875rem] justify-self-center">
          {curso?.recursos_educacionais
            ? curso?.recursos_educacionais
            : 'Este módulo não apresenta nenhum recurso educacional.'}
        </p>
      </section>
      <section className="w-[full] max-w-[69.375rem] grid mx-auto / 1200:w-[85%]">
        <h2 className="font-semibold mt-[1.875rem] text-primaryColor_2 text-[1.5625rem] justify-self-center">
          Créditos
        </h2>
        <div className="grid my-[3rem] grid-cols-4 gap-[2.375rem] items-center justify-evenly / laptop:grid-cols-2 / phone:grid-cols-1">
          {curso?.creditos.map((parceiro) => (
            <img
              src={parceiro.capa}
              alt={parceiro.titulo}
              className="object-cover mx-auto / laptop:max-w-[13rem]"
            />
          ))}
        </div>
      </section>
    </main>
  );
};

export default InformativeCourse;
