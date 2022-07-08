import React from 'react';
import { Link } from 'react-router-dom';
import footerLogoLaisAndUfrn from '../../assets/images/footerLogoLaisAndUfrn.svg';
import logoLais from '../../assets/images/logoLais.svg';
import logoInstagram from '../../assets/images/004-instagram.svg';
import logoFacebook from '../../assets/images/logoFacebook.svg';
import logoTwitter from '../../assets/images/logoTwitter.svg';

const Footer = () => {
  return (
    <React.Fragment>
      <div className=" bg-primaryColor_2 w-full h-[16.5rem] flex justify-center items-center">
        <img
          src={footerLogoLaisAndUfrn}
          className="max-w-[34.31rem] max-h-[10.81rem] w-[90%]"
        />
      </div>
      <div className=" bg-primaryColor_3 w-full min-h-[29.81rem] flex flex-col items-center">
        <div className=" flex flex-row justify-between w-[90%] max-w-[60.5rem] min-h-[14.37rem] mt-[7.68rem] / tablet:flex-col tablet:gap-[2rem] tablet:mt-[4rem]">
          <div className=" flex flex-col items-center ">
            <img src={logoLais} className=" w-full max-w-[7.56rem]" />
            <p className=" mt-[1.27rem] text-white text-[1rem] ">
              Laboratório de Inovação
              <br />
              Tecnológica em Saúde.
            </p>
          </div>
          <div className=" flex flex-col items-center text-white ">
            <h1 className=" text-[1.875rem] font-semibold mb-[1.25rem]">
              Links Úteis
            </h1>
            <Link to="/">Início</Link>
            <Link to="/sobrenos">Sobre Nós</Link>
            <Link to="/cursos">Módulos</Link>
            <Link to="/parceiros">Parceiros</Link>
            <Link to="/transparencia">Transparência</Link>
          </div>
          <div className=" flex flex-col items-center ">
            <h1 className=" flex flex-col items-center text-white text-[1.875rem] font-semibold ">
              Redes sociais
            </h1>
            <div className=" flex flex-row gap-10 mt-[1.5rem]">
              <a href="https://pt-br.facebook.com/LAIS.HUOL/" target="_blank">
                <img src={logoFacebook} />
              </a>
              <a href="https://twitter.com/laishuol" target="_blank">
                <img src={logoTwitter} />
              </a>
              <a href="https://www.instagram.com/laishuol/" target="_blank">
                <img src={logoInstagram} />
              </a>
            </div>
          </div>
        </div>
        <div className=" text-white text-[1.125rem] my-[3rem] text-center">
          2022 © LAIS (HUOL). Todos os direitos reservados
        </div>
      </div>
    </React.Fragment>
  );
};

export default Footer;
