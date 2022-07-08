import React from 'react';
import { Link } from 'react-router-dom';
import API from '../../lib/axios.jsx';
import useWindowSize from '../../hook/useWindowSize.jsx';

const Partners = () => {
  let windowSize = useWindowSize();
  const [parceiros, setParceiros] = React.useState([]);
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
    const carregarParceiros = async () => {
      const { data: result } = await API.get(`/parceiros`);
      setQtdTotal(result.length);

      const { data } = await API.get(
        `/parceiros?_page=${page}&_limit=${qtdItens}`,
      );
      setParceiros(data);
    };

    carregarParceiros();
  }, [page]);

  return (
    <main>
      <section className="w-[95%] max-w-[69.375rem] grid mx-auto">
        <nav className="mt-[1.875rem]">
          <Link to="/" className="text-[#808080] text-[1rem] font-semibold">
            Início
          </Link>
          <Link
            to="/parceiros"
            className="text-[#000000] text-[1rem] font-bold"
          >
            / Parceiros
          </Link>
        </nav>
        <h1 className="text-primaryColor_2 text-[2.5rem] font-semibold mt-[1.875rem] / laptop:text-center">
          Nossos parceiros
        </h1>
        <span className="text-[1rem] italic mt-[2rem]">
          {offset} de {qtdTotal} resultados
        </span>
        <div className="grid grid-cols-3 gap-[2rem] mt-[1.875rem] / 1200:grid-cols-2 / tablet:grid-cols-1 tablet:max-w-[80%] tablet:mx-auto">
          {parceiros.map((parceiro) => (
            <div className="flex flex-col">
              <img
                className="object-contain h-[12.5rem] 2-[21.875rem]"
                src={parceiro.capa}
                alt={parceiro.titulo}
              />
              <h2 className="border-t-[0.125rem] border-primaryColor_2 text-[1.5625rem] pt-4 font-semibold text-center">
                {parceiro.titulo}
              </h2>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-center mt-[3.75rem] mb-[6.8125rem] / tablet:flex-row">
          {windowSize.width > 768 ? (
            <nav className="flex gap-[1rem]">
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
          ) : null}
          {windowSize.width < 768 ? (
            <button
              className="bg-primaryColor_1 text-white text-[1rem] font-semibold rounded-3xl h-[2rem] w-[6rem]"
              onClick={() => {
                if (page === 1) {
                  return null;
                }
                setPage(page - 1);
              }}
            >
              anterior
            </button>
          ) : null}
          <span className="text-sm my-4 mx-[1.5rem]">
            página {page} de {qtdPaginas}
          </span>
          {windowSize.width < 768 ? (
            <button
              className="bg-primaryColor_1 text-white text-[1rem] font-semibold rounded-3xl h-[2rem] w-[6rem]"
              onClick={() => {
                if (page === qtdPaginas) {
                  return null;
                }
                setPage(page + 1);
              }}
            >
              próxima
            </button>
          ) : null}
        </div>
      </section>
    </main>
  );
};

export default Partners;
