import React from 'react';
import backgroundImage from '../../assets/images/backgroundImage.svg';
import { CaretLeft, CaretRight, Clock, Users } from 'phosphor-react';
import API from '../../lib/axios.jsx';

import StarRating from '../../components/StarRating/StarRating.jsx';
import { Link } from 'react-router-dom';

const Home = () => {
  const [filtro, setFiltro] = React.useState('mais_populares');
  const [cursos, setCursos] = React.useState([]);

  React.useEffect(() => {
    const carregarCursos = () => {
      if (filtro === 'mais_populares') {
        const { data } = await API.get(
          '/cursos?_limit=3&_sort=matriculados&_order=desc',
        );
        setCursos(data);
      } else if (filtro === 'mais_bem_avaliados') {
        const { data } = await API.get(
          '/cursos?_limit=3&_sort=avaliacao&_order=desc',
        );
        setCursos(data);
      } else if (filtro === 'mais_recentes') {
        const { data } = await API.get(
          '/cursos?_limit=3&_sort=criado_em&_order=desc',
        );
        setCursos(data);
      }
    }

    carregarCursos();
  }, [filtro]);

  return (
    <main>
      <section className="w-full flex flex-col items-center bg-backgroundColor_1">
        <h1 className="text-[3.75rem] px-[1rem] text-primaryColor_2 font-semibold mt-[5.62rem] text-center / phone:text-[2.5rem]">
          Especialização PEPSUS
        </h1>
        <h2 className="font-semibold px-[1rem] text-[1.87rem] text-center / phone:text-[2rem]">
          Conheça o curso de Especialização em Saúde da Família
        </h2>
        <button className=" w-[12.5rem] h-[3.12rem] mt-[1.87rem] bg-primaryColor_1 rounded-3xl text-white text-[1.87rem]">
          <Link to="/cursos/1">Acesse</Link>
        </button>
        <div className="w-full px-[5rem] max-w-[69.81rem] h-full max-h-[26.5rem] relative mt-[3.12rem]">
          <img src={backgroundImage} className="w-full h-full" />
          <a href="#">
            <CaretRight
              size={45}
              className="text-primaryColor_2 absolute top-[50%] right-[0%] mx-[1rem]"
            />
          </a>
          <a href="#">
            <CaretLeft
              size={45}
              className="text-primaryColor_2 absolute top-[50%] left-[0%] mx-[1rem]"
            />
          </a>
        </div>
        <div className="flex flex-row mt-[3rem] mb-[6.25rem]">
          <nav className="flex gap-2">
            <a
              href="#"
              className="rounded-2xl bg-primaryColor_1 hover:bg-fuchsia-600 transition-colors w-14 h-4"
            ></a>
            <a href="#" className=" rounded-full bg-gray-300 w-4 h-4"></a>
            <a href="#" className=" rounded-full bg-gray-300 w-4 h-4"></a>
            <a href="#" className=" rounded-full bg-gray-300 w-4 h-4"></a>
          </nav>
        </div>
      </section>
      <section className="w-[95%] max-w-[69.375rem] mx-auto grid">
        <h1 className=" text-primaryColor_2 justify-self-center text-[1.875rem] font-semibold mt-[3.75rem] text-center">
          Módulos Educacionais
        </h1>
        <nav className=" flex flex-wrap gap-[2.125rem] mt-[1.875rem] text-[1.25rem] font-semibold / 1200:justify-center">
          <a
            onClick={() => setFiltro('mais_populares')}
            className={
              filtro === 'mais_populares' ? 'nav-item active' : 'nav-item'
            }
          >
            Mais populares
          </a>
          <a
            onClick={() => setFiltro('mais_bem_avaliados')}
            className={
              filtro === 'mais_bem_avaliados' ? 'nav-item active' : 'nav-item'
            }
          >
            Mais bem avaliados
          </a>
          <a
            onClick={() => setFiltro('mais_recentes')}
            className={
              filtro === 'mais_recentes' ? 'nav-item active' : 'nav-item'
            }
          >
            Mais recentes
          </a>
        </nav>
        <div className="grid grid-cols-1 gap-[1.875rem] my-[1.5rem] / 1200:grid-cols-3 / laptop:grid-cols-2 / tablet:grid-cols-1 tablet:max-w-[32.5rem] tablet:mx-auto">
          {cursos.map((curso, index) => (
            <div
              key={curso.id}
              className={`bg-[#F5F5F7] p-[1.25rem] rounded-[1.25rem] flex items-center gap-[1rem] 1200:flex-col 1200:text-center ${
                index === 2
                  ? 'laptop:col-span-full laptop:max-w-[48.455%] laptop:mx-auto / tablet:max-w-[32.5rem]'
                  : null
              }`}
            >
              <img
                src={curso.capa}
                className="w-[7.5rem] h-[7.5rem] rounded-[1.25rem] object-cover / 1200:w-[18rem] 1200:h-[18rem]"
              />
              <div className="flex flex-col flex-1 min-h-[7.5rem] gap-[1rem] place-content-between / 1200:min-h-[0rem]">
                <h1 className="text-[1.25rem] font-semibold ">
                  {curso.titulo}
                </h1>
                <p className="text-[0.8125rem] font-semibold text-primaryColor_2 ">
                  {curso.parceiros}
                </p>
              </div>
              <div className="flex gap-[0.805rem] items-center">
                <Users
                  size={32}
                  className="text-primaryColor_2"
                  weight="fill"
                />
                <span className="text-[1.046875rem]">
                  {curso.matriculados
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                </span>
              </div>
              <div className="flex gap-[0.805rem] items-center">
                <Clock
                  size={32}
                  className="text-primaryColor_2"
                  weight="fill"
                />
                <span className="text-[1.046875rem]">{curso.duracao}</span>
              </div>
              <span className="flex gap-[0.64375rem] items-center">
                <StarRating qtdAvaliacoes={curso.avaliacao} />
                {curso.avaliacao}
              </span>
              <button className=" bg-primaryColor_1 text-white text-[1.25rem] font-semibold rounded-3xl h-10 w-[11.125rem] ">
                <Link to={`/cursos/${curso.id}`}>Ver módulo</Link>
              </button>
            </div>
          ))}
        </div>
        <button className=" bg-primaryColor_1 justify-self-center text-[1.5625rem] text-white font-semibold rounded-[1.25rem] min-h-10 w-[21.875rem] p-2 my-[2.5rem] / phone:w-[70%]">
          <Link to="/cursos">Ver mais</Link>
        </button>
      </section>
      <section className=" flex flex-col justify-center items-center">
        <h1 className=" text-[1.875rem] text-primaryColor_2 font-semibold">
          Parceiros
        </h1>
        <div className=" flex flex-wrap items-start w-full max-w-[69.375rem] my-[2.5rem] bg-[#F5F5F7] rounded-[1.25rem] text-center / 1200:w-[95%]">
          <div className=" flex flex-col min-w-[17.34375rem] items-center flex-1 p-[1rem]">
            <h1 className=" text-[1.5625rem] font-semibold mb-[1rem] ">
              Governo do RN
            </h1>
            <p className=" font-semibold text-[1.25rem] ">
              Governo do Estado do Rio Grande do Norte.
            </p>
          </div>
          <div className=" flex flex-col items-center flex-1 min-w-[17.34375rem] p-[1rem]">
            <h1 className=" text-[1.5625rem] font-semibold mb-[1rem] ">
              SESAP
            </h1>
            <p className=" text-[1.25rem] font-semibold ">
              Secretaria de Saúde Pública do Estado do Rio Grande do Norte.
            </p>
          </div>
          <div className=" flex flex-col items-center min-w-[17.34375rem] flex-1 p-[1rem]">
            <h1 className=" text-[1.5625rem] font-semibold mb-[1rem] ">UFRN</h1>
            <p className=" text-[1.25rem] font-semibold ">
              Universidade Federal do Rio Grande do Norte.
            </p>
          </div>
          <div className=" flex flex-col items-center min-w-[17.34375rem] flex-1 p-[1rem]">
            <h1 className=" text-[1.5625rem] font-semibold mb-[1rem] ">HUOL</h1>
            <p className=" text-[1.25rem] font-semibold ">
              Hospital Onofre Lopes: Hospital Universitário da UFRN
              (Universidade Federal do Rio Grande do Norte).
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
