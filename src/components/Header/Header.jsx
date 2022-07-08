import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import book from '../../assets/images/book.png';
import { MagnifyingGlass } from 'phosphor-react';

const Header = () => {
  const { pathname } = useLocation();

  return (
    <header className="w-full min-h-[6.25rem] flex flex-row flex-wrap justify-between items-center shadow-md p-[1.25rem] / 1470:flex-col">
      <Link
        to="/"
        className=" flex items-center gap-[0.760625rem] / 1470:mb-[1rem]"
      >
        <img src={book} />
        <span className=" text-[1.5rem] font-bold text-center">
          Educação Brasil
        </span>
      </Link>
      <div className="flex flex-wrap gap-[0.9375rem] items-center / 1200:flex-col">
        <nav className="flex flex-row flex-wrap items-center gap-[2.375rem] text-[1.25rem] font-semibold leading-[0rem] my-[1rem] / laptop:grid laptop:grid-cols-3 laptop:text-center / phone:grid-cols-1">
          <Link
            to="/"
            className={pathname === '/' ? 'menu-item active' : 'menu-item'}
          >
            Início
          </Link>
          <Link
            to="/sobrenos"
            className={
              pathname === '/sobrenos' ? 'menu-item active' : 'menu-item'
            }
          >
            Sobre Nós
          </Link>
          <Link
            to="/cursos"
            className={
              pathname === '/cursos' ? 'menu-item active' : 'menu-item'
            }
          >
            Cursos
          </Link>
          <Link
            to="/parceiros"
            className={
              pathname === '/parceiros' ? 'menu-item active' : 'menu-item'
            }
          >
            Parceiros
          </Link>
          <Link
            to="/transparencia"
            className={
              pathname === '/transparencia' ? 'menu-item active' : 'menu-item'
            }
          >
            Transparência
          </Link>
          <Link
            to="/contato"
            className={
              pathname === '/contato' ? 'menu-item active' : 'menu-item'
            }
          >
            Contato
          </Link>
        </nav>
        <div className="1740:hidden flex flex-row items-center rounded-2xl bg-fuchsia-100 max-w-[22.0625rem]">
          <MagnifyingGlass
            size={20}
            className="text-primaryColor_1 ml-[1rem]"
          />
          <input
            type="search"
            className="px-[0.5rem] appearance-none bg-transparent border-none w-full text-fuchsia-500 py-2 leading-none focus:outline-none"
          />
        </div>
        <div className="flex flex-wrap gap-[0.625rem] items-center / phone:flex-col">
          <button className=" w-[11.125rem] h-[2.5rem] rounded-[1.25rem] border-solid border-[0.0625rem] border-primaryColor_1 text-[1.25rem] text-primaryColor_1 font-semibold ">
            Entrar
          </button>
          <button className=" w-[11.125rem] h-[2.5rem] rounded-[1.25rem] bg-primaryColor_1 text-[1.25rem] text-white font-semibold ">
            Cadastrar
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
