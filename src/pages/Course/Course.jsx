import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users } from 'phosphor-react';
import API from '../../lib/axios.jsx';
import StarRating from '../../components/StarRating/StarRating.jsx';

const Course = () => {
  const [filtro, setFiltro] = React.useState('');
  const [categorias, setCategorias] = React.useState([]);
  const [cursos, setCursos] = React.useState([]);

  const [page, setPage] = React.useState(1);
  const [qtdItens, setQtdItens] = React.useState(6);
  const [qtdTotal, setQtdTotal] = React.useState(0);

  const qtdPaginas = React.useMemo(
    () => Math.ceil(qtdTotal / qtdItens),
    [qtdTotal, qtdItens],
  );

  const offset = React.useMemo(() => {
    let tmp = page * qtdItens;
    return tmp <= qtdTotal ? tmp : qtdTotal;
  }, [page, qtdItens, qtdTotal]);

  React.useEffect(() => {
    setPage(1);
  }, [filtro]);

  React.useEffect(() => {
    const carregarCategorias = async () => {
      let categorias = [];
      const { data } = await API.get('/cursos?_sort=cateroria&_order=desc');

      categorias = Array.from(new Set(data.map((item) => item.cateroria)));
      categorias = categorias.sort();

      setFiltro(categorias[0]);
      setCategorias(categorias);
    };

    carregarCategorias();
  }, []);

  React.useEffect(() => {
    const carregarCursos = async () => {
      const { data: result } = await API.get(`/cursos?cateroria=${filtro}`);
      setQtdTotal(result.length);

      const { data } = await API.get(
        `/cursos?cateroria=${filtro}&_page=${page}&_limit=${qtdItens}`,
      );
      setCursos(data);
    };

    carregarCursos();
  }, [filtro, page]);

  return (
    <main>
      <div className="flex flex-col flex-wrap w-[95%] max-w-[69.375rem] mx-auto">
        <nav className="flex text-[1rem] gap-1 mt-[1.875rem]">
          <Link to="/">Início </Link>
          <Link to="/cursos">/ Cursos </Link>
          <Link to="/cursos" className="font-bold">
            / Módulos
          </Link>
        </nav>
        <h1 className="text-[2.5rem] mt-[2.5rem] font-semibold mx-auto text-primaryColor_2 / phone:text-center phone:text-[2rem]">
          Módulos Educacionais
        </h1>

        <nav className="flex flex-wrap gap-[1.875rem] font-semibold text-[1.25rem] mt-[1.875rem] / 1200:justify-center">
          {categorias.map((categoria) => (
            <a
              key={categoria}
              onClick={() => setFiltro(categoria)}
              className={
                filtro === categoria
                  ? 'nav-item active text-sm'
                  : 'nav-item text-sm'
              }
            >
              {categoria}
            </a>
          ))}
        </nav>
        <span className="text-[1rem] italic mt-[2rem]">
          {offset} de {qtdTotal} resultados
        </span>
        <div className="grid grid-cols-3 gap-[1.875rem] mt-[1.875rem] / 1200:grid-cols-2 1200:text-center / tablet:grid-cols-1">
          {cursos.map((curso) => (
            <div className="grid / 1200:p-[1.25rem]" key={curso.id}>
              <img
                src={curso.capa}
                className="rounded-[1.25rem] object-cover aspect-square w-[21.875rem] h-[12.5rem] / 1200:w-full"
              />
              <h1 className="text-[1.5625rem] px-[1rem] mt-[0.625rem] font-semibold">
                {curso.titulo}
              </h1>
              <span className="text-[0.8125rem] text-primaryColor_2 font-semibold px-[1rem] mt-[0.625rem]">
                {curso.parceiros}
              </span>
              <div className="flex flex-row justify-between px-[1rem] mt-[0.625rem] / laptop:flex-col laptop:items-center">
                <div className="flex flex-wrap items-center gap-[0.625rem]">
                  <Users
                    size={25}
                    className="text-primaryColor_2"
                    weight="fill"
                  />
                  <span className="text-[1.046875rem]">
                    {curso.matriculados}
                  </span>
                </div>
                <div className="flex gap-[0.625rem] items-center">
                  <Clock
                    size={32}
                    className="text-primaryColor_2"
                    weight="fill"
                  />
                  <span className="text-[1.046875rem]">{curso.duracao}</span>
                </div>
                <span className="flex gap-1 items-center">
                  <StarRating qtdAvaliacoes={curso.avaliacao} />
                  {curso.avaliacao}
                </span>
              </div>
              <p className="text-[0.9375rem] font-medium text-justify px-[1rem] mt-[1rem]">
                {curso.resumo.replace(' Ver mais', '...')}
              </p>
              <Link
                to={`/cursos/${curso.id}`}
                className="text-[1.125rem] text-primaryColor_1 font-semibold place-self-end"
              >
                Ver curso
              </Link>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center justify-center mt-12">
          <nav className="flex gap-2">
            {[...Array(qtdPaginas)].map((e, i) => (
              <a
                onClick={() => {
                  setPage(i + 1);
                  window.scrollTo(0, 0);
                }}
                className={
                  i + 1 === page
                    ? 'rounded-2xl bg-fuchsia-500 w-14 h-4 cursor-pointer'
                    : 'rounded-full bg-gray-300 w-4 h-4 cursor-pointer'
                }
              ></a>
            ))}
          </nav>
          <span className="text-sm my-4">
            página {page} de {qtdPaginas}
          </span>
        </div>
      </div>
    </main>
  );
};

export default Course;
